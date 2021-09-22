import { useNetInfo } from "@react-native-community/netinfo"
import NetInfo from "@react-native-community/netinfo"
import { useScreenDimensions } from "lib/utils/useScreenDimensions"
import { Button, Flex, Spacer, Text } from "palette"
import React, { useState } from "react"
import { Modal } from "react-native"

interface NetworkAwareProviderProps {
  children: React.ReactChild | React.ReactChildren
}

export const NetworkAwareProvider: React.FC<NetworkAwareProviderProps> = ({ children }) => {
  const [isDismissed, setIsDismissed] = useState(false)
  const { safeAreaInsets } = useScreenDimensions()
  const netInfo = useNetInfo()

  return (
    <Flex flex={1}>
      {children}
      <Modal
        visible={!netInfo.isConnected && !isDismissed}
        statusBarTranslucent
        transparent
        animationType="fade"
        hardwareAccelerated
        presentationStyle="overFullScreen"
      >
        <Flex flex={1} justifyContent="flex-end" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <Flex backgroundColor="white" alignItems="center" px={2} py={2} paddingBottom={safeAreaInsets.bottom + 20}>
            <Text textAlign="center" variant="largeTitle">
              Connection Error
            </Text>

            <Spacer mt={1} />

            <Text textAlign="center" variant="text" color="black60">
              Oops! Looks like your device is not connected to the Internet.
            </Text>

            <Spacer mt={2} />

            <Button
              block
              onPress={async () => {
                // Sometimes netinfo doesn't capture network changes so we need to trigger it manually
                await NetInfo.fetch()
              }}
            >
              Try Again
            </Button>
            <Button
              block
              onPress={() => {
                setIsDismissed(true)
              }}
              variant="outline"
              mt={1}
            >
              Dismiss
            </Button>
          </Flex>
        </Flex>
      </Modal>
    </Flex>
  )
}