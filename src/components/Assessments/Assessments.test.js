import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Assessments from "./Assessments";

test("renders Assessments component", () => {
  render(<Assessments />);
  expect(screen.queryByTestId("Assessments")).toBeTruthy();
});

test("renders Button component", async () => {
  render(<Assessments />);
  const button = screen.queryAllByTestId("Get started button");
  expect(button).toBeTruthy();
});
