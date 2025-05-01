import { useState, useEffect } from 'react';
import { ReactNode } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card"
import Dashboard from '../Dashboard';
// import { BandPurchaseProp } from '../table/BandPurchaseTable';
// import { PickupProp } from '../table/PickupTable';
// import { BirdSaleProp } from '../table/BirdSaleTable';
import { useBandPurchaseStore } from '@/lib/Stores/bandPurchaseStore';
import { usePickupStore } from '@/lib/Stores/pickupStore';
import { useBirdSaleStore } from '@/lib/Stores/birdSaleStore';
import { totalBirdCost, totalBird, totalBirdSale, totalCratesData } from '@/lib/utils';
import { useTranslation } from "react-i18next";
import i18n from "../../lib/i18n";


const Home = () => {

    // const { bandPurchases } = useBandPurchaseStore();
    // const { pickups } = usePickupStore();
    // const { birdSales } = useBirdSaleStore();

    // const setTotalBirdCost = totalBirdCost(bandPurchases)
    // const setTotalBird = totalBird(bandPurchases)
    // const setTotalBirdSale = totalBirdSale(birdSales)
    // const setTotalCratesData = totalCratesData(pickups)

    const { t, i18n } = useTranslation();

    useEffect(() => {
        console.log("Current language:", i18n.language);
        console.log("Loaded translations:", i18n.options.backend && typeof i18n.options.backend === 'object' && 'loadPath' in i18n.options.backend ? i18n.options.backend.loadPath : "Backend options not available");
    }, []);

    const crateCapacity = 30;
    // const additionalCrates = Math.floor(setTotalCratesData.totalQuantityRemain / crateCapacity);

    const [activeTab, setActiveTab] = useState("tab1");

    const handleTabClick = (tab: string) => {
      setActiveTab(tab);
    };


    return (
        <>
            <div className="w-full p-10 mx-auto space-y-8">
                <div className='flex justify-between items-center'>
                    <div><h1 className='text-2xl font-semibold'>Home</h1></div>
                </div>

                <h1>{t("welcome")}</h1>
                <h1>{t("language")}</h1>
                <h1>{t("home")}</h1>
                <div className='flex space-x-4'>
                <button onClick={() => i18n.changeLanguage("en")}>English</button>
                <button onClick={() => i18n.changeLanguage("fr")}>Français</button>
                </div>

            </div>

        </>
    )
}

Home.layout = (page: ReactNode) => <Dashboard children={page} />
export default Home

// function useEffect(arg0: () => void, arg1: never[]) {
//     throw new Error('Function not implemented.');
// }
