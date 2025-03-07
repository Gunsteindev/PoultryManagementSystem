import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/Components/ui/dialog"
import { useForm } from '@inertiajs/react';
import FormComponent from '@/Components/ui/formComponent';
import { FormEventHandler, useState } from 'react';
import { FormFieldType } from '@/Components/ui/formComponent';
import { Button } from "@/components/ui/button";
import { usePage } from '@inertiajs/react';
import { useToast } from '@/Components/hooks/use-toast';
import { SelectItem } from "@/Components/ui/select";
import axios from "axios";
import { FoodProp } from "../table/FoodTable";
import { useFoodStore } from "@/lib/Stores/foodStore";
import { useSupplierStore } from "@/lib/Stores/supplierStore";


interface FormData {
    food_code: string;
    food_name: string;
    food_supplier_name: string;
    food_price_per_bag: string;
    food_discount: string;
    food_quantity: string;
    food_purchase_date: string;
    food_total_cost: string;
    user_id: any;
    [key: string]: any; // Index signature to allow dynamic property access
}

interface FoodFormProp {
    showDlg: boolean;
    toggleDlg: (open: boolean) => void;
    title?: string;
    selectedData?: FoodProp | null;
    userId?: number,
}

const FoodForm = ({ showDlg, toggleDlg, title, selectedData}: FoodFormProp) => {
    const user = usePage().props.auth.user;
    const isEditMode = !!selectedData; // Determine mode based on selectedData presence
    const { toast } = useToast();
    const formTitle = title || (isEditMode ? "UPDATE ALIMENT" : "NOUVEAU ALIMENT");
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
    const { addFood, updateFood } = useFoodStore();
    const { suppliers } = useSupplierStore();

    const validateForm = (data: FormData) => {
        const requiredFields = [
            'food_code',
            'food_name',
            'food_supplier_name',
            'food_price_per_bag',
            'food_discount',
            'food_quantity',
            'food_purchase_date',
            'food_total_cost',
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
        food_code: selectedData?.food_code || "",
        food_name: selectedData?.food_name || "",
        food_supplier_name: selectedData?.food_supplier_name || "",
        food_price_per_bag: selectedData?.food_price_per_bag || "",
        food_discount: selectedData?.food_discount || "",
        food_quantity: selectedData?.food_quantity || "",
        food_purchase_date: selectedData?.food_purchase_date || "",
        food_total_cost: selectedData?.food_total_cost || "",
        user_id: user.data.id,
    });

    const submit: FormEventHandler = async (e) => {
        e.preventDefault();
    
        if (!validateForm(data)) {
            return;
        }
    
        try {
            if (isEditMode) {
                // Update the Food
                updateFood(selectedData?.food_id, data);
                console.log("Response:", data);
                toggleDlg(false); // Close dialog on success
                toast({ description: 'Food updated successfully.' });
            } else {
                // Create a new Food
                addFood(data);
                console.log("Response:", data);
                toggleDlg(false); // Close dialog on success
                toast({ description: 'Food created successfully.' });
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
            <DialogContent className="dark:bg-slate-800 xl:max-w-[32vw] xl:max-h-[70vh]">
                <DialogHeader className="mb-5">
                    <DialogTitle className="flex space-x-2 text-lg font-bold text-orange-600"><h1>{formTitle}</h1></DialogTitle>
                </DialogHeader>
                <form onSubmit={submit} className='text-base'>
                    <div className="space-y-3">
                        <div className='xl:flex xl:space-x-10'>
                            <FormComponent
                                name="food_code"
                                fieldType={FormFieldType.INPUT}
                                label="Code Aliment"
                                placeholder=""
                                value={data.food_code}
                                onChange={(e) => setData("food_code", e.target.value)}
                                error={errorMessage == "food_code is required" ? errorMessage : errors.food_code}
                            />
                            <FormComponent
                                name="food_supplier_name"
                                fieldType={FormFieldType.SELECT}
                                label="Supplier"
                                placeholder=""
                                value={data.food_supplier_name}
                                onChange={(e) => setData("food_supplier_name", e.target.value)}
                                error={errorMessage == "food_supplier_name is required" ? errorMessage : errors.food_supplier_name}
                            >
                                {(suppliers ?? []).map((data: any) => (
                                    <SelectItem key={data.supplier_id} value={data.supplier_name}>
                                        <div className="flex cursor pointer items-center gap-2">
                                            <p>{data.supplier_name}</p>
                                        </div>
                                    </SelectItem>
                                ))}
                            </FormComponent>
                        </div>
                        <div className='xl:flex xl:space-x-10'>
                            <FormComponent
                                name="food_name"
                                fieldType={FormFieldType.INPUT}
                                label="Nom"
                                placeholder=""
                                value={data.food_name}
                                onChange={(e) => setData("food_name", e.target.value)}
                                error={errorMessage == "food_name is required" ? errorMessage : errors.food_name}
                            />
                            <FormComponent
                                name="food_purchase_date"
                                fieldType={FormFieldType.DATE_PICKER}
                                label="Date"
                                placeholder=""
                                value={data.food_purchase_date}
                                onChange={(e) => setData("food_purchase_date", e.target.value)}
                                error={errorMessage == "food_purchase_date is required" ? errorMessage : errors.food_purchase_date}
                            />
                        </div>
                        <div className='xl:flex xl:space-x-10'>
                            <FormComponent
                                name="food_price_per_bag"
                                fieldType={FormFieldType.NUMBER}
                                label="Prix / Sac(CFA)"
                                placeholder=""
                                value={data.food_price_per_bag}
                                onChange={(e) => setData("food_price_per_bag", e.target.value)}
                                error={errorMessage == "food_price_per_bag is required" ? errorMessage : errors.food_price_per_bag}
                            />
                            <FormComponent
                                name="food_quantity"
                                fieldType={FormFieldType.NUMBER}
                                label="Quantity"
                                placeholder=""
                                value={data.food_quantity}
                                onChange={(e) => setData("food_quantity", e.target.value)}
                                error={errorMessage == "food_quantity is required" ? errorMessage : errors.food_quantity}
                            />
                        </div>
                        <div className='xl:flex xl:space-x-10'>
                            <FormComponent
                                name="food_discount"
                                fieldType={FormFieldType.NUMBER}
                                label="Reduction (CFA)"
                                placeholder=""
                                value={data.food_discount}
                                onChange={(e) => setData("food_discount", e.target.value)}
                                error={errorMessage == "food_discount is required" ? errorMessage : errors.food_discount}
                            />
                            <FormComponent
                                name="food_total_cost"
                                fieldType={FormFieldType.NUMBER}
                                label="Prix Total"
                                placeholder=""
                                value={data.food_total_cost = (Number(data.food_price_per_bag) * Number(data.food_quantity) - Number(data.food_discount)).toString()}
                                onChange={(e) => setData("food_total_cost", e.target.value)}
                                error={errorMessage == "food_total_cost is required" ? errorMessage : errors.food_total_cost}
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

export default FoodForm