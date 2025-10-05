import { IconProps } from "@/types/icon";
import React, { View } from "react-native";
import { IconName } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const Icon = (icon: IconProps) => {
  return (
    <View>
      <FontAwesomeIcon
        icon={icon.name as IconName}
        style={[{ color: "#FFF" }, icon.customStyle]}
        size={icon.size ?? 20}
      />
    </View>
  );
};

export { Icon };
