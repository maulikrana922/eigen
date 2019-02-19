import React from "react"
import { View } from "react-native"
import ScrollableTabView from "react-native-scrollable-tab-view"
import styled from "styled-components/native"

import { Schema, screenTrack } from "lib/utils/track"

import ScrollableTabBar, { ScrollableTab } from "lib/Components/ScrollableTabBar"
import renderWithLoadProgress from "lib/utils/renderWithLoadProgress"

import DarkNavigationButton from "lib/Components/Buttons/DarkNavigationButton"
import { Fonts } from "lib/data/fonts"

import Artists from "./Components/Artists"
import ArtistsRenderer from "./Components/Artists/Relay/FavoriteArtists"

import Artworks from "./Components/Artworks"
import ArtworksRenderer from "./Components/Artworks/Relay/FavoriteArtworks"

import Categories from "./Components/Categories"
import CategoriesRenderer from "./Components/Categories/Relay/FavoriteCategories"

import Fairs from "./Components/Fairs"
import FairsRenderer from "./Components/Fairs/Relay/FavoriteFairs"

import Shows from "./Components/Shows"
import ShowsRenderer from "./Components/Shows/Relay/FavoriteShows"

import { gravityURL } from "lib/relay/config"

const Title = styled.Text`
  font-family: ${Fonts.GaramondRegular};
  font-size: 30px;
  text-align: left;
  margin-left: 20px;
  margin-top: 20px;
`

const isStaging = gravityURL.includes("staging")

const WorksTab = 0
const ArtistsTab = 1
const CategoriesTab = 2
const FairsTab = 3
const ShowsTab = 3

interface Props {
  tracking: any
}

@screenTrack({
  context_screen: Schema.PageNames.SavesAndFollows,
  context_screen_owner_type: null,
})
class Favorites extends React.Component<Props, null> {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollableTabView
          onChangeTab={selectedTab => this.fireTabSelectionAnalytics(selectedTab)}
          renderTabBar={props => (
            <View>
              <Title>Saves &amp; Follows</Title>
              <ScrollableTabBar {...props} />
            </View>
          )}
        >
          <ScrollableTab tabLabel="Works">
            <ArtworksRenderer render={renderWithLoadProgress(Artworks)} />
          </ScrollableTab>
          <ScrollableTab tabLabel="Artists">
            <ArtistsRenderer render={renderWithLoadProgress(Artists)} />
          </ScrollableTab>
          <ScrollableTab tabLabel="Categories">
            <CategoriesRenderer render={renderWithLoadProgress(Categories)} />
          </ScrollableTab>
          <ScrollableTab tabLabel="Fairs">
            <FairsRenderer render={renderWithLoadProgress(Fairs)} />
          </ScrollableTab>
          <ScrollableTab tabLabel="Shows">
            <ShowsRenderer render={renderWithLoadProgress(Shows)} />
          </ScrollableTab>
        </ScrollableTabView>
        {isStaging && <DarkNavigationButton title="Warning: on staging, favourites don't migrate" />}
      </View>
    )
  }

  fireTabSelectionAnalytics = selectedTab => {
    let tabType

    if (selectedTab.i === WorksTab) {
      tabType = Schema.ActionNames.SavesAndFollowsWorks
    } else if (selectedTab.i === ArtistsTab) {
      tabType = Schema.ActionNames.SavesAndFollowsArtists
    } else if (selectedTab.i === CategoriesTab) {
      tabType = Schema.ActionNames.SavesAndFollowsCategories
    } else if (selectedTab.i === FairsTab) {
      tabType = Schema.ActionNames.SavesAndFollowsFairs
    } else if (selectedTab.i === ShowsTab) {
      tabType = Schema.ActionNames.SavesAndFollowsShows
    }

    this.props.tracking.trackEvent({
      action_name: tabType,
      action_type: Schema.ActionTypes.Tap,
    })
  }
}

export default Favorites
