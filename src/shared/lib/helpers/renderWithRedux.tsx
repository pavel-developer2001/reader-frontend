import { render } from "@testing-library/react"
import { wrapper } from "../../../app/store"

export const renderWithRedux = (component: any, initialState?: any) => {
  return render(wrapper.withRedux(component))
}
