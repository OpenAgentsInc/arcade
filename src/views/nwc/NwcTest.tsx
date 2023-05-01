import { webln } from 'alby-js-sdk'
import React, { useEffect, useState } from 'react'

const NWCComponent = () => {
  const [nwc, setNWC] = useState<any>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [response, setResponse] = useState(null)

  useEffect(() => {
    if (!nwc) {
      const newNWC = new webln.NWC({ nostrWalletConnectUrl: loadNWCUrl })
      setNWC(newNWC)
    }
  }, [nwc])

  const connect = async () => {
    if (!nwc) return
    try {
      await nwc.enable()
      setIsConnected(true)
    } catch (error) {
      console.error('Error connecting:', error)
    }
  }

  const sendPayment = async (invoice) => {
    if (!nwc) return
    try {
      const paymentResponse = await nwc.sendPayment(invoice)
      setResponse(paymentResponse)
    } catch (error) {
      console.error('Error sending payment:', error)
    }
  }

  return (
    <div>
      {!isConnected && (
        <button onClick={connect}>Connect to Nostr Wallet Connect</button>
      )}
      {isConnected && (
        <div>
          <h2>Connected to Nostr Wallet Connect</h2>
          <button onClick={() => sendPayment('your_invoice_here')}>
            Send Payment
          </button>
          {response && (
            <div>
              <h3>Payment Response:</h3>
              <pre>{JSON.stringify(response, null, 2)}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default NWCComponent
