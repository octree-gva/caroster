import React from "react";
import { StrapiProvider } from "strapi-react-context";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Router from "./Router";
import theme from "./theme";

const models = [{ name: "events" }, { name: "cars" }];

const App = () => {
  return (
    <StrapiProvider models={models}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router />
      </ThemeProvider>
    </StrapiProvider>
  );
};

export default App;
