import { NextResponse } from "next/server";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("resume");

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "No resume provided." }, { status: 400 });
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { error: "Resume is too large. Please upload a file smaller than 5 MB." },
      { status: 413 },
    );
  }

  const arrayBuffer = await file.arrayBuffer();
  const checksum = await crypto.subtle.digest("SHA-256", arrayBuffer);
  const hashArray = Array.from(new Uint8Array(checksum));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

  return NextResponse.json({
    filename: file.name,
    size: file.size,
    type: file.type || "application/octet-stream",
    checksum: hashHex,
  });
}
