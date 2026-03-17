"use client";

import { useState, useRef, useEffect } from "react";
import { reviews } from "@/data/reviews";

type Props = {
  productId: number;
};

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

export default function AIChat({ productId }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 🔥 CORE SEND FUNCTION
  const handleSend = async (question: string) => {
    if (!question.trim()) return;

    const productReviews = reviews.filter(
      (r) => r.productId === productId
    );

    const newMessages: Message[] = [
      ...messages,
      {
        id: Date.now(),
        role: "user",
        content: question,
      },
    ];

    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        body: JSON.stringify({
          reviews: productReviews.map((r) => r.comment),
          question,
        }),
      });

      if (!res.ok) {
        console.error("API error");
        setLoading(false);
        return;
      }

      const data = await res.json();

      const aiMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content: data.result,
      };

      setMessages([...newMessages, aiMessage]);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="bg-white border rounded-xl p-5 shadow-sm">

      {/* HEADER */}
      <div className="font-semibold text-gray-900 mb-4">
        🤖 AI Chat Assistant
      </div>

      {/* 🔥 QUICK PROMPTS (FIX MỜ) */}
      <div className="flex flex-wrap gap-2 mb-4">
        {[
          "Tại sao sản phẩm bị đánh giá thấp?",
          "Gợi ý cải thiện sản phẩm",
          "Vấn đề nào nghiêm trọng nhất?",
          "Khách hàng đang không hài lòng điều gì?",
        ].map((text, i) => (
          <button
            key={i}
            onClick={() => handleSend(text)}
            className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-orange-100 border border-gray-300 rounded-full transition font-medium text-gray-800"
          >
            {text}
          </button>
        ))}
      </div>

      {/* CHAT BOX */}
      <div className="border rounded p-4 h-[320px] overflow-y-auto space-y-3 bg-white">

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-3 rounded-lg w-fit max-w-[70%] ${
              msg.role === "user"
                ? "bg-orange-500 text-white ml-auto text-right"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {msg.content}
          </div>
        ))}

        {loading && (
          <div className="text-gray-500 italic animate-pulse">
            🤖 AI đang phân tích...
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* INPUT */}
      <div className="mt-3 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Hỏi AI..."
          className="flex-1 border px-3 py-2 rounded text-gray-800"
        />

        <button
          onClick={() => handleSend(input)}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          Gửi
        </button>
      </div>
    </div>
  );
}