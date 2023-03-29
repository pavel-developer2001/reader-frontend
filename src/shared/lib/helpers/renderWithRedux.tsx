import { render } from "@testing-library/react"
import { wrapper } from "../../../app/store"

export const renderWithRedux = (component: any, initialState?: any) =>
  render(wrapper.withRedux(component))
