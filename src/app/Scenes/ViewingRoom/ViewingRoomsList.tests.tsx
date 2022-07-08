import { flushPromiseQueue } from "app/tests/flushPromiseQueue"
import { renderWithWrappersLEGACY } from "app/tests/renderWithWrappers"
import { RelayEnvironmentProvider } from "react-relay"
import { createMockEnvironment, MockPayloadGenerator } from "relay-test-utils"
import { ViewingRoomsListItem } from "./Components/ViewingRoomsListItem"
import { ViewingRoomsListScreen } from "./ViewingRoomsList"

describe("ViewingRoomsList", () => {
  let mockEnvironment: ReturnType<typeof createMockEnvironment>
  const TestRenderer = () => (
    <RelayEnvironmentProvider environment={mockEnvironment}>
      <ViewingRoomsListScreen />
    </RelayEnvironmentProvider>
  )

  beforeEach(() => {
    mockEnvironment = createMockEnvironment()
  })

  it("renders viewing rooms", async () => {
    const tree = renderWithWrappersLEGACY(<TestRenderer />)

    mockEnvironment.mock.resolveMostRecentOperation((operation) =>
      MockPayloadGenerator.generate(operation, {
        Query: () => ({
          viewingRooms: {
            edges: [
              { node: { title: "one", status: "live" } },
              { node: { title: "two", status: "live" } },
              { node: { title: "three", status: "closed" } },
              { node: { title: "four", status: "sheduled" } },
            ],
          },
        }),
      })
    )

    await flushPromiseQueue()

    expect(tree.root.findAllByType(ViewingRoomsListItem).length).toBeGreaterThanOrEqual(2)
  })
})
