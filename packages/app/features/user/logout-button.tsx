import { useStore } from 'app/stores'
import { Button } from '@my/ui'

export const LogoutButton = () => {
  const logout = useStore((s) => s.logout)
  return (
    <Button size="$5" onPress={logout}>
      Log out
    </Button>
  )
}
