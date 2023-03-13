import { DesignShowcase } from '@my/ui/src/components/DesignShowcase'
import { StatusBar } from 'expo-status-bar'

export default function Home() {
  return (
    <>
      <DesignShowcase />
      <StatusBar style="light" />
    </>
  )
}
