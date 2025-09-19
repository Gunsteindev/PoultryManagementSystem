import { useState, useEffect, useMemo } from 'react';
import { ReactNode } from "react";
// import { Card, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card"
import Dashboard from '../Dashboard';
import { TrendingUp } from 'lucide-react'
import { useBandPurchaseStore } from '@/lib/Stores/bandPurchaseStore';
import { usePickupStore } from '@/lib/Stores/pickupStore';
import { useEggSaleStore } from '@/lib/Stores/eggSaleStore';
import { useBirdSaleStore } from '@/lib/Stores/birdSaleStore';
import { totalBirdCost, totalBird, totalBirdSale, totalCratesData } from '@/lib/utils';
import { useTranslation } from "react-i18next";
import i18n from "../../lib/i18n";





const Home = () => {

    const { i18n } = useTranslation();


    useEffect(() => {
        console.log("Current language:", i18n.language);
        console.log("Loaded translations:", i18n.options.backend && typeof i18n.options.backend === 'object' && 'loadPath' in i18n.options.backend ? i18n.options.backend.loadPath : "Backend options not available");
    }, []);

    const [activeTab, setActiveTab] = useState("tab1");

    const handleTabClick = (tab: string) => {
      setActiveTab(tab);
    };


    return (
        <></>
    )
}

Home.layout = (page: ReactNode) => <Dashboard children={page} />
export default Home

