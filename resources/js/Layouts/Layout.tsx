
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
import AppSidebar  from "./AppSidebar"
import { Button } from "@/components/ui/button";
  
interface BaseLayoutProp {
    children: ReactNode
}


const BaseLayout: React.FC<BaseLayoutProp> = ({children}) => {

    const { setTheme } = useTheme()


    return(
	
        <main className="flex h-screen max-h-screen font-montserrat dark:bg-slate-800">
            <SidebarProvider >
                <div >
                    <AppSidebar />
                </div>
                <div className="w-full grid grid-rows-[5vh_90vh_5vh]">
                    <div className="px-10 flex justify-between items-center dark:bg-slate-800">
                        <div>
                            <SidebarTrigger />
                        </div>
                        <div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button size="icon" className='bg-transparent dark:text-white text-black shadow-none border-none hover:bg-transparent'>
                                        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                        <span className="sr-only">Toggle theme</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className=''>
                                    <DropdownMenuItem onClick={() => setTheme("light")}>
                                        Light
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                                        Dark
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setTheme("light")}>
                                        System
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                    {/* <div className="bg-orange-50 dark:bg-slate-900 overflow-y-auto scrollbar-hidden">
                        {children}
                    </div> */}
                    <div className="bg-orange-50 dark:bg-slate-900 py-2 px-10 text-sm text-gray-600 flex justify-end items-center space-x-5">
                        <h1>Develop by Serge Inc</h1>
                    </div>
                </div>
            </SidebarProvider>
        </main>
    )
}

export default BaseLayout