import "react-native"

import { renderWithWrappersLEGACY } from "app/tests/renderWithWrappers"

import SmallList from "./SmallList"

it("renders without throwing an error", () => {
  const show1 = showProps()
  const show2 = showProps()
  show2.partner.name = "A Different Gallery"
  show2.kind = "fair"

  const shows = [show1, show2]

  renderWithWrappersLEGACY(<SmallList shows={shows as any} />)
})

const showProps = () => {
  return {
    href: "artsy.net/show",
    cover_image: {
      url: "artsy.net/image-url",
    },
    kind: "solo",
    name: "Expansive Exhibition",
    exhibition_period: "Jan 1 - March 1",
    status_update: "Closing in 2 days",
    status: "running",
    partner: {
      name: "Gallery",
    },
    location: {
      city: "Berlin",
    },
  }
}
