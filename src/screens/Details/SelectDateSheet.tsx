import { LinearGradient } from "expo-linear-gradient";
import {
  Box,
  Center,
  Column,
  Divider,
  Heading,
  Row,
  Text,
  useTheme,
  Pressable,
} from "native-base";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { LayoutAnimation, useWindowDimensions, View } from "react-native";
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { AntDesign } from "@expo/vector-icons";
import moment from "moment";
import VideoPlayer from "../../components/VideoPlayer";

export type ISelectDateSheetProps = {
  visible: boolean;
};

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

const generateDays = (num) => {
  const date = new Date();
  let arr = [];
  for (let i = 0; i < num; i++) {
    let newDate = addDays(date, i);
    arr.push({
      date: newDate,
    });
  }
  return arr;
};

const DAYS = generateDays(5);

const TIMES = ["11.00", "13.30", "16.00", "18.30", "21.00"];

const SelectDateSheet = ({
  visible,
  trailer,
}: PropsWithChildren<ISelectDateSheetProps>) => {
  const { height } = useWindowDimensions();
  const [selected, setSelected] = useState(-1);
  const [timeSelected, setTimeSelected] = useState(-1);

  const containerHeight = height * 0.87;
  const translateY = useSharedValue(containerHeight + 150);
  const theme = useTheme();

  useEffect(() => {
    const timingConfig = !visible
      ? {
          easing: Easing.inOut(Easing.ease),
          duration: 300,
        }
      : {
          easing: Easing.out(Easing.circle),
          duration: 400,
        };
    translateY.value = withTiming(
      visible ? 0 : containerHeight + 150,
      timingConfig
    );
  }, [visible]);

  const style = useAnimatedStyle(() => {
    return {
      position: "absolute",
      width: "100%",
      height: containerHeight,
      bottom: 0,
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <Animated.View style={style}>
      <LinearGradient
        // Background Linear Gradient
        colors={["#0575E6", "#021B79"]}
        style={{
          flex: 1,
          borderTopLeftRadius: 35,
          borderTopRightRadius: 35,
          overflow: "hidden",
        }}
        //   end={{ x: 0.5, y: 0.3 }}
      >
        <Box
          style={{
            flex: 1,
            // justifyContent: "center",
            // alignItems: "center",
          }}
          py="4"
          px="4"
        >
          <Heading alignSelf="center" color="white">
            Select date and time
          </Heading>
          <Box mt="4">
            <VideoPlayer video={trailer} size={200} playing={visible} />{" "}
          </Box>

          <Text color="white" mt="2" fontSize="lg" fontWeight="bold">
            Movie Title Trailer
          </Text>
          <Row my="5" justifyContent="center" alignItems="center">
            <AntDesign name="calendar" color="white" size={22} />
            <Text
              ml="3"
              fontSize="lg"
              textDecorationLine="underline"
              color="white"
            >
              December 2022
            </Text>
          </Row>

          <Row space="4" mt="2" alignSelf="center">
            {DAYS.map(({ date }, i) => {
              return (
                <DayView
                  key={`day_${i}`}
                  date={date}
                  onPress={() => {
                    LayoutAnimation.configureNext({
                      ...LayoutAnimation.Presets.easeInEaseOut,
                      duration: 200,
                    });
                    setSelected(i);
                  }}
                  selected={selected === i}
                />
              );
            })}
          </Row>
          <Row space="3" mt="6" alignSelf="center">
            {TIMES.map((time, i) => {
              return (
                <TimeView
                  key={`time_${i}`}
                  time={time}
                  onPress={() => setTimeSelected(i)}
                  selected={timeSelected === i}
                />
              );
            })}
          </Row>
          <Box
            position="absolute"
            alignSelf="center"
            bg="violet.500"
            w="full"
            style={{
              height: 55,
              shadowOffset: {
                width: 0,
                height: 4,
              },
              bottom: 40,
              shadowOpacity: 1,
              shadowRadius: 5.46,
              shadowColor: theme.colors.blue[500],
              elevation: 9,
            }}
            justifyContent="center"
            alignItems="center"
            borderRadius="xl"
          >
            <Text color="white" fontWeight="bold" fontSize={16}>
              RESERVATION
            </Text>
          </Box>
        </Box>
      </LinearGradient>
    </Animated.View>
  );
};

const TimeView = ({ time, onPress, selected }) => {
  const theme = useTheme();
  return (
    <Pressable
      onPress={onPress}
      bg="#0e1e4a"
      py="1.5"
      px="2.5"
      rounded="md"
      style={{
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: selected ? 1 : 0,
        shadowRadius: 5.46,
        shadowColor: theme.colors.blue[500],
        elevation: 9,
        borderWidth: 2,
        borderColor: selected ? theme.colors.blue[500] : "transparent",
      }}
    >
      <Text color="white">{time}</Text>
    </Pressable>
  );
};

const DayView = ({ date, onPress, selected = false }) => {
  const theme = useTheme();

  const dayText = moment(date).format("ddd");
  const day = moment(date).format("D");

  const active = useSharedValue(selected ? 1 : 0);

  useEffect(() => {
    active.value = withTiming(selected ? 1 : 0);
  }, [selected]);

  const style = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        active.value,
        [0, 1],
        ["#0e1e4a", theme.colors.violet[400]]
      ),
    };
  });

  return (
    <Pressable onPress={onPress}>
      <Animated.View
        style={[
          style,
          {
            borderRadius: 90 / 2,
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: selected ? 1 : 0,
            shadowRadius: 5.46,
            shadowColor: theme.colors.blue[500],
            elevation: 9,
            // borderWidth: 1,
            // borderColor: "rgba(255,255,255,0.3)",
          },
        ]}
      >
        <Column
          style={[
            {
              height: 90,
              width: 55,
              //   backgroundColor: selected ? theme.colors.violet[400] : "#0e1e4a",
            },
          ]}
          rounded="full"
          justifyContent="space-between"
          alignItems="center"
          py="3"
        >
          <Text mt="1.5" color="white" fontWeight="semibold" fontSize={13}>
            {dayText}
          </Text>
          {!selected && (
            <Divider
              opacity={0.5}
              my="1"
              w="3/5"
              alignSelf="center"
              position="absolute"
              top="60%"
            />
          )}
          <Box
            bg={selected ? "white" : "transparent"}
            h="8"
            w="8"
            justifyContent="center"
            alignItems="center"
            rounded="full"
            shadow={selected ? "2" : "0"}
          >
            <Text
              color={!selected ? "white" : "black"}
              fontWeight="bold"
              fontSize={15}
            >
              {day}
            </Text>
          </Box>
        </Column>
      </Animated.View>
    </Pressable>
  );
};

export { SelectDateSheet };
