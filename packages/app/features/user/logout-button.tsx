import { useStore } from 'app/stores'
import { Button } from '@my/ui'

export const LogoutButton = (props) => {
  const logout = useStore((s) => s.logout)
  return (
    <Button {...props} size="$5" onPress={logout}>
      Log out
    </Button>
  )
}
