import CommentBlockList from ".";
import {  screen } from "@testing-library/react";
import { renderWithRedux } from "../../../../helpers/renderWithRedux";

describe("CommentBlockList", () => {
  test("should be loading when mount component", () => {
   
    renderWithRedux(<CommentBlockList />);
    screen.debug();
    // const comments = screen.getAllByTestId("comment-item");
    // const div = screen.getByTestId("div");
    // expect(div).toBeInTheDocument();
    // expect(comments).toBeInTheDocument()
  });
});
