import { StyleSheet, Text } from "react-native";

export const UIText = ({ isBold = false, inlineStyles = {}, children }) => (
  <Text style={{ ...s[isBold ? 'bold' : 'regular'], ...inlineStyles }}>{children}</Text>
);

const s = StyleSheet.create({
  regular: {
    fontFamily: "roboto-regular",
  },
  bold: {
    fontFamily: "roboto-bold" ,
  },
});
