import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/Components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useForm, usePage } from '@inertiajs/react';
import FormComponent from '@/Components/ui/formComponent';
import { FormEventHandler, useState } from 'react';
import { FormFieldType } from '@/Components/ui/formComponent';
import { useToast } from '@/Components/hooks/use-toast';
import { SelectItem } from "@/Components/ui/select"
import axios from "axios"
import { BirdSaleProp } from "../table/BirdSaleTable";
import { useBirdSaleStore } from "@/lib/Stores/birdSaleStore";
import { useBatimentStore } from "@/lib/Stores/batimentStore";


interface FormData {
    bird_sale_batiment_code: string;
    bird_sale_code: string;
    bird_sale_date: string;
    bird_sale_description: string;
    bird_sale_quantity: string;
    bird_sale_reduction: string;
    bird_sale_total_cost: string;
    bird_sale_unit_price: string;
    user_id: any;
    [key: string]: any; // Index signature to allow dynamic property access
}


interface BirdSaleFormProp {
    showDlg: boolean,
    toggleDlg: (open: boolean) => void
    title?: string
    selectedData?: BirdSaleProp | null
}


const BirdSaleForm = ({ showDlg, toggleDlg, title, selectedData}: BirdSaleFormProp) => {
    const user = usePage().props.auth.user;
    const { toast } = useToast();
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
    const isEditMode = !!selectedData; // Determine mode based on selectedData presence
    const formTitle = title || (isEditMode ? "UPDATE VENTE" : "NOUVEAU VENTE");
    const { addBirdSale, updateBirdSale } = useBirdSaleStore();
    const { batiments } = useBatimentStore();

    // console.log(formTitle)
   

    const validateForm = (data: FormData) => {
        const requiredFields = [
            'bird_sale_batiment_code',
            'bird_sale_code',
            'bird_sale_date',
            'bird_sale_description',
            'bird_sale_quantity',
            'bird_sale_reduction',
            'bird_sale_total_cost',
            'bird_sale_unit_price',
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
        bird_sale_batiment_code: selectedData?.bird_sale_batiment_code || "",
        bird_sale_code: selectedData?.bird_sale_code || "",
        bird_sale_date: selectedData?.bird_sale_date || "",
        bird_sale_description: selectedData?.bird_sale_description || "",
        bird_sale_quantity: selectedData?.bird_sale_quantity || "",
        bird_sale_reduction: selectedData?.bird_sale_reduction || "",
        bird_sale_total_cost: selectedData?.bird_sale_total_cost || "",
        bird_sale_unit_price: selectedData?.bird_sale_unit_price || "",
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
                updateBirdSale(selectedData?.bird_sale_id, data)
                console.log("Response:", data);
                toggleDlg(false); // Close dialog on success
                toast({ description: 'Bird Sale updated successfully.' });
            } else {
                // Create a new Bird Sale
                addBirdSale(data);
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
            <DialogContent className="dark:bg-slate-800 xl:max-w-[32vw] xl:max-h-[60vh]">
                <DialogHeader className="mb-5">
                    <DialogTitle className="flex space-x-2 text-lg font-bold text-orange-600"><h1>{formTitle}</h1></DialogTitle>
                </DialogHeader>
                <form onSubmit={submit} className='text-base'>
                    <div className="space-y-3">
                        <div className='xl:flex xl:space-x-10'>
                            <FormComponent
                                name="bird_sale_code"
                                fieldType={FormFieldType.INPUT}
                                label="Code"
                                placeholder=""
                                value={data.bird_sale_code}
                                onChange={(e) => setData("bird_sale_code", e.target.value)}
                                error={errorMessage == "bird_sale_code is required" ? errorMessage : errors.bird_sale_code}
                            />
                            <FormComponent
                                name="bird_sale_date"
                                fieldType={FormFieldType.DATE_PICKER}
                                label="Date"
                                placeholder=""
                                value={data.bird_sale_date}
                                onChange={(e) => setData("bird_sale_date", e.target.value)}
                                error={errorMessage == "bird_sale_date is required" ? errorMessage : errors.bird_sale_date}
                            />
                        </div>
                        <div className='xl:flex xl:space-x-10'>
                            <FormComponent
                                name="bird_sale_batiment_code"
                                fieldType={FormFieldType.SELECT}
                                label="Batiment"
                                placeholder=""
                                value={data.bird_sale_batiment_code}
                                onChange={(e) => setData("bird_sale_batiment_code", e.target.value)}
                                error={errorMessage == "bird_sale_batiment_code is required" ? errorMessage : errors.bird_sale_batiment_code}
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
                                name="bird_sale_description"
                                fieldType={FormFieldType.INPUT}
                                label="Description"
                                placeholder=""
                                value={data.bird_sale_description}
                                onChange={(e) => setData("bird_sale_description", e.target.value)}
                                error={errorMessage == "bird_sale_description is required" ? errorMessage : errors.bird_sale_description}
                            />
                        </div>
                        <div className='xl:flex xl:space-x-10'>
                            <FormComponent
                                name="bird_sale_unit_price"
                                fieldType={FormFieldType.NUMBER}
                                label="Prix Unitaire (CFA)"
                                placeholder=""
                                value={data.bird_sale_unit_price}
                                onChange={(e) => setData("bird_sale_unit_price", e.target.value)}
                                error={errorMessage == "bird_sale_unit_price is required" ? errorMessage : errors.bird_sale_unit_price}
                            />
                            <FormComponent
                                name="bird_sale_quantity"
                                fieldType={FormFieldType.NUMBER}
                                label="Quantity"
                                placeholder=""
                                value={data.bird_sale_quantity}
                                onChange={(e) => setData("bird_sale_quantity", e.target.value)}
                                error={errorMessage == "bird_sale_quantity is required" ? errorMessage : errors.bird_sale_quantity}
                            />
                        </div>
                        <div className='xl:flex xl:space-x-10'>
                            <FormComponent
                                name="bird_sale_reduction"
                                fieldType={FormFieldType.NUMBER}
                                label="Reduction (CFA)"
                                placeholder=""
                                value={data.bird_sale_reduction}
                                onChange={(e) => setData("bird_sale_reduction", e.target.value)}
                                error={errorMessage == "bird_sale_reduction is required" ? errorMessage : errors.bird_sale_reduction}
                            />
                            <FormComponent
                                name="bird_sale_total_cost"
                                fieldType={FormFieldType.NUMBER}
                                label="Total"
                                placeholder=""
                                value={data.bird_sale_total_cost = (Number(data.bird_sale_unit_price) * Number(data.bird_sale_quantity) - Number(data.bird_sale_reduction)).toString()}
                                onChange={(e) => setData("bird_sale_total_cost", e.target.value)}
                                error={errorMessage == "bird_sale_total_cost is required" ? errorMessage : errors.bird_sale_total_cost}
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

export default BirdSaleForm