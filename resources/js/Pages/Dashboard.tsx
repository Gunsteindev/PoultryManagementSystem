import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';


import { ReactNode } from "react";
import { Link } from "@inertiajs/react";
import { FileChartPie, Moon, Sun, BriefcaseMedical, Bird, Egg, Ellipsis, UsersRound, House, Layers3, TicketCheck, HandCoins, Blocks, LayoutDashboard } from 'lucide-react'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/Components/ui/select';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/Components/ui/accordion"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"

import { useTheme, ThemeProvider } from "next-themes"
import { SidebarProvider, SidebarTrigger } from "@/Components/ui/sidebar"
import AppSidebar  from "../Layouts/AppSidebar"
import { Button } from "@/components/ui/button";
import BaseLayout from '@/Layouts/Layout';
import { Toaster } from "@/Components/ui/toaster"

interface BaseLayoutProp {
    children: ReactNode
}

const Dashboard: React.FC<BaseLayoutProp> = ({children}) => {

    const { setTheme } = useTheme()

    return (

        <AuthenticatedLayout
            // header={
            //     <h2 className="text-xl font-semibold leading-tight text-gray-800">
            //         Dashboard
            //     </h2>
            // }
        >
            {/* <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            You're logged in!
                        </div>
                    </div>
                </div>
            </div> */}
            <main>{children}</main>
            <Toaster />
            
        </AuthenticatedLayout>
    );
}


export default Dashboard
