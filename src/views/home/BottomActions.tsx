import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { LinearGradient } from '@tamagui/linear-gradient'
import { HelpCircle, MessageCircle } from '@tamagui/lucide-icons'
import { usePlan } from 'lib/hooks/usePlan'
import { haptic } from 'lib/utils'
import { MainStackParams } from 'navigation/MainNavigator'
import { Button, Card, H3, Paragraph, XStack } from 'tamagui'
import { v4 as uuidv4 } from 'uuid'

export const BottomActions = () => {
  const { navigate } =
    useNavigation<NativeStackNavigationProp<MainStackParams>>()
  const plan = usePlan()
  const tryOpenDialog = () => {
    haptic()
    if (!plan) {
      navigate('iap')
      return
    }
    navigate('conversation', {
      conversationId: uuidv4(),
      conversationType: 'dialogue',
    })
  }

  return (
    <XStack mb="$6" space="$2" px="$1">
      <Card
        elevate
        size="$4"
        bordered
        animation="bouncy"
        w="50%"
        scale={0.94}
        hoverStyle={{ scale: 0.925 }}
        pressStyle={{ scale: 0.875 }}
        onPress={() => {
          haptic()
          navigate('conversation', {
            conversationId: uuidv4(),
            conversationType: 'question',
          })
        }}
      >
        <Card.Header padded>
          <XStack ai="center" mb="$2">
            <HelpCircle color="white" />
            <H3 ml="$2" color="white">
              Question
            </H3>
          </XStack>
          <Paragraph theme="alt2" fontSize={18}>
            Ask questions and get answers
          </Paragraph>
        </Card.Header>
        <Card.Footer padded>
          <XStack f={1} />
          <Button
            width="100%"
            size="$6"
            backgroundColor="white"
            color="black"
            fontWeight="700"
            pressStyle={{ backgroundColor: 'rgba(255,255,255,0.8)' }}
            onPress={() => {
              haptic()
              navigate('conversation', {
                conversationId: uuidv4(),
                conversationType: 'question',
              })
            }}
          >
            Start
          </Button>
        </Card.Footer>
        <Card.Background>
          <LinearGradient
            f={1}
            colors={['$color7', '#43A081']}
            start={[1, 1]}
            end={[0, 0]}
            justifyContent="center"
            alignItems="center"
          />
        </Card.Background>
      </Card>
      <Card
        elevate
        size="$4"
        bordered
        animation="bouncy"
        w="50%"
        scale={0.94}
        hoverStyle={{ scale: 0.925 }}
        pressStyle={{ scale: 0.875 }}
        onPress={tryOpenDialog}
      >
        <Card.Header padded>
          <XStack ai="center" mb="$2">
            <MessageCircle color="white" />
            <H3 ml="$2" color="white">
              Dialogue
            </H3>
          </XStack>
          <Paragraph theme="alt2" fontSize={18}>
            Get into a conversation with your AI assistant
          </Paragraph>
        </Card.Header>
        <Card.Footer padded>
          <XStack f={1} />
          <Button
            size="$6"
            width="100%"
            backgroundColor="white"
            color="black"
            fontWeight="700"
            pressStyle={{ backgroundColor: 'rgba(255,255,255,0.8)' }}
            onPress={tryOpenDialog}
          >
            Start
          </Button>
        </Card.Footer>
        <Card.Background>
          <LinearGradient
            f={1}
            colors={['$color7', '#43A081']}
            start={[1, 1]}
            end={[0, 0]}
            justifyContent="center"
            alignItems="center"
          />
        </Card.Background>
      </Card>
    </XStack>
  )
}
