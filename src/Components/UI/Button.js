import { StyleSheet, TouchableOpacity, View } from "react-native";
import { THEME } from "../../theme";

import { UIText } from "./Text";

export const UIButton = ({ children, color = THEME.MAIN_COLOR, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View style={{ ...s.default, backgroundColor: color}}>
        <UIText isBold inlineStyles={{color: '#fff'}}>{children}</UIText>
      </View>
    </TouchableOpacity>
  );
};

const s = StyleSheet.create({
  default: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
});
