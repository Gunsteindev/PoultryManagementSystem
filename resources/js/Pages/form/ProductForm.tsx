import {  Sheet,  SheetContent,  SheetHeader,  SheetTitle } from "@/Components/ui/sheet";
import { Button } from "@/components/ui/button";
import FormComponent from "@/Components/ui/formComponent";
import { useForm } from "@inertiajs/react";
import { FormEventHandler, useState } from "react";
import { FormFieldType } from "@/Components/ui/formComponent";
import { usePage } from '@inertiajs/react';
import { useToast } from '@/Components/hooks/use-toast';
import { SelectItem } from "@/Components/ui/select";
import axios from "axios";
import { PickupProp } from "../table/PickupTable";
import { usePickupStore } from "@/lib/Stores/pickupStore";
import { useBatimentStore } from "@/lib/Stores/batimentStore";

interface FormData {
    pickup_batiment: string,
    pickup_code: string,
    pickup_crate_quantity: string | number,
    pickup_quantity_remain: string | number,
    pickup_quantity_loss: string | number,
    pickup_total_quantity: string | number,
    pickup_date: string | Date
    user_id: number,
    [key: string]: any; // Index signature to allow dynamic property access
}


interface ProductFormProp {
    showDlg: boolean;
    toggleDlg: (open: boolean) => void;
    title?: string;
    selectedData?: PickupProp | null;
}

