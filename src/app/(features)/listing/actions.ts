"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const BASE_URL =
  process.env.API_BASE_URL || "https://buyonmaps-api.onrender.com"; // Fallback for safety

export async function viewDetails(data: any) {
  // Implement your database update logic here
  console.log(`Approving listing ${data?._id}`);
  // revalidatePath("/admin/listings");
  // return { success: true };
  const cookieStore = cookies();
  const url = `${BASE_URL}/api/v1/admin/postDetails?productId=${data._id}&categoryId=${data?.categoryId}`;
  const token = cookieStore.get("authToken")?.value;

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
    console.log("success");

    return jsonResponse; // Return only the posts array
  } catch (error) {
    console.error("Failed to fetch listings:", error);
    return {};
  }
}
export async function approveListing(data: any) {
  // Implement your database update logic here
  console.log(`Approving listing ${data?._id}`);
  // revalidatePath("/admin/listings");
  // return { success: true };

  const cookieStore = cookies();
  const url = `${BASE_URL}/api/v1/admin/updateStatus?productId=${data._id}&categoryId=${data?.categoryId}&productStatus=1`;
  const token = cookieStore.get("authToken")?.value;

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const jsonResponse = await response.json();
    console.log("success");

    return jsonResponse; // Return only the posts array
  } catch (error) {
    console.error("Failed to fetch listings:", error);
    return error;
  }
}

export async function rejectListing(data: any) {
  // Implement your database update logic here
  // console.log(`Rejecting listing ${id}`);
  // revalidatePath("/admin/listings");
  // return { success: true };

  const cookieStore = cookies();
  const url = `${BASE_URL}/api/v1/admin/updateStatus?productId=${data._id}&categoryId=${data?.categoryId}&productStatus=2`;
  const token = cookieStore.get("authToken")?.value;

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const jsonResponse = await response.json();
    console.log("success");

    return jsonResponse; // Return only the posts array
  } catch (error) {
    console.error("Failed to fetch listings:", error);
    return error;
  }
}

export async function deleteListing(data: any) {
  // Implement your database delete logic here
  // console.log(`Deleting listing ${id}`);
  // revalidatePath("/admin/listings");
  // return { success: true };

  const cookieStore = cookies();
  const url = `${BASE_URL}/api/v1/admin/deletePost?productId=${data._id}&categoryId=${data?.categoryId}`;
  const token = cookieStore.get("authToken")?.value;

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const jsonResponse = await response.json();
    console.log("success");

    return jsonResponse; // Return only the posts array
  } catch (error) {
    console.error("Failed to fetch listings:", error);
    return error;
  }
}

export async function updateListing(id: string, data: any) {
  // Implement your database update logic here
  console.log(`Updating listing ${id}`, data);
  revalidatePath("/admin/listings");
  return { success: true };
}

export const fetchListings = async (page: number, limit: number) => {
  const cookieStore = cookies();
  const url = `${BASE_URL}/api/v1/admin/allPosts?page=${page}&limit=${limit}`;
  const token = cookieStore.get("authToken")?.value;

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
    return jsonResponse || null;
  } catch (error) {
    console.error("Failed to fetch listings:", error);
    return [];
  }
};
