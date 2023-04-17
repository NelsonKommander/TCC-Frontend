import Router from "./config/router";
import AppContextProvider from "./AppContextProvider";

function App() {
  return (
      <div className="App">
        <AppContextProvider>
          <Router />
        </AppContextProvider>
          {/*<Footer /> */}
          {/*<Snack /> */}

      </div>
  );
}

export default App;
