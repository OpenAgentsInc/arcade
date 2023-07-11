import { colors } from "app/theme"
import { View, StyleSheet } from "react-native"
import Animated, { useAnimatedStyle, useDerivedValue, withTiming } from "react-native-reanimated"
import { Icon } from "./Icon"
import ReText from "./ReText"
import React from "react"
import { TouchableFeedback } from "./TouchableFeedback"

export type ReplyInfo = {
  id: string
  sender: string
  content: string
}

type DirectMessageReplyProps = {
  replyInfo: Animated.SharedValue<ReplyInfo | null>
  height?: number
}

const DirectMessageReply: React.FC<DirectMessageReplyProps> = ({ replyInfo, height = 60 }) => {
  // This progress will be used to animate all the components inside the reply container
  const progress = useDerivedValue(() => {
    return withTiming(replyInfo.value ? 1 : 0)
  })

  const rResponseContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      height: progress.value * height,
    }
  }, [height])

  const senderText = useDerivedValue(() => {
    return replyInfo.value?.sender || ""
  })

  const contentText = useDerivedValue(() => {
    return replyInfo.value?.content || ""
  })

  return (
    <Animated.View
      style={[
        {
          height,
        },
        styles.container,
        rResponseContainerStyle,
      ]}
    >
      <View style={styles.iconContainer}>
        <Icon icon="Forward" color={colors.palette.cyan600} size={25} />
      </View>
      <View style={styles.textContainer}>
        {/* 
          Using ReText instead of common Text is definitely useful since the TextUpdate 
          won't rely on the React render cycle but on the Reanimated one.  
        */}
        <ReText text={senderText} style={styles.title} />
        <ReText text={contentText} style={styles.subtitle} />
      </View>
      <TouchableFeedback
        style={[styles.iconContainer, styles.clearIcon]}
        onPress={() => {
          replyInfo.value = null
        }}
      >
        <Icon icon="X" color={colors.palette.cyan600} size={25} />
      </TouchableFeedback>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  clearIcon: {
    borderRadius: 20,
    marginRight: 5,
  },
  container: {
    backgroundColor: colors.palette.overlay20,
    borderTopColor: colors.palette.cyan900,
    borderTopWidth: 1,
    flexDirection: "row",
    width: "100%",
    zIndex: -10,
  },
  iconContainer: {
    alignItems: "center",
    alignSelf: "center",
    aspectRatio: 1,
    height: "70%",
    justifyContent: "center",
  },
  subtitle: { color: colors.palette.gray },
  textContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  title: { color: colors.palette.cyan600, fontWeight: "600" },
})

export { DirectMessageReply }
