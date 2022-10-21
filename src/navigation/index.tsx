import { NavigationContainer } from "@react-navigation/native";
import React, { PropsWithChildren } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../screens/Home";

const Stack = createNativeStackNavigator();

export type INavigationProps = {};

const Navigation = ({}: PropsWithChildren<INavigationProps>) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export { Navigation };
