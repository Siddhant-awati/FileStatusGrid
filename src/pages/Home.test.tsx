/// <reference types="vitest" />
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./Home";

import { useFilesData } from "../hooks/useFilesData";

vi.mock("../hooks/useFilesData", () => ({
  useFilesData: vi.fn(),
}));

vi.mock("../components/FileDownloader/FileDownloader", () => ({
  default: () => <div data-testid="file-downloader">Mock FileDownloader</div>,
}));

const mockedUseFilesData = useFilesData as unknown as vi.Mock;

describe("Home Page", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading state", () => {
    mockedUseFilesData.mockReturnValue({
      filesData: [],
      loading: true,
      error: null,
    });

    render(<Home />);
    expect(screen.getByText("Loading files...")).toBeInTheDocument();
  });

  it("shows error state", () => {
    mockedUseFilesData.mockReturnValue({
      filesData: [],
      loading: false,
      error: "Failed to fetch",
    });

    render(<Home />);
    expect(screen.getByText(/Error: Failed to fetch/i)).toBeInTheDocument();
  });

  it("renders FileDownloader when data is available", () => {
    mockedUseFilesData.mockReturnValue({
      filesData: [
        { name: "test", path: "/", device: "Laptop", status: "available" },
      ],
      loading: false,
      error: null,
    });

    render(<Home />);
    expect(screen.getByTestId("file-downloader")).toBeInTheDocument();
    expect(
      screen.getByText(/FileDownloader component in action/i)
    ).toBeInTheDocument();
  });
});
