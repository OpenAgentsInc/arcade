import { ChevronDown, ChevronUp, Plus, PlusCircle } from '@tamagui/lucide-icons'
import { Sheet } from '@tamagui/sheet'
import { SheetProps } from '@tamagui/sheet/types/types'
import { useState } from 'react'
import {
  Button,
  Fieldset,
  H1,
  H2,
  Input,
  Label,
  Paragraph,
  XStack,
  YStack,
} from 'tamagui'

export const AddRelay = () => {
  const [position, setPosition] = useState(0)
  const [open, setOpen] = useState(false)
  const [innerOpen, setInnerOpen] = useState(false)

  return (
    <>
      <Button
        circular
        onPress={() => setOpen(true)}
        my={-10}
        size="$3"
        bg="$color5"
      >
        <Plus size={20} color="$color12" />
      </Button>

      <Sheet
        forceRemoveScrollEnabled={open}
        modal={true}
        open={open}
        onOpenChange={setOpen}
        snapPoints={[75, 50, 25]}
        dismissOnSnapToBottom
        position={position}
        onPositionChange={setPosition}
        zIndex={100_000}
      >
        <Sheet.Overlay backgroundColor="black" />
        <Sheet.Handle />
        <Sheet.Frame f={1} p="$4" space="$5">
          <>
            <YStack space="$1">
              <Label w={160} justifyContent="flex-end" htmlFor="name">
                Relay URL
              </Label>
              <Input autoFocus id="name" placeholder="wss://" size="$4" />
            </YStack>
            <Button
              size="$4"
              mt="$4"
              icon={PlusCircle}
              onPress={() => setInnerOpen(true)}
            >
              Add Relay
            </Button>
          </>
        </Sheet.Frame>
      </Sheet>
    </>
  )
}
