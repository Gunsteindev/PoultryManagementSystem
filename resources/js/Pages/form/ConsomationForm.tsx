import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/Components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useForm } from '@inertiajs/react';
import FormComponent from '@/Components/ui/formComponent';
import { FormEventHandler, useState } from 'react';
import { FormFieldType } from '@/Components/ui/formComponent';
import { usePage } from '@inertiajs/react';
import { useToast } from '@/Components/hooks/use-toast';
import { SelectItem } from "@/Components/ui/select";
import axios from "axios";
import { ConsomationProp } from "../table/ConsomationTable";
import { useConsomationStore } from "@/lib/Stores/consomationStore";
import { useBatimentStore } from "@/lib/Stores/batimentStore";
import { useFoodStore } from "@/lib/Stores/foodStore";


interface FormData {
    consomation_name: string;
    consomation_batiment: string;
    consomation_quantity: string;
    consomation_date: string;
    user_id: any;
    [key: string]: any; // Index signature to allow dynamic property access
}

interface ConsomationFormProp {
    showDlg: boolean;
    toggleDlg: (open: boolean) => void;
    title?: string;
    selectedData?: ConsomationProp | null;
    userId?: number,
}


const ConsomationForm = ({ showDlg, toggleDlg, title, selectedData}: ConsomationFormProp) => {
    const user = usePage().props.auth.user;
    const isEditMode = !!selectedData; // Determine mode based on selectedData presence
    const { toast } = useToast();
    const formTitle = title || (isEditMode ? "UPDATE CONSOMMATION" : "NOUVEAU CONSOMMATION");
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
    const { addConsomation, updateConsomation } = useConsomationStore();
    const { batiments } = useBatimentStore();
    const { foods } = useFoodStore();

    const validateForm = (data: FormData) => {
        const requiredFields = [
            'consomation_name',
            'consomation_batiment',
            'consomation_quantity',
            'consomation_date',
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
        consomation_name: selectedData?.consomation_name || "",
        consomation_quantity: selectedData?.consomation_quantity || "",
        consomation_batiment: selectedData?.consomation_batiment || "",
        consomation_date: selectedData?.consomation_date || "",
        user_id: user.data.id,
    });


    const submit: FormEventHandler = async (e) => {
        e.preventDefault();
    
        if (!validateForm(data)) {
            return;
        }
    
        try {
            if (isEditMode) {
                // Update the Consomation
                updateConsomation(selectedData?.consomation_id, data);
                console.log("Response:", data);
                toggleDlg(false); // Close dialog on success
                toast({ description: 'Consomation updated successfully.' });
            } else {
                // Create a new Consomation
                addConsomation(data);
                console.log("Response:", data);
                toggleDlg(false); // Close dialog on success
                toast({ description: 'Consomation created successfully.' });
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
            <DialogContent className="dark:bg-slate-800 xl:max-w-[16vw] xl:max-h-[60vh]">
                <DialogHeader className="mb-5">
                    <DialogTitle className="flex space-x-2 text-lg font-bold text-orange-600"><h1>{formTitle}</h1></DialogTitle>
                </DialogHeader>
                <form onSubmit={submit} className='text-base'>
                    <div className="space-y-3">
                        <FormComponent
                            name="consomation_batiment"
                            fieldType={FormFieldType.SELECT}
                            label="Batiment"
                            placeholder=""
                            value={data.consomation_batiment}
                            onChange={(e) => setData("consomation_batiment", e.target.value)}
                            error={errorMessage == "consomation_batiment is required" ? errorMessage : errors.consomation_batiment}
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
                            name="consomation_name"
                            fieldType={FormFieldType.SELECT}
                            label="Nom"
                            placeholder=""
                            value={data.consomation_name}
                            onChange={(e) => setData("consomation_name", e.target.value)}
                            error={errorMessage == "consomation_name is required" ? errorMessage : errors.consomation_name}
                        >
                            {(foods ?? []).map((data: any) => (
                                <SelectItem key={data.food_id} value={data.food_name}>
                                    <div className="flex cursor pointer items-center gap-2">
                                        <p>{data.food_name}</p>
                                    </div>
                                </SelectItem>
                            ))}
                        </FormComponent>
                        <FormComponent
                            name="consomation_quantity"
                            fieldType={FormFieldType.NUMBER}
                            label="Quantity"
                            placeholder=""
                            value={data.consomation_quantity}
                            onChange={(e) => setData("consomation_quantity", e.target.value)}
                            error={errorMessage == "consomation_quantity is required" ? errorMessage : errors.consomation_quantity}
                        />
                        <FormComponent
                            name="consomation_date"
                            fieldType={FormFieldType.DATE_PICKER}
                            label="Date"
                            placeholder=""
                            value={data.consomation_date}
                            onChange={(e) => setData("consomation_date", e.target.value)}
                            error={errorMessage == "consomation_date is required" ? errorMessage : errors.consomation_date}
                        />
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

export default ConsomationForm