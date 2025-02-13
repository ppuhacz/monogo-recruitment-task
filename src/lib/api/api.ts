import type { QueryResult } from "./api.types";

export async function query(data: { inputs: string }) {
  const response = await fetch(
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
  const result: QueryResult = await response.json();
  return result;
}