const ProductForm = ({ showDlg, toggleDlg, title, selectedData}: ProductFormProp) => {
    const user = usePage().props.auth.user;
    const { toast } = useToast();
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
    const isEditMode = !!selectedData; // Determine mode based on selectedData presence
    const formTitle = title || (isEditMode ? "UPDATE RAMASSAGE" : "NOUVEAU RAMASSAGE");
    const { addPickup, updatePickup } = usePickupStore();
    const { batiments } = useBatimentStore();

    // console.log("11", selectedData?.pickup_id)
    // console.log("2", batimentRecords)

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(currentDate.getDate()).padStart(2, '0');

    const formattedDate = `${month}-${day}-${year}`;

    const validateForm = (data: FormData) => {
        const requiredFields = [
            'pickup_batiment',
            'pickup_code',
            'pickup_crate_quantity',
            'pickup_quantity_remain',
            'pickup_quantity_loss',
            'pickup_total_quantity',
            'pickup_date',
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
        pickup_batiment: selectedData?.pickup_batiment || "",
        pickup_code: selectedData?.pickup_code || "",
        pickup_crate_quantity: selectedData?.pickup_crate_quantity || "",
        pickup_quantity_remain: selectedData?.pickup_quantity_remain || "",
        pickup_quantity_loss: selectedData?.pickup_quantity_loss || "",
        pickup_total_quantity: selectedData?.pickup_total_quantity || "",
        pickup_date: selectedData?.pickup_date ||  formattedDate,
        user_id: user.data.id,

    });

    const submit: FormEventHandler = async (e) => {
        e.preventDefault();
    
        if (!validateForm(data)) {
            return;
        }
    
        try {
            if (isEditMode) {
                // Update the Pickup
                updatePickup(selectedData?.pickup_id, data)
                console.log("Response:", data);
                toggleDlg(false); // Close dialog on success
                toast({ description: 'Pickup updated successfully.' });
            } else {
                // Create a new Pickup
                addPickup(data);
                console.log("Response:", data);
                toggleDlg(false); // Close dialog on success
                toast({ description: 'Pickup created successfully.' });
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
        <Sheet open={showDlg} onOpenChange={toggleDlg}>
            <SheetContent className="w-[100vw] h-[100vh] dark:bg-slate-800 overflow-auto font-poppins flex flex-col justify-between">
                <div>
                    <SheetHeader className="mb-10">
                        <SheetTitle className="text-orange-600 font-bold">
                            {formTitle}
                        </SheetTitle>
                    </SheetHeader>
                    <form onSubmit={submit} className="text-base flex flex-col gap-y-5">
                        <FormComponent
                            name="pickup_code"
                            fieldType={FormFieldType.SELECT}
                            label="Pickup Code"
                            placeholder=""
                            value={data.pickup_code}
                            onChange={(e) => setData("pickup_code", e.target.value)}
                            error={errorMessage == "pickup_code is required" ? errorMessage : errors.pickup_code}
                        >
                            <SelectItem value="RM-09H">
                                <div className="flex cursor pointer items-center gap-2">
                                    <p>RM-09H</p>
                                </div>
                            </SelectItem>
                            <SelectItem value="RM-11H">
                                <div className="flex cursor pointer items-center gap-2">
                                    <p>RM-11H</p>
                                </div>
                            </SelectItem>
                            <SelectItem value="RM-16H">
                                <div className="flex cursor pointer items-center gap-2">
                                    <p>RM-16H</p>
                                </div>
                            </SelectItem>
                        </FormComponent>
                        <FormComponent
                            name="pickup_batiment"
                            fieldType={FormFieldType.SELECT}
                            label="Compartiment"
                            placeholder=""
                            value={data.pickup_batiment}
                            onChange={(e) => setData("pickup_batiment", e.target.value)}
                            error={errorMessage == "pickup_batiment is required" ? errorMessage : errors.pickup_batiment}
                        >
                            {(batiments ?? []).map((data: any) => (
                                <SelectItem key={data.batiment_id} value={data.batiment_code}>
                                    <div className="flex cursor pointer items-center gap-2">
                                        <p>{data.batiment_code}</p>
                                    </div>
                                </SelectItem>
                            ))}
                        </FormComponent>
                        <FormComponent
                            name="pickup_crate_quantity"
                            fieldType={FormFieldType.NUMBER}
                            label="Quantite Plateau (x)"
                            placeholder=""
                            value={data.pickup_crate_quantity}
                            onChange={(e) => setData("pickup_crate_quantity", e.target.value)}
                            error={errorMessage == "pickup_crate_quantity is required" ? errorMessage : errors.pickup_crate_quantity}
                        />
                        <FormComponent
                            name="pickup_quantity_remain"
                            fieldType={FormFieldType.NUMBER}
                            label="Oeuf Restant"
                            placeholder=""
                            value={data.pickup_quantity_remain}
                            onChange={(e) => setData("pickup_quantity_remain", e.target.value)}
                            error={errorMessage == "pickup_quantity_remain is required" ? errorMessage : errors.pickup_quantity_remain}
                        />
                        <FormComponent
                            name="pickup_quantity_loss"
                            fieldType={FormFieldType.NUMBER}
                            label="Perte"
                            placeholder=""
                            value={data.pickup_quantity_loss}
                            onChange={(e) => setData("pickup_quantity_loss", e.target.value)}
                            error={errorMessage == "pickup_quantity_loss is required" ? errorMessage : errors.pickup_quantity_loss}
                        />
                        <FormComponent
                            name="pickup_total_quantity"
                            fieldType={FormFieldType.NUMBER}
                            label="Quantite Total"
                            placeholder=""
                            value={data.pickup_total_quantity = Number(data.pickup_crate_quantity) * 30 + Number(data.pickup_quantity_remain)}
                            onChange={(e) => setData("pickup_total_quantity", e.target.value)}
                            error={errorMessage == "pickup_total_quantity is required" ? errorMessage : errors.pickup_total_quantity}
                        />
                        <FormComponent
                            name="pickup_date"
                            fieldType={FormFieldType.INPUT}
                            label="Date"
                            placeholder=""
                            value={typeof data.pickup_date === 'string' ? data.pickup_date : (data.pickup_date as Date).toISOString().split('T')[0]}
                            onChange={(e) => setData("pickup_date", e.target.value)}
                            error={errorMessage == "pickup_date is required" ? errorMessage : errors.pickup_date}
                        />
                        <div className="flex gap-x-4">
                            <div className="w-full">
                                <Button className="w-full bg-orange-600" type="submit" disabled={processing}>
                                    Save
                                </Button>
                            </div>
                            <div className="w-full">
                                <Button className="w-full bg-orange-600" type="button" onClick={() => toggleDlg(false)}>
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default ProductForm;
