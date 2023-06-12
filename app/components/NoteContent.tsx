import React from "react"
import { Text, View, Pressable, Dimensions } from "react-native"
import { useTheme } from "@ui-kitten/components"
import { LinkPreview } from "@flyerhq/react-native-link-preview"
import ImageView from "react-native-image-viewing"

import { isImage, isUrl, noteOrUrlRegex, urlRegex } from "utils/note"
import { Image, Link } from "app/components"
import { NostrEvent } from "app/arclib/src"

const WINDOW_WIDTH = Dimensions.get("window").width

type Props = {
  note: NostrEvent
  size?: "small" | "large"
}

export const NoteContent: React.FC<Props> = ({ note, size = "small" }) => {
  const theme = useTheme()
  const [image, setImage] = React.useState("")

  if (!note) return null

  const firstNoteUrl = note.content.match(urlRegex)?.find((url) => {
    if (isImage(url)) {
      return false
    }

    return true
  })

  let domain = ""
  if (firstNoteUrl) {
    const url = new URL(firstNoteUrl)
    domain = url.hostname
  }

  const renderNoteContent = React.useCallback((text, i) => {
    if (typeof text === "undefined") {
      return <React.Fragment key={i} />
    }

    if (text === "\n") {
      // Force full width line break
      // This is weird because these text pieces are flex items inside a flex wrap container
      return <View key={i} style={{ width: WINDOW_WIDTH }} />
    }

    if (isImage(text)) {
      return (
        <Pressable
          key={i}
          style={{ width: "100%", height: 150, marginTop: 8 }}
          onPress={() => setImage(text)}
        >
          <Image src={text} />
        </Pressable>
      )
    }

    if (isUrl(text)) {
      return <Link key={text + i} label={text} src={text} size={size} />
    }

    return (
      <Text
        key={i}
        style={{
          fontSize: size === "small" ? 16 : 20,
          flex: 0,
        }}
      >
        {text}
      </Text>
    )
  }, [])

  return (
    <>
      <View style={{ marginTop: 5, paddingRight: 13, flexDirection: "row", flexWrap: "wrap" }}>
        {note.content.split(noteOrUrlRegex).map(renderNoteContent)}
      </View>

      {firstNoteUrl && (
        <LinkPreview
          text={firstNoteUrl}
          renderLinkPreview={(linkPreview) => {
            if (!linkPreview.previewData) {
              return null
            }

            return (
              <View
                style={{
                  backgroundColor: theme["background-basic-color-3"],
                  borderRadius: 10,
                  marginTop: 16,
                }}
              >
                <View
                  style={{
                    width: "100%",
                    height: linkPreview.previewData?.image?.url ? 150 : undefined,
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                  }}
                >
                  {linkPreview.previewData?.image?.url && (
                    <Image
                      src={linkPreview.previewData.image.url}
                      style={{
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        borderBottomLeftRadius: 0,
                        borderBottomRightRadius: 0,
                      }}
                    />
                  )}
                </View>
                <View style={{ padding: 8, flex: 1 }}>
                  {linkPreview.previewData.title && (
                    <Text style={{ flex: 1, fontWeight: "bold" }}>{linkPreview.previewData.title}</Text>
                  )}
                  <Text style={{ paddingTop: 4, paddingBottom: 4 }}>{domain}</Text>
                </View>
              </View>
            )
          }}
        />
      )}

      {image && (
        <ImageView
          animationType="slide"
          presentationStyle="pageSheet"
          images={[{ uri: image }]}
          imageIndex={0}
          visible={!!image}
          onRequestClose={() => setImage(null)}
        />
      )}
    </>
  )
}
