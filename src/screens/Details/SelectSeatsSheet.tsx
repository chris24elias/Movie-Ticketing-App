import { Box, Center, Pressable, Row, Text, useTheme } from "native-base";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { Image, StyleSheet } from "react-native";
import Animated, {
  Easing,
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeOut,
  Layout,
  SlideInDown,
  useAnimatedStyle,
  withTiming,
  ZoomIn,
} from "react-native-reanimated";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import VideoPlayer from "../../components/VideoPlayer";
import { BlurView } from "expo-blur";

export type ISelectSeatsSheetProps = {
  visible: boolean;
  onBuyTickets;
  trailer;
};

const SelectSeatsSheet = ({
  visible,
  onBuyTickets,
  trailer,
}: PropsWithChildren<ISelectSeatsSheetProps>) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState<{ [x: string]: boolean }>({});

  const onselect = (id) => {
    const copyObj = { ...selected };
    if (copyObj[id]) {
      delete copyObj[id];
    } else {
      copyObj[id] = true;
    }

    setSelected(copyObj);
  };

  if (!visible) return null;

  return (
    <Box
      style={{
        ...StyleSheet.absoluteFillObject,
        zIndex: 1,
        paddingTop: insets.top + 35,
      }}
    >
      <Animated.View exiting={FadeOut}>
        {/* <Box
          mb="6"
          justifyContent="center"
          alignItems="center"
          alignSelf="center"
          h="16"
        >
          <Text>MOVIE INFO HERE</Text>
        </Box> */}

        <Animated.View entering={FadeInDown.delay(350).duration(800)}>
          <Text
            color="white"
            mt="20"
            mb="4"
            fontSize={24}
            fontWeight="semibold"
            alignSelf="center"
          >
            Select seats
          </Text>
        </Animated.View>

        <Box
          style={[
            {
              paddingHorizontal: 15,
              alignSelf: "center",
            },
          ]}
        >
          {new Array(6).fill("x").map((r, i) => {
            const delay = 50 + (6 - i) * 100;
            return (
              <Animated.View
                key={`seatrow${i}`}
                entering={FadeIn.delay(delay)}
                style={{ flexDirection: "row" }}
              >
                {new Array(8).fill("x").map((_, j) => {
                  const id = `row${i}col${j}`;

                  const active = selected[id];
                  return (
                    <Animated.View
                      key={`seatCol${j}`}
                      entering={ZoomIn.delay(delay).duration(400)}
                      style={{
                        marginHorizontal: 6,
                        marginVertical: 5,
                      }}
                    >
                      <Pressable
                        onPress={() => {
                          onselect(id);
                        }}
                      >
                        <Image
                          source={require("../../assets/images/topViewSeat2.png")}
                          style={{
                            height: 32,
                            width: 32,
                            tintColor: active
                              ? theme.colors.lightBlue[300]
                              : "#0e1e4a",
                            transform: [{ rotate: "180deg" }],
                          }}
                          resizeMode="contain"
                        />
                      </Pressable>
                    </Animated.View>
                  );
                })}
              </Animated.View>
            );
          })}
        </Box>

        <Animated.View
          entering={SlideInDown.delay(400)
            .duration(650)
            .easing(Easing.inOut(Easing.ease))}
        >
          <Row
            width="4/6"
            mt="8"
            justifyContent="space-around"
            alignItems="center"
            alignSelf="center"
          >
            <Center>
              <Box
                style={{
                  height: 15,
                  width: 15,
                  backgroundColor: "#0e1e4a",
                  borderRadius: 4,
                }}
              />
              <Text mt="3" color="white" fontWeight="semibold">
                Available
              </Text>
            </Center>
            <Center>
              <Box
                style={{
                  height: 15,
                  width: 15,
                  backgroundColor: theme.colors.lightBlue[300],
                  borderRadius: 4,
                }}
              />
              <Text mt="3" color="white" fontWeight="semibold">
                Selected
              </Text>
            </Center>
            <Center>
              <Box
                style={{
                  height: 15,
                  width: 15,
                  backgroundColor: theme.colors.red[500],
                  borderRadius: 4,
                }}
              />
              <Text mt="3" color="white" fontWeight="semibold">
                Reserved
              </Text>
            </Center>
          </Row>
        </Animated.View>
        <Animated.View
          entering={SlideInDown.delay(500)
            .duration(650)
            .easing(Easing.inOut(Easing.ease))}
        >
          <Row width="full" px="6" mt="10" alignSelf="center">
            <Box mr="6" flex={1}>
              <Text color="muted.500">Total price</Text>
              <Text color="white" fontSize={25} fontWeight="bold">
                $
                {Object.entries(selected).reduce(
                  (acc, [key, val]) => acc + 10,
                  0
                )}
                .00
              </Text>
            </Box>
            <Pressable
              onPress={onBuyTickets}
              alignSelf="center"
              bg="violet.500"
              //   w="full"
              flex={2.5}
              style={{
                height: 55,
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.8,
                shadowRadius: 5.46,
                shadowColor: theme.colors.blue[500],
                elevation: 9,
              }}
              justifyContent="center"
              alignItems="center"
              borderRadius="xl"
            >
              <Text color="white" fontWeight="bold" fontSize={16}>
                BUY TICKETS
              </Text>
            </Pressable>
          </Row>
        </Animated.View>
      </Animated.View>
    </Box>
  );
};

export { SelectSeatsSheet };
