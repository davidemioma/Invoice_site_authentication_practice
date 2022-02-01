import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index-redux";
import { AuthContextProvider } from "./store/auth-context";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <AuthContextProvider>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </AuthContextProvider>,
  document.getElementById("root")
);
