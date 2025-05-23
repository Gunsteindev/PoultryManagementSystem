import { FormEventHandler, useState } from 'react';
import { SelectItem } from '@/Components/ui/select';
import { Plus } from 'lucide-react'
import { ReactNode } from "react";
import { FormFieldType } from '@/Components/ui/customFormField';
import { Button } from '@/components/ui/button';
import { TransferProp } from '../table/TransferTable';
import { useClientStore } from '@/lib/Stores/customerStore';
import { useSupplierStore } from '@/lib/Stores/supplierStore';
import { useBatimentStore } from '@/lib/Stores/batimentStore';
import { useTransferStore } from '@/lib/Stores/transferStore';
import { useBandPurchaseStore } from '@/lib/Stores/bandPurchaseStore';
import { usePage, useForm } from '@inertiajs/react';
import { useToast } from '@/Components/hooks/use-toast';
import { useTranslation } from "react-i18next";
import CustomerForm from '../form/CustomerForm';
import BatimentForm from '../form/BatimentForm';
import SupplierForm from '../form/SupplierForm';
import BatimentTable from '../table/BatimentTable';
import Dashboard from '../Dashboard';
import FormComponent from '@/Components/ui/formComponent';
import CustomerTable from '../table/CustomerTable';
import SupplierTable from '../table/SupplierTable';
import TransferTable from '../table/TransferTable';
import axios from 'axios';

type ResultType = {
    code: string;
    quantity: number;
};
  

interface FormData {
    transfer_batiment_code: string;
    transfer_band_code: string;
    transfer_quantity: string;
    user_id: any;
    [key: string]: any; // Index signature to allow dynamic property access
}

interface TransferData {
    transfer_id: number;
    transfer_batiment_code: string;
    transfer_band_code: string;
    transfer_quantity: string;
    user_id: any;
}

interface HomeProp {
    showDlg: boolean;
    toggleDlg: (open: boolean) => void;
    title?: string;
    selectedData?: TransferData;
    userId?: number,
}

