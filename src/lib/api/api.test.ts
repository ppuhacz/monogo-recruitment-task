import { describe, it, expect, vi } from "vitest";
import { query } from "./api";
import type { QueryResult } from "./api.types";

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([{ label: "POSITIVE", score: 0.9 }]),
  }),
) as unknown as ReturnType<typeof vi.fn>;

describe("query", () => {
  it("should return query result", async () => {
    const data = { inputs: "Your text to analyze" };
    const result: QueryResult = await query(data);

    expect(result).toEqual([{ label: "POSITIVE", score: 0.9 }]);
    expect(fetch).toHaveBeenCalledWith(
      "https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );
  });

  it("should handle fetch error", async () => {
    (fetch as ReturnType<typeof vi.fn>).mockImplementationOnce(() =>
      Promise.reject(new Error("Fetch error")),
    );

    const data = { inputs: "Your text to analyze" };
    await expect(query(data)).rejects.toThrow("Fetch error");
  });
});
