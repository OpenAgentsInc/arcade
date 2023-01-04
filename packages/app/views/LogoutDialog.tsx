import { useStore } from 'app/stores'
import { AlertDialog, Button, XStack, YStack } from 'tamagui'

export function LogoutDialog(props) {
  const logout = useStore((s) => s.logout)
  return (
    <AlertDialog
      native
      onOpenChange={(isOpen) => {
        if (isOpen) {
          console.log('open')
        } else {
          console.log('close')
        }
      }}
    >
      <AlertDialog.Trigger asChild>
        <Button {...props} onPress={() => console.log('what thesh this')}>
          Logout
        </Button>
      </AlertDialog.Trigger>

      <AlertDialog.Portal>
        <AlertDialog.Overlay
          key="overlay"
          animation="quick"
          o={0.5}
          enterStyle={{ o: 0 }}
          exitStyle={{ o: 0 }}
        />
        <AlertDialog.Content
          bordered
          elevate
          key="content"
          animation={[
            'quick',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          x={0}
          scale={1}
          opacity={1}
          y={0}
        >
          <YStack space>
            <AlertDialog.Title>Are you sure?</AlertDialog.Title>
            <AlertDialog.Description>
              If you logout without saving your secret key, you will lose access to this account.
            </AlertDialog.Description>

            <XStack space="$3" jc="flex-end">
              <AlertDialog.Cancel asChild>
                <Button>Cancel</Button>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild>
                <Button theme="active" onPress={logout}>
                  Logout
                </Button>
              </AlertDialog.Action>
            </XStack>
          </YStack>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  )
}
