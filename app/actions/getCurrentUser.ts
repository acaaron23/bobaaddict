import { auth } from "@/auth";

export async function getCurrentUserEmail() {
    const session = await auth();
    return session?.user?.email ?? null;
}
