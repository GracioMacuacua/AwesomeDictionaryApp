import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons/faBook";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faAnglesUp } from "@fortawesome/free-solid-svg-icons";
import { faPalette } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useFonts } from "expo-font";

/**
 * Loads the application assets as fonts and icons.
 * @returns `true` if a error has ocurred while loading the assets, `false` otherwise.
 */
const loadAssets = () => {
  library.add(
    faBook,
    faCircleQuestion,
    faCirclePlus,
    faHeart,
    faGear,
    faMagnifyingGlass,
    faArrowLeft,
    faTrash,
    faShareNodes,
    faHeartRegular,
    faMicrophone,
    faSquareCheck,
    faPalette,
    faCheck,
    faSquarePlus,
    faClockRotateLeft,
    faAnglesUp,
    faUser,
    faX
  );

  let [loaded] = useFonts({
    "Cabin-Regular": require("../assets/fonts/Cabin-Regular.ttf"),
    "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.otf"),
  });

  return loaded;
};

export { loadAssets };
