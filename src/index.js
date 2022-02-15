import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index-redux";
import { AuthContextprovider } from "./store/auth-context";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <BrowserRouter>
    <AuthContextprovider>
      <Provider store={store}>
        <App />
      </Provider>
    </AuthContextprovider>
  </BrowserRouter>,
  document.getElementById("root")
);
