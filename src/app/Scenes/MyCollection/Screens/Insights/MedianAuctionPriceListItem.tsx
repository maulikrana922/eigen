import { MedianAuctionPriceRail_me$data } from "__generated__/MedianAuctionPriceRail_me.graphql"
import OpaqueImageView from "app/Components/OpaqueImageView/OpaqueImageView"
import { useFeatureFlag } from "app/store/GlobalStore"
import { Flex, NoArtworkIcon, Text, Touchable, useColor } from "palette"

export type MedianSalePriceArtwork = NonNullable<
  NonNullable<NonNullable<MedianAuctionPriceRail_me$data["priceInsightUpdates"]>["edges"]>[0]
>["node"]

interface Props {
  artworks: MedianSalePriceArtwork[]
  onPress?: () => void
}

export const MedianAuctionPriceListItem: React.FC<Props> = ({ artworks, onPress }) => {
  const color = useColor()
  const enableMyCollectionInsightsMedianPrice = useFeatureFlag(
    "AREnableMyCollectionInsightsMedianPrice"
  )

  const artist = artworks[0]?.artist

  return (
    <Flex>
      <Touchable disabled={!onPress} underlayColor={color("black5")} onPress={onPress}>
        <Flex mx={2} flexDirection="row" alignItems="center">
          <Flex
            width={40}
            height={40}
            borderRadius={20}
            backgroundColor="black10"
            alignItems="center"
            justifyContent="center"
            overflow="hidden"
            style={{ marginTop: 3 }}
          >
            {!!artist?.imageUrl ? (
              <OpaqueImageView width={40} height={40} imageURL={artist?.imageUrl} />
            ) : (
              <NoArtworkIcon width={20} height={20} opacity={0.3} />
            )}
          </Flex>
          <Flex pl={15}>
            <Text variant="xs" ellipsizeMode="middle">
              {artist?.name}
            </Text>
            <Text variant="xs" ellipsizeMode="middle" color="black60">
              {artist?.formattedNationalityAndBirthday}
            </Text>
          </Flex>
        </Flex>
      </Touchable>
      {artworks.map((artwork) => (
        <Flex
          key={artwork?.internalID}
          mx={2}
          pt={2}
          flexDirection="row"
          justifyContent="space-between"
        >
          <Flex flex={1} pr={15}>
            <Text variant="xs">{artwork?.medium}</Text>
          </Flex>
          <Flex alignItems="flex-end">
            <Text variant="xs" weight="medium">
              {enableMyCollectionInsightsMedianPrice
                ? artwork?.marketPriceInsights?.medianSalePriceDisplayText
                : artwork?.marketPriceInsights?.averageSalePriceDisplayText}
            </Text>
          </Flex>
        </Flex>
      ))}
    </Flex>
  )
}
