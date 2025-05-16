import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRouter from "./router/AppRouter";
import { AuthContext } from "./context/AuthContext";

function App() {
  // const [user, setUser] = useState(null);
  // const [token, setToken] = useState(null);

  // const AppContext = createContext();
  // const AppProvider = ({ children }) => {
  //   return (
  //     <AppContext.Provider value={{ user, setUser, token, setToken }}>
  //       {children}
  //     </AppContext.Provider>
  //   );
  // };
  return (
    <>
      <AuthContext>
        <AppRouter />
      </AuthContext>
      <ToastContainer />
    </>
  );
}

export default App;
