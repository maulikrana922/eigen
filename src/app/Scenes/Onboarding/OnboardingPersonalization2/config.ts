import { WorkflowEngine } from "app/utils/WorkflowEngine/WorkflowEngine"
import { useRef, useState } from "react"
import { State } from "./Hooks/useOnboardingContext"

interface UseConfig {
  basis: React.RefObject<State>
  onDone(): void
}

export const useConfig = ({ basis, onDone }: UseConfig) => {
  const workflowEngine = useRef(
    new WorkflowEngine({
      workflow: [
        VIEW_WELCOME,
        VIEW_QUESTION_ONE,
        VIEW_QUESTION_TWO,
        VIEW_QUESTION_THREE,
        {
          [DECISION_WHERE_WOULD_YOU_LIKE_TO_DIVE_IN]: {
            [OPTION_TOP_AUCTION_LOTS]: [VIEW_TOP_AUCTION_LOTS],
            [OPTION_A_CURATED_SELECTION_OF_ARTWORKS]: [VIEW_CURATED_ARTWORKS],
            [OPTION_ARTISTS_ON_THE_RISE]: [VIEW_ARTISTS_ON_THE_RISE],
            [OPTION_FOLLOW_ARTISTS_IM_INTERESTED_IN]: [VIEW_FOLLOW_ARTISTS],
            [OPTION_FOLLOW_GALLERIES_I_LOVE]: [VIEW_FOLLOW_GALLERIES],
          },
        },
      ],
      conditions: {
        [DECISION_WHERE_WOULD_YOU_LIKE_TO_DIVE_IN]: () => {
          return basis.current?.questionThree!
        },
      },
    })
  )

  const [current, setCurrent] = useState(workflowEngine.current.current())

  const next = () => {
    if (workflowEngine.current.isEnd()) {
      onDone()
      return
    }

    setCurrent(workflowEngine.current.next())
  }

  const back = () => {
    // > 1 accounts for the welcome screen, which has no place in the data object structure
    // this is done here so as to leave the workflow engine in a neutral, reusable state
    if (workflowEngine.current.position() > 1) {
      setCurrent(workflowEngine.current.back())
    }
  }

  const reset = () => {
    setCurrent(workflowEngine.current.reset())
  }

  return {
    back,
    current,
    workflowEngine: workflowEngine.current,
    next,
    reset,
  }
}

export const OPTION_YES_I_LOVE_COLLECTING_ART = "Yes, I love collecting art"
export const OPTION_NO_IM_JUST_STARTING_OUT = "No, I’m just starting out"

export const OPTION_DEVELOPING_MY_ART_TASTES = "Developing my art tastes"
export const OPTION_KEEP_TRACK_OF_ART = "Keeping track of art I’m interested in"
export const OPTION_FINDING_GREAT_INVESTMENTS = "Finding my next great investment"
export const OPTION_COLLECTING_ART_THAT_MOVES_ME = "Collecting art that moves me"

export const OPTION_TOP_AUCTION_LOTS = "Top auction lots"
export const OPTION_A_CURATED_SELECTION_OF_ARTWORKS = "A curated selection of artworks"
export const OPTION_ARTISTS_ON_THE_RISE = "Artists on the rise"
export const OPTION_FOLLOW_ARTISTS_IM_INTERESTED_IN = "Follow artists I’m interested in"
export const OPTION_FOLLOW_GALLERIES_I_LOVE = "Follow galleries I love"
export const OPTION_MY_FAVORITE_ARTISTS = "My favorite artists"

export const VIEW_WELCOME = "VIEW_WELCOME"
export const VIEW_QUESTION_ONE = "VIEW_QUESTION_ONE"
export const VIEW_QUESTION_TWO = "VIEW_QUESTION_TWO"
export const VIEW_QUESTION_THREE = "VIEW_QUESTION_THREE"

export const VIEW_FOLLOW_ARTISTS = "VIEW_FOLLOW_ARTISTS"
export const VIEW_TOP_AUCTION_LOTS = "VIEW_TOP_AUCTION_LOTS"
export const VIEW_CURATED_ARTWORKS = "VIEW_CURATED_ARTWORKS"
export const VIEW_ARTISTS_ON_THE_RISE = "VIEW_ARTISTS_ON_THE_RISE"
export const VIEW_FOLLOW_GALLERIES = "VIEW_FOLLOW_GALLERIES"

export const DECISION_WHERE_WOULD_YOU_LIKE_TO_DIVE_IN = "DECISION_WHERE_WOULD_YOU_LIKE_TO_DIVE_IN"
