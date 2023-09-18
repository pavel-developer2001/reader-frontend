import "../app/styles/index.scss"
import "antd/dist/antd.css"
import { useEffect } from "react"
import { AppProps } from "next/app"
import { useDispatch, useSelector } from "react-redux"
import { ConfigProvider } from "antd"
import { selectUserToken } from "../entities/user/model/user.selector"
import { setToken } from "../entities/user/model/user.slice"
import { ThemeProvider } from "../app/provider/ThemeProvider"
import { wrapper } from "../app/store"

export const MyApp = ({ Component, pageProps }: AppProps) => {
  const token = useSelector(selectUserToken)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setToken(localStorage.getItem("token")))
  }, [token])
  const isBrowser = typeof window !== "undefined"
  return isBrowser ? (
    <ConfigProvider>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </ConfigProvider>
  ) : null
}
export default wrapper.withRedux(MyApp)
