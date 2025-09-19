import Dropdown from '@/Components/Dropdown';
import { usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useState } from 'react';

import { Moon, Sun, Tally1 } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/components/ui/dropdown-menu"

import { useTheme } from "next-themes"
import { SidebarProvider, SidebarTrigger } from "@/Components/components/ui/sidebar"
import AppSidebar  from "../Layouts/AppSidebar"
import { Button } from "@/Components/components/ui/button";
import { useTranslation } from "react-i18next";
import { Avatar, AvatarFallback } from "@/Components/components/ui/avatar"
import GB from 'country-flag-icons/react/3x2/GB'
import FR from 'country-flag-icons/react/3x2/FR'

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;
    const roles = user.data.roles[0];
    
    console.log(user.data.name)

    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    const { setTheme } = useTheme()

    const { t, i18n } = useTranslation();

    const fullName = user.data.name;

    const initials = fullName
    .trim()
    .split(" ")
    .map((word: string) => word.charAt(0).toUpperCase())
    .join("");

    console.log("Initials:", initials);

    return (
        <div className="min-h-screen bg-gray-100">
            <main className="flex h-screen max-h-screen font-montserrat bg-white dark:bg-slate-800">
                <SidebarProvider >
                    <div >
                        <AppSidebar />
                    </div>
                    <div className="w-full grid grid-rows-[8vh_92vh]">
                        <div className="px-5 flex justify-between items-center dark:bg-slate-800 border">
                            <div>
                                <SidebarTrigger />
                            </div>
                            <div className='flex space-x-5'>
                                <div className='flex space-x-4'>
                                    <button onClick={() => i18n.changeLanguage("en")}>
                                        <GB title="United Kingdom" className="w-6 h-4 rounded-sm shadow-sm"/>
                                    </button>
                                    <button onClick={() => i18n.changeLanguage("fr")}>
                                        <FR title="France" className="w-6 h-4 rounded-sm shadow-sm"/>
                                    </button>
                                </div>
                                <div className="hidden sm:ms-6 sm:flex sm:items-center">
                                    <div className="relative ms-3 flex items-center">
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <span className="inline-flex rounded-md">
                                                    <button
                                                        type="button"
                                                        className="inline-flex items-center rounded-md border border-transparent bg-white dark:bg-slate-800 dark:text-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                                    >
                                                        <Avatar>
                                                            {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                                                            <AvatarFallback>{initials}</AvatarFallback>
                                                        </Avatar>
                                                    </button>
                                                    
                                                </span>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                            
                                                <Dropdown.Link
                                                    href={route('profile.edit')}
                                                >
                                                    Profile
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route('logout')}
                                                    method="post"
                                                    as="button"
                                                >
                                                    Log Out
                                                </Dropdown.Link>
                                            </Dropdown.Content>

                                        </Dropdown>
                                        <Tally1 className='text-gray-300'/>
                                        <span className='text-gray-500'>{roles}</span>
                                    </div>
                                </div>
                                <div className='flex items-center'>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                size="icon"
                                                className="bg-transparent text-black dark:text-white shadow-none border-none hover:bg-transparent focus:ring-0 focus:outline-none focus:border-none active:border-none"
                                            >
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
                        </div>
                        <div className="bg-orange-50 dark:bg-slate-900 overflow-y-auto scrollbar-hidden">
                            {children}
                        </div>
                        {/* <div className="bg-orange-50 dark:bg-slate-900 py-2 px-10 text-sm text-gray-600 flex justify-end items-center space-x-5">
                            <h1>Developed by Gunstein.dev</h1>
                        </div> */}
                    </div>
                </SidebarProvider>
            </main>
        </div>
    );
}
