import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

export const GradientButton = () => {
  const onPress = () => console.log('ok')
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <LinearGradient
        colors={['#921DFB', '#4C08A4']}
        start={[0, 0]}
        end={[0, 1]}
        style={styles.gradient}>
        <Text style={styles.buttonText}>Button</Text>
      </LinearGradient>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  gradient: {
    padding: 15,
    alignItems: 'center',
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
})
