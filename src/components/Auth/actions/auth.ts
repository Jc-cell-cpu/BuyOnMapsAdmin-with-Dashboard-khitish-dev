"use server";

import { cookies } from "next/headers";

interface AuthResponse {
  success: boolean;
  error?: string;
}

export async function signIn(
  prevState: AuthResponse,
  formData: FormData,
): Promise<AuthResponse> {
  try {
    const response = await fetch(
      "https://buyonmaps-api.onrender.com/api/v1/admin/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.message || "Authentication failed",
      };
    }

    // Set HTTP-only cookie
    cookies().set({
      name: "authToken",
      value: data.data.accessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 2, // 2 day
    });

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Something went wrong",
    };
  }
}
