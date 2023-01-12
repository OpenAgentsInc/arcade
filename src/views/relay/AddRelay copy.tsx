import { PlusCircle, X } from '@tamagui/lucide-icons'
import {
  Adapt,
  Button,
  Dialog,
  Fieldset,
  Input,
  Label,
  Sheet,
  Unspaced,
  YStack,
} from 'tamagui'

export function AddRelay() {
  return (
    <Dialog modal>
      <Dialog.Trigger>
        <PlusCircle size={24} color="$color12" />
      </Dialog.Trigger>

      <Adapt when="sm" platform="touch">
        <Sheet zIndex={200_000} modal dismissOnSnapToBottom>
          <Sheet.Frame padding="$4" space>
            <Adapt.Contents />
          </Sheet.Frame>
          <Sheet.Overlay bg="black" />
        </Sheet>
      </Adapt>

      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="quick"
          o={0.5}
          bg="black"
          enterStyle={{ o: 0 }}
          exitStyle={{ o: 0 }}
        />
        <Dialog.Content
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
          space
          backgroundColor="white"
        >
          <YStack h={50} bg="black" pos="absolute" zIndex={900} f={1} />
          <Dialog.Title>Edit profile</Dialog.Title>
          <Dialog.Description>
            Make changes to your profile here. Click save when you're done.
          </Dialog.Description>
          <Fieldset space="$4" horizontal>
            <Label w={160} justifyContent="flex-end" htmlFor="name">
              Name
            </Label>
            <Input f={1} id="name" defaultValue="Nate Wienert" />
          </Fieldset>

          <YStack ai="center" mt="$2">
            <Dialog.Close asChild width={300} height={300}>
              <Button>Save changes</Button>
            </Dialog.Close>
          </YStack>

          <Unspaced>
            <Dialog.Close asChild>
              <Button
                pos="absolute"
                t="$2"
                r="$2"
                size="$3"
                circular
                icon={X}
              />
            </Dialog.Close>
          </Unspaced>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  )
}
