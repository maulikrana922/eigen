import { navigate } from "app/navigation/navigate"
import { useFeatureFlag } from "app/store/GlobalStore"
import { AddIcon, Box } from "palette"
import { TouchableOpacity } from "react-native"
import { useScreenDimensions } from "shared/hooks"

const CAMERA_ICON_CONTAINER_SIZE = 40
const CAMERA_ICON_SIZE = 20

interface SearchImageHeaderButtonProps {
  isImageSearchButtonVisible: boolean
}

export const SearchImageHeaderButton: React.FC<SearchImageHeaderButtonProps> = ({
  isImageSearchButtonVisible,
}) => {
  const isImageSearchEnabled = useFeatureFlag("AREnableImageSearch")

  if (!isImageSearchButtonVisible || !isImageSearchEnabled) {
    return null
  }

  const handleSearchPress = () => {
    return navigate("/reverse-image")
  }

  return (
    <TouchableOpacity
      accessibilityLabel="Search by image"
      style={{
        position: "absolute",
        // the margin top here is the exact same as src/app/navigation/BackButton
        // in order to align the back button with the search button
        top: 13 + useScreenDimensions().safeAreaInsets.top,
        right: 12,
      }}
      onPress={handleSearchPress}
    >
      <Box
        width={CAMERA_ICON_CONTAINER_SIZE}
        height={CAMERA_ICON_CONTAINER_SIZE}
        borderRadius={CAMERA_ICON_CONTAINER_SIZE / 2}
        bg="white"
        justifyContent="center"
        alignItems="center"
      >
        <AddIcon width={CAMERA_ICON_SIZE} height={CAMERA_ICON_SIZE} />
      </Box>
    </TouchableOpacity>
  )
}
