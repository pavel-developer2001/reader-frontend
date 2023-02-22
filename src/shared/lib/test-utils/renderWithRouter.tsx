import { render } from "@testing-library/react"
import { NextRouter } from "next/dist/client/router"
import { RouterContext } from "next/dist/shared/lib/router-context"

function createMockRouter(router: Partial<NextRouter>): NextRouter {
  return {
    basePath: "",
    pathname: "/",
    route: "/",
    query: {},
    asPath: "/",
    back: jest.fn(),
    beforePopState: jest.fn(),
    prefetch: jest.fn(),
    push: jest.fn(),
    reload: jest.fn(),
    replace: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
    isLocaleDomain: false,
    isReady: true,
    defaultLocale: "en",
    domainLocales: [],
    isPreview: false,
    ...router,
  }
}

export const renderWithRouter = (router: any, children: any) => {
  return render(
    <RouterContext.Provider value={createMockRouter(router)}>
      {children}
    </RouterContext.Provider>
  )
}
