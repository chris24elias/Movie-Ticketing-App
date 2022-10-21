import React, { PropsWithChildren } from "react";
import { Image, StyleSheet, View } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { SquircleView } from "react-native-figma-squircle";

export type IPosterProps = {
  source: string;
};

const Poster = ({ source }: PropsWithChildren<IPosterProps>) => {
  return (
    <MaskedView
      style={{ flex: 1 }}
      maskElement={
        <SquircleView
          style={StyleSheet.absoluteFill}
          squircleParams={{
            cornerRadius: 120,
            cornerSmoothing: 0.7,
            fillColor: "pink",
          }}
        />
      }
    >
      <Image style={StyleSheet.absoluteFill} source={{ uri: source }} />
    </MaskedView>
  );
};

export { Poster };
