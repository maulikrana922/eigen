import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack"
import { GlobalStore } from "app/store/GlobalStore"
import { ArtworkScreen } from "./ArtworkScreen"
import { OnboardingProvider } from "./Hooks/useOnboardingContext"
import { useUpdateUserProfile } from "./Hooks/useUpdateUserProfile"
import { OnboardingArtistsOnTheRise } from "./OnboardingArtistsOnTheRise"
import { OnboardingCuratedArtworks } from "./OnboardingCuratedArtworks"
import { OnboardingFollowArtists } from "./OnboardingFollowArtists"
import { OnboardingFollowGalleries } from "./OnboardingFollowGalleries"
import { OnboardingPersonalizationWelcome } from "./OnboardingPersonalizationWelcome"
import { OnboardingPostFollowLoadingScreen } from "./OnboardingPostFollowLoadingScreen"
import { OnboardingQuestionOne } from "./OnboardingQuestionOne"
import { OnboardingQuestionThree } from "./OnboardingQuestionThree"
import { OnboardingQuestionTwo } from "./OnboardingQuestionTwo"
import { OnboardingTopAuctionLots } from "./OnboardingTopAuctionLots"

// tslint:disable-next-line:interface-over-type-literal
export type OnboardingNavigationStack = {
  OnboardingPersonalizationWelcome: undefined
  OnboardingQuestionOne: undefined
  OnboardingQuestionTwo: undefined
  OnboardingQuestionThree: undefined
  OnboardingArtistsOnTheRise: undefined
  OnboardingCuratedArtworks: undefined
  OnboardingTopAuctionLots: undefined
  OnboardingFollowArtists: undefined
  OnboardingFollowGalleries: undefined
  OnboardingPostFollowLoadingScreen: undefined
  ArtworkScreen: { artworkID: string }
}

const StackNavigator = createStackNavigator<OnboardingNavigationStack>()

export const OnboardingNavigationContainer = () => {
  const onDone = () => GlobalStore.actions.auth.setState({ onboardingState: "complete" })

  const { commitMutation } = useUpdateUserProfile(onDone)

  const handleDone = () => {
    commitMutation({
      completedOnboarding: true,
    })
  }

  return (
    <OnboardingProvider onDone={handleDone}>
      <NavigationContainer independent>
        <StackNavigator.Navigator
          screenOptions={{
            ...TransitionPresets.DefaultTransition,
            headerShown: false,
            headerMode: "screen",
          }}
        >
          <StackNavigator.Screen
            name="OnboardingPersonalizationWelcome"
            component={OnboardingPersonalizationWelcome}
          />
          <StackNavigator.Screen name="OnboardingQuestionOne" component={OnboardingQuestionOne} />
          <StackNavigator.Screen name="OnboardingQuestionTwo" component={OnboardingQuestionTwo} />
          <StackNavigator.Screen
            name="OnboardingQuestionThree"
            component={OnboardingQuestionThree}
          />
          <StackNavigator.Screen
            name="OnboardingTopAuctionLots"
            component={OnboardingTopAuctionLots}
          />
          <StackNavigator.Screen
            name="OnboardingArtistsOnTheRise"
            component={OnboardingArtistsOnTheRise}
          />
          <StackNavigator.Screen
            name="OnboardingCuratedArtworks"
            component={OnboardingCuratedArtworks}
          />
          <StackNavigator.Screen
            name="OnboardingFollowArtists"
            component={OnboardingFollowArtists}
          />
          <StackNavigator.Screen
            name="OnboardingFollowGalleries"
            component={OnboardingFollowGalleries}
          />
          <StackNavigator.Screen
            name="OnboardingPostFollowLoadingScreen"
            component={OnboardingPostFollowLoadingScreen}
          />
          <StackNavigator.Screen name="ArtworkScreen" component={ArtworkScreen} />
        </StackNavigator.Navigator>
      </NavigationContainer>
    </OnboardingProvider>
  )
}
