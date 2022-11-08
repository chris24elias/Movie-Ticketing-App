import { NavigationContainer } from "@react-navigation/native";
import React, { PropsWithChildren } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../screens/Home";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { Details } from "../screens/Details";
import { Confirmation } from "../screens/Confirmation";

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
            if (otherRoute.name === "Home" && showing) {
              return [
                {
                  id: `item.${item.id}.photo`,
                },
              ];
            }
          }}
        />
        <Stack.Screen name="Confirmation" component={Confirmation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export { Navigation };
