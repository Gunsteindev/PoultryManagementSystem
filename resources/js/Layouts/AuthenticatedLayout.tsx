import Dropdown from '@/Components/Dropdown';
import { usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useState } from 'react';

import { Moon, Sun } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"

import { useTheme } from "next-themes"
import { SidebarProvider, SidebarTrigger } from "@/Components/ui/sidebar"
import AppSidebar  from "../Layouts/AppSidebar"
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

import { useEffect } from 'react';

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;
    
    console.log(user.data.name)

    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    const { setTheme } = useTheme()

    const { t, i18n } = useTranslation();
    
    // useEffect(() => {
    //     console.log("Current language:", i18n.language);
    //     console.log("Loaded translations:", i18n.options.backend && typeof i18n.options.backend === 'object' && 'loadPath' in i18n.options.backend ? i18n.options.backend.loadPath : "Backend options not available");
    // }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <main className="flex h-screen max-h-screen font-lexend bg-white dark:bg-slate-800">
                <SidebarProvider >
                    <div >
                        <AppSidebar />
                    </div>
                    <div className="w-full grid grid-rows-[5vh_90vh_5vh]">
                        <div className="px-10 flex justify-between items-center dark:bg-slate-800">
                            <div>
                                <SidebarTrigger />
                            </div>
                            <div className='flex'>
                                <div className='flex space-x-4'>
                                    <button onClick={() => i18n.changeLanguage("en")}>English</button>
                                    <button onClick={() => i18n.changeLanguage("fr")}>Français</button>
                                </div>
                                <div className="hidden sm:ms-6 sm:flex sm:items-center">
                                    <div className="relative ms-3">
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <span className="inline-flex rounded-md">
                                                    <button
                                                        type="button"
                                                        className="inline-flex items-center rounded-md border border-transparent bg-white dark:bg-slate-800 dark:text-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                                    >
                                                        {user.data.name}

                                                        <svg
                                                            className="-me-0.5 ms-2 h-4 w-4"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
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
                                    </div>
                                </div>
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
                        <div className="bg-orange-50 dark:bg-slate-900 overflow-y-auto scrollbar-hidden">
                            {children}
                        </div>
                        <div className="bg-orange-50 dark:bg-slate-900 py-2 px-10 text-sm text-gray-600 flex justify-end items-center space-x-5">
                            <h1>Developed by Gunstein.dev</h1>
                        </div>
                    </div>
                </SidebarProvider>
            </main>
        </div>
    );
}
