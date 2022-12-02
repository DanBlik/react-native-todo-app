import { SafeAreaView, View, Text } from "react-native";
import { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { MainLayout } from "./src/MainLayout";
import { TodoState } from "./src/Context/Todo/TodoState";
import { ScreenState } from "./src/Context/Screen/ScreenState";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    "roboto-regular": require("./assets/Fonts/Roboto/Roboto-Regular.ttf"),
    "roboto-bold": require("./assets/Fonts/Roboto/Roboto-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ScreenState>
      <TodoState>
        <SafeAreaView onLayout={onLayoutRootView}>
          <MainLayout />
        </SafeAreaView>
      </TodoState>
    </ScreenState>
  );
}
