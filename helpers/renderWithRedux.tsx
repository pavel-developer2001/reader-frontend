import { wrapper } from "../store";
import { render } from "@testing-library/react";

export const renderWithRedux = (component: any, initialState?: any) => {
  //@ts-ignore
  return render(wrapper.withRedux(component));
};
