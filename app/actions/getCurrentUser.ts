import { auth } from "@/auth";

export async function getCurrentUserEmail() {
    const session = await auth();
    return session?.user?.email ?? null;
}

export async function getCurrentUserName() {
    const session = await auth();
    return session?.user?.name ?? null;
}
