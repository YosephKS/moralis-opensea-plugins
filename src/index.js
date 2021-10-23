import React from "react";
import ReactDOM from "react-dom";
import { MoralisProvider } from "react-moralis";
import { ChakraProvider } from "@chakra-ui/react";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
	<React.StrictMode>
		<ChakraProvider>
			<MoralisProvider
				appId={process.env.REACT_APP_MORALIS_APP_ID}
				serverUrl={process.env.REACT_APP_MORALIS_SERVER_URL}
			>
				<App />
			</MoralisProvider>
		</ChakraProvider>
	</React.StrictMode>,
	document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