const Home = ({selectedData}: HomeProp) => {

    const [showDlg, setShowDlg] = useState(false)
    const [showCustomerAndSupplierDlg, setShowCustomerAndSupplierDlg] = useState(false);

    const { clients } = useClientStore();
    const { suppliers } = useSupplierStore();
    const { batiments } = useBatimentStore();
    const { transfers, addTransfer } = useTransferStore();
    const { bandPurchases } = useBandPurchaseStore();

    const { t, i18n } = useTranslation();

    const toggleShowCustomerAndSupplierDlg = (open: boolean) => setShowCustomerAndSupplierDlg(open);

    const totalQuantityByBand = (transfers ?? [])
    .filter((transfer: TransferProp) => transfer.transfer_band_code !== undefined) // Ensure there is a band code
    .reduce((accumulator: { [key: string]: number }, transfer: TransferProp) => {
        const bandCode = transfer.transfer_band_code;
        const quantity = parseFloat(transfer.transfer_quantity);

        // Sum quantities by band code
        accumulator[bandCode] = (accumulator[bandCode] || 0) + (isNaN(quantity) ? 0 : quantity);
        return accumulator;
    }, {});

    const result: ResultType[] = Object.entries(totalQuantityByBand).map(([code, quantity]) => ({ code, quantity: quantity as number }));

    // console.log("Answer1", totalQuantityByBand);
    // console.log("Answer2", result);



    const toggleShowDlg = (open: boolean) => {
        // title.current = "EDIT PRODUCT"
        setShowDlg(open);
    };

    const handleDialogToggle = (e: React.MouseEvent) => {
        e.stopPropagation(); // Stop event propagation
        toggleShowDlg(true); // Open the dialog (you can pass 'false' to close it)
    };

    const handleCustomerAndSupplierDialogToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        toggleShowCustomerAndSupplierDlg(true);
    };

    const user = usePage().props.auth.user;
    const isEditMode = !!selectedData; // Determine mode based on selectedData presence
    const { toast } = useToast();
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    const validateForm = (data: FormData) => {
        const requiredFields = [
            'transfer_batiment_code',
            'transfer_band_code',
            'transfer_quantity',
        ];
    
        for (const field of requiredFields) {
            if (!data[field]) {
                setErrorMessage(`${field} is required`);
                toast({ description: `${field} is required` });
                return false;
            }
        }
        return true;
    };

    const { data, setData, errors, reset } = useForm({
        transfer_batiment_code: "",
        transfer_band_code: "",
        transfer_quantity: "",
        user_id: user.data.id,
    });

    const submit: FormEventHandler = async (e) => {
        e.preventDefault();
    
        if (!validateForm(data)) {
            return;
        }
    
        try {
            if (isEditMode) {
                // Update the Transfer
                reset();
                toast({ description: 'Transfer updated successfully.' });
            } else {
                // Create a new Transfer
                addTransfer(data);
                console.log("Response:", data);
                reset();
                toast({ description: 'Transfer created successfully.' });
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const errors = error.response.data.errors || 'An unexpected error occurred.';
                console.log("Validation errors:", errors);
                toast({ description: `Validation errors: ${errors}` });
            } else {
                console.error("Unexpected error:", error);
                toast({ description: 'An unexpected error occurred.' });
            }
        }
    };

    const [activeTab, setActiveTab] = useState("tab1");

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };


    return (
        <>
            <div className="w-full p-10 mx-auto space-y-8">
                <div className='flex justify-between items-center'>
                    <div><h1 className='text-2xl font-semibold'>{t("admin")}</h1></div>
                </div>
                <div className="overflow-y-auto scrollbar-hidden space-y-8">
                    {/* Tab Buttons */}
                    <div className="flex justify-between bg-white dark:bg-slate-800">
                        <button
                            className={`flex-1 py-2 text-center rounded-md  ${
                                activeTab === "tab1"
                                ? " bg-orange-500 text-white"
                                : "text-gray-500"
                            }`}
                            onClick={() => handleTabClick("tab1")}
                        >
                            {t("customer")}
                        </button>
                        <button
                            className={`flex-1 py-2 text-center rounded-md  ${
                                activeTab === "tab2"
                                ? "bg-orange-500 text-white"
                                : "text-gray-500"
                            }`}
                            onClick={() => handleTabClick("tab2")}
                        >
                            {t("supplier")}
                        </button>
                        <button
                            className={`flex-1 py-2 text-center rounded-md  ${
                                activeTab === "tab3"
                                ? "bg-orange-500 text-white"
                                : "text-gray-500"
                            }`}
                            onClick={() => handleTabClick("tab3")}
                        >
                            {t("user")}
                        </button>
                        <button
                            className={`flex-1 py-2 text-center rounded-md  ${
                                activeTab === "tab4"
                                ? "bg-orange-500 text-white"
                                : "text-gray-500"
                            }`}
                            onClick={() => handleTabClick("tab4")}
                        >
                            {t("room")}
                        </button>
                        <button
                            className={`flex-1 py-2 text-center rounded-md  ${
                                activeTab === "tab5"
                                ? "bg-orange-500 text-white"
                                : "text-gray-500"
                            }`}
                            onClick={() => handleTabClick("tab5")}
                        >
                            {t("transfer")}
                        </button>
                        <button
                            className={`flex-1 py-2 text-center rounded-md  ${
                                activeTab === "tab6"
                                ? "bg-orange-500 text-white"
                                : "text-gray-500"
                            }`}
                            onClick={() => handleTabClick("tab6")}
                        >
                            {t("accessory")}
                        </button>
                    </div>

                    {/* Tab Content */}
                    <div className="space-y-5">
                        {activeTab === "tab1" && (
                            <>
                                <div className="flex space-x-5">
                                    <button
                                        className="flex items-center space-x-3 bg-white hover:bg-orange-100 dark:hover:bg-slate-600 rounded-md px-4 py-2 dark:bg-slate-800 dark:text-white text-md text-black"
                                        onClick={handleCustomerAndSupplierDialogToggle}
                                    >
                                        <Plus size={20} />
                                        <span>{t("customer_newCustomer")}</span>
                                    </button>
                                    {showCustomerAndSupplierDlg && <CustomerForm showDlg={showCustomerAndSupplierDlg} toggleDlg={toggleShowCustomerAndSupplierDlg} />}
                                </div>
                                <div className=''>
                                    <CustomerTable customerData={clients}/>
                                </div>
                            </>
                        )}
                        {activeTab === "tab2" && ( 
                            <>
                                <div className=''>
                                    <button 
                                        className='flex items-center space-x-3 bg-white hover:bg-orange-100 dark:hover:bg-slate-600 rounded-md px-4 py-2 dark:bg-slate-800 dark:text-white text-md text-black' 
                                        onClick={handleCustomerAndSupplierDialogToggle}
                                    >
                                        <Plus size={20} />
                                        <span>{t("supplier_newSupplier")}</span>
                                    </button>
                                    {showCustomerAndSupplierDlg && <SupplierForm showDlg={showCustomerAndSupplierDlg} toggleDlg={toggleShowCustomerAndSupplierDlg} />}
                                </div>
                                <div>
                                    <SupplierTable supplierData={suppliers}/>
                                </div>
                            </>
                            
                        )}
                        {activeTab === "tab3" && 
                            <div>
                                {/* <FoodTable foodData={foods}/> */}
                            </div>
                        }
                        {activeTab === "tab4" && 
                            <div className='space-y-5'>
                                <div className='flex space-x-10'>
                                    <div className=''>
                                        <button 
                                            className='flex items-center space-x-3 bg-white hover:bg-orange-100 dark:hover:bg-slate-600 rounded-md px-4 py-2 dark:bg-slate-800 dark:text-white text-md text-black' 
                                            onClick={handleDialogToggle}
                                        >
                                            <Plus size={20} />
                                            <span>{t("room_newRoom")}</span>
                                        </button>
                                        {showDlg && <BatimentForm showDlg={showDlg} toggleDlg={toggleShowDlg} />}
                                    </div>
                                </div>  
                                <div className='space-y-5'>
                                    <BatimentTable batimentData={batiments} />
                                </div>
                            </div>
                        }
                        {activeTab === "tab5" && 
                            <div className='space-y-5'>
                                <form onSubmit={submit} className='text-base flex space-x-5'>
                                    <div  className="grid grid-cols-3 space-x-2">
                                        <FormComponent
                                            name="transfer_batiment_code"
                                            fieldType={FormFieldType.SELECT}
                                            label={t("transfer_form_roomCode")}
                                            placeholder=""
                                            value={data.transfer_batiment_code}
                                            onChange={(e) => setData("transfer_batiment_code", e.target.value)}
                                            error={errorMessage == "transfer_batiment_code is required" ? errorMessage : errors.transfer_batiment_code}
                                        >
                                            {(batiments ?? []).map((record: any) => (
                                                <SelectItem key={record.batiment_id} value={record.batiment_code}>
                                                    <div className="flex cursor pointer items-center gap-2">
                                                        <p>{`${record.batiment_code} [Capacite: ${record.batiment_capacity} Tete(s)]`}</p>
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </FormComponent>
                                        <FormComponent
                                            name="transfer_band_purchase_code"
                                            fieldType={FormFieldType.SELECT}
                                            label={t("transfer_form_bandCode")}
                                            placeholder=""
                                            value={data.transfer_band_code}
                                            onChange={(e) => setData("transfer_band_code", e.target.value)}
                                            error={errorMessage == "transfer_band_code is required" ? errorMessage : errors.transfer_band_code}
                                        >
                                            {(bandPurchases ?? []).map((record: any) => {
                                                const { band_purchase_id, band_purchase_band_code, band_purchase_quantity } = record;

                                                // Find the matching result entry for the current band code
                                                const matchingResult = result.find(r => r.code === band_purchase_band_code);
                                                const adjustedQuantity = matchingResult 
                                                    ? band_purchase_quantity - matchingResult.quantity 
                                                    : band_purchase_quantity;

                                                return (
                                                    <SelectItem key={band_purchase_id} value={band_purchase_band_code}>
                                                        <div className="flex cursor-pointer items-center gap-2">
                                                            <p>{`${band_purchase_band_code} [${band_purchase_quantity}] [${adjustedQuantity}]`}</p>
                                                        </div>
                                                    </SelectItem>
                                                );
                                            })}
                                        </FormComponent>
                                        <FormComponent
                                            name="transfer_quantity"
                                            fieldType={FormFieldType.NUMBER}
                                            label={t("transfer_form_transferQuantity")}
                                            placeholder=""
                                            value={data.transfer_quantity}
                                            onChange={(e) => setData("transfer_quantity", e.target.value)}
                                            error={errorMessage == "transfer_quantity is required" ? errorMessage : errors.transfer_quantity}
                                        />
                                    </div>
                                    <div className='flex gap-x-4 items-end'>
                                        <div className='w-full'><Button className='w-full bg-orange-600 dark:text-white' type="submit">{t("transfer_newTransfer")}</Button></div>
                                    </div>
                                </form>
                                <TransferTable transferData={transfers} />
                            </div>
                        }
                        {activeTab === "tab6" && <div>Content for Tab 6</div>}
                    </div>
                </div>
            </div>

        </>
    )
}

Home.layout = (page: ReactNode) => <Dashboard children={page} />
export default Home

