import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/Components/components/ui/dialog";
import { useForm, usePage } from "@inertiajs/react";
import { Button } from "@/Components/components/ui/button";
import FormComponent from "@/Components/components/ui/formComponent";
import { FormFieldType } from "@/Components/components/ui/formComponent";
import { FormEventHandler, useEffect, useState } from "react";
import { useToast } from '@/Components/components/hooks/use-toast';
import axios from "axios";
import { BatimentProp } from "../table/BatimentTable";
import { useBatimentStore } from "@/lib/Stores/batimentStore";
import { useTranslation } from "react-i18next";


interface FormData {
    batiment_capacity: string;
    batiment_category: string;
    batiment_code: string;
    batiment_description: string;
    user_id: any;
    [key: string]: any; // Index signature to allow dynamic property access
}

interface BatimentFormProp {
    showDlg: boolean,
    toggleDlg: (open: boolean) => void
    title?: string
    selectedData?: BatimentProp | null
}


const BatimentForm = ({ showDlg, toggleDlg, title, selectedData }: BatimentFormProp) => {
    const user = usePage().props.auth.user;
    const { t, i18n } = useTranslation();


    const { toast } = useToast();
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
    const isEditMode = !!selectedData; // Determine mode based on selectedData presence
    const formTitle = title || (isEditMode ? t("room_form_updateRoom") : t("room_form_newRoom"));
    const { addBatiment, updateBatiment } = useBatimentStore();

    const validateForm = (data: FormData) => {
        const requiredFields = [
            'batiment_capacity',
            'batiment_category',
            'batiment_code',
            'batiment_description',
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

    // Initialize form data
    const { data, setData, processing, errors, reset } = useForm({
        batiment_code: selectedData?.batiment_code || "",
        batiment_description: selectedData?.batiment_description || "",
        batiment_capacity: selectedData?.batiment_capacity || "",
        batiment_category: selectedData?.batiment_category || "",
        user_id: user.data.id,
    });

    // Reset the form when toggling the dialog
    useEffect(() => {
        if (!showDlg) {
            reset();
        }
    }, [showDlg, reset]);

    const submit: FormEventHandler = async (e) => {
        e.preventDefault();
    
        if (!validateForm(data)) {
            return;
        }
    
        try {
            if (isEditMode) {
                // Update the Batiment
                updateBatiment(selectedData?.batiment_id, data)
                console.log("Response:", data);
                toggleDlg(false); // Close dialog on success
                toast({ description: 'Batiment updated successfully.' });
            } else {
                // Create a new Batiment
                addBatiment(data);
                console.log("Response:", data);
                toggleDlg(false); // Close dialog on success
                toast({ description: 'Batiment created successfully.' });
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
            <DialogContent className="dark:bg-slate-800">
                <DialogHeader className="mb-5">
                    <DialogTitle className="flex space-x-2 text-lg font-bold text-orange-600">
                        <h1>{formTitle}</h1>
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={submit} className="text-base">
                    <div className="space-y-3">
                        <FormComponent
                            name="batiment_code"
                            fieldType={FormFieldType.INPUT}
                            label={t("room_form_roomCode")}
                            placeholder=""
                            value={data.batiment_code}
                            onChange={(e) => setData("batiment_code", e.target.value)}
                            error={errorMessage == "batiment_code is required" ? errorMessage : errors.batiment_code}
                        />
                        <FormComponent
                            name="batiment_capacity"
                            fieldType={FormFieldType.NUMBER}
                            label={t("room_form_roomCapacity")}
                            placeholder=""
                            value={data.batiment_capacity}
                            onChange={(e) => setData("batiment_capacity", e.target.value)}
                            error={errorMessage == "batiment_capacity is required" ? errorMessage : errors.batiment_capacity}
                        />
                        <FormComponent
                            name="batiment_category"
                            fieldType={FormFieldType.INPUT}
                            label={t("room_form_roomCategory")}
                            placeholder=""
                            value={data.batiment_category}
                            onChange={(e) => setData("batiment_category", e.target.value)}
                            error={errorMessage == "batiment_category is required" ? errorMessage : errors.batiment_category}
                        />
                        <FormComponent
                            name="batiment_description"
                            fieldType={FormFieldType.TEXTAREA}
                            label={t("room_form_roomDescription")}
                            placeholder=""
                            value={data.batiment_description}
                            onChange={(e) => setData("batiment_description", e.target.value)}
                            error={errorMessage == "batiment_description is required" ? errorMessage : errors.batiment_description}
                        />
                    </div>
                    <div className="flex gap-x-4 mt-5">
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

export default BatimentForm;
