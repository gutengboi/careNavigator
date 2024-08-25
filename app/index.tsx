import { StatusBar } from "expo-status-bar";

import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  Theme,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import StackNavigator from "../navigation/StackNavigator";
import DarkMode from "../components/darkmode.context";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { Provider, useDispatch } from "react-redux";
import store, { AppDispatch } from "../store/store";

const App = () => {
  const [fontsLoaded] = useFonts({
    regular: require("../assets/fonts/Poppins-Regular.ttf"),
    light: require("../assets/fonts/Poppins-Light.ttf"),
    bold: require("../assets/fonts/Poppins-Bold.ttf"),
    medium: require("../assets/fonts/Poppins-Medium.ttf"),
    extrabold: require("../assets/fonts/Poppins-ExtraBold.ttf"),
    semibold: require("../assets/fonts/Poppins-SemiBold.ttf"),
  });

  useEffect(() => {
    const onLayOutRootView = async () => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    };
    onLayOutRootView();
  }, [fontsLoaded]);

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [useDeviceSettings, setUseDeviceSettings] = useState(false);
  const scheme = useColorScheme();

  const CustomDarkTheme: Theme = {
    ...DarkTheme,
    dark: true,
    colors: {
      ...DarkTheme.colors,
      primary: "white",
      background: "#202120",
      card: "#121212",
    },
  };

  useEffect(() => {
    if (useDeviceSettings) {
      setIsDarkMode(scheme === "dark");
    }
  }, [scheme, useDeviceSettings]);

  if (!fontsLoaded) {
    return null; 
  }

  return (
    <DarkMode.Provider
      value={{
        isDarkMode,
        setIsDarkMode,
        useDeviceSettings,
        setUseDeviceSettings,
      }}
    >
      <Provider store={store}>
        <NavigationContainer
          independent={true}
          theme={isDarkMode ? CustomDarkTheme : DefaultTheme}
        >
          <StatusBar style={isDarkMode ? "light" : "dark"} />
          <AppInitializer />
        </NavigationContainer>
      </Provider>
    </DarkMode.Provider>
  );
};

const AppInitializer = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    // Uncomment the following line if you want to load auth state at the start
    // dispatch(loadAuthState());
  }, [dispatch]);

  return <StackNavigator />;
};

export default App;
