import { AddCommentScreen } from 'views/feed/AddCommentScreen'
import { CreatePostScreen } from 'views/feed/CreatePostScreen'
import { PostDetailScreen } from 'views/feed/PostDetailScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

export const PostNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="CreatePostScreen">
      <Stack.Screen
        name="CreatePostScreen"
        component={CreatePostScreen}
        options={{ title: 'Create Post' }}
      />
      <Stack.Screen
        name="PostDetailScreen"
        component={PostDetailScreen}
        options={{ title: 'Post Details' }}
      />
      <Stack.Screen
        name="AddCommentScreen"
        component={AddCommentScreen}
        options={{ title: 'Add Comment' }}
      />
    </Stack.Navigator>
  )
}
