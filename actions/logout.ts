"use server"

import { signOut } from "@/auth";

export const logout = async () => {
    //server logic
    await signOut();
}