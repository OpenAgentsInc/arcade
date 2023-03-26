// import { DesignShowcase } from '@my/ui/src/components/DesignShowcase'
// import { ZapScreen } from 'app/features/zaps/screen'
import { ChatZapScreen } from 'app/features/zaps/chatzap'
import { StatusBar } from 'expo-status-bar'

export default function Home() {
  return (
    <>
      {/* <DesignShowcase /> */}
      {/* <ZapScreen /> */}
      <ChatZapScreen />
      <StatusBar style="light" />
    </>
  )
}
