import { useContext } from "react";
import { ThemeContext } from "./themeContext";
import { MdOutlineWbSunny } from "react-icons/md";
import { IoMdMoon } from "react-icons/io";

const ThemeButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button defaultValue="system"
      onClick={() => toggleTheme()}
      className="mb-2"
      style={{
        backgroundColor: "var(--primary)",
        color: "var(--textC)",
        padding: "0.5rem 1rem",
        borderRadius: "8px",
        border: "none",
        
      }}
    >
      {theme === "light" ?  <MdOutlineWbSunny /> :<IoMdMoon />  }
    </button>
  );
};

export default ThemeButton;
