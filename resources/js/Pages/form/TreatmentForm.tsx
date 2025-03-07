import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/Components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useForm } from '@inertiajs/react';
import FormComponent from '@/Components/ui/formComponent';
import { FormEventHandler, useState } from 'react';
import { FormFieldType } from '@/Components/ui/formComponent';
import { usePage } from '@inertiajs/react';
import { useToast } from '@/Components/hooks/use-toast';
import { SelectItem } from "@/Components/ui/select"
import axios from "axios"
import { TreatmentProp } from "../table/TreatmentTable";
import { useBatimentStore } from "@/lib/Stores/batimentStore";
import { useTreatmentStore } from "@/lib/Stores/treatmentStore";


interface FormData {
    treatment_name: string;
    treatment_batiment_code: string;
    treatment_veto_name: string;
    treatment_comment: string;
    user_id: any;
    [key: string]: any; // Index signature to allow dynamic property access
}

interface TreatmentFormProp {
    showDlg: boolean;
    toggleDlg: (open: boolean) => void;
    title?: string;
    selectedData?: TreatmentProp | null;
    userId?: number 
}


const TreatmentForm = ({ showDlg, toggleDlg, title, selectedData}: TreatmentFormProp) => {

    const user = usePage().props.auth.user;
    const isEditMode = !!selectedData; // Determine mode based on selectedData presence
    const { toast } = useToast();
    const formTitle = title || (isEditMode ? "UPDATE TRAITEMENT" : "NOUVEAU TRAITEMENT");
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
    const { batiments } = useBatimentStore();
    const { addTreatment, updateTreatment } = useTreatmentStore();

    const treatmentNames = [
        "Marek’s Disease Vaccine", "Newcastle Disease Vaccine (NDV)", 
        "Infectious Bursal Disease (IBD) Vaccine (Gumboro)", 
        "Fowl Pox Vaccine", "Infectious Bronchitis (IB) Vaccine",
        "Avian Encephalomyelitis (AE) Vaccine", "Fowl Cholera Vaccine", "Salmonella Vaccine",
        "Coryza Vaccine", "E. Coli Vaccine", "Mycoplasma Vaccine"
    ]


    const validateForm = (data: FormData) => {
        const requiredFields = [
            'treatment_name',
            'treatment_batiment_code',
            'treatment_veto_name',
            'treatment_comment',
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


    const { data, setData, processing, errors } = useForm<FormData>({
        treatment_name: selectedData?.treatment_name || "",
        treatment_batiment_code: selectedData?.treatment_batiment_code || "",
        treatment_veto_name: selectedData?.treatment_veto_name || "",
        treatment_comment: selectedData?.treatment_comment || "",
        user_id: user.data.id,
    });


    const submit: FormEventHandler = async (e) => {
        e.preventDefault();
    
        if (!validateForm(data)) {
            return;
        }
    
        try {
            if (isEditMode) {
                // Update the Treatment
                updateTreatment(selectedData?.treatment_id, data);
                console.log("Response:", data);
                toggleDlg(false); // Close dialog on success
                toast({ description: 'Treatment updated successfully.' });
            } else {
                // Create a new Treatment
                addTreatment(data);
                console.log("Response:", data);
                toggleDlg(false); // Close dialog on success
                toast({ description: 'Treatment created successfully.' });
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
                            name="treatment_name"
                            fieldType={FormFieldType.SELECT}
                            label="Nom"
                            placeholder=""
                            value={data.treatment_name}
                            onChange={(e) => setData("treatment_name", e.target.value)}
                            error={errorMessage == "treatment_name is required" ? errorMessage : errors.treatment_name}
                        >
                            {treatmentNames.map((data: any, index) => (
                                <SelectItem key={index} value={data}>
                                    <div className="flex cursor pointer items-center gap-2">
                                        <p>{data}</p>
                                    </div>
                                </SelectItem>
                            ))}
                        </FormComponent>
                        <FormComponent
                            name="treatment_batiment_code"
                            fieldType={FormFieldType.SELECT}
                            label="Batiment"
                            placeholder=""
                            value={data.treatment_batiment_code}
                            onChange={(e) => setData("treatment_batiment_code", e.target.value)}
                            error={errorMessage == "treatment_batiment_code is required" ? errorMessage : errors.treatment_batiment_code}
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
                            name="treatment_veto_name"
                            fieldType={FormFieldType.INPUT}
                            label="Veterinaire"
                            placeholder=""
                            value={data.treatment_veto_name}
                            onChange={(e) => setData("treatment_veto_name", e.target.value)}
                            error={errorMessage == "treatment_veto_name is required" ? errorMessage : errors.treatment_veto_name}
                        />
                        <FormComponent
                            name="treatment_comment"
                            fieldType={FormFieldType.TEXTAREA}
                            label="Comment"
                            placeholder=""
                            value={data.treatment_comment}
                            onChange={(e) => setData("treatment_comment", e.target.value)}
                            error={errorMessage == "treatment_comment is required" ? errorMessage : errors.treatment_comment}
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

export default TreatmentForm