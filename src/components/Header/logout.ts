'use server'
// import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function logout() {
    try {
        const cookieStore = cookies();
        cookieStore.delete('authToken');
        return true;
    } catch {
        return false;
    }
}