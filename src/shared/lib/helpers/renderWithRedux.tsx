import { render } from "@testing-library/react"
import { wrapper } from "../../../app/store"

// eslint-disable-next-line no-unused-vars
export const renderWithRedux = (component: any, initialState?: any) =>
  // @ts-ignore
  render(wrapper.withRedux(component))
