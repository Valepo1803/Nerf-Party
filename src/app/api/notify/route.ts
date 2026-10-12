import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { child_name, is_staying } = await request.json();

    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_IDS = process.env.TELEGRAM_CHAT_ID;

    if (!BOT_TOKEN || !CHAT_IDS) {
      return NextResponse.json({ error: "Missing Telegram config" }, { status: 500 });
    }

    // Format the message for your dad
    const stayingText = is_staying ? "🟢 Parent is Staying" : "🔴 Parent is Not Staying";
    const message = `🎯 NEW NERF PARTY RSVP!\n\nChild: ${child_name}\nStatus: ${stayingText}`;

    const chatIdsArray = CHAT_IDS.split(",").map((id) => id.trim());

    // Send to all chat IDs concurrently
    const promises = chatIdsArray.map((chatId) =>
      fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
        }),
      })
    );

    const results = await Promise.all(promises);

    // Check if any failed
    for (const res of results) {
      if (!res.ok) {
        throw new Error("Failed to send Telegram message to one or more recipients");
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Notification error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}