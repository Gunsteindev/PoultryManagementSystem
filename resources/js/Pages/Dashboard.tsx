import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { ReactNode } from "react";
import { useTheme } from "next-themes"
import { Toaster } from "@/Components/components/ui/toaster"

interface BaseLayoutProp {
    children: ReactNode
}

const Dashboard: React.FC<BaseLayoutProp> = ({children}) => {

    const { setTheme } = useTheme()

    return (
        <AuthenticatedLayout>
            <main>{children}</main>
            <Toaster /> 
        </AuthenticatedLayout>
    );
}


export default Dashboard
