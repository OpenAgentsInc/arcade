import { Trash } from '@tamagui/lucide-icons'
import { useDeleteConversation } from 'lib/hooks'
import { haptic } from 'lib/utils'
import { Alert } from 'react-native'
import { Button } from 'tamagui'

export const TrashButton = ({ conversationId }) => {
  const { mutate } = useDeleteConversation()
  const deleteConversation = () => {
    haptic('heavy')
    Alert.alert(
      'Delete Conversation',
      'Are you sure you want to delete this conversation?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            mutate(conversationId)
          },
        },
      ],
      { cancelable: true }
    )
  }

  return (
    <Button
      circular
      icon={<Trash color="#fff" size={32} />}
      onPress={deleteConversation}
      backgroundColor="transparent"
      pressStyle={{ opacity: 0.8 }}
      p="$3"
    />
  )
}
