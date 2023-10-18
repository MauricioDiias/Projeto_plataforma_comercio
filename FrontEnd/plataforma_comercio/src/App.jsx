import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRoutes from "./routes/Routes";
import { AppContext } from "./shared/contexts/AppContext";
import { TopBarProvider } from "./shared/contexts/TopBarContext";

function App() {
  return (
    <BrowserRouter>
      <TopBarProvider>
        <AppContext.Provider>
          <AppRoutes />
        </AppContext.Provider>
      </TopBarProvider>
    </BrowserRouter>
  );
}

export default App;
