"use server";
import { cookies } from "next/headers";

export async function updateCategory(
  categoryId: string,
  data: { name: string; imageUrl: string | null },
) {
  const cookieStore = cookies();
  const token = cookieStore.get("authToken")?.value;

  if (!token) {
    throw new Error("Authentication token not found");
  }

  try {
    console.log(`Updating category ${categoryId} with data:`, data);
    const response = await fetch(
      `https://buyonmaps-api.onrender.com/api/v1/admin/categories/edit/${categoryId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      },
    );

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      const result = await response.json();
      if (!response.ok) {
        // console.error("Server responded with an error:", result);
        throw new Error(result.message || "Failed to update category");
      }
      // console.log("Category updated successfully:", result.data);
      return result.data;
    } else {
      const text = await response.text();
      // console.error("Unexpected response:", text);
      throw new Error("Received non-JSON response from server");
    }
  } catch (error) {
    // console.error("Error updating category:", error);
    throw new Error(
      `Failed to update category: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

export async function uploadImage(formData: FormData): Promise<string> {
  const cookieStore = cookies();
  const token = cookieStore.get("authToken")?.value;

  if (!token) {
    throw new Error("Authentication token not found");
  }

  try {
    console.log("Uploading image...");
    const response = await fetch(
      "https://buyonmaps-api.onrender.com/api/v1/upload/image",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      // console.error("Image upload failed:", errorText);
      throw new Error(`Failed to upload image: ${errorText}`);
    }

    const data = await response.json();
    // console.log("Image upload response:", data);
    return data.data.imagePath;
  } catch (error) {
    // console.error("Error in uploadImage:", error);
    throw error;
  }
}
