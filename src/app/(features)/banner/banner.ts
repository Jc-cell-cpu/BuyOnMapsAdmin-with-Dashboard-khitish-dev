"use server";

import { cookies } from "next/headers";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://buyonmaps-api.onrender.com"; // Fallback for safety

export async function fetchBanner() {
  const cookieStore = cookies();
  const url = `${BASE_URL}/api/v1/admin/banner`;
  const token = cookieStore.get("authToken")?.value;

  if (!token) {
    throw new Error("Authentication token not found");
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const jsonResponse = await response.json();
    // console.log("success");

    return jsonResponse; // Return only the posts array
  } catch (error) {
    // console.error("Failed to fetch Banners:", error);
    return {};
  }
}

export async function uploadImages(formData: FormData): Promise<{
  response: any;
  data: { endpoint: string; imagePaths: string[] };
}> {
  const cookieStore = cookies();
  const url = `${BASE_URL}/api/v1/upload/images`;
  const token = cookieStore.get("authToken")?.value;

  if (!token) {
    throw new Error("Authentication token not found");
  }

  try {
    console.log("Uploading image...");
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      //   console.error("Image upload failed:", errorText || response.statusText);
      throw new Error(
        `Failed to upload image: ${errorText || response.statusText}`,
      );
    }

    const responseData = await response.json();
    // console.log("Image upload response:", responseData);
    return responseData;
  } catch (error) {
    // console.error("Error in uploadImage:", error);
    throw error;
  }
}

export async function createBanner(data: { imagePaths: string[] }) {
  const cookieStore = cookies();
  const url = `${BASE_URL}/api/v1/admin/banner/create`;
  const token = cookieStore.get("authToken")?.value;

  if (!token) {
    throw new Error("Authentication token not found");
  }

  try {
    // console.log(
    //   "Request Payload:",
    //   JSON.stringify({ imageUrls: data.imagePaths }),
    // );

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageUrls: data.imagePaths }), // Updated payload structure
    });

    if (!response.ok) {
      const errorText = await response.text();
      //   console.error("Banner creation failed:", errorText);
      throw new Error(`Banner creation failed: ${errorText}`);
    }

    const jsonResponse = await response.json();
    // console.log("Banner created successfully");
    return jsonResponse;
  } catch (error) {
    // console.error("Failed to create banner:", error);
    throw error;
  }
}

export async function deleteBanner(id: any) {
  const cookieStore = cookies();
  const url = `${BASE_URL}/api/v1/admin/banner/delete/${id}`;
  const token = cookieStore.get("authToken")?.value;

  if (!token) {
    throw new Error("Authentication token not found");
  }

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      //   console.error("Banner deletion failed:", errorText);
      throw new Error(`Banner deletion failed: ${errorText}`);
    }

    const jsonResponse = await response.json();
    // console.log("Banner deleted successfully", jsonResponse);
    return jsonResponse;
  } catch (error) {
    // console.error("Failed to delete banner:", error);
    throw error;
  }
}

export async function editBanner(id: any, data: { imagePaths: string[] }) {
  const cookieStore = cookies();
  const url = `${BASE_URL}/api/v1/admin/banner/edit/${id}`;
  const token = cookieStore.get("authToken")?.value;

  if (!token) {
    throw new Error("Authentication token not found");
  }

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageUrls: data.imagePaths }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      //   console.error("Banner deletion failed:", errorText);
      throw new Error(`Banner deletion failed: ${errorText}`);
    }

    const jsonResponse = await response.json();
    // console.log("Banner deleted successfully", jsonResponse);
    return jsonResponse;
  } catch (error) {
    // console.error("Failed to delete banner:", error);
    throw error;
  }
}
