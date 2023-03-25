// import { DesignShowcase } from '@my/ui/src/components/DesignShowcase'
import { ZapScreen } from 'app/features/zaps/screen'
import { StatusBar } from 'expo-status-bar'

export default function Home() {
  return (
    <>
      {/* <DesignShowcase /> */}
      <ZapScreen />
      <StatusBar style="light" />
    </>
  )
}
