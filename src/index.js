import React from "react";
import ReactDOM from "react-dom";
import { withLoading } from "./LoadingHock.tsx";
import { CardComponent } from "./CardComponent.tsx";

import "./styles.css";

function App() {
  const Hock1 = withLoading(CardComponent, { delay: 10000 });
  const Hock2 = withLoading(CardComponent, { delay: 5000 });
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      {<Hock1 />}
      {<Hock2 />}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
