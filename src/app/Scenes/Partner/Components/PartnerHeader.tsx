import { PartnerHeader_partner$data } from "__generated__/PartnerHeader_partner.graphql"
import { PartnerBanner } from "app/Components/PartnerBanner"
import { Stack } from "app/Components/Stack"
import { formatLargeNumberOfItems } from "app/utils/formatLargeNumberOfItems"
import { Box, Flex, Text } from "palette"
import { createFragmentContainer, graphql } from "react-relay"
import { PartnerFollowButtonFragmentContainer as FollowButton } from "./PartnerFollowButton"

const PartnerHeader: React.FC<{
  partner: PartnerHeader_partner$data
}> = ({ partner }) => {
  const eligibleArtworks = partner.counts?.eligibleArtworks ?? 0

  const galleryBadges = ["Black Owned", "Women Owned"]

  const eligibleCategories = (partner.categories || []).filter(Boolean)

  const categoryNames: string[] = eligibleCategories.map((category) => category?.name || "")
  const firstEligibleBadgeName: string | undefined = galleryBadges.find((badge) =>
    categoryNames.includes(badge)
  )

  return (
    <>
      <Box px={2} pb={1} pt={6}>
        <Text variant="lg" mb={1}>
          {partner.name}
        </Text>
        <Flex flexDirection="row" justifyContent="space-between" alignItems="center">
          <Stack spacing={0.5}>
            {!!eligibleArtworks && (
              <Text variant="sm">
                {!!eligibleArtworks && formatLargeNumberOfItems(eligibleArtworks, "work", "works")}
              </Text>
            )}
          </Stack>
          {!!partner.profile && (
            <Flex flexGrow={0} flexShrink={0}>
              <FollowButton partner={partner} />
            </Flex>
          )}
        </Flex>
      </Box>
      {firstEligibleBadgeName && <PartnerBanner bannerText={firstEligibleBadgeName} />}
    </>
  )
}

export const PartnerHeaderContainer = createFragmentContainer(PartnerHeader, {
  partner: graphql`
    fragment PartnerHeader_partner on Partner {
      name
      profile {
        # Only fetch something so we can see if the profile exists.
        name
      }
      categories {
        name
      }
      counts {
        eligibleArtworks
      }
      ...PartnerFollowButton_partner
    }
  `,
})
