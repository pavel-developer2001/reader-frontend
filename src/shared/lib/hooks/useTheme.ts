import { useContext } from "react";
import { ThemeContext } from "../../../app/context/ThemeContext";

export const useTheme = () => useContext(ThemeContext);
