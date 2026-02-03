import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  timestamp: number;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate inputs
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Create JWT token with form data
    const payload: ContactFormData = {
      name,
      email,
      message,
      timestamp: Date.now(),
    };

    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: "24h",
      issuer: "portfolio-contact",
    });

    // In production, you would:
    // 1. Store this in a database
    // 2. Send an email notification
    // 3. Log it securely

    console.log("[Contact Form]", {
      name,
      email,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Message received. I'll get back to you soon.",
        token,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to process your message" },
      { status: 500 }
    );
  }
}

// Verify JWT token (for email verification or admin panel)
export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json(
        { error: "Missing token" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    return NextResponse.json({ valid: true, data: decoded });
  } catch (error) {
    return NextResponse.json(
      { valid: false, error: "Invalid or expired token" },
      { status: 401 }
    );
  }
}
