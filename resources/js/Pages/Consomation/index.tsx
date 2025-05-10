import { useState } from 'react';
import { Plus } from 'lucide-react'
import { ReactNode } from "react";
import { useFoodStore } from '@/lib/Stores/foodStore';
import { useConsomationStore } from '@/lib/Stores/consomationStore';
import { useTranslation } from "react-i18next";
import ConsomationForm from '../form/ConsomationForm';
import FoodForm from '../form/FoodForm';
import Dashboard from '../Dashboard';
import ConsomationTable from '../table/ConsomationTable';
import FoodTable from '../table/FoodTable';



const Feeding = () => {

    const [showDlg, setShowDlg] = useState(false)
    const [showConsomationDlg, setShowConsomationDlg] = useState(false)
    const [activeTab, setActiveTab] = useState("tab1");

    const { t, i18n } = useTranslation();
    const { foods } = useFoodStore();
    const { consomations } = useConsomationStore();

    const handleTabClick = (tab: string) => {
      setActiveTab(tab);
    };

    const toggleShowDlg = (open: boolean) => {
        setShowDlg(open);
    };
    const toggleShowConsomationDlg = (open: boolean) => {
        setShowConsomationDlg(open); 
    };

    const handleDialogToggle = (e: React.MouseEvent) => {
        e.stopPropagation(); // Stop event propagation
        toggleShowDlg(true); // Open the dialog (you can pass 'false' to close it)
    };
    const handleConsomationDialogToggle = (e: React.MouseEvent) => {
        e.stopPropagation(); // Stop event propagation
        toggleShowConsomationDlg(true); // Open the dialog (you can pass 'false' to close it)
    };

    return (
        <>
            <div className="w-full p-10 mx-auto space-y-8">
                <div className='flex justify-between items-center'>
                    <div><h1 className='text-2xl font-semibold'>{t("food")}</h1></div>
                </div>
                <div className=" overflow-y-auto scrollbar-hidden space-y-8">
                    {/* Tab Buttons */}
                    <div className="flex justify-between bg-white dark:bg-slate-800">
                        <button
                            className={`flex-1 py-2 text-center font-bold rounded-md ${
                                activeTab === "tab1"
                                ? " bg-orange-500 text-white"
                                : "text-gray-500"
                            }`}
                            onClick={() => handleTabClick("tab1")}
                        >
                            {t("food")}
                        </button>
                        <button
                            className={`flex-1 py-2 text-center font-bold rounded-md ${
                                activeTab === "tab2"
                                ? "bg-orange-500 text-white"
                                : "text-gray-500 border-x"
                            }`}
                            onClick={() => handleTabClick("tab2")}
                        >
                            {t("feeding")}
                        </button>
                    </div>

                    {/* Tab Content */}
                    <div className="">
                        {activeTab === "tab1" && 
                            <div className='space-y-10 py-5'>
                                <div className='flex space-x-10'>
                                    <div className=''>
                                        <button 
                                            className='flex item-center space-x-3 bg-white px-4 py-2 dark:bg-slate-800 dark:text-white text-md text-black border' 
                                            onClick={handleDialogToggle}
                                        >
                                            <Plus size={20} />
                                            <span>{t("food_newPurchase")}</span>
                                        </button>
                                        
                                    </div>
                                </div>
                                
                                <div>
                                    <FoodTable foodData = {foods} />
                                </div>
                                {showDlg && <FoodForm showDlg={showDlg} toggleDlg={toggleShowDlg}/>}
                            </div>
                        }
                        {activeTab === "tab2" && 
                            <div className='space-y-10 py-5'>
                                <div className='flex space-x-10'>
                                    <div className=''>
                                        <button 
                                            className='flex item-center space-x-3 bg-white px-4 py-2 dark:bg-slate-800 dark:text-white text-md text-black border' 
                                            onClick={handleConsomationDialogToggle}
                                        >
                                            <Plus size={20} />
                                            <span>{t("feeding_newPurchase")}</span>
                                        </button>
                                    </div>
                                </div>
                                
                                <div>
                                    <ConsomationTable consomationData = {consomations} />
                                </div>
                                {showConsomationDlg && <ConsomationForm showDlg={showConsomationDlg} toggleDlg={toggleShowConsomationDlg} />}
                            </div>
                        }
                    </div>
                </div>
            </div>

        </>
    )
}

Feeding.layout = (page: ReactNode) => <Dashboard children={page} />
export default Feeding