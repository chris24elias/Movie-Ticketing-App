import { NavigationContainer } from "@react-navigation/native";
import React, { PropsWithChildren } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../screens/Home";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { Details } from "../screens/Details";

// const Stack = createNativeStackNavigator();

const Stack = createSharedElementStackNavigator();

export type INavigationProps = {};

const forFade = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const Navigation = ({}: PropsWithChildren<INavigationProps>) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="Detail"
          component={Details}
          options={{
            cardStyleInterpolator: forFade,
          }}
          sharedElements={(route, otherRoute, showing) => {
            const { item } = route.params;
            return [
              {
                id: `item.${item.id}.photo`,
              },
            ];
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export { Navigation };
