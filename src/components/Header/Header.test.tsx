import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import Header from "./Header";

describe("Header", () => {
  it("renders the header with correct text", () => {
    render(<Header />);
    const logoText = screen.getByText(/File Status Grid/i);
    expect(logoText).toBeInTheDocument();
    expect(logoText).toHaveClass("logo-text");
  });

  it("has the correct structural elements", () => {
    render(<Header />);
    const header = screen.getByRole("banner");
    expect(header).toHaveClass("header");

    const container = within(header).getByTestId("header-container");
    expect(container).toBeInTheDocument();

    const logo = within(container).getByTestId("logo");
    expect(logo).toBeInTheDocument();
  });
});
