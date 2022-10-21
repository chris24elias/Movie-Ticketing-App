import React, { PropsWithChildren, useState } from "react";
import { Image, Text, useWindowDimensions, View } from "react-native";
import { getUrlForImagePath, usePopularMovies } from "../../queries";
import { Container, Title } from "../../styles";
import Carousel from "react-native-reanimated-carousel";
import { Movie } from "../../api/types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Poster } from "../../components/Poster";

export type IHomeProps = {};

const bgGrey = "rgb(169,169,169)";

const Home = ({}: PropsWithChildren<IHomeProps>) => {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const { data, isLoading, isError } = usePopularMovies();
  const [index, setIndex] = useState(0);

  if (data) {
    console.log("data", data.results[0]);
  }

  const renderItem = ({ index, item }: { index: number; item: Movie }) => {
    const posterSize = width * 0.5;
    const backdropSize = width;
    const containerHeight = height * 0.65;
    const containerWidth = width * 0.7;
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

            <Title>{item.title}</Title>
            {/* <Text style={{}}>{item.}</Text> */}
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
            loop
            width={width}
            height={height}
            data={data.results}
            scrollAnimationDuration={1000}
            onSnapToItem={(index) => setIndex(index)}
            renderItem={renderItem}
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
                height: "70%",
                width: "100%",
                bottom: 0,
              }}
              end={{ x: 0.5, y: 0.25 }}
            />
            <Image
              source={{
                uri: getUrlForImagePath(
                  data.results[index].backdrop_path,
                  700,
                  true
                ),
              }}
              style={{
                height: height / 2,
                width: width,
                position: "absolute",
                zIndex: -1,
              }}
              // resizeMode="contain"
            />
          </View>
        </>
      ) : null}
    </Container>
  );
};

export { Home };
