"use server";

import { UserDetails } from "@/types/api";
import { cookies } from "next/headers";

const BASE_URL =
  process.env.API_BASE_URL || "https://buyonmaps-api.onrender.com"; // Fallback for safety

export async function fetchUsers(page: number = 1) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("authToken")?.value;

    if (!token) {
      return { success: false, message: "User is not authenticated", data: [] };
    }

    const response = await fetch(
      `${BASE_URL}/api/v1/admin/auth/users?page=${page}&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );
    if (response.status === 401) {
      throw new Error("Unauthorized access");
    }

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    // const data: ApiResponse = await response.json();
    const data: any = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

export async function getUserDetails(userId: string): Promise<UserDetails> {
  const cookieStore = cookies();
  const token = cookieStore.get("authToken")?.value;
  if (!token) {
    throw new Error("Authentication token not found");
  }

  const response = await fetch(`${BASE_URL}/api/v1/admin/auth/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user details");
  }

  const data = await response.json();
  return data.data;
}

export async function toggleUserStatus(userId: string) {
  const cookieStore = cookies();
  const token = cookieStore.get("authToken")?.value;
  if (!token) {
    throw new Error("Authentication token not found");
  }

  const url = `${BASE_URL}/api/v1/admin/auth/deactivate/${userId}`;

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to toggle user status");
  }

  return await response.json();
}
