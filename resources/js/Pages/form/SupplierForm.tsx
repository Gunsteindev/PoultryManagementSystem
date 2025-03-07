import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/Components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useForm } from '@inertiajs/react';
import FormComponent from '@/Components/ui/formComponent';
import { FormEventHandler, useState } from 'react';
import { FormFieldType } from '@/Components/ui/formComponent';
import { usePage } from '@inertiajs/react';
import { useToast } from '@/Components/hooks/use-toast';
import axios from "axios"
import { SupplierProp } from "../table/SupplierTable";
import { useSupplierStore } from "@/lib/Stores/supplierStore";

interface FormData {
    supplier_name: string;
    supplier_company: string;
    supplier_position: string;
    supplier_role: string;
    supplier_address: string;
    supplier_telephone: string;
    user_id: any;
    [key: string]: any; // Index signature to allow dynamic property access
}

interface SupplierFormProp {
    showDlg: boolean;
    toggleDlg: (open: boolean) => void;
    title?: string;
    selectedData?: SupplierProp | null;
    userId?: number
    
}

const SupplierForm = ({ showDlg, toggleDlg, selectedData, title}: SupplierFormProp) => {
    const isEditMode = !!selectedData; // Determine mode based on selectedData presence
    const { toast } = useToast();
    const formTitle = title || (isEditMode ? "UPDATE FOURNISSEURE" : "NOUVEAU FOURNISSEURE");
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
    const { addSupplier, updateSupplier } = useSupplierStore();

    const user = usePage().props.auth.user;

    const validateForm = (data: FormData) => {
        const requiredFields = [
            'supplier_name',
            'supplier_company',
            'supplier_position',
            'supplier_role',
            'supplier_address',
            'supplier_telephone',
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
        supplier_name: selectedData?.supplier_name || "",
        supplier_role: selectedData?.supplier_role || "",
        supplier_company: selectedData?.supplier_company || "",
        supplier_telephone: selectedData?.supplier_telephone || "",
        supplier_position: selectedData?.supplier_position || "",
        supplier_address: selectedData?.supplier_address || "",
        user_id: user.data.id,

    });

    const submit: FormEventHandler = async (e) => {
        e.preventDefault();
    
        if (!validateForm(data)) {
            return;
        }
    
        try {
            if (isEditMode) {
                // Update the Supplier
                updateSupplier(selectedData?.supplier_id, data);
                console.log("Response:", data);
                toggleDlg(false); // Close dialog on success
                toast({ description: 'Supplier updated successfully.' });
            } else {
                // Create a new Supplier
                addSupplier(data);
                console.log("Response:", data);
                toggleDlg(false); // Close dialog on success
                toast({ description: 'Supplier created successfully.' });
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
                                name="supplier_name"
                                fieldType={FormFieldType.INPUT}
                                label="Nom"
                                placeholder=""
                                value={data.supplier_name}
                                onChange={(e) => setData("supplier_name", e.target.value)}
                                error={errorMessage == "supplier_name is required" ? errorMessage : errors.supplier_name}
                            />
                            <FormComponent
                                name="supplier_company"
                                fieldType={FormFieldType.INPUT}
                                label="Entreprise"
                                placeholder=""
                                value={data.supplier_company}
                                onChange={(e) => setData("supplier_company", e.target.value)}
                                error={errorMessage == "supplier_company is required" ? errorMessage : errors.supplier_company}
                            />
                        </div>
                        <div className='xl:flex xl:space-x-10'>
                            <FormComponent
                                name="supplier_role"
                                fieldType={FormFieldType.INPUT}
                                label="Role"
                                placeholder=""
                                value={data.supplier_role}
                                onChange={(e) => setData("supplier_role", e.target.value)}
                                error={errorMessage == "supplier_role is required" ? errorMessage : errors.supplier_role}
                            />
                            <FormComponent
                                name="supplier_position"
                                fieldType={FormFieldType.INPUT}
                                label="Position"
                                placeholder=""
                                value={data.supplier_position}
                                onChange={(e) => setData("supplier_position", e.target.value)}
                                error={errorMessage == "supplier_position is required" ? errorMessage : errors.supplier_position}
                            />
                        </div>
                        <div className='xl:flex xl:space-x-10'>
                            <FormComponent
                                name="supplier_telephone"
                                fieldType={FormFieldType.INPUT}
                                label="Telephone"
                                placeholder=""
                                value={data.supplier_telephone}
                                onChange={(e) => setData("supplier_telephone", e.target.value)}
                                error={errorMessage == "supplier_telephone is required" ? errorMessage : errors.supplier_telephone}
                            />
                            <FormComponent
                                name="supplier_address"
                                fieldType={FormFieldType.INPUT}
                                label="Address"
                                placeholder=""
                                value={data.supplier_address}
                                onChange={(e) => setData("supplier_address", e.target.value)}
                                error={errorMessage == "supplier_address is required" ? errorMessage : errors.supplier_address}
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

export default SupplierForm