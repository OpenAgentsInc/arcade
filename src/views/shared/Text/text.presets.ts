import { TextStyle } from 'react-native'
import { color, spacing, typography } from '../../theme'

/**
 * All text will start off looking like this.
 */
const BASE: TextStyle = {
  fontFamily: typography.primary,
  color: color.palette.moonRaker, // text,
  fontSize: 15,
  lineHeight: 22,
}

const SECONDARY: TextStyle = {
  ...BASE,
  color: '#777', // color.palette.arwesFader, // blueBell, // color.dim,
}

/**
 * All the variations of text styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const presets = {
  /**
   * The default text styles.
   */
  default: BASE,

  /**
   * A bold version of the default text.
   */
  bold: { ...BASE, fontFamily: typography.bold } as TextStyle,

  /**
   * A super bold version of the default text.
   */
  superBold: { ...BASE, fontFamily: typography.bold } as TextStyle,

  /**
   * Header text.
   */
  header: { ...BASE, fontFamily: typography.bold, lineHeight: 16 } as TextStyle,

  /**
   * Large bold headers.
   */
  title: {
    ...BASE,
    fontSize: 28,
    lineHeight: 34,
    marginVertical: spacing[2],
    fontFamily: typography.bold,
    // fontWeight: '900' // iOS. Need separate handling for Android
  } as TextStyle, // fontWeight: '900',

  /**
   * Medium/large, non-bold
   */
  title2: {
    ...BASE,
    fontSize: 22,
    lineHeight: 28,
    marginVertical: spacing[2],
  } as TextStyle,

  title3: {
    ...BASE,
    fontSize: 24,
    lineHeight: 28,
    marginVertical: spacing[2],
    fontFamily: typography.bold,
    // fontWeight: '900' // iOS. Need separate handling for Android
  }, // fontWeight: '900',

  /**
   * Description text that shows up below titles.
   */
  description: { ...SECONDARY, marginBottom: spacing[5] - 2 } as TextStyle,

  descriptionSlim: { ...SECONDARY, fontFamily: typography.secondary },

  /**
   * Labels that appear on forms above the inputs or on buttons.
   */
  label: { ...BASE, fontFamily: typography.bold } as TextStyle, // lineHeight: 16,

  /**
   * Labels that appear on forms above the inputs or on buttons.
   * dori TODO: WHEN CONCATENATE PRESET + STYLE RECEIVE ARRAY INDEX like { "0": color...}
   * is why we create new presetes
   */
  labelCancel: {
    ...BASE,
    lineHeight: 16,
    fontFamily: typography.bold,
    color: color.error,
  } as TextStyle, //

  /**
   * Labels that appear on forms above the inputs or on buttons.
   * dori TODO: WHEN CONCATENATE PRESET + STYLE RECEIVE ARRAY INDEX like { "0": color...}
   * is why we create new presetes
   */
  labelAccept: {
    ...BASE,
    lineHeight: 16,
    fontFamily: typography.bold,
    color: color.primary,
  } as TextStyle, //

  /**
   * Labels that appear on secondary buttons.
   */
  secondaryLabel: {
    color: color.secondaryText,
    fontSize: 16,
    lineHeight: 30,
  } as TextStyle,

  /**
   * Section header text.
   */
  sectionHeader: {
    ...SECONDARY,
    fontSize: 13,
    lineHeight: 14,
    fontFamily: typography.bold,
    letterSpacing: 1,
    marginBottom: spacing[2],
  } as TextStyle, //

  /**
   * Appears below the form field when there is a problem.
   */
  error: {
    ...BASE,
    fontSize: 12,
    lineHeight: 14,
    color: color.error,
    marginTop: spacing[2],
  } as TextStyle,

  /**
   * Link text.
   */
  link: {
    ...BASE,
    color: color.link,
    fontFamily: typography.bold,
  } as TextStyle, // fontWeight: '500',

  /**
   * Small secondary text.
   */
  small: {
    ...SECONDARY,
    fontSize: 11,
    lineHeight: 14,
    color: color.palette.moonRaker,
  } as TextStyle,

  /**
   * Detail secondary text.
   */
  detail: {
    ...BASE,
    fontSize: 9,
    lineHeight: 11,
    fontFamily: typography.bold,
  } as TextStyle, // fontWeight: '900',
}

/**
 * A list of preset names.
 */
export type TextPresetNames = keyof typeof presets
