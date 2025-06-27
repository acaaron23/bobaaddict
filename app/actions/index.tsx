'use server'

import { signIn, signOut } from "@/auth";

export async function doLogin(formData: FormData) {
    const action = formData.get('action');

    if (typeof action !== 'string') {
        throw new Error("Invalid action submitted.");
    }

    await signIn(action, { redirectTo: "/" });
}

export async function doLogout() {
    await signOut({ redirectTo: "/" });
}
