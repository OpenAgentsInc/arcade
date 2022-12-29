import React from 'react'
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { FullScreenGradient } from 'views/shared'

const LoginScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
      }}>
      <FullScreenGradient />
      <Text style={{ fontSize: 24, color: '#fff', fontWeight: 'bold', marginBottom: 10 }}>Arc</Text>
      <TextInput
        style={{
          width: '80%',
          height: 40,
          borderBottomWidth: 1,
          borderBottomColor: '#fff',
          color: '#fff',
          fontSize: 16,
          marginBottom: 20,
        }}
        placeholder='Pick a name'
        placeholderTextColor='#777'
      />
      <TouchableOpacity
        style={{
          width: '80%',
          height: 40,
          backgroundColor: '#00F',
          borderRadius: 5,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{ fontSize: 16, color: '#fff', fontWeight: 'bold' }}>Sign In</Text>
      </TouchableOpacity>
    </View>
  )
}

export default LoginScreen
