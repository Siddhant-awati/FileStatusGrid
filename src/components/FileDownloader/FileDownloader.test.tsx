import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import FileDownloader from "./FileDownloader";
import type { FileModel } from "../../types/FileModel";

const mockFiles: FileModel[] = [
  { name: "report.pdf", path: "/docs", device: "Laptop", status: "available" },
  { name: "photo.jpg", path: "/images", device: "Phone", status: "scheduled" },
  { name: "notes.txt", path: "/notes", device: "Tablet", status: "available" },
];

describe("FileDownloader", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders fallback when no files are available", () => {
    render(<FileDownloader filesData={[]} />);
    expect(screen.getByText("No files available.")).toBeInTheDocument();
  });

  it("renders table with correct rows", () => {
    render(<FileDownloader filesData={mockFiles} />);
    expect(screen.getByText("report.pdf")).toBeInTheDocument();
    expect(screen.getByText("photo.jpg")).toBeInTheDocument();
    expect(screen.getByText("notes.txt")).toBeInTheDocument();
  });

  it("selects and deselects individual files", () => {
    render(<FileDownloader filesData={mockFiles} />);
    const checkbox = screen.getByLabelText("Select file: report.pdf");
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it("selects all available files via master checkbox", () => {
    render(<FileDownloader filesData={mockFiles} />);
    const masterCheckbox = screen.getByLabelText(/None Selected/i);
    fireEvent.click(masterCheckbox);

    expect(screen.getByLabelText("Select file: report.pdf")).toBeChecked();
    expect(screen.getByLabelText("Select file: notes.txt")).toBeChecked();
    expect(screen.getByLabelText("Select file: photo.jpg")).not.toBeChecked();
  });

  it("disables download button when nothing is selected", () => {
    render(<FileDownloader filesData={mockFiles} />);
    const downloadBtn = screen.getByRole("button", {
      name: /Download Selected/i,
    });
    expect(downloadBtn).toBeDisabled();
  });

  it("enables download button when files are selected", () => {
    render(<FileDownloader filesData={mockFiles} />);
    fireEvent.click(screen.getByLabelText("Select file: report.pdf"));
    const downloadBtn = screen.getByRole("button", {
      name: /Download Selected/i,
    });
    expect(downloadBtn).toBeEnabled();
  });

  it("calls downloadFiles with selected files", () => {
    const mockDownload = vi.fn();
    render(
      <FileDownloader filesData={mockFiles} downloadFiles={mockDownload} />
    );

    fireEvent.click(screen.getByLabelText("Select file: notes.txt"));
    fireEvent.click(screen.getByRole("button", { name: /Download Selected/i }));

    expect(mockDownload).toHaveBeenCalledTimes(1);
    expect(mockDownload).toHaveBeenCalledWith([
      expect.objectContaining({ name: "notes.txt" }),
    ]);
  });
});
