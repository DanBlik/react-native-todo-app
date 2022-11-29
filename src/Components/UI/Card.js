import { StyleSheet, View } from "react-native";

export const UICard = ({ children, inlineStyles }) => {
  return <View style={{...s.default, ...inlineStyles}}>{children}</View>;
};

const s = StyleSheet.create({
  default: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 2,
      heigth: 2,
    },
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 8,
  },
});
