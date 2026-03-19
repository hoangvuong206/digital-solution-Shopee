"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

type Props = {
  productId: number;
};

export default function AIChat({ productId }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // ✅ AUTO SCROLL
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      role: "user",
      content: messageText,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        body: JSON.stringify({
          productId,
          question: messageText,
        }),
      });

      if (!res.ok) throw new Error("API failed");

      const data = await res.json();

      const aiMsg: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content: data.result,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          role: "assistant",
          content: "❌ Có lỗi xảy ra",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickQuestions = [
    "Tại sao sản phẩm bị đánh giá thấp?",
    "Gợi ý cải thiện sản phẩm",
    "Vấn đề nào nghiêm trọng nhất?",
    "Khách hàng đang không hài lòng điều gì?",
  ];

  return (
    <div className="mt-6 border rounded-xl p-5 bg-white shadow-md">
      {/* HEADER */}
      <div className="flex items-center gap-2 mb-3">
        <Image src="/images/tep.png" alt="tep" width={78} height={78} />
        <div>
          <p className="font-semibold text-gray-800">Tép trợ thủ</p>
          <p className="text-xs text-gray-500">
            AI phân tích đánh giá sản phẩm
          </p>
        </div>
      </div>

      {/* QUICK QUESTIONS */}
      <div className="flex flex-wrap gap-2 mb-4">
        {quickQuestions.map((q, i) => (
          <button
            key={i}
            onClick={() => sendMessage(q)}
            className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full border"
          >
            {q}
          </button>
        ))}
      </div>

      {/* CHAT BOX */}
      <div className="h-[300px] overflow-y-auto border rounded-lg p-3 bg-gray-50 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-end gap-2 ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {/* AVATAR AI */}
            {msg.role === "assistant" && (
              <Image
                src="/images/tep.png"
                alt="tep"
                width={38}
                height={38}
              />
            )}

            {/* MESSAGE */}
            <div
              className={`px-4 py-2 rounded-xl max-w-[70%] text-sm leading-relaxed whitespace-pre-line ${
                msg.role === "user"
                  ? "bg-orange-500 text-white"
                  : "bg-gray-200 text-gray-900"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {/* LOADING */}
        {loading && (
          <div className="flex items-center gap-2">
            <Image src="/images/tep.png" alt="tep" width={26} height={26} />
            <span className="text-sm text-gray-600 font-medium">
              Tép đang phân tích...
            </span>
          </div>
        )}

        {/* 👇 AUTO SCROLL TARGET */}
        <div ref={chatEndRef} />
      </div>

      {/* INPUT */}
      <div className="mt-3 flex gap-2">
        <textarea
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              if (loading) return;
              sendMessage();
            }
          }}
          rows={1}
          className="flex-1 border rounded-lg px-3 py-2 text-sm text-gray-800 resize-none"
          placeholder="Hỏi AI về sản phẩm..."
        />

        <button
          onClick={() => sendMessage()}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg"
        >
          Gửi
        </button>
      </div>
    </div>
  );
}