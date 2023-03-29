import { screen } from "@testing-library/react"
import { useSelector } from "react-redux"
import CommentBlockList from "."
// eslint-disable-next-line no-unused-vars
import { commentData } from "../../../../../__mocks__/data/comment-data"
import { renderWithRouter } from "../../../../shared/lib/test-utils/renderWithRouter"

jest.mock("react-redux", () => ({
  useDispatch: () => jest.fn(),
  useSelector: jest.fn(),
  // useSelector: jest
  //   .fn()
  //   .mockReturnValueOnce(true)
  //   .mockReturnValueOnce([])
  //   .mockReturnValueOnce(false),
}))

describe("CommentsBlockList testing", () => {
  afterEach(() => {
    // @ts-ignore
    useSelector.mockClear()
  })
  test("Render component", () => {
    // useSelector
    //   .mockReturnValueOnce(true)
    //   .mockReturnValueOnce([{}])
    //   .mockReturnValueOnce(false)
    const storeInitialState = {
      user: { token: true },
      comment: { comments: [], loading: false },
    }
    // @ts-ignore/
    useSelector.mockImplementation((callback) => callback(storeInitialState))

    renderWithRouter({ query: { id: "2" } }, <CommentBlockList />)
    screen.debug()
  })
})
