import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { AppState } from "react-native";
import { MMKV } from "react-native-mmkv";

const storage = new MMKV({
  id: "UserInactivity",
});

const LOCK_TIME = 3000;

const UserInactivityProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const appState = useRef(AppState.currentState);
  const router = useRouter();

  useEffect(() => {
    const handleAppStateChange = (nextAppState: any) => {
      console.log("appState", appState.current, nextAppState);
      if (nextAppState === "inactive") {
        router.push("/(modals)/white");
      } else {
        if (router.canGoBack()) {
          router.back();
        }
      }

      if (nextAppState === "background") {
        recordStartTime();
      } else if (
        nextAppState === "active" &&
        appState.current.match(/background/)
      ) {
        const elapsed = Date.now() - (storage.getNumber("startTime") || 0);

        if (elapsed >= LOCK_TIME) {
          router.push("/(modals)/lock");
        }
      }
      appState.current = nextAppState;
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      subscription.remove();
    };
  }, [router]);

  const recordStartTime = () => {
    storage.set("startTime", Date.now());
  };

  return children;
};

export default UserInactivityProvider;
