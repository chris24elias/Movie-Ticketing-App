import React, { PropsWithChildren, useEffect, useState } from "react";
import { Box, Icon, Pressable, Row, Text } from "native-base";
import { useMovieDetails } from "../../queries";
import {
  ActivityIndicator,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  Easing,
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { Movie } from "../../api/types";
import { Content } from "./Content";
import { SelectDateSheet } from "./SelectDateSheet";
import { SelectSeatsSheet } from "./SelectSeatsSheet";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export type IDetailsProps = {
  navigation;
  route;
};

const Details = ({ navigation, route }: PropsWithChildren<IDetailsProps>) => {
  const { item }: { item: Movie } = route.params || {};
  const { height, width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const { data: details } = useMovieDetails(item.id);
  const [dateSheetVisible, setDateSheetVisible] = useState(false);
  const [bookBtnExpanded, setBookBtnExpanded] = useState(false);
  const [chooseSeatsVisible, setChooseSeatsVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const onPressBack = () => {
    if (chooseSeatsVisible) {
      setChooseSeatsVisible(false);
      setDateSheetVisible(true);
    } else if (dateSheetVisible) {
      setDateSheetVisible(false);
      setBookBtnExpanded(false);
    } else {
      navigation.goBack();
    }
  };

  const onBookPress = () => {
    setBookBtnExpanded(true);
    setDateSheetVisible(true);
  };

  const onReserve = () => {
    setDateSheetVisible(false);
    setChooseSeatsVisible(true);
  };

  const onBuyTickets = () => {
    //
    setLoading(true);
    setTimeout(() => {
      navigation.navigate("Confirmation", {
        item,
        details,
      });
      setLoading(false);
    }, 1000);
  };

  let trailer;

  if (details?.videos?.results?.length) {
    trailer = details?.videos?.results[0];

    details?.videos?.results?.forEach((vid) => {
      console.log("vid", vid);
      if (vid.name.toLowerCase().includes("trailer")) {
        trailer = vid;
      }
    });
  }

  return (
    <Box flex={1} bg="white">
      <DetailsHeader {...{ insets, onPressBack }} />
      <Content item={item} details={details} />
      <BookButton
        insets={insets}
        onBookPress={onBookPress}
        bookBtnExpanded={bookBtnExpanded}
        dateSheetVisible={dateSheetVisible}
      />
      {loading && (
        <Animated.View
          entering={FadeIn}
          style={{
            ...StyleSheet.absoluteFillObject,
            zIndex: 100,
            backgroundColor: "rgba(0,0,0,0.2)",
          }}
        >
          <ActivityIndicator
            style={{ flex: 1, alignSelf: "center" }}
            size="large"
          />
        </Animated.View>
      )}
      {details && (
        <SelectDateSheet
          visible={dateSheetVisible}
          trailer={trailer}
          onReserve={onReserve}
        />
      )}
      {details && (
        <SelectSeatsSheet
          visible={chooseSeatsVisible}
          trailer={trailer}
          onBuyTickets={onBuyTickets}
        />
      )}
    </Box>
  );
};

export { Details };

const BookButton = ({
  insets,
  bookBtnExpanded,
  dateSheetVisible,
  onBookPress,
}) => {
  const { width, height } = useWindowDimensions();
  const buttonHeight = 48;
  const btnWidth = useSharedValue(width * 0.9);
  const btnHeight = useSharedValue(buttonHeight);
  const textOpacity = useSharedValue(1);
  const btnBr = useSharedValue(12);
  const btnBottom = useSharedValue(insets.bottom);
  const btnScale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: btnWidth.value,
      height: btnHeight.value,
      borderRadius: btnBr.value,
      bottom: btnBottom.value,
      transform: [{ scale: btnScale.value }],
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      color: "white",
      fontWeight: "bold",
      opacity: textOpacity.value,
    };
  });
  useEffect(() => {
    if (!bookBtnExpanded) {
      setTimeout(() => {
        const timingConfig = {
          duration: 300,
          easing: Easing.inOut(Easing.ease),
        };
        btnWidth.value = withTiming(width * 0.9, timingConfig);
        btnHeight.value = withTiming(buttonHeight, timingConfig);
        btnBr.value = withTiming(12, timingConfig);
        btnScale.value = withTiming(1, timingConfig);
        btnBottom.value = withTiming(insets.bottom, timingConfig);
        textOpacity.value = withDelay(200, withTiming(1, timingConfig));
      }, 150);
    }
  }, [bookBtnExpanded]);

  const onPress = () => {
    btnWidth.value = withTiming(buttonHeight);
    textOpacity.value = withTiming(0);
    btnBr.value = withTiming(buttonHeight / 2, undefined);

    const timingConfig = { duration: 450, easing: Easing.inOut(Easing.cubic) };
    btnScale.value = withDelay(300, withTiming(25, timingConfig));
    btnBottom.value = withDelay(300, withTiming(height / 3, timingConfig));

    setTimeout(() => {
      onBookPress();
    }, 350);
  };

  return (
    <AnimatedPressable
      position="absolute"
      bg="black"
      shadow="3"
      alignSelf="center"
      // rounded="xl"

      justifyContent="center"
      alignItems="center"
      style={animatedStyle}
      onPress={onPress}
    >
      <Animated.Text style={animatedTextStyle}>BOOK NOW</Animated.Text>
    </AnimatedPressable>
  );
};

const DetailsHeader = ({ insets, onPressBack }) => {
  return (
    <Animated.View
      entering={FadeIn.delay(400).duration(650)}
      style={{ position: "absolute", zIndex: 2, top: 0, width: "100%" }}
    >
      <Row
        style={{ paddingTop: insets.top }}
        px="4"
        pr="6"
        justifyContent="space-between"
        alignItems="center"
      >
        <Pressable flexDirection="row" onPress={onPressBack}>
          <Icon as={Entypo} color="white" name="chevron-left" size={"md"} />
          <Text color="white" fontWeight="bold">
            BACK
          </Text>
        </Pressable>

        <Row>
          <Icon
            as={Entypo}
            color="white"
            name="dots-three-vertical"
            size={"md"}
            mr="1"
          />
          <Icon as={Entypo} color="white" name="heart-outlined" size={"md"} />
        </Row>
      </Row>
    </Animated.View>
  );
};
