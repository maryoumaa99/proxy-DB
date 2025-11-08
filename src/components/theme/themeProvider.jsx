import {  useEffect, useState } from "react";
import { ThemeContext } from "./themeContext";
import { themeColors } from "./colors";



// CREATING CONTEXT

export default function ThemeProvider({children}){

  // THEME HOLDER
  const [theme , setTheme] = useState(
    // SAVING THEME IN LOCAL STORAGE TO SAVE THE APPLY THE OPTION EVEN AFTER REFRESHING 
    localStorage.getItem("theme") || "dark"
  )

  // FOR TOGGLE BUTTON 
  const toggleTheme = (next) => {
    const newTheme = next || (theme === "dark" ? "light" : "dark");
    setTheme(newTheme);
    // SAVE THE OPTION AFTER CHOOSING 
    localStorage.setItem("theme" , newTheme)
  }

  // ADDING COLORS TO CSS DOC TO BE AUTOMATICALLY CHANGING 
  useEffect(()=>{
    // TARGETING <HTML> DOC
    const root = document.documentElement
    // TARGETING SPECIFIC THEME COLORS FROM themeColor FILE
    const colors = themeColors[theme] || themeColors["dark"]
    // TURNING COLORS INTO {[] , [] , ....}
    Object.entries(colors).forEach(([key, value])=> {
      // SET COLORS IN CSS FILE AS VARS
      root.style.setProperty(`--${key}` , value)
    })

    // RERENDER EACH TIME THEME CHANGES
  },[theme])

  return(
   <ThemeContext.Provider value={{theme , toggleTheme}}>
      <div className={`theme-${theme}`}>{children}</div>
   </ThemeContext.Provider>
  )
}