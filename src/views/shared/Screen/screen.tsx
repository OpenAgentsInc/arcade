import { has } from 'ramda'
import * as React from 'react'
import {
    Dimensions, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, View,
    ViewStyle
} from 'react-native'
import { color, spacing } from 'views/theme'
import { isNonScrolling, presets } from './screen.presets'
import { ScreenProps } from './screen.props'

// These magic numbers are harvested from react-navigation.
//
// They have Header.HEIGHT, but have deprecated it because they don't
// have a good way to dynamically acquire the height.
//
// For our app, we are locked to portrait and support SafeView already, so
// it's "safe" to use these.
//
// Watch for the exciting conclusion:
//
//   https://github.com/react-navigation/react-navigation/issues/2411
//
const statusBarHeight = () => {
  const { height, width } = Dimensions.get('window')
  return !(Platform.OS === 'ios')
    ? 0
    : height === 812 || width === 812
    ? 44
    : 20
}
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56
const STATUSBAR_HEIGHT = statusBarHeight()
const HEADER_HEIGHT = APPBAR_HEIGHT + STATUSBAR_HEIGHT

// jeez... when I switched the softInputMode on android, a magical 20 pixel padding was required
// on the offset... yikes.  a quick exploration into react-navigation source code turned up nothing.
const UNEXPLICABLE_PAN_ADJUSTMENT_ON_ANDROID =
  Platform.OS === 'android' ? 20 : 0

const ChatroomScreen = (props: any) => {
  const preset: any = presets[props.preset] || presets.fixed
  const style = { ...preset.nonScroll, ...props.style }

  // outside the app doesn't use a header
  let dockHeight: any =
    (props.preset as any) === 'outsideApp' ? 0 : HEADER_HEIGHT

  // always allow individual screens to override
  if (has('dockHeight', props)) {
    dockHeight = props.dockHeight
  }

  // classic programmers
  dockHeight = dockHeight + UNEXPLICABLE_PAN_ADJUSTMENT_ON_ANDROID

  // no dock, no height, no exceptions
  if (!props.dock) {
    dockHeight = 0
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: color.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={80}
    >
      <View style={style}>
        <SafeAreaView style={{ ...style, paddingHorizontal: spacing[4] }}>
          {props.children}
        </SafeAreaView>
        <SafeAreaView>{props.dock}</SafeAreaView>
      </View>
    </KeyboardAvoidingView>
  )
}

/**
 * This screen does not scroll.
 *
 * @param props The screen props
 */
function ScreenWithoutScrolling(props: ScreenProps) {
  const preset = presets[props.preset] || presets.fixed
  const style = { ...preset.nonScroll, ...props.style }

  return (
    <View style={style}>
      {props.unsafe ? (
        props.children
      ) : (
        <SafeAreaView style={{ ...style, paddingHorizontal: 0 }}>
          {props.children}
        </SafeAreaView>
      )}
    </View>
  )
}

/**
 * This screen scrolls.
 *
 * @param props The screen props
 */
class ScreenWithScrolling extends React.Component<ScreenProps, ScreenState> {
  // scrollToBottom(params = { animated: true }) {
  //   // TODO: move this to a better event once main message view is converted to flatlist
  //   this.refs.screenScroll.scrollToEnd(params)
  // }

  render() {
    const preset = presets[this.props.preset] || presets.scroll
    const outerStyle = preset.scrollOuter
    const innerStyle = {
      ...preset.scrollInner,
      ...this.props.style,
    } as ViewStyle

    // outside the app doesn't use a header
    let dockHeight: number =
      (this.props.preset as any) === 'outsideApp' ? 0 : HEADER_HEIGHT

    // always allow individual screens to override
    if (has('dockHeight', this.props)) {
      dockHeight = this.props.dockHeight || 0
    }

    // classic programmers
    dockHeight = dockHeight + UNEXPLICABLE_PAN_ADJUSTMENT_ON_ANDROID

    // no dock, no height, no exceptions
    if (!this.props.dock) {
      dockHeight = 0
    }

    return (
      <KeyboardAvoidingView
        style={{
          flex: 1,
          backgroundColor: this.props.transparent
            ? 'transparent'
            : color.background,
        }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={80}
      >
        <ScrollView
          // tslint:disable-next-line: jsx-no-string-ref
          // ref="screenScroll"
          nestedScrollEnabled
          // pointerEvents='box-none'
          // ref={(ref) => (global.screen = ref)}
          style={{ ...outerStyle, backgroundColor: 'transparent' }}
          contentContainerStyle={innerStyle}
          keyboardShouldPersistTaps='always'
          {...(this.props.refreshControl && {
            refreshControl: this.props.refreshControl,
          })}
        >
          <SafeAreaView>{this.props.children}</SafeAreaView>
        </ScrollView>
        <SafeAreaView style={{ borderTopWidth: 1, borderTopColor: color.line }}>
          {this.props.dock}
        </SafeAreaView>
      </KeyboardAvoidingView>
    )
  }
}

interface ScreenState {}

/**
 * The starting component on every screen in the app.
 *
 * @param props The screen props
 */
// tslint:disable-next-line: max-classes-per-file
export class Screen extends React.Component<ScreenProps, ScreenState> {
  // export function Screen(props: ScreenProps) {
  render() {
    if (this.props.preset === 'chatroom') {
      return <ChatroomScreen {...this.props} />
    }

    if (isNonScrolling(this.props.preset)) {
      return <ScreenWithoutScrolling {...this.props} />
    }
    // tslint:disable-next-line: jsx-no-string-ref
    return <ScreenWithScrolling {...this.props} ref='sws' />
  }
}
