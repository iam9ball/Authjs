'use client'
import { UserInfo } from "@/components/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";
const ClientPage = async () => {

    const user = useCurrentUser();

    return (
        <UserInfo 
        label="Client components"
        user={user}
        />
    )
}

export default ClientPage; 