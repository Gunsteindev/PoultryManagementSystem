import { useState } from 'react';
import { Plus, BadgeDollarSign} from 'lucide-react'
import { ReactNode } from "react";
import PerteForm from '../form/PerteForm';
import SupplierForm from '../form/SupplierForm';
import Dashboard from '../Dashboard';
import BirdBuyForm from '../form/BandPurchaseForm';
import BirdSaleForm from '../form/BirdSaleForm';
import BandPurchaseTable from '../table/BandPurchaseTable';
import CustomerForm from '../form/CustomerForm';
import BirdSaleTable from '../table/BirdSaleTable';
import { useBandPurchaseStore } from '@/lib/Stores/bandPurchaseStore';
import { useBirdSaleStore } from '@/lib/Stores/birdSaleStore';
import { usePage } from '@inertiajs/react';
import { Card, CardHeader, CardDescription, CardTitle } from '@/Components/ui/card';
import { useBirdLossStore } from '@/lib/Stores/BirdLossStore';
import BirdLossTable from '../table/BirdLossTable';
import BirdLossForm from '../form/BirdLossForm';


const BirdComponent = () => {

    const user = usePage().props.auth.user;
    const roles = user.data.roles[0];
    const [showDlg, setShowDlg] = useState(false)
    const [showCustomerDlg, setShowCustomerDlg] = useState(false)
    const [showVenteDlg, setShowVenteDlg] = useState(false)
    const [showBirdLossDlg, setShowBirdLossDlg] = useState(false)
    const { bandPurchases } = useBandPurchaseStore();
    const { birdSales } = useBirdSaleStore();
    const { birdLosses } = useBirdLossStore();


    const toggleShowCustomerDlg = (open: boolean) => {
        setShowCustomerDlg(open);
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

    const handleCustomerDialogToggle = (e: React.MouseEvent) => {
        e.stopPropagation(); // Stop event propagation
        toggleShowCustomerDlg(true); // Open the dialog (you can pass 'false' to close it)
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
                    <div><h1 className='text-2xl font-semibold'>Volaille</h1></div>
                </div>
                <div className='grid grid-cols-3 gap-4'>
                    <Card className="dark:bg-slate-800 border shadow-none">
                        <CardHeader>
                            <CardTitle className="text-orange-600">Total Birds in Stock</CardTitle>
                            <CardDescription>
                                <div className=''>
                                    <span className='text-xl font-bold'>{totalBirdRemainingAfterLoss}</span>
                                </div>
                            </CardDescription>
                        </CardHeader>
                    </Card>
                    <Card className="dark:bg-slate-800 border shadow-none">
                        <CardHeader>
                            <CardTitle className="text-orange-600">Total Birds Sale</CardTitle>
                            <CardDescription>
                                <div className=''>
                                    <span className='text-xl font-bold'>{totalBirdSales}</span>
                                </div>
                            </CardDescription>
                        </CardHeader>
                    </Card>
                    <Card className="dark:bg-slate-800 border shadow-none">
                        <CardHeader>
                            <CardTitle className="text-orange-600">Total Bird Loss</CardTitle>
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
                                    className={`flex-1 py-2 text-center font-bold ${
                                        activeTab === "tab1"
                                        ? " bg-orange-500 text-white"
                                        : "text-gray-500"
                                    }`}
                                    onClick={() => handleTabClick("tab1")}
                                >
                                    Achat
                                </button>
                                <button
                                    className={`flex-1 py-2 text-center font-bold ${
                                        activeTab === "tab2"
                                        ? "bg-orange-500 text-white"
                                        : "text-gray-500 border-x"
                                    }`}
                                    onClick={() => handleTabClick("tab2")}
                                >
                                    Vente
                                </button>
                            </>
                        )}
                        
                        <button
                            className={`flex-1 py-2 text-center font-bold ${
                                activeTab === "tab3"
                                ? "bg-orange-500 text-white"
                                : "text-gray-500"
                            }`}
                            onClick={() => handleTabClick("tab3")}
                        >
                            Perte
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
                                                            <button className='flex item-center space-x-3 bg-white px-4 py-2 dark:bg-slate-800 dark:text-white text-md text-black border' onClick={handleCustomerDialogToggle}><Plus size={20} /><span>Nouveau Fournisseur</span></button>
                                                        </div>
                                                        <div className=''>
                                                            <button className='flex item-center space-x-3 bg-white px-4 py-2 dark:bg-slate-800 dark:text-white text-md text-black border' onClick={handleDialogToggle}><Plus size={20} /><span>Nouveau Achat</span></button>  
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        
                                        <div className='space-y-5'>
                                            <div className='flex space-x-2 dark:text-gray-400'><BadgeDollarSign /><span>Transactions Recentes</span></div>
                                            <BandPurchaseTable bandPurchaseData={bandPurchases} />
                                        </div>
                                        {showCustomerDlg && <SupplierForm showDlg={showCustomerDlg} toggleDlg={toggleShowCustomerDlg} />}
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
                                                                onClick={handleCustomerDialogToggle}
                                                            >
                                                                <Plus size={20} />
                                                                <span>Nouveau Client</span>
                                                            </button>
                                                        </div>
                                                    </>
                                                )}
                                                
                                                <div className=''>
                                                    <button className='flex item-center space-x-3 bg-white px-4 py-2 dark:bg-slate-800 dark:text-white text-md text-black border' onClick={handleVenteDialogToggle}><Plus size={20} /><span>Nouveau Vente</span></button>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className='space-y-5'>
                                            <div className='flex space-x-2 dark:text-gray-400'><BadgeDollarSign /><span>Transactions Recentes</span></div>
                                            <BirdSaleTable birdSaleData={birdSales} />
                                        </div>
                                        {showCustomerDlg && <CustomerForm showDlg={showCustomerDlg} toggleDlg={toggleShowCustomerDlg} />}
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
                                            <button className='flex item-center space-x-3 bg-white px-4 py-2 dark:bg-slate-800 dark:text-white text-md text-black border' onClick={handlePerteDialogToggle}><Plus size={20} /><span>New Loss</span></button>
                                            {showBirdLossDlg && <BirdLossForm showDlg={showBirdLossDlg} toggleDlg={toggleShowBirdLossDlg} />}
                                        </div>
                                    </div>
                                </div>
                                
                                <div className='space-y-5'>
                                    <div className='flex space-x-2 dark:text-gray-400'><BadgeDollarSign /><span>Transactions Recentes</span></div>
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