import AppRoutes from "./routes/AppRoutes";
import { GlobalProvider } from "./context/GlobalContext";
import MenuBar from "./pages/MenuBar";
import { useState , useEffect } from "react";
import IntroVideo from "./components/IntroVideo";
import { AuthProvider } from "./context/AuthContext"; // 👈 Add this
// import NavBar from "./components/NavBar";

function App() {
  
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    // Check localStorage if video already played
    const hasSeenIntro = localStorage.getItem("hasSeenIntro");
    if (!hasSeenIntro) {
      setShowIntro(true);
    }
  }, []);

  const handleIntroFinish = () => {
    localStorage.setItem("hasSeenIntro", "true");
    setShowIntro(false);
  };


  return (
    <AuthProvider> {/* 👈 Wrap everything with AuthProvider */}
  
      {showIntro ? (
        <IntroVideo onFinish={handleIntroFinish} />
      ) : (
        <GlobalProvider> {/* 🌐 Global App state provider */}
            
            {/* <NavBar/> */}
          <MenuBar />
          <AppRoutes />
        </GlobalProvider>
      )}

    </AuthProvider>
  );
}

export default App;
