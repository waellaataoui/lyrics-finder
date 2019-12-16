import "./App.css";

import React from "react";
import { Provider } from "./context";
import AppRouter from "./routers/AppRouter";

const App = () => {
  return (
    <div>
      <Provider>
        <AppRouter></AppRouter>
      </Provider>
    </div>
  );
};
export default App;
