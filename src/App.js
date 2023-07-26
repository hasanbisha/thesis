import {Suspense} from "react";
import AppLoader from "./components/Loaders/AppLoader";
import Routing from "./routing";

function App() {
  return (
      <Suspense fallback={AppLoader}>
          <Routing />
      </Suspense>
  );
}

export default App;
