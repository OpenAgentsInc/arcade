/* eslint-disable @typescript-eslint/no-empty-function */
import React from "react"
import { render } from "@testing-library/react"
import App from "./App"

test("renders", () => {
  render(<App hideSplashScreen={() => {}} />)
})
