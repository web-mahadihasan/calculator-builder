import React, { createContext, useContext, useState } from "react";


export const AppContextProvider = createContext(null)

const AppContext = ({children}) => {
    const [darkMode, setDarkMode] = React.useState(false)

    const toggleDarkMode = () => {
        setDarkMode(!darkMode)
        document.documentElement.classList.toggle("dark")
      }

    const appValue = {
        darkMode,
        setDarkMode,
        toggleDarkMode
    }
    return (
        <AppContextProvider.Provider value={appValue}>
            {children}
        </AppContextProvider.Provider>    
    );
};

export const useApp = () => {
    const context = useContext(AppContextProvider)
    return context
}

export default AppContext;