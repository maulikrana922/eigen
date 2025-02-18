import OpaqueImageView from "app/Components/OpaqueImageView/OpaqueImageView"
import { navigate } from "app/navigation/navigate"
import { Fair } from "app/Scenes/Map/types"
import { Box, ClassTheme, Flex, Text } from "palette"
import React from "react"
import { Dimensions, TouchableWithoutFeedback } from "react-native"
import styled from "styled-components/native"

export interface Props {
  item: Fair
}

export class TabFairItemRow extends React.Component<Props> {
  handleTap = (item: Fair) => {
    navigate(`/fair/${item.slug}`)
  }

  render() {
    const { item } = this.props
    const fairImage = item.image ? item.image.url : null
    return (
      <ClassTheme>
        {({ space }) => {
          const boxWidth = Dimensions.get("window").width - 62 - space(4) - space(1)
          return (
            <TouchableWithoutFeedback onPress={() => this.handleTap(item)}>
              <Flex flexWrap="nowrap" flexDirection="row" alignItems="center" mr={10}>
                <RoundedImageWrapper>
                  <OpaqueImageView
                    height={58}
                    width={58}
                    imageURL={fairImage! /* STRICTNESS_MIGRATION */}
                  />
                </RoundedImageWrapper>
                <Box width={boxWidth} pl={1}>
                  {!!item.name && (
                    <Text variant="sm" weight="medium" numberOfLines={1} ellipsizeMode="tail">
                      {item.name}
                    </Text>
                  )}
                  {!!item.counts && !!item.counts.partners && (
                    <Text variant="sm" color="black60" numberOfLines={1} ellipsizeMode="tail">
                      {item.counts.partners > 1
                        ? `${item.counts.partners} Exhibitors`
                        : `${item.counts.partners} Exhibitor`}
                    </Text>
                  )}
                  {!!item.exhibition_period && (
                    <Text variant="sm" color="black60" numberOfLines={1} ellipsizeMode="tail">
                      {item.exhibition_period}
                    </Text>
                  )}
                </Box>
              </Flex>
            </TouchableWithoutFeedback>
          )
        }}
      </ClassTheme>
    )
  }
}

const RoundedImageWrapper = styled(Box)`
  width: 58;
  border-radius: 30;
  overflow: hidden;
`
