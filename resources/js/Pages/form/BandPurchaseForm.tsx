import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm, usePage } from "@inertiajs/react";
import FormComponent from "@/Components/ui/formComponent";
import { FormEventHandler, useState } from "react";
import { FormFieldType } from "@/Components/ui/formComponent";
import { useToast } from '@/Components/hooks/use-toast';
import { BandPurchaseProp } from '../table/BandPurchaseTable';
import axios from "axios";
import { useBandPurchaseStore } from "@/lib/Stores/bandPurchaseStore";


interface FormData {
    band_purchase_band_code: string;
    band_purchase_code: string;
    band_purchase_date: string;
    band_purchase_description: string;
    band_purchase_quantity: string;
    band_purchase_reduction: string;
    band_purchase_total_cost: string;
    band_purchase_unit_price: string;
    user_id: any;
    [key: string]: any; // Index signature to allow dynamic property access
}


interface BandPurchaseFormProp {
    showDlg: boolean,
    toggleDlg: (open: boolean) => void
    title?: string
    selectedData?: BandPurchaseProp | null
    clientData?: any
}

const BandPurchaseForm = ({ showDlg, toggleDlg, title, selectedData }: BandPurchaseFormProp) => {
    const user = usePage().props.auth.user;
    const { toast } = useToast();
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
    const isEditMode = !!selectedData; // Determine mode based on selectedData presence
    const formTitle = title || (isEditMode ? "UPDATE ACHAT" : "NOUVEAU ACHAT");
    const { addBandPurchase, updateBandPurchase } = useBandPurchaseStore();

    console.log("11", selectedData?.band_id)

    const validateForm = (data: FormData) => {
        const requiredFields = [
            'band_purchase_band_code',
            'band_purchase_code',
            'band_purchase_date',
            'band_purchase_description',
            'band_purchase_quantity',
            'band_purchase_reduction',
            'band_purchase_total_cost',
            'band_purchase_unit_price',
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
        band_purchase_band_code: selectedData?.band_purchase_band_code || "",
        band_purchase_code: selectedData?.band_purchase_code || "",
        band_purchase_date: selectedData?.band_purchase_date || "",
        band_purchase_description: selectedData?.band_purchase_description || "",
        band_purchase_quantity: selectedData?.band_purchase_quantity || "",
        band_purchase_reduction: selectedData?.band_purchase_reduction || "",
        band_purchase_total_cost: selectedData?.band_purchase_total_cost || "",
        band_purchase_unit_price: selectedData?.band_purchase_unit_price || "",
        user_id: user.data.id
    })


    const submit: FormEventHandler = async (e) => {
        e.preventDefault();
    
        if (!validateForm(data)) {
            return;
        }
    
        try {
            if (isEditMode) {
                // Update the Band Purchase
                updateBandPurchase(selectedData?.band_id, data);
                console.log("Response:", data);
                toggleDlg(false); // Close dialog on success
                toast({ description: 'Band Purchase updated successfully.' });
            } else {
                // Create a new Band Purchase
                addBandPurchase(data);
                console.log("Response:", data);
                toggleDlg(false); // Close dialog on success
                toast({ description: 'Band Purchase created successfully.' });
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

    return (
        <Dialog open={showDlg} onOpenChange={toggleDlg}>
            <DialogContent className="dark:bg-slate-800 xl:max-w-[32vw] xl:max-h-[60vh]">
                <DialogHeader className="mb-5">
                    <DialogTitle className="flex space-x-2 text-lg font-bold text-orange-600">
                        <h1>{formTitle}</h1>
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={submit} className="text-base">
                    <div className="space-y-3">
                        <div className="xl:flex xl:space-x-10">
                            <FormComponent
                                name="band_purchase_code"
                                fieldType={FormFieldType.INPUT}
                                label="Purchase Code"
                                placeholder=""
                                value={data.band_purchase_code}
                                onChange={(e) => setData("band_purchase_code", e.target.value)}
                                error={errorMessage == "band_purchase_code is required" ? errorMessage : errors.band_purchase_code}
                            />
                            <FormComponent
                                name="band_purchase_date"
                                fieldType={FormFieldType.DATE_PICKER}
                                label="Date"
                                placeholder=""
                                value={data.band_purchase_date}
                                onChange={(e) => setData("band_purchase_date", e.target.value)}
                                error={errorMessage == "band_purchase_date is required" ? errorMessage : errors.band_purchase_date}
                            />
                        </div>
                        <div className="xl:flex xl:space-x-10">
                            <FormComponent
                                name="band_purchase_band_code"
                                fieldType={FormFieldType.INPUT}
                                label="Band Code"
                                placeholder=""
                                value={data.band_purchase_band_code}
                                onChange={(e) => setData("band_purchase_band_code", e.target.value)}
                                error={errorMessage == "band_purchase_band_code is required" ? errorMessage : errors.band_purchase_band_code}
                            />
                            <FormComponent
                                name="band_purchase_description"
                                fieldType={FormFieldType.INPUT}
                                label="Description"
                                placeholder=""
                                value={data.band_purchase_description}
                                onChange={(e) => setData("band_purchase_description", e.target.value)}
                                error={errorMessage == "band_purchase_description is required" ? errorMessage : errors.band_purchase_description}
                            />
                        </div>
                        <div className="xl:flex xl:space-x-10">
                            <FormComponent
                                name="band_purchase_unit_price"
                                fieldType={FormFieldType.NUMBER}
                                label="Prix Unitaire (CFA)"
                                placeholder=""
                                value={data.band_purchase_unit_price}
                                onChange={(e) => setData("band_purchase_unit_price", e.target.value)}
                                error={errorMessage == "band_purchase_unit_price is required" ? errorMessage : errors.band_purchase_unit_price}
                            />
                            <FormComponent
                                name="band_purchase_quantity"
                                fieldType={FormFieldType.NUMBER}
                                label="Quantite"
                                placeholder=""
                                value={data.band_purchase_quantity}
                                onChange={(e) => setData("band_purchase_quantity", e.target.value)}
                                error={errorMessage == "band_purchase_quantity is required" ? errorMessage : errors.band_purchase_quantity}
                            />
                        </div>
                        <div className="xl:flex xl:space-x-10">
                            <FormComponent
                                name="band_purchase_reduction"
                                fieldType={FormFieldType.NUMBER}
                                label="Reduction (CFA)"
                                placeholder=""
                                value={data.band_purchase_reduction}
                                onChange={(e) => setData("band_purchase_reduction", e.target.value)}
                                error={errorMessage == "band_purchase_reduction is required" ? errorMessage : errors.band_purchase_reduction}
                            />
                            <FormComponent
                                name="band_purchase_total_cost"
                                fieldType={FormFieldType.NUMBER}
                                label="Total Cost"
                                placeholder=""
                                value={data.band_purchase_total_cost = (Number(data.band_purchase_unit_price) * Number(data.band_purchase_quantity) - Number(data.band_purchase_reduction)).toString()}
                                onChange={(e) => setData("band_purchase_total_cost", e.target.value)}
                                error={errorMessage == "band_purchase_total_cost is required" ? errorMessage : errors.band_purchase_total_cost}
                            />
                        </div>
                    </div>
                    <div className="flex gap-x-4 mt-10">
                        <div className="w-full">
                            <Button className="w-full bg-orange-600" type="submit" disabled={processing}>
                                Save
                            </Button>
                        </div>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default BandPurchaseForm;
