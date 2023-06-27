import { Text } from "app/components"
import { parseReferences } from "nostr-tools"
import React from "react"
import extractUrls from "extract-urls"
import reactStringReplace from "react-string-replace"
import { Linking, TextStyle } from "react-native"
import { colors } from "app/theme"
import { NostrEvent } from "app/arclib/src"

export function parser(event: NostrEvent) {
  const references = parseReferences(event)
  const urls = extractUrls(event.content, true)

  const content: {
    original: string
    parsed: string | React.ReactNode[]
    notes: string[]
    images: string[]
    videos: string[]
    links: string[]
  } = {
    original: event.content,
    parsed: event.content,
    notes: [],
    images: [],
    videos: [],
    links: [],
  }

  // parse urls
  urls?.forEach((url: string) => {
    if (url.match(/\.(jpg|jpeg|gif|png|webp|avif)$/)) {
      // image url
      content.images.push(url)
      // remove url from original content
      content.parsed = reactStringReplace(content.parsed, url, () => null)
    } else if (url.match(/\.(mp4|webm|mov|ogv|avi|mp3)$/)) {
      // video
      content.videos.push(url)
      // remove url from original content
      content.parsed = reactStringReplace(content.parsed, url, () => null)
    } else {
      if (content.links.length < 1) {
        // push to store
        content.links.push(url)
        // remove url from original content
        content.parsed = reactStringReplace(content.parsed, url, () => null)
      } else {
        content.parsed = reactStringReplace(content.parsed, url, (match, i) => (
          <Text key={match + i} text={url} onPress={() => Linking.openURL(url)} style={$link} />
        ))
      }
    }
  })

  // parse nostr
  references?.forEach((item) => {
    const profile = item.profile
    const event = item.event
    if (event) {
      content.notes.push(event.id)
      content.parsed = reactStringReplace(content.parsed, item.text, (match, i) => (
        <Text key={match + i} text={match} style={$link} />
      ))
    }
    if (profile) {
      content.parsed = reactStringReplace(content.parsed, item.text, (match, i) => (
        <Text key={match + i} text={match} style={$link} />
      ))
    }
  })

  // parse hashtag
  content.parsed = reactStringReplace(content.parsed, /#(\w+)/g, (match, i) => (
    <Text key={match + i} text={`#${match}`} style={$link} />
  ))

  return content
}

const $link: TextStyle = {
  color: colors.palette.cyan500,
}
