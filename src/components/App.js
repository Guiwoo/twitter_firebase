import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fBase";
import GlobalStyle, { birghtTheme, darkTheme } from "style/style";
import { ThemeProvider } from "styled-components";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      localStorage.setItem("darkMode", "able");
    } else {
      localStorage.setItem("darkMode", "disalbe");
    }
  };
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  };
  return (
    <>
      <ThemeProvider theme={darkMode ? darkTheme : birghtTheme}>
        <GlobalStyle />
        {init ? (
          <AppRouter
            refreshUser={refreshUser}
            isLoggedIn={Boolean(userObj)}
            userObj={userObj}
            toggleDarkMode={toggleDarkMode}
            darkMode={darkMode}
          />
        ) : (
          <span>Loading...</span>
        )}
      </ThemeProvider>
    </>
  );
}

{
  /* <footer style={{ display: "flex", justifyContent: "center" }}>
        &copy; {new Date().getFullYear()} Guiwoo-Twitter{" "}
      </footer> */
}

export default App;
