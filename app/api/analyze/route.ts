import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { reviews, question } = await req.json();

    const prompt = `
Bạn là chuyên gia phân tích feedback khách hàng.

Dữ liệu:
${reviews.join("\n")}

Yêu cầu:
- Trả lời ngắn gọn
- Có insight cụ thể
- Không chung chung

Câu hỏi:
${question}
`;

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
    });

    // ✅ SAFE EXTRACT
    const result =
      response.output_text ||
      "Không thể phân tích dữ liệu.";

    return Response.json({ result });

  } catch (error) {
    console.error("AI ERROR:", error);
    return new Response("Error", { status: 500 });
  }
}