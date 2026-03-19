import OpenAI from "openai";
import { reviews } from "@/data/reviews";

export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return Response.json({ error: "Missing API key" }, { status: 500 });
    }

    const { question, productId } = await req.json();

    const productReviews = reviews.filter(
      (r) => r.productId === productId
    );

    const reviewText = productReviews
      .map((r) => `- (${r.rating}⭐) ${r.comment}`)
      .join("\n");

    const prompt = `
Bạn là chuyên gia phân tích đánh giá Shopee.

Dữ liệu review:
${reviewText}

Câu hỏi: ${question}

Yêu cầu:
- Trả lời rõ ràng
- Mỗi ý xuống dòng
- Dùng bullet hoặc số thứ tự
- Không viết 1 đoạn dài
`;

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
    });

    return Response.json({
      result: response.output_text,
    });
  } catch (err) {
    return Response.json({ error: "AI failed" }, { status: 500 });
  }
}