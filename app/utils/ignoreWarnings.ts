/**
 * Ignore some yellowbox warnings. Some of these are for deprecated functions
 * that we haven't gotten around to replacing yet.
 */
import { LogBox } from "react-native"

// prettier-ignore
LogBox.ignoreLogs([
  "Require cycle:",
  "FlashList",
  "Cannot read property",
  "nostr-tools:",
  "[🍉] The writer",
  "Possible Unhandled Promise"
])
