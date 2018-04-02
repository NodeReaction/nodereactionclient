import getMuiTheme from "material-ui/styles/getMuiTheme";
import { fade } from "material-ui/utils/colorManipulator";
import spacing from "material-ui/styles/spacing";
import {
  cyan500,
  cyan700,
  pinkA200,
  deepOrange500,
  deepOrange700,
  grey100,
  grey300,
  grey400,
  grey500,
  blueGrey300,
  blueGrey800,
  white,
  darkBlack,
  fullBlack
} from "material-ui/styles/colors";

const muiTheme = getMuiTheme({
  spacing: spacing,
  fontFamily: "Open Sans, sans-serif",
  palette: {
    primary1Color: "#000000", // button color
    primary2Color: blueGrey800,
    primary3Color: grey400,
    accent1Color: "#FF530D",
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: "#FF530D",
    clockCircleColor: fade("#FF530D", 0.07),
    shadowColor: fullBlack
  },
  appBar: {
    height: 50
  }
});

module.exports = muiTheme;
