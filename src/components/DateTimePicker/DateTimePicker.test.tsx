import React from "react";
import { render } from "@testing-library/react";

import DateTimePicker from "./DateTimePicker";

describe("DateTimePicker", () => {
  test("renders the DateTimePicker component", () => {
    render(<DateTimePicker />);
  });
});
