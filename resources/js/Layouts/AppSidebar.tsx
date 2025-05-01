import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarMenu,
} from "@/Components/ui/sidebar"
import { Link, usePage } from "@inertiajs/react";
import { BriefcaseMedical, Bird, Egg, UsersRound, Blocks, LayoutDashboard, Settings } from 'lucide-react'
import { useEffect } from "react";
import { useTranslation } from "react-i18next";


const AppSidebar = () => {
    const user = usePage().props.auth.user;
    const roles = user.data.roles[0];

    const { t, i18n } = useTranslation();

    useEffect(() => {
        console.log("Current language:", i18n.language);
        console.log("Loaded translations:", i18n.options.backend && typeof i18n.options.backend === 'object' && 'loadPath' in i18n.options.backend ? i18n.options.backend.loadPath : "Backend options not available");
    }, []);
    
    return (
        <Sidebar className="h-full">
            <SidebarContent className="dark:bg-slate-800 bg-white">
                <SidebarGroup>
                    <SidebarGroupLabel className="mb-10 px-3">
                        <h1 className="text-2xl font-bold text-orange-600">Logo</h1>
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <nav className='space-y-4'>
                                {(roles === 'Admin' || roles === 'Supervisor' || roles === 'Production') && (
                                    <>
                                        <Link className="hover:bg-orange-50 dark:hover:bg-slate-900 p-2 rounded-lg flex space-x-5 items-center cursor-pointer nav-link" href="/Home/index"><LayoutDashboard className="text-orange-600" size={20} /><h1 className='text-base font-semibold'>{t("home")}</h1></Link>
                                    </>
                                )}
                                <Link className="hover:bg-orange-50 dark:hover:bg-slate-900 p-2 rounded-lg flex space-x-5 items-center cursor-pointer nav-link" href="/Ponte/index"><Egg className="text-orange-600"  size={20} /><h1 className='text-base font-semibold'>{t("egg")}</h1></Link>
                                <Link className="hover:bg-orange-50 dark:hover:bg-slate-900 p-2 rounded-lg flex space-x-5 items-center cursor-pointer nav-link" href="/Volaille/index"><Bird className="text-orange-600"  size={20} /><h1 className='text-base font-semibold'>{t("bird")}</h1></Link>
                                {(roles === 'Admin' || roles === 'Supervisor') && (
                                    <>
                                        <Link className="hover:bg-orange-50 dark:hover:bg-slate-900 p-2 rounded-lg flex space-x-5 items-center cursor-pointer nav-link" href="/Treatment/index"><BriefcaseMedical className="text-orange-600"  size={20} /><h1 className='text-base font-semibold'>{t("treatment")}</h1></Link>
                                        <Link className="hover:bg-orange-50 dark:hover:bg-slate-900 p-2 rounded-lg flex space-x-5 items-center cursor-pointer nav-link" href="/Consomation/index"><Blocks className="text-orange-600"  size={20} /><h1 className='text-base font-semibold'>{t("feeding")}</h1></Link>
                                        <Link className="hover:bg-orange-50 dark:hover:bg-slate-900 p-2 rounded-lg flex space-x-5 items-center cursor-pointer nav-link" href="/Admin/index"><Settings className="text-orange-600"  size={20} /><h1 className='text-base font-semibold'>Admin</h1></Link>
                                    </>
                                )}
                                
                            </nav>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                
            </SidebarContent>
            <SidebarFooter className="px-4 dark:bg-slate-800 bg-white"> 
                <div className="flex items-center space-x-5">
                    <div><UsersRound className="text-orange-600" size={20}/></div>
                    <div>{roles}</div>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}

export default AppSidebar
  