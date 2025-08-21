import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useFilesData } from "./useFilesData";

const mockResponse = {
  files: [
    { name: "doc.pdf", path: "/docs", device: "Laptop", status: "available" },
    { name: "img.png", path: "/images", device: "Phone", status: "scheduled" },
  ],
};

describe("useFilesData", () => {
  const mockUrl = "/mock-data/files.json";

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  const mockFetch = (impl: () => Promise<Partial<Response>>) => {
    vi.stubGlobal("fetch", vi.fn(impl));
  };

  it("fetches and returns file data successfully", async () => {
    mockFetch(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })
    );

    const { result } = renderHook(() => useFilesData(mockUrl));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.filesData).toEqual(mockResponse.files);
    expect(result.current.error).toBeNull();
  });

  it("handles fetch error gracefully", async () => {
    mockFetch(() => Promise.resolve({ ok: false, status: 404 }));

    const { result } = renderHook(() => useFilesData(mockUrl));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.filesData).toEqual([]);
    expect(result.current.error).toContain("404");
  });

  it("handles network failure", async () => {
    mockFetch(() => Promise.reject(new Error("Network failure")));

    const { result } = renderHook(() => useFilesData(mockUrl));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.filesData).toEqual([]);
    expect(result.current.error).toBe("Network failure");
  });
});
