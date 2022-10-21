import React, { PropsWithChildren, useEffect, useLayoutEffect } from "react";
import {
  Box,
  Column,
  Icon,
  Pressable,
  Row,
  ScrollView,
  Text,
} from "native-base";
import { Poster } from "../../components/Poster";
import { SharedElement } from "react-navigation-shared-element";
import {
  getUrlForImagePath,
  useMovieCast,
  useMovieDetails,
  usePersonImages,
} from "../../queries";
import {
  Image,
  InteractionManager,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  Layout,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { useFocusEffect } from "@react-navigation/native";
import { Movie } from "../../api/types";
import Rating from "../../components/Rating";
import Genres from "../../components/Genres";

export type IDetailsProps = {
  navigation;
  route;
};

const Details = ({ navigation, route }: PropsWithChildren<IDetailsProps>) => {
  const { item }: { item: Movie } = route.params || {};
  const { height, width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const { data: details } = useMovieDetails(item.id);

  const imageHeight = height * 0.5;

  const hudOpacity = useSharedValue(0);

  console.log("details", details);

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
      <ScrollView
        contentContainerStyle={{
          paddingBottom: insets.bottom,
        }}
      >
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

        <Box alignItems="center" px="4">
          <Text mt="2" fontSize="3xl" fontWeight="semibold">
            {item.title}
          </Text>
          <Rating rating={item.vote_average} />
          <Genres genres={item.genre_ids} />
        </Box>
        <Cast movie={item} />
        <Column
          borderWidth={0.5}
          backgroundColor="muted.200"
          rounded="md"
          w="4/5"
          ml="4"
          mt="8"
          p="4"
          py="6"
          alignSelf="center"
          borderColor="gray.400"
          space="4"
        >
          <Row>
            <Text fontWeight="bold">Directed by:</Text>
            <Text ml="1">Denis Something</Text>
          </Row>
          <Row>
            <Text fontWeight="bold">Year:</Text>
            <Text ml="1">2021</Text>
          </Row>
          <Row>
            <Text fontWeight="bold">Duration:</Text>
            <Text ml="1">155 min</Text>
          </Row>
          <Row>
            <Text fontWeight="bold">Distribution:</Text>
            <Text ml="1">Waner Bros</Text>
          </Row>
        </Column>
        <Box px="6">
          <Text fontSize="xl" fontWeight="semibold" mt="6">
            Storyline
          </Text>
          <Text>{details?.overview}</Text>
        </Box>
        <Box px="6">
          <Text fontSize="xl" fontWeight="semibold" mt="6">
            Gallery
          </Text>
          <MovieImages />
        </Box>
      </ScrollView>
      <Pressable
        position="absolute"
        bottom={insets.bottom}
        style={{ width: "90%" }}
        height="12"
        bg="black"
        shadow="3"
        alignSelf="center"
        rounded="xl"
        justifyContent="center"
        alignItems="center"
      >
        <Text color="white" fontWeight="bold">
          BOOK NOW
        </Text>
      </Pressable>
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

const Cast = ({ movie }: { movie: Movie }) => {
  const { data, isLoading, isError, error } = useMovieCast(movie.id);

  if (!data) return null;

  return (
    <>
      <Text ml="6" fontSize="xl" fontWeight="semibold">
        Cast
      </Text>
      <ScrollView
        pl="6"
        horizontal
        mt="2"
        showsHorizontalScrollIndicator={false}
      >
        {data.cast.slice(0, 5).map((person, i) => {
          const names = person.name.split(" ");
          const last = names[names.length - 1];
          return (
            <Box mr="4" key={`cast_${person.id}`}>
              <Box shadow="3">
                <Animated.Image
                  // layout={Layout.}
                  entering={FadeInDown.delay((i + 1) * 100).duration(600)}
                  source={{ uri: getUrlForImagePath(person.profile_path, 500) }}
                  style={{
                    height: 150,
                    width: 150,
                    borderRadius: 12,
                  }}
                />
              </Box>

              <Text numberOfLines={2} mt="2" fontWeight="medium" fontSize="14">
                {person.name.replace(last, "")}
                {`\n${last}`}
              </Text>
            </Box>
          );
        })}
      </ScrollView>
    </>
  );
};

const MovieImages = ({}) => {
  return <ScrollView horizontal>{/* {} */}</ScrollView>;
};
