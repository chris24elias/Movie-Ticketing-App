import React, { PropsWithChildren } from "react";
import { Box, Column, Icon, Row, ScrollView, Text } from "native-base";
import { SharedElement } from "react-navigation-shared-element";
import {
  getUrlForImagePath,
  useMovieCast,
  useMovieImages,
} from "../../queries";
import { Image, StyleSheet, useWindowDimensions } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { Movie } from "../../api/types";
import Rating from "../../components/Rating";
import Genres from "../../components/Genres";
export type IContentProps = {};

const Content = ({ item, details }: PropsWithChildren<IContentProps>) => {
  const { height, width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const imageHeight = height * 0.5;

  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: insets.bottom + height * 0.15,
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
        style={[{ position: "absolute", zIndex: 1, top: 0 }]}
        entering={FadeIn.delay(400).duration(650)}
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
        backgroundColor="muted.100"
        rounded="md"
        w="4/5"
        ml="4"
        mt="8"
        p="4"
        py="6"
        alignSelf="center"
        borderColor="gray.300"
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
        <MovieImages movieId={item.id} />
      </Box>
    </ScrollView>
  );
};

export { Content };

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

const MovieImages = ({ movieId }) => {
  const { data } = useMovieImages(movieId);
  if (!data) return null; //@todo add loader
  const imageSize = 150;
  return (
    <ScrollView horizontal mt="2" pb="4" showsHorizontalScrollIndicator={false}>
      {data.backdrops.map((image) => {
        return (
          <Box shadow="3" mr="3" key={`movie_image_${image.path}`}>
            <Image
              source={{ uri: image.path }}
              style={{
                height: imageSize,
                width: imageSize * 1.777,
                borderRadius: 12,
              }}
            />
          </Box>
        );
      })}
    </ScrollView>
  );
};
