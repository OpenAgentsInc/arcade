import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Send } from '@tamagui/lucide-icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { StackNavigatorParams } from 'navigation/nav-types'
import { useRef, useState } from 'react'
import { TextInput, TouchableOpacity } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useStore } from 'stores/index'
import { Channel } from 'stores/types'
import { Input, XStack } from 'tamagui'

import { sendMessage } from '../actions/sendMessage'

export const MessageInput = ({ channel }) => {
  const [text, setText] = useState('')
  const inputBoxRef = useRef<TextInput>(null)

  const queryClient = useQueryClient()
  const apiToken = useStore((s) => s.apiToken)

  const mutation = useMutation({
    mutationFn: (variables: {
      channel: Channel
      text: string
      eventid: string
    }) => {
      const { channel, text, eventid } = variables
      return axios.post(
        `http://localhost:8000/api/channels/${channel.id}/messages`,
        { eventid, relayurl: channel.relayurl, text },
        {
          headers: {
            Authorization: `Bearer ${apiToken}`,
          },
        }
      )
    },
    onSuccess: (_, { channel }) => {
      queryClient.invalidateQueries({
        queryKey: [`channel-messages/${channel.id}`],
      })
    },
  })

  const submitInput = () => {
    if (!inputBoxRef) return
    sendMessage(channel, text, setText, inputBoxRef, mutation as any)
  }
  return (
    <XStack alignItems="center" p="$2">
      <KeyboardAwareScrollView style={{ flexGrow: 1, flexShrink: 1 }}>
        <Input
          color="$color12"
          placeholder="Message"
          placeholderTextColor="$color8"
          autoCorrect={false}
          onChangeText={(text: string) => setText(text)}
          ref={inputBoxRef}
          spellCheck={false}
          fg={1}
          fs={1}
        />
      </KeyboardAwareScrollView>
      <TouchableOpacity activeOpacity={0.8} onPress={submitInput}>
        <Send color="$color10" size={24} style={{ marginLeft: 10 }} />
      </TouchableOpacity>
    </XStack>
  )
}
