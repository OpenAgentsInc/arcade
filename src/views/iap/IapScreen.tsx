import { useNavigation } from '@react-navigation/native'
import { ArrowRight, Check, Lock, Star } from '@tamagui/lucide-icons'
import { usePlan } from 'lib/hooks/usePlan'
import { haptic } from 'lib/utils/haptics'
import { selectPlan } from 'lib/utils/iap'
import { useMemo, useState } from 'react'
import { Button, H2, Paragraph, XGroup, XStack, YStack } from 'tamagui'

import { ThankYou } from './ThankYou'

export const IapScreen = () => {
  const { goBack } = useNavigation()
  const plan = usePlan()

  //   useMemo(() => {
  //     goBack()
  //   }, [plan])
  const [activePlan, setActivePlan] = useState('advanced')
  const [period, setPeriod] = useState('weekly')
  if (plan) return <ThankYou />
  return (
    <YStack backgroundColor="#000" f={1} p="$4" justifyContent="space-between">
      <YStack>
        <XGroup
          mt="$2"
          bc={grayBg}
          borderRadius={50}
          borderWidth={3}
          borderColor="#2B2B2C"
          disablePassBorderRadius
        >
          <Button
            bc={grayBg}
            fontSize={buttonFontSize}
            color="#fff"
            backgroundColor={activePlan === 'lite' ? '#43A081' : 'transparent'}
            borderRadius={50}
            onPress={() => {
              setActivePlan('lite')
              haptic('medium')
            }}
            flex={1}
            fontWeight="700"
          >
            Lite
          </Button>
          <Button
            bc={grayBg}
            fontSize={buttonFontSize}
            color="#fff"
            backgroundColor={activePlan === 'pro' ? '#43A081' : 'transparent'}
            borderRadius={50}
            onPress={() => {
              setActivePlan('pro')
              haptic('medium')
            }}
            flex={1}
            fontWeight="700"
          >
            Pro
          </Button>
          <Button
            bc={grayBg}
            fontSize={buttonFontSize}
            color="#fff"
            backgroundColor={
              activePlan === 'advanced' ? '#43A081' : 'transparent'
            }
            borderRadius={50}
            onPress={() => {
              setActivePlan('advanced')
              haptic('medium')
            }}
            flex={1}
            flexGrow={1.5}
            fontWeight="700"
          >
            Advanced
          </Button>
        </XGroup>
        <H2 color="#fff" mt="$5" mb="$3" letterSpacing={0.1}>
          Give Faerie upgrades!
        </H2>
        <Paragraph
          color="#8D8D92"
          fontSize={20}
          mt="$3"
          fontWeight="700"
          letterSpacing={1}
        >
          GET ACCESS TO
        </Paragraph>
        <YStack bc="#1C1C1D" my="$3" px="$4" py="$3" borderRadius={15}>
          {plans[activePlan].features.map((feature) => (
            <XStack ai="center" my="$2" key={feature}>
              <Check color="#43A081" />
              <Paragraph color="#fff" fontSize={16} fontWeight="700" ml="$3">
                {feature}
              </Paragraph>
            </XStack>
          ))}

          {activePlan === 'advanced' && period === 'weekly' && (
            <XStack ai="center" my="$2">
              <Star color="#43A081" />
              <Paragraph color="#fff" fontSize={16} fontWeight="700" ml="$3">
                Try 3 Days for Free
              </Paragraph>
            </XStack>
          )}
        </YStack>
      </YStack>

      <YStack mb="$6">
        <Button
          mt="$4"
          mb="$4"
          py="$2"
          size="$6"
          borderRadius={200}
          color="#fff"
          fontWeight="700"
          fontSize={16}
          borderWidth={3}
          backgroundColor={period === 'yearly' ? '#1C4033' : 'transparent'}
          borderColor={period === 'yearly' ? '#43A081' : '#2B2B2C'}
          onPress={() => {
            setPeriod('yearly')
            haptic('light')
          }}
        >
          {plans[activePlan].yearly}
        </Button>
        <Button
          mb="$5"
          py="$2"
          size="$6"
          borderRadius={200}
          color="#fff"
          fontWeight="700"
          fontSize={16}
          borderWidth={3}
          backgroundColor={period === 'weekly' ? '#1C4033' : 'transparent'}
          borderColor={period === 'weekly' ? '#43A081' : '#2B2B2C'}
          onPress={() => {
            setPeriod('weekly')
            haptic('light')
          }}
        >
          {plans[activePlan].weekly}
        </Button>
        <XStack ai="center" jc="center" mt="$3">
          <Lock color="#86868B" />
          <Paragraph color="#86868B" fontSize={16} fontWeight="700" ml="$3">
            Secured with iTunes. Cancel anytime
          </Paragraph>
        </XStack>
        <Button
          mt="$4"
          backgroundColor="#43A081"
          color="#fff"
          size="$6"
          fontWeight="700"
          pressStyle={{ opacity: 0.8 }}
          iconAfter={<ArrowRight color="#fff" size={24} />}
          onPress={() => {
            selectPlan(activePlan, period)
            haptic('medium')
          }}
        >
          Continue
        </Button>
      </YStack>
    </YStack>
  )
}

const grayBg = '#1C1C1D'
const buttonFontSize = 18

const plans = {
  lite: {
    yearly: '$49.99/year',
    weekly: '$6.99/week',
    features: [
      'Unlimited Questions & Answers',
      'Highly Advanced GPT-3 Model (Curie)',
      'Higher Word Limit',
    ],
  },
  pro: {
    yearly: '$69.99/year',
    weekly: '$8.99/week',
    features: [
      'Unlimited Questions & Answers',
      'Most Advanced GPT-3 Model (Davinci)',
      'Higher Word Limit',
    ],
  },
  advanced: {
    yearly: '$99.99/year',
    weekly: '3 days free trial, then $12.99/week',
    features: [
      'Unlimited Questions & Answers',
      'Most Advanced GPT-3 Model (Davinci)',
      'Higher Word Limit',
      'Dialogs (AI remembers chat history)',
    ],
  },
}
