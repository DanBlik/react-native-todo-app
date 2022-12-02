import { ActivityIndicator, View, StyleSheet } from "react-native";
import { THEME } from "../../theme";

export const UILoader = () => (
  <View style={s.main}>
    <ActivityIndicator size='large' color={THEME.MAIN_COLOR}/>
  </View>
);

const s = StyleSheet.create({
  main: { justifyContent: "center", flex: 1, alignItems: 'center', flexDirection: 'row' },
});
