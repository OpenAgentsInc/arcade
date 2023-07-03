/**
 * React component for providing a blurred popup menu.
 */
import {
  Canvas,
  makeImageFromView,
  Image,
  useValue,
  useComputedValue,
  rect,
  Blur,
  SkImage,
  runTiming,
  useValueEffect,
} from "@shopify/react-native-skia"
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { View, StyleSheet, TouchableOpacity, ViewProps, ViewStyle } from "react-native"

import Animated, {
  MeasuredDimensions,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"
import { Text } from "../Text"
import { BlurredPopupContext, PopupAlignment, PopupOptionType } from "./BlurredContext"

/**
 * Represents the layout properties of the menu.
 */
type MenuLayout = {
  backgroundColor?: string
  titleColor?: string
  listItemHeight?: number
}

/**
 * Represents the properties of the BlurredPopupProvider component.
 */
type BlurredPopupProviderProps = {
  children?: React.ReactNode
  menuLayout?: MenuLayout
  maxBlur?: number
}

// Define default menu layout
const DEFAULT_MENU_LAYOUT: Required<MenuLayout> = {
  backgroundColor: "rgba(255,255,255,0.75)",
  titleColor: "black",
  listItemHeight: 50,
}

/**
 * The `BlurredPopupProvider` component wraps the main content of the application and provides a popup menu functionality with a blurred background effect.
 * It uses Skia for image manipulation and Reanimated for animations.
 */
const BlurredPopupProvider: React.FC<BlurredPopupProviderProps> = ({
  children,
  menuLayout: menuLayoutProp,
  maxBlur = 10,
}) => {
  // State variables
  // Image: Skia Image (It's basically a screenshot of the current rendered View)
  // Node: Is the component that is triggering the Popup (or a custom version of it named "highlightedChildren")
  // Layout: Node Measured Dimensions
  // Options: The Popup Menu Options
  const [params, setParams] = useState<{
    image: SkImage
    node: React.ReactNode
    layout: MeasuredDimensions
    options?: PopupOptionType[]
  } | null>(null)

  const menuVisible = useSharedValue(false)
  const menuOpacity = useDerivedValue(() => {
    return withTiming(menuVisible.value ? 1 : 0)
  })

  const image = useMemo(() => {
    if (!params) return null
    return params.image
  }, [params])

  const options = useMemo(() => {
    if (!params) return []
    return params.options
  }, [params])

  // This Ref is needed in order to apply a ScreenShot to the RenderedView
  // The following snapshot is going to be a Skia Image (and it will be possible to apply Blur on it through the Skia Thread)
  const mainView = useRef(null)

  /**
   * Show the popup menu with the provided parameters.
   */
  const showPopup = useCallback(
    async ({
      node,
      layout,
      options,
    }: {
      node: React.ReactNode
      layout: MeasuredDimensions
      options: PopupOptionType[]
    }) => {
      // Applying the Snapshot and setting the Popup Params
      const skImage = await makeImageFromView(mainView)
      setParams({ image: skImage, node, layout, options })
      menuVisible.value = true
    },
    [],
  )

  // Defining the CanvasSize Skia Value
  // The effective Canvas dimension is going to be retrieved through the onSize callback (Canvas component)
  const canvasSize = useValue({ width: 0, height: 0 })

  // Just a Skia Value (The "s" is simply a convention)
  const sBlurValue = useValue(0)

  const sLightBlurValue = useComputedValue(() => {
    return sBlurValue.current / 3
  }, [sBlurValue])

  const dismissBlurredPopup = useCallback(() => {
    runTiming(sBlurValue, 0, {
      duration: 200,
    })
  }, [])

  // When the blur value is 0, the popup shouldn't be visible anymore
  useValueEffect(sBlurValue, (value) => {
    if (value === 0) {
      setParams(null)
    }
  })

  /**
   * Close the popup menu.
   */
  const close = useCallback(() => {
    menuVisible.value = false
    setTimeout(() => {
      dismissBlurredPopup()
    }, 200)
  }, [])

  useEffect(() => {
    // Animate the blur when the image changes
    if (image != null) {
      runTiming(sBlurValue, maxBlur, {
        duration: 200,
      })
    }
  }, [image])

  // Computed values
  const imageRect = useComputedValue(() => {
    return rect(0, 0, canvasSize.current.width, canvasSize.current.height)
  }, [canvasSize])

  // Recomputes the position of the Node Style (by using the MeasuredDimension)
  const nodeStyle = useMemo(() => {
    if (!params) return { opacity: 0 } as ViewStyle
    const { pageX, pageY, width, height } = params.layout
    return {
      position: "absolute",
      top: pageY,
      left: pageX,
      width,
      height,
      opacity: 1,
    } as ViewStyle
  }, [params])

  const hasParams = params != null
  // The MenuAnimatedProps is responsible for disabling the touch events on the main view
  // when the popup is visible (and vice versa)
  const menuAnimatedProps = useAnimatedProps(() => {
    return {
      pointerEvents: hasParams ? "auto" : "none",
    } as Partial<ViewProps>
  }, [hasParams])

  // The CanvasStyle is responsible for hiding the Canvas when the popup is not visible
  // The Canvas will simply contain the blurred image (and it will be visible only when the popup is visible)
  const canvasStyle = useMemo(() => {
    return {
      ...StyleSheet.absoluteFillObject,
      zIndex: image ? 100 : -10,
      backgroundColor: "transparent",
    }
  }, [image])

  const menuLayout = useMemo(() => {
    return { ...DEFAULT_MENU_LAYOUT, ...menuLayoutProp }
  }, [])

  const popupItems = options.length
  const popupHeight = menuLayout.listItemHeight * popupItems

  // The PopupStyle is responsible for positioning the Popup Menu
  const popupStyle = useMemo(() => {
    if (!params) return {} as ViewStyle
    const { pageX, pageY, width, height } = params.layout

    // The popup will be positioned on the top or bottom of the Node (depending on the available space)
    const yAlignment = canvasSize.current.height - pageY - popupHeight < 100 ? "top" : "bottom"
    // The popup will be positioned on the left or right of the Node (depending on the available space)
    const xAlignment = canvasSize.current.width - pageX > 200 ? "left" : "right"

    const alignment: PopupAlignment = `${yAlignment}-${xAlignment}` as PopupAlignment

    const x = alignment.includes("right") ? width : pageX
    const y = alignment.includes("bottom") ? pageY + height : pageY - popupHeight
    const additionalYSpace = 5 * (yAlignment === "top" ? -1 : 1)

    return {
      position: "absolute",
      top: y + additionalYSpace,
      height: popupHeight,
      [xAlignment]: x,
    } as ViewStyle
  }, [params, popupHeight])

  const rMenuPopupStyle = useAnimatedStyle(() => {
    return {
      opacity: menuOpacity.value,
    }
  })

  // Render the component
  return (
    <>
      <BlurredPopupContext.Provider value={{ showPopup }}>
        <Animated.View animatedProps={menuAnimatedProps} style={styles.mainPopupContainerView}>
          <Animated.View style={[popupStyle, styles.popup, rMenuPopupStyle]}>
            {params?.image == null || popupItems == null ? (
              // If the image is not available or the popup items are not available, we don't render the popup
              // But we still need to render the View in order to avoid the Swap of zIndex priorities
              <></>
            ) : (
              options.map(({ leading, trailing, label, onPress }, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      close()
                      onPress?.()
                    }}
                    activeOpacity={0.9}
                    key={index}
                    style={[
                      {
                        height: menuLayout.listItemHeight,
                        backgroundColor: menuLayout.backgroundColor,
                      },
                      styles.popupListItem,
                    ]}
                  >
                    {leading}
                    <Text style={[{ color: menuLayout.titleColor }, styles.title]}>{label}</Text>
                    <View style={styles.fill} />
                    {trailing}
                  </TouchableOpacity>
                )
              })
            )}
          </Animated.View>
          <>
            <View style={styles.popupBackground} onTouchEnd={close} />
            <View style={[nodeStyle, styles.nodeZ]}>{Boolean(params?.image) && params?.node}</View>
          </>
        </Animated.View>
        <Canvas onSize={canvasSize} style={canvasStyle} onTouchEnd={close}>
          {image && (
            <>
              <Image rect={imageRect} image={image}>
                <Blur blur={sLightBlurValue} />
              </Image>
              <Image rect={imageRect} image={image}>
                <Blur blur={sBlurValue} />
              </Image>
            </>
          )}
        </Canvas>
        {/* The main content of the application */}
        <View ref={mainView} style={styles.fill}>
          {children}
        </View>
      </BlurredPopupContext.Provider>
    </>
  )
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  mainPopupContainerView: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 500,
  },
  nodeZ: {
    zIndex: -30,
  },
  popup: {
    borderRadius: 5,
    overflow: "hidden",
    zIndex: 20,
  },
  popupBackground: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -20,
  },
  popupListItem: {
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  title: {
    marginLeft: 5,
    marginRight: 10,
  },
})

export { BlurredPopupProvider }
