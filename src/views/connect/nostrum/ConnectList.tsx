// @ts-nocheck
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import { ConnectURI, Metadata, NostrSigner } from '@nostr-connect/connect/src'
import * as Clipboard from 'expo-clipboard'
import { Event, getPublicKey, nip19, nip26 } from 'nostr-tools'
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Alert,
  Button,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native'
import { UseStore, useStore } from 'stores'

import ApproveDelegation from '../components/ApproveDelegation'
import ApproveSignEvent from '../components/ApproveSignEvent'
import ApproveSignSchnorr from '../components/ApproveSignSchnorr'
// eslint-disable-next-line import/order
import AppRow from '../components/AppRow'
import { Layout } from '../components/Layout'
import Scanner from '../components/Scanner'
import { babyBlue, darkBlue } from '../constants'
import NostrConnectHandler from '../nostr/handler'
import { useAppsStore } from '../store'
import { deleteWallet, getWallet, PRIVATE_KEY_HEX } from '../store/secure'

export default function ConnectList({ navigation }: { navigation: any }) {
  //store
  const apps = useAppsStore((state) => state.apps)
  const getApp = useAppsStore((state) => state.getAppByID)
  const addApp = useAppsStore((state) => state.addApp)
  const removeApps = useAppsStore((state) => state.removeApps)
  const removeAppByID = useAppsStore((state) => state.removeAppByID)

  // state
  const [event, setEvent] = useState<Event>()
  const [delegation, setDelegation] = useState<nip26.Parameters>()
  const [nostrID, setNostrID] = useState<string>()
  const [showScanner, setScanner] = useState(false)
  const [metadata, setMetadata] = useState<Metadata>()
  const [handler, setHandler] = useState<NostrSigner>()
  const [connectURI, setConnectURI] = useState<ConnectURI>()
  const [signSchnorrMessage, setSignSchnorrMessage] = useState<string>()

  //bottom sheet
  const snapPointsChoice = useMemo(() => ['10%', '20%'], [])
  const snapPointsKeyInfo = useMemo(() => ['10%', '70%'], [])
  const snapPointsApproveConnect = useMemo(() => ['10%', '40%'], [])
  const snapPointsApproveDelegate = useMemo(() => ['10%', '80%'], [])
  const snapPointsApproveSignEvent = useMemo(() => ['10%', '80%'], [])
  const snapPointsApproveSignSchnorr = useMemo(() => ['20%', '80%'], [])

  const keyInfoModalRef = useRef<BottomSheetModal>(null)
  const inputChoiceModalRef = useRef<BottomSheetModal>(null)
  const approveConnectModalRef = useRef<BottomSheetModal>(null)
  const approveDelegateModalRef = useRef<BottomSheetModal>(null)
  const approveSignEventModalRef = useRef<BottomSheetModal>(null)
  const approveSignSchnorrModalRef = useRef<BottomSheetModal>(null)

  const keyInfoModalShow = () =>
    keyInfoModalRef.current && keyInfoModalRef.current.present()
  const inputChoiceModalShow = () =>
    inputChoiceModalRef.current && inputChoiceModalRef.current.present()
  const inputChoiceModalDismiss = () =>
    inputChoiceModalRef.current && inputChoiceModalRef.current.dismiss()
  const approveConnectModalShow = () =>
    approveConnectModalRef.current && approveConnectModalRef.current.present()
  const approveConnectModalDismiss = () =>
    approveConnectModalRef.current && approveConnectModalRef.current.dismiss()
  const approveSignEventModalShow = () =>
    approveSignEventModalRef.current &&
    approveSignEventModalRef.current.present()
  const approveSignEventModalDismiss = () =>
    approveSignEventModalRef.current &&
    approveSignEventModalRef.current.dismiss()
  const approveSignSchnorrModalShow = () =>
    approveSignSchnorrModalRef.current &&
    approveSignSchnorrModalRef.current.present()
  const approveSignSchnorrModalDismiss = () =>
    approveSignSchnorrModalRef.current &&
    approveSignSchnorrModalRef.current.dismiss()
  const approveDelegateModalShow = () =>
    approveDelegateModalRef.current && approveDelegateModalRef.current.present()
  const approveDelegateModalDismiss = () =>
    approveDelegateModalRef.current && approveDelegateModalRef.current.dismiss()

  useEffect(() => {
    ;(async () => {
      // check if handler is already initialized
      if (handler) return

      // get wallet
      //   const key = await getWallet(PRIVATE_KEY_HEX)
      const store = useStore.getState() as UseStore
      const key = store.user.privateKey

      if (!key) return

      // set the pub key
      const pub = getPublicKey(key)
      setNostrID(pub)

      const remoteHandler = new NostrConnectHandler({
        secretKey: key,
      })
      try {
        await remoteHandler.listen()
      } catch (err: any) {
        console.error(err)
      }

      // handle requests
      remoteHandler.events.on('sign_event_request', (evt: Event) => {
        if (!remoteHandler.event || !remoteHandler.event.pubkey) return
        //skip all events from unknown or not authorized apps
        const app = getApp(remoteHandler.event.pubkey)
        if (!app) return

        setMetadata({ name: app.name, url: app.url })
        setEvent(evt)

        approveSignEventModalShow()
      })
      remoteHandler.events.on('sign_schnorr_request', (message: string) => {
        if (!remoteHandler.event || !remoteHandler.event.pubkey) return
        //skip all events from unknown or not authorized apps
        const app = getApp(remoteHandler.event.pubkey)
        if (!app) return

        setMetadata({ name: app.name, url: app.url })
        setSignSchnorrMessage(message)

        approveSignSchnorrModalShow()
      })
      remoteHandler.events.on(
        'delegate_request',
        (delegation: nip26.Parameters) => {
          if (!remoteHandler.event || !remoteHandler.event.pubkey) return
          //skip all events from unknown or not authorized apps
          const app = getApp(remoteHandler.event.pubkey)
          if (!app) return

          setMetadata({ name: app.name, url: app.url })
          setDelegation(delegation)
          approveDelegateModalShow()
        }
      )

      // rejections
      remoteHandler.events.on('sign_event_reject', () => {
        approveSignEventModalDismiss()
      })
      remoteHandler.events.on('sign_schnorr_reject', () => {
        approveSignSchnorrModalDismiss()
      })
      remoteHandler.events.on('delegate_reject', () => {
        approveDelegateModalDismiss()
      })

      remoteHandler.events.on('disconnect', () => {
        if (!remoteHandler.event || !remoteHandler.event.pubkey) return
        removeAppByID(remoteHandler.event.pubkey)
      })
      setHandler(remoteHandler)
    })()
  }, [navigation, handler])

  const scanQRCode = () => {
    inputChoiceModalDismiss()
    setScanner(true)
  }

  const handleBarCodeScanned = ({ data }: { type: string; data: string }) => {
    try {
      const uri = ConnectURI.fromURI(data)
      setConnectURI(uri)
      setScanner(false)
      approveConnectModalShow()
    } catch (err: any) {
      console.error(err)
      alert('Invalid Connect URI')
    }
  }

  const pasteFromClipboard = async () => {
    try {
      const text = await Clipboard.getStringAsync()
      if (!text) throw new Error('No text in clipboard')
      setConnectURI(ConnectURI.fromURI(text))

      inputChoiceModalDismiss()
      approveConnectModalShow()
    } catch (err: any) {
      Alert.alert('Error', err.message)
    }
  }

  const approveConnect = async () => {
    if (!handler) return
    if (!connectURI) return
    // get wallet
    const key = await getWallet(PRIVATE_KEY_HEX)
    if (!key) return

    try {
      console.log('Attempting connectURI.approve with key:', key)
      await connectURI.approve(key)
    } catch (err) {
      console.error(err)
      alert('Error while approving connect')
      return
    }

    // persist app to the list of connected ones
    addApp({
      id: connectURI.target,
      relay: connectURI.relay,
      name: connectURI.metadata.name,
      label: connectURI.metadata.description || '',
      icons: connectURI.metadata.icons || [],
      url: connectURI.metadata.url,
    })

    approveConnectModalDismiss()
  }

  const approveSignEvent = async () => {
    if (!handler) return

    handler.events.emit('sign_event_approve')

    tearDownModals()
  }

  const rejectSignEvent = async () => {
    if (!handler) return

    handler.events.emit('sign_event_reject')

    tearDownModals()
  }

  const approveSignSchnorr = async () => {
    if (!handler) return

    handler.events.emit('sign_schnorr_approve')

    tearDownModals()
  }

  const rejectSignSchnorr = async () => {
    if (!handler) return

    handler.events.emit('sign_schnorr_reject')

    tearDownModals()
  }

  const approveDelegate = async () => {
    if (!handler) return

    handler.events.emit('delegate_approve')

    tearDownModals()
  }

  const rejectDelegate = async () => {
    if (!handler) return

    handler.events.emit('delegate_reject')

    tearDownModals()
  }

  const keyInfoPress = () => {
    keyInfoModalShow()
  }

  const tearDownModals = () => {
    setEvent(undefined)
    setMetadata(undefined)

    inputChoiceModalDismiss()
    approveConnectModalDismiss()
    approveSignEventModalDismiss()
  }

  const deleteAll = async () => {
    const appsToRemove = apps
    removeApps()

    const key = await getWallet(PRIVATE_KEY_HEX)
    if (!key) return

    for (const app of appsToRemove) {
      const uri = new ConnectURI({
        target: app.id,
        metadata: {
          name: app.name,
          description: app.label,
          url: app.url,
          icons: app.icons,
        },
        relay: app.relay,
      })
      await uri.reject(key)
    }
  }

  const renderRow = ({
    item,
  }: {
    item: { id: string; name: string; url: string }
  }) => (
    <TouchableHighlight
      onPress={() =>
        navigation.navigate('Details', {
          id: item.id,
        })
      }
    >
      <AppRow {...item} />
    </TouchableHighlight>
  )

  return (
    <BottomSheetModalProvider>
      <Modal transparent visible={showScanner}>
        <View style={{ flex: 1 }}>
          <Scanner onData={handleBarCodeScanned} />
        </View>
      </Modal>
      <Layout>
        <View style={styles.container}>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <View style={{ justifyContent: 'center' }}>
              <Text style={styles.title}>Connected Apps</Text>
            </View>
          </View>
          {apps === null || apps.length === 0 ? (
            <>
              <View style={styles.top}>
                <Text style={styles.emoji}>🔌</Text>
                <Text style={[styles.text, { fontWeight: '700' }]}>
                  Nothing yet.
                </Text>
                <Text style={styles.text}>Connected apps will appear here</Text>
              </View>
              <View style={styles.bottom}>
                <TouchableOpacity
                  onPress={inputChoiceModalShow}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>➕ Connect App</Text>
                </TouchableOpacity>
                <Text style={styles.text}>
                  Paste or Scan a Nostr Connect URI
                </Text>
              </View>
            </>
          ) : (
            <>
              <FlatList
                data={apps}
                renderItem={renderRow}
                keyExtractor={(row) => row.id}
              />
              <View
                style={{
                  flexDirection: 'row',
                }}
              >
                <View
                  style={{ justifyContent: 'center', alignItems: 'center' }}
                >
                  <TouchableOpacity
                    onPress={inputChoiceModalShow}
                    style={styles.button}
                  >
                    <Text style={styles.buttonText}>➕ Connect App</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    marginLeft: 'auto',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <TouchableOpacity onPress={deleteAll} style={styles.button}>
                    <Text style={{ fontSize: 32 }}>🗑</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}
        </View>
        <BottomSheetModal
          ref={inputChoiceModalRef}
          index={1}
          snapPoints={snapPointsChoice}
        >
          <View style={styles.bottomSheet}>
            <TouchableOpacity onPress={scanQRCode}>
              <Text style={styles.emoji}>📷</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={pasteFromClipboard}>
              <Text style={styles.emoji}>📋</Text>
            </TouchableOpacity>
          </View>
        </BottomSheetModal>
        {connectURI && (
          <BottomSheetModal
            ref={approveConnectModalRef}
            index={1}
            snapPoints={snapPointsApproveConnect}
          >
            <View style={styles.bottomSheet}>
              <View style={{ flexDirection: 'column' }}>
                <Text style={styles.bottomSheetTitle}>
                  {connectURI.metadata.name}
                </Text>
                <Text style={styles.bottomSheetText}>
                  {new URL(connectURI.metadata.url).hostname}
                </Text>
                <Text style={styles.bottomSheetText}>
                  {' '}
                  wants to connect to your wallet{' '}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}
                >
                  <TouchableOpacity
                    style={[styles.button, { backgroundColor: 'transparent' }]}
                    onPress={() => {
                      if (!handler) return
                      handler.events.emit('approveConnectReject')
                      approveConnectModalDismiss()
                    }}
                  >
                    <Text style={[styles.buttonText, { color: darkBlue }]}>
                      Reject
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={approveConnect}
                  >
                    <Text style={styles.buttonText}>Approve</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </BottomSheetModal>
        )}
        {event && metadata && (
          <BottomSheetModal
            ref={approveSignEventModalRef}
            index={1}
            snapPoints={snapPointsApproveSignEvent}
          >
            <ApproveSignEvent
              name={metadata.name}
              url={metadata.url}
              event={event}
              onApprove={approveSignEvent}
              onReject={rejectSignEvent}
            />
          </BottomSheetModal>
        )}
        {signSchnorrMessage && metadata && (
          <BottomSheetModal
            ref={approveSignSchnorrModalRef}
            index={1}
            snapPoints={snapPointsApproveSignSchnorr}
          >
            <ApproveSignSchnorr
              name={metadata.name}
              url={metadata.url}
              message={signSchnorrMessage}
              onApprove={approveSignSchnorr}
              onReject={rejectSignSchnorr}
            />
          </BottomSheetModal>
        )}
        {delegation && metadata && (
          <BottomSheetModal
            ref={approveDelegateModalRef}
            index={1}
            snapPoints={snapPointsApproveDelegate}
          >
            <ApproveDelegation
              name={metadata.name}
              url={metadata.url}
              delegation={delegation}
              onApprove={approveDelegate}
              onReject={rejectDelegate}
            />
          </BottomSheetModal>
        )}
        {nostrID && (
          <BottomSheetModal
            index={1}
            ref={keyInfoModalRef}
            snapPoints={snapPointsKeyInfo}
          >
            <View style={styles.keyInfo}>
              <Text style={styles.keyInfoTitle}>Nostr ID</Text>
              <TouchableOpacity
                onPress={async () =>
                  await Clipboard.setStringAsync(nip19.npubEncode(nostrID))
                }
              >
                <Text style={styles.keyInfoText}>
                  {nip19.npubEncode(nostrID)}
                </Text>
              </TouchableOpacity>

              {handler && (
                <>
                  <Text style={styles.keyInfoTitle}>Secret</Text>
                  <TouchableOpacity
                    onPress={async () =>
                      await Clipboard.setStringAsync(
                        nip19.nsecEncode(handler.self.secret)
                      )
                    }
                  >
                    <Text style={styles.keyInfoText}>
                      ********************************
                    </Text>
                  </TouchableOpacity>
                </>
              )}

              <Button
                title="⚠️ Reset Secret"
                onPress={() => {
                  removeApps()
                  deleteWallet(PRIVATE_KEY_HEX)
                  navigation.navigate('Onboarding')
                }}
              />
            </View>
          </BottomSheetModal>
        )}
      </Layout>
    </BottomSheetModalProvider>
  )
}

const styles = StyleSheet.create({
  top: {
    flex: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottom: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSheetTitle: {
    textAlign: 'center',
    fontSize: 24,
    // fontFamily: 'SoraBold',
  },
  bottomSheetText: {
    textAlign: 'center',
    fontSize: 16,
    // fontFamily: 'SoraRegular',
    marginBottom: 16,
  },
  emoji: {
    fontSize: 48,
    marginHorizontal: 16,
    marginVertical: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: 'InterBold',
    marginBottom: 24,
    color: '#fff',
  },
  text: {
    fontSize: 16,
    fontFamily: 'Inter',
    marginBottom: 8,
    color: '#fff',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 16,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: 'transparent',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 16,
    // fontFamily: 'SoraBold',
    color: babyBlue,
  },
  keyInfo: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 32,
  },
  keyInfoTitle: {
    fontSize: 24,
    // fontFamily: 'SoraBold',
  },
  keyInfoText: {
    fontSize: 16,
    marginVertical: 16,
    // fontFamily: 'SoraRegular',
  },
})
