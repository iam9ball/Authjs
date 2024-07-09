import { auth } from "@/auth";

export const currentUser = async () => {
    const sesssion = await auth();

    return sesssion?.user;
}

export const currentRole = async () => {
    const sesssion = await auth();

    return sesssion?.user?.role;
}


