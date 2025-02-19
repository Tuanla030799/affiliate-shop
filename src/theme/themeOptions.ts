import { components } from "./components";
import { blue, marron, paste, primary, themeColors } from "./themeColors";
import { typography } from "./typography";

type ThemeConfig = {
  theme: string;
};

const THEMES = {
  GIFT: "GIFT",
  HEALTH: "HEALTH",
  DEFAULT: "DEFAULT",
  GROCERY: "GROCERY",
  FURNITURE: "FURNITURE",
};

const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  },
};
/*
WE CREATED MULTIPLE THEME OPTIONS FOR DIFFERENT SHOP VARIATION.

YOU CAN JUST KEEP [THEMES.DEFAULT] AND REMOVE OTHER THEME OPTIONS.
*/

const themesOptions = {
  [THEMES.DEFAULT]: {
    typography,
    breakpoints,
    components: { ...components },
    palette: {
      primary: { ...primary, light: primary[100] },
      ...themeColors,
    },
  },
  [THEMES.GROCERY]: {
    typography,
    breakpoints,
    components: { ...components },
    palette: {
      primary: { ...primary, light: primary[100] },
      ...themeColors,
    },
  },
  [THEMES.FURNITURE]: {
    typography,
    breakpoints,
    components: { ...components },
    palette: {
      primary: { ...paste, light: paste[100] },
      ...themeColors,
    },
  },
  [THEMES.HEALTH]: {
    typography,
    breakpoints,
    components: { ...components },
    palette: {
      primary: { ...blue, light: blue[100] },
      ...themeColors,
    },
  },
  [THEMES.GIFT]: {
    typography,
    breakpoints,
    components: { ...components },
    palette: {
      primary: { ...marron, light: marron[100] },
      ...themeColors,
    },
  },
};

const themeOptions = (themeConfig: ThemeConfig, pathname: string) => {
  let themeOptions;
  /*
    YOU CAN ALSO REMOVE updateTheme function
    AND FOLLOWING ENTIRE switch case BLOCK.
  */

  const updateTheme = (themeName: string) => {
    themeConfig.theme = themeName;
    themeOptions = themesOptions[themeConfig.theme];
  };

  switch (pathname) {
    case "/tt1":
    case "/grocery1":
    case "/grocery2":
    case "/grocery3":
    case "/gadget-shop":
    case "/fashion-shop-1":
    case "/":
      updateTheme(THEMES.DEFAULT);
      break;

    case "/furniture-shop":
      updateTheme(THEMES.FURNITURE);
      break;

    case "/healthbeauty-shop":
      updateTheme(THEMES.HEALTH);
      break;

    case "/gift-shop":
      updateTheme(THEMES.GIFT);
      break;

    default:
      themeOptions = themesOptions[themeConfig.theme];
      break;
  }
  /*
        IF YOU REMOVE THE switch case, YOU NEED TO ASSIGN VALUE TO themeOptions
        E.G. themeOptions = themesOptions[THEMES.DEFAULT];
    */
  // themeOptions = themesOptions[THEMES.DEFAULT];

  return themeOptions;
};

export default themeOptions;
