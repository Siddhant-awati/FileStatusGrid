import {
  getFileKey,
  getAvailableFiles,
  getSelectAllState,
  toggleKey,
  formatDownloadMessage,
  type SelectAllState,
} from "./fileHandlerUtils";

import type { FileModel } from "../types/FileModel";

const mockFiles: FileModel[] = [
  {
    name: "report",
    path: "/docs/report.pdf",
    device: "Laptop",
    status: "available",
  },
  {
    name: "image",
    path: "/images/photo.jpg",
    device: "Phone",
    status: "scheduled",
  },
  {
    name: "notes",
    path: "/notes/todo.txt",
    device: "Tablet",
    status: "available",
  },
];

describe("getFileKey", () => {
  it("generates a unique key from name and path", () => {
    const file = mockFiles[0];
    expect(getFileKey(file)).toBe("report-/docs/report.pdf");
  });

  it("handles empty name or path", () => {
    const file: FileModel = {
      name: "",
      path: "",
      device: "Unknown",
      status: "available",
    };
    expect(getFileKey(file)).toBe("-");
  });
});

describe("getAvailableFiles", () => {
  it("returns only files with status 'available'", () => {
    const result = getAvailableFiles(mockFiles);
    expect(result).toHaveLength(2);
    expect(result.every((f) => f.status === "available")).toBe(true);
  });

  it("returns empty array if none are available", () => {
    const unavailable: FileModel[] = mockFiles.map((f) => ({
      ...f,
      status: "scheduled" as const,
    }));
    expect(getAvailableFiles(unavailable)).toEqual([]);
  });
});

describe("getSelectAllState", () => {
  const availableKeys = mockFiles
    .filter((f) => f.status === "available")
    .map(getFileKey);

  it("returns 'none' when no keys are selected", () => {
    expect(getSelectAllState([], availableKeys)).toBe<SelectAllState>("none");
  });

  it("returns 'all' when all available keys are selected", () => {
    expect(
      getSelectAllState(availableKeys, availableKeys)
    ).toBe<SelectAllState>("all");
  });

  it("returns 'some' when partial selection exists", () => {
    expect(
      getSelectAllState([availableKeys[0]], availableKeys)
    ).toBe<SelectAllState>("some");
  });
});

describe("toggleKey", () => {
  it("adds key if not present", () => {
    expect(toggleKey("x", [])).toEqual(["x"]);
  });

  it("removes key if already present", () => {
    expect(toggleKey("x", ["x", "y"])).toEqual(["y"]);
  });

  it("preserves other keys", () => {
    expect(toggleKey("z", ["x", "y"])).toEqual(["x", "y", "z"]);
  });
});

describe("formatDownloadMessage", () => {
  it("formats message for multiple files", () => {
    const result = formatDownloadMessage([mockFiles[0], mockFiles[2]]);
    expect(result).toContain("Path: /docs/report.pdf");
    expect(result).toContain("Device: Laptop");
    expect(result).toContain("Path: /notes/todo.txt");
  });

  it("returns empty string for empty input", () => {
    expect(formatDownloadMessage([])).toBe("");
  });
});
