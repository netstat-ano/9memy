import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/provider";
import App from "./App";
import theme from "./assets/chakraui/theme";
import { ColorModeScript } from "@chakra-ui/color-mode";
import { Provider } from "react-redux";
import store from "./store";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <ChakraProvider>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Provider store={store}>
            <App />
        </Provider>
    </ChakraProvider>
);
