import { View } from "native-base";
import { AntDesign } from "@expo/vector-icons";

const Rating = ({ rating }: { rating: number }) => {
  return (
    <View style={{ flexDirection: "row", marginTop: 10 }}>
      {new Array(Math.round(rating / 2)).fill("x").map((_, i) => {
        return (
          <AntDesign
            key={`rating_${i}`}
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

export default Rating;
