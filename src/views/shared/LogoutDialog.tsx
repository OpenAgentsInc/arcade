import { Alert } from 'react-native'
// import { useStore } from 'stores'
import { Button } from 'tamagui'

export const LogoutDialog = (props) => {
  const logout = () => {}
  //   const logout = useStore((s) => s.logout)
  const onClickLogout = () => {
    Alert.alert(
      'Log out - Are you sure?',
      'If you log out without saving your keys, this account will be lost forever',
      [
        {
          text: 'No, cancel',
          style: 'cancel',
        },
        {
          text: 'Yes, log out',
          style: 'destructive',
          onPress: logout,
        },
      ]
    )
  }

  return (
    <Button {...props} w="100%" bg="$color2" size="$5" onPress={onClickLogout}>
      Log out
    </Button>
  )
}
