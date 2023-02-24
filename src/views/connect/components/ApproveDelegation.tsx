import { nip19, nip26 } from 'nostr-tools'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'

import { babyBlue, darkBlue } from '../constants'

const ApproveDelegation = ({
  name,
  url,
  onApprove,
  onReject,
  delegation,
}: {
  name: string
  url: string
  onApprove: () => void
  onReject: () => void
  delegation: nip26.Parameters
}) => (
  <View style={styles.container}>
    <View style={{ flexDirection: 'column' }}>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.host}>🌎 {new URL(url).hostname}</Text>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.subtitle}> wants you to sign a delegation</Text>
      </View>
      <ScrollView>
        <Text style={styles.text}>
          🙋‍♂️ Delegatee
          <Text style={styles.bold}>{` ${nip19.npubEncode(
            delegation.pubkey
          )}`}</Text>
        </Text>
        <Text style={styles.text}>
          📋 Kind
          <Text style={styles.bold}>{` ${delegation.kind}`}</Text>
        </Text>
        <Text style={styles.text}>
          ⏱ Since
          <Text style={styles.bold}>
            {` ${new Date(delegation.since! * 1000).toLocaleString('en-US', {
              timeZone: 'UTC',
            })}`}
          </Text>
        </Text>
        <Text style={styles.text}>
          ⏰ Until
          <Text style={styles.bold}>
            {` ${new Date(delegation.until! * 1000).toLocaleString('en-US', {
              timeZone: 'UTC',
            })}`}
          </Text>
        </Text>
      </ScrollView>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'transparent' }]}
          onPress={onReject}
        >
          <Text style={[styles.buttonText, { color: darkBlue }]}>Reject</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onApprove}>
          <Text style={styles.buttonText}>Approve</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  emoji: {
    fontSize: 48,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
    // fontFamily: 'SoraBold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    // fontFamily: 'SoraRegular',
    marginBottom: 16,
  },
  text: {
    marginVertical: 8,
    fontSize: 16,
    // fontFamily: 'SoraRegular',
  },
  bold: {
    // fontFamily: 'SoraBold',
    fontSize: 16,
  },
  host: {
    fontSize: 16,
    // fontFamily: 'SoraRegular',
    color: 'darkgreen',
    marginBottom: 8,
  },
  buttons: {
    marginTop: 32,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: darkBlue,
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
})

export default ApproveDelegation
