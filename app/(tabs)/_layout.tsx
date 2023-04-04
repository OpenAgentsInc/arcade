import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Link, Tabs } from 'expo-router'
import {
  createContext,
  Dispatch,
  RefObject,
  SetStateAction,
  useContext,
  useRef,
  useState,
} from 'react'
import { Pressable, TextInput, useColorScheme } from 'react-native'
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context'
import {
  ChannelPreviewMessengerProps,
  Chat,
  OverlayProvider,
  ThemeProvider,
} from 'stream-chat-expo'
import { StreamChat } from 'stream-chat'

import Colors from '../../constants/Colors'
import { chatApiKey } from '../../lib/chatConfig'
import { theme } from '../../lib/theme'

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name']
  color: string
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />
}

export type StreamChannel = ChannelPreviewMessengerProps['channel'] | undefined
export type StreamMessageId = string | undefined

type AppContextType = {
  messageInputRef: RefObject<TextInput> | null
  channel: StreamChannel
  setChannel: Dispatch<SetStateAction<StreamChannel>>
  selectedChannelsForEditing: StreamChannel[]
  setSelectedChannelsForEditing: Dispatch<SetStateAction<StreamChannel[]>>
  selectedMessageIdsEditing: StreamMessageId[]
  setSelectedMessageIdsEditing: Dispatch<SetStateAction<StreamMessageId[]>>
}

export const AppContext = createContext<AppContextType>({} as AppContextType)
export const useAppContext = () => useContext(AppContext)

const chatClient = StreamChat.getInstance(chatApiKey)

export default function TabLayout() {
  const colorScheme = useColorScheme()

  const messageInputRef = useRef<TextInput>(null)
  const [channel, setChannel] = useState<StreamChannel>()
  const [clientReady, setClientReady] = useState<boolean>(false)
  const [selectedChannelsForEditing, setSelectedChannelsForEditing] = useState<
    StreamChannel[]
  >([])
  const [selectedMessageIdsEditing, setSelectedMessageIdsEditing] = useState<
    StreamMessageId[]
  >([])
  const { bottom } = useSafeAreaInsets()

  return (
    <SafeAreaProvider>
      <AppContext.Provider
        value={{
          messageInputRef,
          channel,
          setChannel,
          selectedChannelsForEditing,
          setSelectedChannelsForEditing,
          selectedMessageIdsEditing,
          setSelectedMessageIdsEditing,
        }}
      >
        <OverlayProvider bottomInset={bottom} value={{ style: theme }}>
          <Chat client={chatClient}>
            <Tabs
              screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
              }}
            >
              <Tabs.Screen
                name="ChannelList"
                options={{
                  title: 'Tab One',
                  tabBarIcon: ({ color }) => (
                    <TabBarIcon name="code" color={color} />
                  ),
                  headerRight: () => (
                    <Link href="/modal" asChild>
                      <Pressable>
                        {({ pressed }) => (
                          <FontAwesome
                            name="info-circle"
                            size={25}
                            color={Colors[colorScheme ?? 'light'].text}
                            style={{
                              marginRight: 15,
                              opacity: pressed ? 0.5 : 1,
                            }}
                          />
                        )}
                      </Pressable>
                    </Link>
                  ),
                }}
              />
              <Tabs.Screen
                name="two"
                options={{
                  title: 'Tab Two',
                  tabBarIcon: ({ color }) => (
                    <TabBarIcon name="code" color={color} />
                  ),
                }}
              />
              <Tabs.Screen
                name="index"
                options={{
                  href: null,
                }}
              />
            </Tabs>
          </Chat>
        </OverlayProvider>
      </AppContext.Provider>
    </SafeAreaProvider>
  )
}
