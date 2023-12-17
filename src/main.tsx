import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { store } from "./redux/store.ts";
import { Provider } from "react-redux";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "./index.css";

const client = new ApolloClient({
  uri: import.meta.env.BASE_URL,
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>
);
