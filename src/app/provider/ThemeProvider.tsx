import { ReactNode, useMemo, useState } from "react"
import { Theme, ThemeContext } from "../context/ThemeContext"
import { changeCssRootVariables } from "../../shared/lib/utils/changeCssRootVariables"
import { storage } from "../../shared/lib/utils/storage"

interface Props {
  children: ReactNode
}

export const ThemeProvider = ({ children, ...props }: Props) => {
  const [theme, setTheme] = useState<Theme>(
    storage.getItem("theme") || Theme.LIGHT
  )
  changeCssRootVariables(theme)
  function changeTheme(theme: Theme) {
    storage.setItem("theme", theme)
    setTheme(theme)
    changeCssRootVariables(theme)
  }
  const memoReturnValues = useMemo(
    () => ({
      theme,
      changeTheme,
    }),
    [theme, changeTheme]
  )
  return (
    <ThemeContext.Provider value={memoReturnValues} {...props}>
      {children}
    </ThemeContext.Provider>
  )
}
