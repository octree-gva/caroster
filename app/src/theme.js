import { createMuiTheme } from "@material-ui/core/styles";
import grey from "@material-ui/core/colors/grey";
import blue from "@material-ui/core/colors/blue";

export default createMuiTheme({
  palette: {
    primary: grey,
    secondary: blue,
    background: {
      default: grey[50],
    },
  },
});
