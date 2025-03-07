import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import FormComponent from "@/Components/ui/formComponent";
import { FormFieldType } from "@/Components/ui/formComponent";
import { FormEventHandler, useEffect, useState } from "react";
import { usePage } from '@inertiajs/react';
import { useToast } from '@/Components/hooks/use-toast';
import axios from "axios";
import { ClientProp } from "../table/CustomerTable";
import { useClientStore } from "@/lib/Stores/customerStore";


interface FormData {
    client_id?: number;
    client_name: string;
    client_company: string;
    client_telephone: string;
    client_email: string;
    client_position: string;
    client_location: string;
    user_id: any;
    [key: string]: any; // Index signature to allow dynamic property access
}

interface CustomerFormProp {
    showDlg: boolean;
    toggleDlg: (open: boolean) => void;
    title?: string;
    selectedData?: ClientProp | null;
    userId?: number 
}

const CustomerForm = ({ showDlg, toggleDlg, title, selectedData, userId }: CustomerFormProp) => {
    const user = usePage().props.auth.user;
    const isEditMode = !!selectedData; // Determine mode based on selectedData presence
    const { toast } = useToast();
    const formTitle = title || (isEditMode ? "UPDATE CLIENT" : "NOUVEAU CLIENT");
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
    const { clients, addClient, updateClient} = useClientStore();

    // console.log(user.data.id)

    const validateForm = (data: FormData) => {
        const requiredFields = [
            'client_name',
            'client_company',
            'client_telephone',
            'client_email',
            'client_position',
            'client_location'
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
        client_name: selectedData?.client_name || "",
        client_company: selectedData?.client_company || "",
        client_telephone: selectedData?.client_telephone || "",
        client_email: selectedData?.client_email || "",
        client_position: selectedData?.client_position || "",
        client_location: selectedData?.client_location || "",
        user_id: user.data.id
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
                // Update the Customer
                updateClient(selectedData?.client_id, data);
                console.log("Response:", clients);
                toggleDlg(false); // Close dialog on success
                toast({ description: 'Customer updated successfully.' });
            } else {
                // Create a new Customer
                addClient(data);
                console.log("Response:", data);
                toggleDlg(false); // Close dialog on success
                toast({ description: 'Customer created successfully.' });
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
            <DialogContent className="dark:bg-slate-800 xl:max-w-[32vw] xl:max-h-[50vh]">
                <DialogHeader className="mb-5">
                    <DialogTitle className="flex space-x-2 text-lg font-bold text-orange-600">
                        <h1>{formTitle}</h1>
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={submit} className="text-base">
                    <div className="space-y-3">
                        <div className="xl:flex xl:space-x-10">
                            <FormComponent
                                name="client_name"
                                fieldType={FormFieldType.INPUT}
                                label="Nom"
                                placeholder=""
                                value={data.client_name}
                                onChange={(e) => setData("client_name", e.target.value)}
                                error={errorMessage == "client_name is required" ? errorMessage : errors.client_name}
                            />
                            <FormComponent
                                name="client_company"
                                fieldType={FormFieldType.INPUT}
                                label="Company"
                                placeholder=""
                                value={data.client_company}
                                onChange={(e) => setData("client_company", e.target.value)}
                                error={errorMessage == "client_company is required" ? errorMessage : errors.client_company}
                            />
                        </div>
                        <div className="xl:flex xl:space-x-10">
                            <FormComponent
                                name="client_telephone"
                                fieldType={FormFieldType.INPUT}
                                label="Telephone"
                                placeholder=""
                                value={data.client_telephone}
                                onChange={(e) => setData("client_telephone", e.target.value)}
                                error={errorMessage == "client_telephone is required" ? errorMessage : errors.client_telephone}
                            />
                            <FormComponent
                                name="client_email"
                                fieldType={FormFieldType.INPUT}
                                label="Email"
                                placeholder=""
                                value={data.client_email}
                                onChange={(e) => setData("client_email", e.target.value)}
                                error={errorMessage == "client_email is required" ? errorMessage : errors.client_email}
                            />
                        </div>
                        <div className="xl:flex xl:space-x-10">
                            <FormComponent
                                name="client_position"
                                fieldType={FormFieldType.INPUT}
                                label="Position"
                                placeholder=""
                                value={data.client_position}
                                onChange={(e) => setData("client_position", e.target.value)}
                                error={errorMessage == "client_position is required" ? errorMessage : errors.client_position}
                            />
                            <FormComponent
                                name="client_location"
                                fieldType={FormFieldType.INPUT}
                                label="Location"
                                placeholder=""
                                value={data.client_location}
                                onChange={(e) => setData("client_location", e.target.value)}
                                error={errorMessage == "client_location is required" ? errorMessage : errors.client_location}
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

export default CustomerForm;
