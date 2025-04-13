"use server";

import { cookies } from "next/headers";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://buyonmaps-api.onrender.com"; // Fallback for safety

interface AuthResponse {
  success: boolean;
  error?: string;
}

export async function signIn(
  prevState: AuthResponse,
  formData: FormData,
): Promise<AuthResponse> {
  const url = `${BASE_URL}/api/v1/admin/auth/login`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.message || "Authentication failed",
      };
    }

    // Set HTTP-only cookie for access token
    cookies().set({
      name: "authToken",
      value: data.data.accessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 2, // 2 days
    });

    // Store email in a separate cookie (not HTTP-only so client can read it)
    cookies().set({
      name: "userEmail",
      value: data.data.admin.email,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 2, // 2 days
    });

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Something went wrong",
    };
  }
}
