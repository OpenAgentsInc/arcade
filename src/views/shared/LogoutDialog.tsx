import { useStore } from 'app/stores'
import { Alert } from 'react-native'
import { Button } from 'tamagui'

export const LogoutDialog = (props) => {
  const logout = useStore((s) => s.logout)
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
    <Button {...props} size="$5" onPress={onClickLogout}>
      Log out
    </Button>
  )
}
