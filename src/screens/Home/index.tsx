import React, { PropsWithChildren, useState } from "react";
import { Image, useWindowDimensions, View, ViewStyle } from "react-native";
import {
  getUrlForImagePath,
  useMovieGenres,
  usePopularMovies,
} from "../../queries";
import { Container, Title } from "../../styles";
import Carousel from "react-native-reanimated-carousel";
import { Movie } from "../../api/types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Poster } from "../../components/Poster";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { AntDesign } from "@expo/vector-icons";
import { Box, Row, Text } from "native-base";

type TAnimationStyle = (value: number) => Animated.AnimateStyle<ViewStyle>;

export type IHomeProps = {};

const bgGrey = "rgb(211,211,211)";

const Home = ({}: PropsWithChildren<IHomeProps>) => {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const { data, isLoading, isError } = usePopularMovies();
  const { data: genres, isLoading: genresLoading } = useMovieGenres();
  const [index, setIndex] = useState(0);
  const progress = useSharedValue(0);

  const animationStyle: TAnimationStyle = React.useCallback((value: number) => {
    "worklet";

    const offset = 25;
    const offsetY = 150;
    // const zIndex = interpolate(value, [-1, 0, 1], [10, 20, 30]);
    const translateX = interpolate(
      value,
      [-1, 0, 1],
      [-width + offset, 0, width - offset]
    );
    const translateY = interpolate(value, [-1, 0, 1], [offsetY, 0, offsetY]);

    // return {
    //   transform: [{ translateX }],
    //   zIndex,
    // };
    const zIndex = interpolate(value, [-1, 0, 1], [10, 20, 10]);
    const s = interpolate(value, [-1, 0, 1], [0.8, 1, 0.8], Extrapolate.CLAMP);

    return {
      zIndex,
      transform: [
        { scale: s },
        { translateX: translateX },
        { translateY: translateY },
      ],
    };
  }, []);

  if (isLoading || genresLoading) {
    return null; // @todo fix this, add loader
  }

  const renderItem = ({ index, item }: { index: number; item: Movie }) => {
    const posterSize = width * 0.5;
    const backdropSize = width;
    const containerHeight = height * 0.65;
    const containerWidth = width * 0.75;
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            position: "absolute",
            zIndex: 10,
            alignSelf: "center",
            height: containerHeight,
            width: containerWidth,
            bottom: insets.bottom + 20,
            borderRadius: containerHeight / 2,
            backgroundColor: "white",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.32,
            shadowRadius: 5.46,

            elevation: 9,
          }}
        >
          <View
            style={{
              flex: 1,
              borderRadius: containerHeight / 2,
              overflow: "hidden",
              // justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                height: "60%",
                width: "80%",
                overflow: "hidden",
                alignSelf: "center",
                marginTop: "9%",
              }}
            >
              <Poster source={getUrlForImagePath(item.poster_path, 500)} />
            </View>

            <Box px="4">
              <Text fontSize="3xl" adjustsFontSizeToFit numberOfLines={1}>
                {item.title}
              </Text>
            </Box>

            <Rating rating={item.vote_average} />
            <Genres genres={item.genre_ids} genreList={genres} />
            <BookButton />
          </View>
        </View>
      </View>
    );
  };

  return (
    <Container>
      {data ? (
        <>
          <Carousel
            loop={false}
            width={width}
            height={height}
            data={data.results}
            scrollAnimationDuration={1000}
            onSnapToItem={(index) => setIndex(index)}
            onProgressChange={(offsetProgress, absoluteProgress) => {
              progress.value = absoluteProgress;
            }}
            renderItem={renderItem}
            customAnimation={animationStyle}
          />
          <View
            style={{
              position: "absolute",
              zIndex: -1,
              height: "100%",
              width: "100%",
            }}
          >
            <LinearGradient
              // Background Linear Gradient
              colors={["transparent", bgGrey]}
              style={{
                position: "absolute",
                zIndex: 1,
                height: "75%",
                width: "100%",
                bottom: 0,
              }}
              end={{ x: 0.5, y: 0.3 }}
            />
            {data.results.map((m, i) => {
              return (
                <MovieBackdrop
                  backdrop={m.backdrop_path}
                  height={height}
                  width={width}
                  key={m.id}
                  progress={progress}
                  index={i}
                />
              );
            })}
          </View>
        </>
      ) : null}
    </Container>
  );
};

export { Home };

const MovieBackdrop = ({ backdrop, height, width, progress, index }) => {
  const style = useAnimatedStyle(() => {
    const prev = index - 1;
    const current = index;
    const next = index + 1;

    // const opacity = interpolate(
    //   progress.value,
    //   [prev, prev + 0.25, current, next - 0.25, next],
    //   [0, 0.25, 1, 0.25, 0],
    //   Extrapolate.CLAMP
    // );

    const opacity = interpolate(
      progress.value,
      [prev, current, next],
      [0, 1, 0],
      Extrapolate.CLAMP
    );

    const scale = interpolate(
      progress.value,
      [prev, current, next],
      [1, 1.1, 1.2],
      Extrapolate.CLAMP
    );

    const translateY = interpolate(
      progress.value,
      [prev, current, next],
      [-20, 0, 20],
      Extrapolate.CLAMP
    );

    return {
      opacity,
      transform: [{ scale }, { translateY }],
    };
  });

  return (
    <Animated.Image
      source={{
        uri: getUrlForImagePath(backdrop, 700, true),
      }}
      style={[
        {
          height: height / 2,
          width: width,
          position: "absolute",
          zIndex: -1,
        },
        style,
      ]}
      // resizeMode="contain"
    />
  );
};

const Rating = ({ rating }) => {
  return (
    <View style={{ flexDirection: "row", marginTop: 10 }}>
      {new Array(Math.round(rating / 2)).fill("x").map(() => {
        return (
          <AntDesign
            name="star"
            color={"gold"}
            style={{ marginRight: 3.5 }}
            size={15}
          />
        );
      })}
    </View>
  );
};

const Genres = ({ genres, genreList }) => {
  return (
    <Row space="2" mt="4">
      {genres.slice(0, 3).map((id) => {
        const genre = genreList.find((g) => g.id === id);

        if (!genre) return null;
        return (
          <Box
            borderWidth={"1"}
            borderColor={"gray.300"}
            borderRadius="full"
            py="1"
            px="2"
          >
            <Text fontSize="xs" fontWeight="semibold">
              {genre.name}
            </Text>
          </Box>
        );
      })}
    </Row>
  );
};

const BookButton = ({}) => {
  return (
    <Box
      borderRadius="full"
      height={"16"}
      width="3/5"
      px="4"
      // justifyContent="center"
      alignItems="center"
      pt="4"
      backgroundColor="black"
      position="absolute"
      bottom={-10}
    >
      <Text color="white" fontSize="xs" fontWeight="bold">
        BOOK NOW
      </Text>
    </Box>
  );
};
