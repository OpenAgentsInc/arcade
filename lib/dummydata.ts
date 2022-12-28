import { ChatMessage } from '../components/store'

export const messages: ChatMessage[] = [
  {
    id: '1',
    sender: 'Alice',
    text: 'Hello, how are you?',
    timestamp: '1672246387',
  },
  {
    id: '2',
    sender: 'Bob',
    text: "I'm good, thanks for asking!",
    timestamp: '1672246417',
  },
  {
    id: '3',
    sender: 'Alice',
    text: "That's great to hear! What have you been up to lately?",
    timestamp: '1672246437',
  },
  {
    id: '4',
    sender: 'Bob',
    text: "I've been busy with work and spending time with my family. How about you?",
    timestamp: '1672246447',
  },
]

export const chats = [
  {
    id: '3',
    name: 'Nostr',
    message: 'i have two NIPs for you to review',
    avatar: 'https://cloudflare-ipfs.com/ipfs/QmTN4Eas9atUULVbEAbUU8cowhtvK7g3t7jfKztY7wc8eP?.png',
    time: '11:11',
    unreadCount: '91',
  },
  {
    id: '1',
    name: 'Alice',
    message: 'See you then!',
    avatar: 'https://i.pravatar.cc/150?img=5',
    time: '8:38',
    unreadCount: 0,
  },
  {
    id: '2',
    name: 'Bob',
    message: 'Paid you 10000 sats⚡',
    avatar: 'https://i.pravatar.cc/100',
    time: 'Sun',
    unreadCount: 1,
  },
  {
    id: '4',
    name: 'Grandpa',
    message: 'Let us continue our wholesome conversation',
    avatar: 'https://i.pravatar.cc/400?img=63',
    time: 'Sat',
    unreadCount: 4,
  },
]
