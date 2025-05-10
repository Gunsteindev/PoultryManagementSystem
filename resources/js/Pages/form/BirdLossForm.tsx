import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/Components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { FormFieldType } from '@/Components/ui/formComponent';
import { useToast } from '@/Components/hooks/use-toast';
import { SelectItem } from "@/Components/ui/select"
import { useBatimentStore } from "@/lib/Stores/batimentStore";
import { BirdLossProp } from "../table/BirdLossTable";
import { useBirdLossStore } from "@/lib/Stores/BirdLossStore";
import FormComponent from '@/Components/ui/formComponent';
import axios from "axios"



interface FormData {
    bird_loss_batiment: string;
    bird_loss_category: string;
    bird_loss_quantity: string;
    bird_loss_date: string;
    user_id: any;
    [key: string]: any; // Index signature to allow dynamic property access
}

interface BirdLossFormProp {
    showDlg: boolean,
    toggleDlg: (open: boolean) => void
    title?: string
    selectedData?: BirdLossProp | null
}


const BirdLossForm = ({ showDlg, toggleDlg, title, selectedData}: BirdLossFormProp) => {
    const user = usePage().props.auth.user;
    const { toast } = useToast();
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
    const isEditMode = !!selectedData; // Determine mode based on selectedData presence
    const formTitle = title || (isEditMode ? "UPDATE BIRD LOSS" : "NEW BIRD LOSS");
    const { addBirdLoss, updateBirdLoss } = useBirdLossStore();
    const { batiments } = useBatimentStore();

    // console.log(formTitle)
   

    const validateForm = (data: FormData) => {
        const requiredFields = [
            'bird_loss_batiment',
            'bird_loss_category',
            'bird_loss_quantity',
            'bird_loss_date',
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
        bird_loss_batiment: selectedData?.bird_loss_batiment || "",
        bird_loss_category: selectedData?.bird_loss_category || "",
        bird_loss_quantity: selectedData?.bird_loss_quantity || "",
        bird_loss_date: selectedData?.bird_loss_date || "",
        user_id: user.data.id
    });

    const submit: FormEventHandler = async (e) => {
        e.preventDefault();
    
        if (!validateForm(data)) {
            return;
        }
    
        try {
            if (isEditMode) {
                // Update the Bird Sale
                updateBirdLoss(selectedData?.bird_loss_id, data)
                console.log("Response:", data);
                toggleDlg(false); // Close dialog on success
                toast({ description: 'Bird Sale updated successfully.' });
            } else {
                // Create a new Bird Sale
                addBirdLoss(data);
                console.log("Response:", data);
                toggleDlg(false); // Close dialog on success
                toast({ description: 'Bird Sale created successfully.' });
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
            <DialogContent className="dark:bg-slate-800 xl:max-w-[16vw]">
                <DialogHeader className="mb-5">
                    <DialogTitle className="flex space-x-2 text-lg font-bold text-orange-600"><h1>{formTitle}</h1></DialogTitle>
                </DialogHeader>
                <form onSubmit={submit} className='text-base'>
                    <div className="space-y-3">
                        <FormComponent
                            name="bird_loss_batiment"
                            fieldType={FormFieldType.SELECT}
                            label="Batiment"
                            placeholder=""
                            value={data.bird_loss_batiment}
                            onChange={(e) => setData("bird_loss_batiment", e.target.value)}
                            error={errorMessage == "bird_loss_batiment is required" ? errorMessage : errors.bird_loss_batiment}
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
                            name="bird_loss_category"
                            fieldType={FormFieldType.INPUT}
                            label="Description"
                            placeholder=""
                            value={data.bird_loss_category}
                            onChange={(e) => setData("bird_loss_category", e.target.value)}
                            error={errorMessage == "bird_loss_category is required" ? errorMessage : errors.bird_loss_category}
                        />
                        <FormComponent
                            name="bird_loss_quantity"
                            fieldType={FormFieldType.NUMBER}
                            label="Quantity"
                            placeholder=""
                            value={data.bird_loss_quantity}
                            onChange={(e) => setData("bird_loss_quantity", e.target.value)}
                            error={errorMessage == "bird_loss_quantity is required" ? errorMessage : errors.bird_loss_quantity}
                        />
                        <FormComponent
                            name="bird_loss_date"
                            fieldType={FormFieldType.DATE_PICKER}
                            label="Date"
                            placeholder=""
                            value={data.bird_loss_date}
                            onChange={(e) => setData("bird_loss_date", e.target.value)}
                            error={errorMessage == "bird_loss_date is required" ? errorMessage : errors.bird_loss_date}
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

export default BirdLossForm