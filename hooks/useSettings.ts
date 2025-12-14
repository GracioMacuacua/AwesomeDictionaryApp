import { useRouter } from "expo-router";
import { useState } from "react";
import { Linking, Share } from "react-native";

const useSettings = () => {
  const router = useRouter();
  const [isSwitchEnabled, setIsSwitchEnabled] = useState(false);

  const toggleSwitch = () => setIsSwitchEnabled(!isSwitchEnabled);

  const handleShowMoreApps = async () => {
    let url = "https://example.com/rate-us";
    let suported = await Linking.canOpenURL(url);

    if (suported) {
      await Linking.openURL(url);
    }
  };

  const handleShareApp = async () => {
    try {
      const result = await Share.share({
        message: "Veja esta incrível aplicação: https://example.com/app",
      });
    } catch (error) {
      console.error("Erro ao partilhar a app:", error);
    }
  };

  const buttonList = new Array(
    {
      icon: { name: "fa-solid fa-share-nodes" },
      text: "Partilhar App",
      fn: handleShareApp,
    },
    {
      icon: { name: "fa-solid fa-square-plus" },
      text: "Mais Apps",
      fn: handleShowMoreApps,
    },
    {
      icon: { name: "fa-solid fa-clock-rotate-left" },
      text: "Histórico",
      fn: () => router.push("/history"),
    }
  );

  return { buttonList, toggleSwitch, isSwitchEnabled };
};

export { useSettings };
