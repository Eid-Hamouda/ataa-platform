"use server";

import { analyzeImageBuffer, AIAnalysisResult } from "@/services/aiVisionService";

export async function analyzeItemAction(formData: FormData): Promise<AIAnalysisResult | null> {
  const file = formData.get("image") as File;
  if (!file) return null;

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Data = buffer.toString("base64");

    return await analyzeImageBuffer(base64Data, file.type);
  } catch (error) {
    console.error("Server action file processing failed:", error);
    return null;
  }
}