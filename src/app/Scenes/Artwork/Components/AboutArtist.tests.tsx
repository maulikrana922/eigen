import { ArtworkFixture } from "app/__fixtures__/ArtworkFixture"
import { renderWithWrappers } from "app/tests/renderWithWrappers"
import { AboutArtist } from "./AboutArtist"

describe("AboutArtist", () => {
  it("renders about artist correctly for one artist", () => {
    const { queryByText } = renderWithWrappers(<AboutArtist artwork={ArtworkFixture as any} />)

    expect(queryByText("About the artist")).toBeTruthy()
    expect(queryByText("Abbas Kiarostami")).toBeTruthy()
  })

  it("renders about artist correctly for more than one artists", () => {
    const artworkMultipleArtists = {
      ...ArtworkFixture,
      artists: ArtworkFixture.artists.concat(ArtworkFixture.artists),
    }
    const { queryAllByText, queryByText } = renderWithWrappers(
      <AboutArtist artwork={artworkMultipleArtists as any} />
    )

    expect(queryByText("About the artists")).toBeTruthy()
    expect(queryAllByText("Abbas Kiarostami")).toHaveLength(2)
  })
})
