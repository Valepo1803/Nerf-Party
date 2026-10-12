import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { child_name, is_staying } = await request.json();

    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!BOT_TOKEN || !CHAT_ID) {
      return NextResponse.json({ error: "Missing Telegram config" }, { status: 500 });
    }

    // Format the message for your dad
    const stayingText = is_staying ? "🟢 Parent is Staying" : "🔴 Parent is Not Staying";
    const message = `🎯 NEW NERF PARTY RSVP!\n\nChild: ${child_name}\nStatus: ${stayingText}`;

    // Send request to Telegram's API
    const telegramRes = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
        }),
      }
    );

    if (!telegramRes.ok) {
      throw new Error("Failed to send Telegram message");
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Notification error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}