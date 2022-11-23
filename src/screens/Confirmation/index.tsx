import {
  Box,
  Divider,
  Heading,
  Icon,
  Pressable,
  Row,
  Text,
  useTheme,
} from "native-base";
import React, { PropsWithChildren } from "react";
import { Image, StyleSheet, View } from "react-native";
import { getUrlForImagePath } from "../../queries";
import { Entypo } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type IConfirmationProps = {};

const Confirmation = ({
  route,
  navigation,
}: PropsWithChildren<IConfirmationProps>) => {
  const { item, details } = route.params;
  const insets = useSafeAreaInsets();
  const posterSize = 110;
  const theme = useTheme();
  const onPayNow = () => {
    navigation.navigate("Home");
  };
  const onPressBack = () => {
    //
    navigation.goBack();
  };
  return (
    <Box flex={1} bg="black">
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
      </Row>
      <Heading
        size="xl"
        textAlign="center"
        color="white"
        alignSelf="center"
        mt="6"
      >
        {item.title}
      </Heading>
      <Box
        mt="3"
        style={{
          height: posterSize * 1.7777777,
          width: posterSize,
        }}
        alignSelf="center"
      >
        <Image
          source={{ uri: getUrlForImagePath(item.poster_path, 500) }}
          style={StyleSheet.absoluteFill}
        />
      </Box>
      <Box mt="8" px="4" w="full">
        <Row justifyContent="space-between" alignItems="center" w="full">
          <Row justifyContent="center" alignItems="center">
            <Image
              source={require("../../assets/images/topViewSeat2.png")}
              style={{
                height: 28,
                width: 28,
                tintColor: "#FFFFFF",
                transform: [{ rotate: "180deg" }],
              }}
              resizeMode="contain"
            />
            <Text fontSize="xl" ml="4" color="white" fontWeight="semibold">
              Seats
            </Text>
          </Row>

          <Text fontSize="md" ml="4" color="gray.400" fontWeight="semibold">
            Line E, seats 34-35-36
          </Text>
        </Row>
        <Divider opacity={0.5} my="6" />
        <Row justifyContent="space-between" alignItems="center" w="full">
          <Row justifyContent="center" alignItems="center">
            <Icon as={Entypo} name="calendar" size={7} color="white" />
            <Text fontSize="xl" ml="4" color="white" fontWeight="semibold">
              Date
            </Text>
          </Row>

          <Text fontSize="md" ml="4" color="gray.400" fontWeight="semibold">
            September 12, 2021
          </Text>
        </Row>
        <Divider opacity={0.5} my="6" />
        <Row justifyContent="space-between" alignItems="center" w="full">
          <Row justifyContent="center" alignItems="center">
            <Icon as={Entypo} name="clock" size={7} color="white" />
            <Text fontSize="xl" ml="4" color="white" fontWeight="semibold">
              Time
            </Text>
          </Row>

          <Text fontSize="md" ml="4" color="gray.400" fontWeight="semibold">
            16.00
          </Text>
        </Row>
        <Divider opacity={0.5} my="6" />
      </Box>
      <Box alignSelf="flex-end" mr="4" mt="6">
        <Text color="gray.400" textAlign="right" fontWeight="semibold">
          Total price
        </Text>
        <Text color="white" fontSize={24} fontWeight="semibold">
          $36.00
        </Text>
      </Box>
      <Box px="4" mt="4">
        <Pressable
          onPress={onPayNow}
          alignSelf="center"
          bg="violet.500"
          w="full"
          style={{
            height: 55,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 1,
            shadowRadius: 5.46,
            shadowColor: theme.colors.blue[500],
            elevation: 9,
          }}
          justifyContent="center"
          alignItems="center"
          borderRadius="xl"
        >
          <Text color="white" fontWeight="bold" fontSize={16}>
            PAY NOW
          </Text>
        </Pressable>
      </Box>
    </Box>
  );
};

export { Confirmation };
