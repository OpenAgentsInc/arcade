import { ChannelScreen } from 'app/features/chat/ChannelScreen'
import Layout from '../../components/layout'

const WebChannelScreen = () => {
  return <ChannelScreen />
}

WebChannelScreen.getLayout = (page: any) => <Layout>{page}</Layout>

export default WebChannelScreen
