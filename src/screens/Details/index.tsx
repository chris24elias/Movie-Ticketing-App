import React, { PropsWithChildren, useEffect, useLayoutEffect } from "react";
import { Box, Icon, Pressable, Row, Text } from "native-base";
import { Poster } from "../../components/Poster";
import { SharedElement } from "react-navigation-shared-element";
import { getUrlForImagePath } from "../../queries";
import {
  Image,
  InteractionManager,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { useFocusEffect } from "@react-navigation/native";

export type IDetailsProps = {
  navigation;
  route;
};

const Details = ({ navigation, route }: PropsWithChildren<IDetailsProps>) => {
  const { item } = route.params || {};
  const { height, width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const imageHeight = height * 0.5;

  const hudOpacity = useSharedValue(0);

  // useLayoutEffect(() => {
  //   hudOpacity.value = withTiming(1, { duration: 1000 });
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      const task = InteractionManager.runAfterInteractions(() => {
        // Expensive task
        hudOpacity.value = withTiming(1, { duration: 250 });
      });

      return () => task.cancel();
    }, [])
  );
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: hudOpacity.value,
    };
  });

  return (
    <Box flex={1}>
      <SharedElement
        id={`item.${item.id}.photo`}
        style={{ height: imageHeight, width }}
      >
        <Image
          source={{ uri: getUrlForImagePath(item.poster_path, 500) }}
          style={StyleSheet.absoluteFill}
        />
      </SharedElement>

      <Animated.View
        style={[
          animatedStyle,
          { position: "absolute", zIndex: 2, top: 0, width: "100%" },
        ]}
      >
        <DetailsHeader {...{ insets, navigation }} />
      </Animated.View>
      <Animated.View
        style={[animatedStyle, { position: "absolute", zIndex: 1, top: 0 }]}
      >
        <PlayOverlay {...{ imageHeight, width }} />
      </Animated.View>
    </Box>
  );
};

export { Details };

const DetailsHeader = ({ navigation, insets }) => {
  return (
    <Row
      style={{ paddingTop: insets.top }}
      px="4"
      pr="6"
      justifyContent="space-between"
      alignItems="center"
    >
      <Pressable flexDirection="row" onPress={() => navigation.goBack()}>
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
  );
};

const PlayOverlay = ({ imageHeight, width }) => {
  return (
    <Box
      justifyContent="center"
      alignItems="center"
      style={{ height: imageHeight, width }}
    >
      <Box
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        p="6"
        borderRadius="full"
      >
        <Icon as={Entypo} color="white" name="controller-play" size={"3xl"} />
      </Box>
      <Text mt="2" color="white">
        Play Trailer
      </Text>
    </Box>
  );
};
