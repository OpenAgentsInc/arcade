import { palette } from './palette'

export const ACTIVE_OPACITY = 0.8

/**
 * Roles for colors.  Prefer using these over the palette.  It makes it easier
 * to change things.
 *
 * The only roles we need to place in here are the ones that span through the app.
 *
 * If you have a specific use-case, like a spinner color.  It makes more sense to
 * put that in the <Spinner /> component.
 */
export const color = {
  /**
   * The palette is available to use, but prefer using the name.
   */
  palette,
  /**
   * A helper for making something see-thru. Use sparingly as many layers of transparency
   * can cause older Android devices to slow down due to the excessive compositing required
   * by their under-powered GPUs.
   */
  transparent: 'rgba(0, 0, 0, 0)',
  /**
   * The screen background.
   */
  background: palette.haiti,
  /**
   * The main tinting color.
   */
  primary: palette.electricIndigo,
  /**
   * The secondary tinting color.
   */
  secondary: palette.moonRaker,
  /**
   * A subtle color used for highlighting info.
   */
  info: palette.portGore,
  /**
   * A subtle color used for borders and lines.
   */
  line: palette.portGore,
  /**
   * A subtle color used for form fields.
   */
  field: palette.portGore,
  //   field: palette.arwesSecondary,
  /**
   * A subtle color used for the tab bar.
   */
  tabbar: palette.portGore,
  /**
   * The default color of text in many components.
   */
  text: palette.moonRaker, // arwes
  /**
   * The color of text in many secondary components.
   */
  secondaryText: palette.minsk,
  /**
   * Secondard information.
   */
  dim: palette.blueBell,
  /**
   * A color to highlight current location.
   */
  origin: palette.electricViolet,
  /**
   * For link text.
   */
  link: palette.electricViolet,
  /**
   * A bright color used to indicate active states.
   */
  active: palette.electricViolet,
  /**
   * A color to highlight destination(s).
   */
  destination: palette.pinkFlamingo,
  /**
   * A color to highlight.
   */
  highlight: palette.pinkFlamingo,
  /**
   * Error messages and icons.
   */
  error: palette.radicalRed,
  /**
   * Shadow color.
   */
  shadow: palette.haiti,
}
