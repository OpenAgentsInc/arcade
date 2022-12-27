import React from 'react'
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'

const LoginScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#20124D',
      }}>
      {/* <Image source={require('./logo.png')} style={{ width: 128, height: 128, marginBottom: 30 }} /> */}
      <Text style={{ fontSize: 24, color: '#fff', fontWeight: 'bold', marginBottom: 10 }}>
        Welcome to My Chat App
      </Text>
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
        placeholder='Phone number or email'
        placeholderTextColor='#777'
      />
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
        placeholder='Password'
        placeholderTextColor='#777'
        secureTextEntry
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
      <Text style={{ fontSize: 14, color: '#fff', marginTop: 10 }}>Forgot your password?</Text>
      <Text style={{ fontSize: 14, color: '#fff', marginTop: 20 }}>
        Don't have an account? <Text style={{ color: '#00F' }}>Sign Up</Text>
      </Text>
    </View>
  )
}

export default LoginScreen
