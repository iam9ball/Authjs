'use client'

import { useRouter } from "next/navigation";
import {
 Dialog,
 DialogContent,
 DialogTrigger
} from "@/components/ui/dialog";
import LoginForm from "@/components/auth/login-form"
interface LoginButtonProps {
    children: React.ReactNode;
    mode?: "modal" | "redirect";
    hasChild?: boolean;
}


export const LoginButton = ({
    children,
    mode,
    hasChild
}: LoginButtonProps) => {

    const router = useRouter();
    const onClick = () => {
        router.push("/auth/login");
    }
   
    if(mode === "modal") {
     return (
        <Dialog>
            <DialogTrigger asChild={hasChild}>
               {children}

            </DialogTrigger>
            <DialogContent className="p-0 w-auto bg-transparent 
            border-none">
                <LoginForm/>
            </DialogContent>
        </Dialog>
     )
    }
    return (
        <span onClick={onClick} className="cursor-pointer">
            {children}
        </span>
    );
};
