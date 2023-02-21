import { render, screen } from "@testing-library/react";
import CommentBlockList from ".";
import * as reduxHooks from "react-redux";
import * as router from "next/dist/client/router";

jest.mock("react-redux");

const mockedUseSelector = jest.spyOn(reduxHooks, "useSelector");
const mockedUseDispatch = jest.spyOn(reduxHooks, "useDispatch");
const mockerUseRouter = jest.spyOn(router, "useRouter");
const dispatch = jest.fn();
describe("CommentsBlockList testing", () => {
  test("Render component", () => {
    // mockedUseSelector.mockReturnValue([]);
    // mockerUseRouter.mockReturnValue(() => {
    //   query: {
    //     id: "1";
    //   }
    // });
    // render(<CommentBlockList />);

    // screen.debug();
  });
});
