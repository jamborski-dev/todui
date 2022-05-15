import { capitalize } from "../helpers"

test("capitalize return correct format", () => {
  expect(capitalize("some string")).toBe("Some String")
  expect(capitalize("tHis IS tESt")).toBe("This Is Test")
  expect(capitalize("MY TEXT")).not.toBe("my text")
  expect(capitalize("woRd")).toBe("Word")
})
