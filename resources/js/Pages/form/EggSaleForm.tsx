import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/Components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useForm } from '@inertiajs/react';
import FormComponent from '@/Components/ui/formComponent';
import { FormEventHandler, useState } from 'react';
import { FormFieldType } from '@/Components/ui/formComponent';
import { SelectItem } from '@/Components/ui/select';
import { usePage } from '@inertiajs/react';
import { useToast } from '@/Components/hooks/use-toast';
import axios from "axios"
import { EggSaleProp } from "../table/EggSaleTable";
import { useClientStore } from "@/lib/Stores/customerStore";
import { useEggSaleStore } from "@/lib/Stores/eggSaleStore";
import { useTranslation } from "react-i18next";

interface FormData {
    eggsale_code: string,
    eggsale_description: string,
    eggsale_unit_price: string,
    eggsale_quantity: string,
    eggsale_reduction: string,
    eggsale_total_cost: string,
    eggsale_client_name: string,
    eggsale_date: string,
    user_id: any;
    [key: string]: any; // Index signature to allow dynamic property access
}

interface EggSaleFormProp {
    showDlg: boolean,
    toggleDlg: (open: boolean) => void
    title?: string
    selectedData?: EggSaleProp | null
}

const EggSaleForm = ({ showDlg, toggleDlg, title, selectedData}: EggSaleFormProp) => {
    const user = usePage().props.auth.user;
    const { toast } = useToast();

    const { t, i18n } = useTranslation();
    
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
    const isEditMode = !!selectedData; // Determine mode based on selectedData presence
    const formTitle = title || (isEditMode ? t("egg_form_eggsale_updateSale") : t("egg_sale"));
    const { addEggSale, updateEggSale } = useEggSaleStore();
    const { clients } = useClientStore();

    // console.log("11", selectedData?.eggsale_id)
   
    const validateForm = (data: FormData) => {
        const requiredFields = [
            'eggsale_code',
            'eggsale_description',
            'eggsale_unit_price',
            'eggsale_quantity',
            'eggsale_reduction',
            'eggsale_total_cost',
            'eggsale_client_name',
            'eggsale_date',
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

    const { data, setData, processing, errors } = useForm({
        eggsale_code: selectedData?.eggsale_code || "",
        eggsale_description: selectedData?.eggsale_description || "",
        eggsale_unit_price: selectedData?.eggsale_unit_price || "",
        eggsale_quantity: selectedData?.eggsale_quantity || "",
        eggsale_reduction: selectedData?.eggsale_reduction || "",
        eggsale_total_cost: selectedData?.eggsale_total_cost || "",
        eggsale_client_name: selectedData?.eggsale_client_name || "",
        eggsale_date: selectedData?.eggsale_date || "",
        user_id: user.data.id
    });


    const submit: FormEventHandler = async (e) => {
        e.preventDefault();
    
        if (!validateForm(data)) {
            return;
        }
    
        try {
            if (isEditMode) {
                // Update the Egg Sale
                updateEggSale(selectedData?.eggsale_id, data);
                console.log("Response:", data);
                toggleDlg(false); // Close dialog on success
                toast({ description: 'Egg Sale updated successfully.' });
            } else {
                // Create a new Egg Sale
                addEggSale(data);
                console.log("Response:", data);
                toggleDlg(false); // Close dialog on success
                toast({ description: 'Egg Sale created successfully.' });
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

    const handleChange = (name: string, value: string) => {
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

   
    return (
        <Dialog open={showDlg} onOpenChange={toggleDlg}>
            <DialogContent className="dark:bg-slate-800 xl:max-w-[32vw] xl:max-h-[60vh]">
                <DialogHeader className="mb-5">
                    <DialogTitle className="flex space-x-2 text-lg font-bold text-orange-600"><h1>{formTitle}</h1></DialogTitle>
                </DialogHeader>
                <form onSubmit={submit} className='text-base'>
                    <div className="space-y-3">
                        <div className='xl:flex xl:space-x-10'>
                            <FormComponent
                                name="eggsale_code"
                                fieldType={FormFieldType.INPUT}
                                label={t("egg_form_eggsale_saleCode")}
                                placeholder=""
                                value={data.eggsale_code}
                                onChange={(e) => setData("eggsale_code", e.target.value)}
                                error={errorMessage == "eggsale_code is required" ? errorMessage : errors.eggsale_code}
                            />
                            <FormComponent
                                name="eggsale_date"
                                fieldType={FormFieldType.DATE_PICKER}
                                label={t("egg_form_eggsale_saleDate")}
                                placeholder=""
                                value={data.eggsale_date}
                                onChange={(e) => setData("eggsale_date", e.target.value)}
                                error={errorMessage == "eggsale_date is required" ? errorMessage : errors.eggsale_date}
                            />
                        </div>
                        <div className='xl:flex xl:space-x-10'>
                            <FormComponent
                                name="eggsale_client_name"
                                fieldType={FormFieldType.SELECT}
                                label={t("egg_form_eggsale_customer")}
                                placeholder={isEditMode ? selectedData?.eggsale_client_name : "Select Client"}
                                value={data.eggsale_client_name}
                                onChange={(e) => handleChange("eggsale_client_name", e.target.value)}
                                error={errorMessage == "eggsale_client_name is required" ? errorMessage : errors.eggsale_client_name}
                            >
                                {(clients ?? []).map((data: any) => (
                                    <SelectItem key={data.client_id} value={data.client_name}>
                                        <div className="flex cursor pointer items-center gap-2">
                                            <p>{data.client_name}</p>
                                        </div>
                                    </SelectItem>
                                ))}
                            </FormComponent>
                            <FormComponent
                                name="eggsale_description"
                                fieldType={FormFieldType.INPUT}
                                label={t("egg_form_eggsale_description")}
                                placeholder=""
                                value={data.eggsale_description}
                                onChange={(e) => setData("eggsale_description", e.target.value)}
                                error={errorMessage == "eggsale_description is required" ? errorMessage : errors.eggsale_description}
                            />
                        </div>
                        <div className='xl:flex xl:space-x-10'>
                            <FormComponent
                                name="eggsale_unit_price"
                                fieldType={FormFieldType.NUMBER}
                                label={t("egg_form_eggsale_pricePerCrate")}
                                placeholder=""
                                value={data.eggsale_unit_price}
                                onChange={(e) => setData("eggsale_unit_price", e.target.value)}
                                error={errorMessage == "eggsale_unit_price is required" ? errorMessage : errors.eggsale_unit_price}
                            />
                            <FormComponent
                                name="eggsale_quantity"
                                fieldType={FormFieldType.NUMBER}
                                label={t("egg_form_eggsale_quantity")}
                                placeholder=""
                                value={data.eggsale_quantity}
                                onChange={(e) => setData("eggsale_quantity", e.target.value)}
                                error={errorMessage == "eggsale_quantity is required" ? errorMessage : errors.eggsale_quantity}
                            />
                        </div>
                        <div className='xl:flex xl:space-x-10'>
                            <FormComponent
                                name="eggsale_reduction"
                                fieldType={FormFieldType.NUMBER}
                                label={t("egg_form_eggsale_reduction")}
                                placeholder=""
                                value={data.eggsale_reduction}
                                onChange={(e) => setData("eggsale_reduction", e.target.value)}
                                error={errorMessage == "eggsale_reduction is required" ? errorMessage : errors.eggsale_reduction}
                            />
                            <FormComponent
                                name="eggsale_total_cost"
                                fieldType={FormFieldType.NUMBER}
                                label={t("egg_form_eggsale_totalPrice")}
                                placeholder=""
                                value={data.eggsale_total_cost = (Number(data.eggsale_unit_price) * Number(data.eggsale_quantity) - Number(data.eggsale_reduction)).toString()}
                                onChange={(e) => setData("eggsale_total_cost", e.target.value)}
                                error={errorMessage == "eggsale_total_cost is required" ? errorMessage : errors.eggsale_total_cost}
                            />
                        </div>
                    </div>
                    <div className='flex gap-x-4 mt-10'>
                        <div className='w-full'>
                            <Button className='w-full bg-orange-600' type="submit" disabled={processing}>Save</Button>
                        </div>
                        {/* <div className='w-full'>
                            <Button className='w-full bg-orange-600' type="button" onClick={() => toggleDlg(false)}>Cancel</Button>
                        </div> */}
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default EggSaleForm

