import { GoogleGenerativeAI} from "@google/generative-ai";
import { Request, Response } from "express";
const dotenv = require("dotenv").config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
console.log(genAI);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


export async function suggestBlogContent(req: Request, res: Response) {
  const { title } = req.body;
  try {
    const response =
      await model.generateContent(`You are a professional blogger.  
        Given the title ${title}, write a detailed blog post (include hyperlinks if possible) in **pure HTML** format **without** any Markdown code fences or backticks:\n\n
        Do not give title in starting. Blog Content (HTML only):
       `);
    const text = response.response.text();
    const text2 = text.replace(/```(?:html)?\n([\s\S]*?)```/, "$1");
    res.json({ markdown: text2 });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}



export async function suggestTrendingTitles(req: Request, res: Response) {
    try {

        const response = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: `You are an expert content strategist. ` +
          `Suggest 5 trending blog post titles that a tech blogger could write about today. ` +
          `Return only a JSON object with a "titles" field containing an array of strings.` }] }]
          });
      // response.json() reads the structured JSON directly
      const result = response.response.text();
    const text2 = result.replace(/```(?:json)?\n([\s\S]*?)```/, "$1");

      res.json({ titles: text2 });
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }


export async function runVulgarCheck(text: string): Promise<boolean> {
  const prompt = `Is the following comment vulgar or inappropriate? Reply ONLY with "yes" or "no". Comment: "${text}"`;
  const response = await model.generateContent(prompt);
  const result = response.response.text().toLowerCase();

  if (result.includes("yes")) {
    return true;
  }
  return false;
}
