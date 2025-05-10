import { useState } from 'react';
import { Plus, BadgeDollarSign} from 'lucide-react'
import { ReactNode } from "react";
import { useBandPurchaseStore } from '@/lib/Stores/bandPurchaseStore';
import { useBirdSaleStore } from '@/lib/Stores/birdSaleStore';
import { usePage } from '@inertiajs/react';
import { Card, CardHeader, CardDescription, CardTitle } from '@/Components/ui/card';
import { useBirdLossStore } from '@/lib/Stores/BirdLossStore';
import { useTranslation } from "react-i18next";
import SupplierForm from '../form/SupplierForm';
import Dashboard from '../Dashboard';
import BirdBuyForm from '../form/BandPurchaseForm';
import BirdSaleForm from '../form/BirdSaleForm';
import BandPurchaseTable from '../table/BandPurchaseTable';
import CustomerForm from '../form/CustomerForm';
import BirdSaleTable from '../table/BirdSaleTable';
import BirdLossTable from '../table/BirdLossTable';
import BirdLossForm from '../form/BirdLossForm';



const BirdComponent = () => {

    const user = usePage().props.auth.user;
    const roles = user.data.roles[0];
    const [showDlg, setShowDlg] = useState(false)
    const [showCustomerAndSupplierDlg, setShowCustomerAndSupplierDlg] = useState(false)
    const [showVenteDlg, setShowVenteDlg] = useState(false)
    const [showBirdLossDlg, setShowBirdLossDlg] = useState(false)

    const { bandPurchases } = useBandPurchaseStore();
    const { birdSales } = useBirdSaleStore();
    const { birdLosses } = useBirdLossStore();

    const { t, i18n } = useTranslation();


    const toggleShowCustomerAndSupplierDlg = (open: boolean) => {
        setShowCustomerAndSupplierDlg(open);
    };
    const toggleShowDlg = (open: boolean) => {
        setShowDlg(open); 
    };
    const toggleShowVenteDlg = (open: boolean) => {
        setShowVenteDlg(open);
    };
    
    const toggleShowBirdLossDlg = (open: boolean) => {
        setShowBirdLossDlg(open); 
    };

    const handleCustomerAndSupplierDialogToggle = (e: React.MouseEvent) => {
        e.stopPropagation(); // Stop event propagation
        toggleShowCustomerAndSupplierDlg(true); // Open the dialog (you can pass 'false' to close it)
    };
    const handleDialogToggle = (e: React.MouseEvent) => {
        e.stopPropagation(); // Stop event propagation
        toggleShowDlg(true); // Open the dialog (you can pass 'false' to close it)
    };
    const handleVenteDialogToggle = (e: React.MouseEvent) => {
        e.stopPropagation(); // Stop event propagation
        toggleShowVenteDlg(true); // Open the dialog (you can pass 'false' to close it)
    };
    
    const handlePerteDialogToggle = (e: React.MouseEvent) => {
        e.stopPropagation(); // Stop event propagation
        toggleShowBirdLossDlg(true); // Open the dialog (you can pass 'false' to close it)
    };

    const [activeTab, setActiveTab] = useState("tab1");

    const handleTabClick = (tab: string) => {
      setActiveTab(tab);
    };

    // Total number of birds purchased
    const totalbandPurchases = (bandPurchases ?? []).reduce((sum, bandPurchases) => sum + Number(bandPurchases.band_purchase_quantity), 0);

    // Total number of birds sold
    const totalBirdSales = (birdSales ?? []).reduce((sum, sale) => sum + Number(sale.bird_sale_quantity), 0) || 0;
    const totalBirdRemaining = totalbandPurchases - totalBirdSales;

    // Total number of birds lost
    const totalBirdLosses = (birdLosses ?? []).reduce((sum, loss) => sum + Number(loss.bird_loss_quantity), 0) || 0;
    const totalBirdRemainingAfterLoss = totalBirdRemaining - totalBirdLosses;   

    return (
        <>
            <div className="w-full p-10 mx-auto space-y-8">
                <div className='flex justify-between items-center'>
                    <div><h1 className='text-2xl font-semibold'>{t("bird")}</h1></div>
                </div>
                <div className='grid grid-cols-3 gap-4'>
                    <Card className="dark:bg-slate-800 border shadow-none">
                        <CardHeader>
                            <CardTitle className="text-orange-600">{t("bird_totalBirdInStock")}</CardTitle>
                            <CardDescription>
                                <div className=''>
                                    <span className='text-xl font-bold'>{totalBirdRemainingAfterLoss}</span>
                                </div>
                            </CardDescription>
                        </CardHeader>
                    </Card>
                    <Card className="dark:bg-slate-800 border shadow-none">
                        <CardHeader>
                            <CardTitle className="text-orange-600">{t("bird_totalBirdsSale")}</CardTitle>
                            <CardDescription>
                                <div className=''>
                                    <span className='text-xl font-bold'>{totalBirdSales}</span>
                                </div>
                            </CardDescription>
                        </CardHeader>
                    </Card>
                    <Card className="dark:bg-slate-800 border shadow-none">
                        <CardHeader>
                            <CardTitle className="text-orange-600">{t("bird_totalBirdsLoss")}</CardTitle>
                            <CardDescription>
                                <div className=''>
                                    <span className='text-xl font-bold'>{totalBirdLosses}</span>
                                </div>
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </div>
                <div className="h-[65vh] overflow-y-auto scrollbar-hidden space-y-8">
                    {/* Tab Buttons */}
                    <div className="flex justify-between bg-white dark:bg-slate-800">
                        {(roles === 'Admin' || roles === 'Commercial' || roles === 'Supervisor') && (
                            <>
                                <button
                                    className={`flex-1 py-2 text-center font-bold rounded-md ${
                                        activeTab === "tab1"
                                        ? " bg-orange-500 text-white"
                                        : "text-gray-500"
                                    }`}
                                    onClick={() => handleTabClick("tab1")}
                                >
                                    {t("bird_buyBird")}
                                </button>
                                <button
                                    className={`flex-1 py-2 text-center font-bold rounded-md ${
                                        activeTab === "tab2"
                                        ? "bg-orange-500 text-white"
                                        : "text-gray-500 border-x"
                                    }`}
                                    onClick={() => handleTabClick("tab2")}
                                >
                                    {t("bird_birdSale")}
                                </button>
                            </>
                        )}
                        
                        <button
                            className={`flex-1 py-2 text-center font-bold rounded-md ${
                                activeTab === "tab3"
                                ? "bg-orange-500 text-white"
                                : "text-gray-500"
                            }`}
                            onClick={() => handleTabClick("tab3")}
                        >
                            {t("bird_birdLoss")}
                        </button>
                    </div>

                    {/* Tab Content */}
                    <div className="">
                        {(roles === 'Admin' || roles === 'Commercial' || roles === 'Supervisor') && (
                            <>
                                {activeTab === "tab1" && 
                                    <div className='space-y-10 py-5'>
                                        <div className='space-y-5'>
                                            <div className='flex space-x-5'>
                                                {(roles === 'Admin' || roles === 'Commercial' || roles === 'Supervisor') && (
                                                    <>
                                                        <div className=''>
                                                            <button 
                                                                className='flex items-center space-x-3 bg-white hover:bg-orange-100 dark:hover:bg-slate-600 rounded-md px-4 py-2 dark:bg-slate-800 dark:text-white text-md text-black' 
                                                                onClick={handleCustomerAndSupplierDialogToggle}
                                                            >
                                                                <Plus size={20} />
                                                                <span>{t("supplier_newSupplier")}</span>
                                                            </button>
                                                        </div>
                                                        <div className=''>
                                                            <button 
                                                                className='flex item-center space-x-3 bg-white px-4 py-2 dark:bg-slate-800 dark:text-white text-md text-black border' 
                                                                onClick={handleDialogToggle}
                                                            >
                                                                <Plus size={20} />
                                                                <span>{t("bird_newPurchase")}</span>
                                                            </button>  
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        
                                        <div className='space-y-5'>
                                            <div className='flex space-x-2 dark:text-gray-400'><BadgeDollarSign /><span>{t("recentTransaction")}</span></div>
                                            <BandPurchaseTable bandPurchaseData={bandPurchases} />
                                        </div>
                                        {showCustomerAndSupplierDlg && <SupplierForm showDlg={showCustomerAndSupplierDlg} toggleDlg={toggleShowCustomerAndSupplierDlg} />}
                                        {showDlg && <BirdBuyForm showDlg={showDlg} toggleDlg={toggleShowDlg} />}
                                    </div> 
                                }
                                {activeTab === "tab2" && 
                                    <div className='space-y-10 py-5'>
                                        <div className='space-y-5'>
                                            <div className='flex space-x-5'>
                                                {(roles === 'Admin' || roles === 'Commercial' || roles === 'Supervisor') && (
                                                    <>
                                                        <div className=''>
                                                            <button
                                                                className="flex items-center space-x-3 bg-white px-4 py-2 dark:bg-slate-800 dark:text-white text-md text-black border"
                                                                onClick={handleCustomerAndSupplierDialogToggle}
                                                            >
                                                                <Plus size={20} />
                                                                <span>{t("customer_newCustomer")}</span>
                                                            </button>
                                                        </div>
                                                    </>
                                                )}
                                                
                                                <div className=''>
                                                    <button 
                                                        className='flex item-center space-x-3 bg-white px-4 py-2 dark:bg-slate-800 dark:text-white text-md text-black border' 
                                                        onClick={handleVenteDialogToggle}
                                                    >
                                                        <Plus size={20} />
                                                        <span>{t("bird_newSale")}</span>
                                                    </button>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className='space-y-5'>
                                            <div className='flex space-x-2 dark:text-gray-400'><BadgeDollarSign /><span>{t("recentTransaction")}</span></div>
                                            <BirdSaleTable birdSaleData={birdSales} />
                                        </div>
                                        {showCustomerAndSupplierDlg && <CustomerForm showDlg={showCustomerAndSupplierDlg} toggleDlg={toggleShowCustomerAndSupplierDlg} />}
                                        {showVenteDlg && <BirdSaleForm showDlg={showVenteDlg} toggleDlg={toggleShowVenteDlg}/>}
                                    </div>
                                }
                            </>
                        )}
                        
                        {activeTab === "tab3" && 
                            <div className='space-y-10 py-5'>
                                <div className='space-y-5'>
                                    <div className='flex space-x-5'>
                                        <div className=''>
                                            <button 
                                                className='flex item-center space-x-3 bg-white px-4 py-2 dark:bg-slate-800 dark:text-white text-md text-black border' 
                                                onClick={handlePerteDialogToggle}
                                            >
                                                <Plus size={20} />
                                                <span>{t("bird_newLoss")}</span>
                                            </button>
                                            {showBirdLossDlg && <BirdLossForm showDlg={showBirdLossDlg} toggleDlg={toggleShowBirdLossDlg} />}
                                        </div>
                                    </div>
                                </div>
                                
                                <div className='space-y-5'>
                                    <BirdLossTable birdLossData={birdLosses} />
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

BirdComponent.layout = (page: ReactNode) => <Dashboard children={page} />
export default BirdComponent