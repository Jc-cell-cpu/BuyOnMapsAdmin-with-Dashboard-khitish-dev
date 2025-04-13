"use server";
import { cookies } from "next/headers"; // Adjust import based on your framework (e.g., Next.js)

export async function fetchAllUsers(): Promise<number> {
  const cookieStore = cookies();
  const token = cookieStore.get("authToken")?.value;
  const baseUrl =
    process.env.API_BASE_URL || "https://buyonmaps-api.onrender.com";

  if (!token) {
    throw new Error("Authentication token not found");
  }

  if (!baseUrl) {
    throw new Error("API base URL not defined in environment variables");
  }

  try {
    console.log("Fetching all users...");
    const response = await fetch(`${baseUrl}/api/v1/admin/dashboard/allUsers`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch users: ${errorText}`);
    }

    const data = await response.json();
    return data.data["total Users"];
  } catch (error) {
    console.error("Error in fetchAllUsers:", error);
    throw error;
  }
}

// app/dashboard/API_Calls/Dashboard_Apis.ts
export async function fetchAllPosts(): Promise<{ [key: string]: number }> {
  const cookieStore = cookies();
  const token = cookieStore.get("authToken")?.value;
  const baseUrl =
    process.env.API_BASE_URL || "https://buyonmaps-api.onrender.com";

  if (!token) {
    throw new Error("Authentication token not found");
  }

  try {
    console.log("Fetching all posts...");
    const response = await fetch(`${baseUrl}/api/v1/admin/dashboard/allPosts`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch posts: ${errorText}`);
    }

    const data = await response.json();
    return data.data; // Return full data object
  } catch (error) {
    console.error("Error in fetchAllPosts:", error);
    throw error;
  }
}

export async function fetchAllAppointments(): Promise<number> {
  const cookieStore = cookies();
  const token = cookieStore.get("authToken")?.value;
  const baseUrl =
    process.env.API_BASE_URL || "https://buyonmaps-api.onrender.com";

  if (!token) {
    throw new Error("Authentication token not found");
  }

  if (!baseUrl) {
    throw new Error("API base URL not defined in environment variables");
  }

  try {
    console.log("Fetching all appointments...");
    const response = await fetch(
      `${baseUrl}/api/v1/admin/dashboard/allAppointments`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch appointments: ${errorText}`);
    }

    const data = await response.json();
    return data.data["Total appointments"];
  } catch (error) {
    console.error("Error in fetchAllAppointments:", error);
    throw error;
  }
}
