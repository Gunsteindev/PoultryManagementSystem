import { useState, useEffect } from 'react';
import { Plus, BadgeDollarSign } from 'lucide-react';
import { ReactNode } from 'react';
import ProductForm from '@/Pages/form/ProductForm';
import { Card, CardHeader, CardDescription, CardTitle } from '@/Components/ui/card';
import Dashboard from '../Dashboard';
import PickupTable from '../table/PickupTable';
import EggSaleTable from '../table/EggSaleTable';
import CustomerForm from '../form/CustomerForm';
import EggSaleForm from '../form/EggSaleForm';
import { PickupProp } from '../table/PickupTable';
import { useEggSaleStore } from '@/lib/Stores/eggSaleStore';
import { usePickupStore } from '@/lib/Stores/pickupStore';
import { usePage } from '@inertiajs/react';
import { totalCratesData } from '@/lib/utils';
import { useTranslation } from "react-i18next";


const Ponte = () => {

    const user = usePage().props.auth.user;
    const roles = user.data.roles[0];

    const [showDlg, setShowDlg] = useState(false);
    const [showPickupDlg, setShowPickupDlg] = useState(false);
    const [showCustomerDlg, setShowCustomerDlg] = useState(false);
    const [activeTab, setActiveTab] = useState('tab1');

    const { t, i18n } = useTranslation();
    const { eggSales } = useEggSaleStore();
    const { pickups } = usePickupStore();

    const toggleShowDlg = (open: boolean) => setShowDlg(open);
    const toggleShowPickupDlg = (open: boolean) => setShowPickupDlg(open);
    const toggleShowCustomerDlg = (open: boolean) => setShowCustomerDlg(open);
    

    

    // const setTotalCratesData = totalCratesData(pickups);

    // console.log(user.data.roles[0]);


    const handleDialogToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        toggleShowDlg(true);
    };

    const handlePickupDialogToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        toggleShowPickupDlg(true);
    };

    const handleCustomerDialogToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        toggleShowCustomerDlg(true);
    };

    const handleTabClick = (tab: string) => setActiveTab(tab);

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(currentDate.getDate()).padStart(2, '0');

    // Current pickup date in the format 'MM-DD-YYYY'
    const formattedDate = `${month}-${day}-${year}`;

    const totalQuantityByDateAndCode = pickups
    ?.filter((item: PickupProp) => item.pickup_date && item.pickup_code) // Ensure there is a date and code
    .reduce((accumulator: { [key: string]: number }, current: PickupProp) => {
        const dateCodeKey = `${current.pickup_date}_${current.pickup_code}`;
        const totalQuantity = parseFloat(current.pickup_total_quantity.toString());

        // Sum quantities by date and code
        accumulator[dateCodeKey] =
        (accumulator[dateCodeKey] || 0) + (isNaN(totalQuantity) ? 0 : totalQuantity);
        return accumulator;
    }, {}) || {};


    // Sort Total Pickup Quantity base on Date, Code and Sum
    const result: { date: string; code: string; sum: number }[] = Object.entries(totalQuantityByDateAndCode).map(
        ([dateCode, quantity]) => {
            const [date, code] = dateCode.split("_");
            return { date, code, sum: quantity as number };
        }
    );


    // Total Daily 09h Pickup 
    const ramassage9H = result.filter(({ date, code }) => {
        // Convert date string to a consistent format for comparison
        const dateFormatted = date;
        return dateFormatted === formattedDate && code === "RM-09H"; // Check both date and code
    }).reduce((total, { sum }: { sum: number }) => total + sum, 0); // Sum the 'sum' values of the filtered objects

    // // Total Daily 11h Pickup 
    const ramassage11H = result.filter(({ date, code }) => {
        // Convert date string to a consistent format for comparison
        const dateFormatted = date;
        return dateFormatted === formattedDate && code === "RM-11H"; // Check both date and code
    }).reduce((total, { sum }: { sum: number }) => total + sum, 0); // Sum the 'sum' values of the filtered objects

    // Total Daily 16h Pickup 
    const ramassage16H = result.filter(({ date, code }) => {
        // Convert date string to a consistent format for comparison
        const dateFormatted = date;
        return dateFormatted === formattedDate && code === "RM-16H"; // Check both date and code
    }).reduce((total, { sum }: { sum: number }) => total + sum, 0); // Sum the 'sum' values of the filtered objects

    // Replace with your total number of eggs
    const totalDailyEggs = ramassage9H + ramassage11H + ramassage16H; 

    // // Number of eggs per crate
    const eggsInCrate = 30;

    // Calculate the number of daily crates and the remaining eggs
    const totalDailyNumberOfCrate = Math.floor(totalDailyEggs / eggsInCrate);
    const totalDailyNumberOfEggsRemain = totalDailyEggs % eggsInCrate;

    // Calculate the number of crates and the remaining eggs
    
    


    // Calculate the total number of crates remaining after sales
    const totalQuantitySale = (eggSales ?? []).reduce((sum, sale) => sum + Number(sale.eggsale_quantity), 0);
     


    const totalQuantityPickup = (pickups ?? []).reduce((sum, pickup) => sum + Number(pickup.pickup_total_quantity), 0);   
    
    const totalNumberOfCrate = Math.floor(totalQuantityPickup / eggsInCrate);
    const totalCrateQuantityRemain = totalNumberOfCrate - totalQuantitySale;
    
    const totalQuantityEggsRemain = totalQuantityPickup - (eggsInCrate * totalQuantitySale);
    
    const totalNumberOfEggsRemain = totalQuantityEggsRemain % eggsInCrate;

    

    useEffect(() => {
        console.log("Current language:", i18n.language);
        console.log("Loaded translations:", i18n.options.backend && typeof i18n.options.backend === 'object' && 'loadPath' in i18n.options.backend ? i18n.options.backend.loadPath : "Backend options not available");
    }, []);
    
    return (
        <div className="w-full p-10 mx-auto space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">{t("egg")}</h1>
            </div>
            <div className="flex justify-between bg-white dark:bg-slate-800 rounded-md">
                {(roles === 'Admin' || 'Commercial' || 'Supervisor') && (
                    <>
                        <button
                            className={`flex-1 py-2 text-center font-bold rounded-md ${
                                activeTab === 'tab1' ? 'bg-orange-500 text-white' : 'text-gray-500'
                            }`}
                            onClick={() => handleTabClick('tab1')}
                        >
                            {t("egg_transaction")}
                        </button>
                    </>
                )}
                
                {(roles === 'Admin' || 'Production' || 'Supervisor') && (
                    <>
                        <button
                            className={`flex-1 py-2 text-center font-bold rounded-md ${
                                activeTab === 'tab2' ? 'bg-orange-500 text-white' : 'text-gray-500'
                            }`}
                            onClick={() => handleTabClick('tab2')}
                        >
                            {t("egg_pickup")}
                        </button>
                    </>
                )}
            </div>
            <div className=" overflow-y-auto scrollbar-hidden">
                <div>
                    {activeTab === 'tab1' && (
                        <div className="space-y-10">
                            <div className='grid grid-cols-3 gap-4'>
                                <Card className="dark:bg-slate-800 border shadow-none">
                                    <CardHeader>
                                        <CardTitle className="text-orange-600">{t("egg_totalEgg")}</CardTitle>
                                        <CardDescription>
                                            <div className=''>
                                                <span className='text-xl font-bold'>{totalQuantityEggsRemain}</span>
                                            </div>
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                                <Card className="dark:bg-slate-800 border shadow-none">
                                    <CardHeader>
                                        <CardTitle className="text-orange-600">{t("egg_totalCrateInStock")}</CardTitle>
                                        <CardDescription>
                                            <div className=''>
                                                <span className='text-xl font-bold'>{totalCrateQuantityRemain}</span>
                                            </div>
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                                <Card className="dark:bg-slate-800 border shadow-none">
                                    <CardHeader>
                                        <CardTitle className="text-orange-600">{t("egg_totalEggRemaining")}</CardTitle>
                                        <CardDescription>
                                            <div className=''>
                                                <span className='text-xl font-bold'>{totalNumberOfEggsRemain}</span>
                                            </div>
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                            </div>
                            <div className="flex space-x-5">
                                {(roles === 'Admin' || 'Commercial' || 'Supervisor') && (
                                    <>
                                        <button
                                            className="flex items-center space-x-3 bg-white hover:bg-orange-100 dark:hover:bg-slate-600 rounded-md px-4 py-2 dark:bg-slate-800 dark:text-white text-md text-black"
                                            onClick={handleCustomerDialogToggle}
                                        >
                                            <Plus size={20} />
                                            <span>{t("customer_newCustomer")}</span>
                                        </button>
                                        <button
                                            className="flex items-center space-x-3 bg-white hover:bg-orange-100 dark:hover:bg-slate-600 rounded-md px-4 py-2 dark:bg-slate-800 text-md"
                                            onClick={handleDialogToggle}
                                        >
                                            <Plus size={20} />
                                            <span>{t("egg_sale")}</span>
                                        </button>
                                    </>
                                )}
                                
                            </div>
                            <div className="space-y-5">
                                <div className="flex space-x-2 dark:text-gray-400">
                                    <BadgeDollarSign />
                                    <span>{t("recentTransaction")}</span>
                                </div>
                                <EggSaleTable eggsaleData={eggSales} />
                            </div>
                        </div>
                    )}
                    {activeTab === 'tab2' && (
                        <div className="space-y-10">
                            <div className="grid grid-cols-3 gap-4">
                                <Card className="dark:bg-slate-800 border shadow-none">
                                    <CardHeader>
                                        <CardTitle className="text-orange-600">{t("egg_firstPickup")}</CardTitle>
                                        <CardDescription>
                                            <div className=''>
                                                <span className=''>{ramassage9H}</span>
                                            </div>
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                                <Card className="dark:bg-slate-800 border shadow-none">
                                    <CardHeader>
                                        <CardTitle className="text-orange-600">{t("egg_secondPickup")}</CardTitle>
                                        <CardDescription>
                                            <div className=''>
                                                <span className=''>{ramassage11H}</span>
                                            </div>
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                                <Card className="dark:bg-slate-800 border shadow-none">
                                    <CardHeader>
                                        <CardTitle className="text-orange-600">{t("egg_thirdPickup")}</CardTitle>
                                        <CardDescription>
                                            <div className=''>
                                                <span className=''>{ramassage16H}</span>
                                            </div>
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                            </div>
                            <div className="flex justify-between items-center">
                                <h1>{t("egg_dailyPickup")} ( {formattedDate} ) [Total: {ramassage9H + ramassage11H + ramassage16H}] = {totalDailyNumberOfCrate} Plateaux {totalDailyNumberOfEggsRemain} Oeuf(s)</h1>
                                {(roles === 'Admin' || 'Production') && (
                                    <>
                                        <button
                                            className="flex items-center space-x-3 bg-white px-4 py-2 dark:bg-slate-800 dark:text-white text-md text-black border"
                                            onClick={handlePickupDialogToggle}
                                        >
                                            <Plus size={20} />
                                            <span>{t("egg_newPickup")}</span>
                                        </button>
                                        {showPickupDlg && <ProductForm showDlg={showPickupDlg} toggleDlg={toggleShowPickupDlg} />}
                                    </>
                                )}
                            </div>
                            <PickupTable pickupData={pickups} />
                        </div>
                    )}
                </div>
            </div>
            {showCustomerDlg && <CustomerForm showDlg={showCustomerDlg} toggleDlg={toggleShowCustomerDlg} />}
            {showDlg && <EggSaleForm showDlg={showDlg} toggleDlg={toggleShowDlg} />}
        </div>
    );
};

Ponte.layout = (page: ReactNode) => <Dashboard>{page}</Dashboard>;
export default Ponte;