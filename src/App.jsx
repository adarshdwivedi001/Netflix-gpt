import Body from "./components/Body";
import { Provider } from "react-redux";
import "./App.css";
import appStore from "./utils/store";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <Body />
      </Provider>
    </>
  );
}

export default App;
