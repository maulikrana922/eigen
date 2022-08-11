import {
  OPTION_A_CURATED_SELECTION_OF_ARTWORKS,
  OPTION_ARTISTS_ON_THE_RISE,
  OPTION_FOLLOW_ARTISTS_IM_INTERESTED_IN,
  OPTION_FOLLOW_GALLERIES_I_LOVE,
  OPTION_TOP_AUCTION_LOTS,
} from "../config"
import { useOnboardingContext } from "./useOnboardingContext"

const screenNames = {
  OnboardingArtistsOnTheRise: "OnboardingArtistsOnTheRise",
  OnboardingCuratedArtworks: "OnboardingCuratedArtworks",
  OnboardingTopAuctionLots: "OnboardingTopAuctionLots",
  OnboardingFollowArtists: "OnboardingFollowArtists",
  OnboardingFollowGalleries: "OnboardingFollowGalleries",
}

export const useNextOnboardingScreen = () => {
  const { state } = useOnboardingContext()
  switch (state.questionThree) {
    case OPTION_TOP_AUCTION_LOTS:
      return screenNames.OnboardingTopAuctionLots

    case OPTION_A_CURATED_SELECTION_OF_ARTWORKS:
      return screenNames.OnboardingCuratedArtworks

    case OPTION_ARTISTS_ON_THE_RISE:
      return screenNames.OnboardingArtistsOnTheRise

    case OPTION_FOLLOW_ARTISTS_IM_INTERESTED_IN:
      return screenNames.OnboardingFollowArtists

    case OPTION_FOLLOW_GALLERIES_I_LOVE:
      return screenNames.OnboardingFollowGalleries
  }
}

// Loading screens??
