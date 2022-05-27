import "../styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import { configureStore } from "@reduxjs/toolkit";
import collectionsReducer from "../features/collections";
import { Provider } from "react-redux";

const store = configureStore({
  reducer: {
    collections: collectionsReducer,
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ApolloProvider>
  );
}

export default MyApp;
