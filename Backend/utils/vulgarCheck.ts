import { gemini } from "@/lib/gemini"; // Your Gemini instance

export async function runVulgarCheck(text: string): Promise<boolean> {
  const prompt = `Is the following comment vulgar or inappropriate? Reply ONLY with "yes" or "no". Comment: "${text}"`;

  const response = await gemini.generateContent(prompt);
  const result = response.text().toLowerCase();

  if (result.includes("yes")) {
    return true;
  }
  return false;
}
