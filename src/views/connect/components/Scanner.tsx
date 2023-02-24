import { BarCodeScanner } from 'expo-barcode-scanner'
import React, { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

export default function Scanner({
  onData,
}: {
  onData: ({ data, type }: { data: string; type: string }) => void
}) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [scanned, setScanned] = useState(false)

  useEffect(() => {
    getBarCodeScannerPermissions()
  }, [])

  const getBarCodeScannerPermissions = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync()
    setHasPermission(status === 'granted')
  }

  const handleBarCodeScanned = ({
    data,
    type,
  }: {
    data: string
    type: string
  }) => {
    onData({ data, type })
    setScanned(true)
  }

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting permissions</Text>
      </View>
    )
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>No access to camera</Text>;
        <Button
          title="Grant permission"
          onPress={getBarCodeScannerPermissions}
        />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
})
