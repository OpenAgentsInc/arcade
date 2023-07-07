// const API_URL = `http://127.0.0.1:5000`
const API_URL = `https://api.faerie.ai`

export const sendMessage = async (
  text: string,
  userId: string,
  conversationId: string | null
) => {
  const response = await fetch(`${API_URL}/conversation`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: text,
      userId,
      conversationId,
    }),
  })
  const json = await response.json()
  console.log(json)
}
