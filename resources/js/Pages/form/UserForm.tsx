import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/Components/components/ui/dialog";
import { useForm } from "@inertiajs/react";
import { Button } from "@/Components/components/ui/button";
import FormComponent from "@/Components/components/ui/formComponent";
import { FormFieldType } from "@/Components/components/ui/formComponent";
import { FormEventHandler, useEffect, useState } from "react";
import { usePage } from '@inertiajs/react';
import { useToast } from '@/Components/components/hooks/use-toast';
import axios from "axios";
// import { ClientProp } from "../table/CustomerTable";
import { useClientStore } from "@/lib/Stores/customerStore";
import { useUserStore } from "@/lib/Stores/UserStore";
import { UserProp } from "@/lib/Stores/UserStore";


interface FormData {
    id?: number;
    name: string;
    email: string;
    password: string;
    role: string;
    [key: string]: any; // Index signature to allow dynamic property access
}

interface UserFormProp {
    showDlg: boolean;
    toggleDlg: (open: boolean) => void;
    title?: string;
    selectedData?: UserProp | null;
    // userId?: number 
}

const UserForm = ({ showDlg, toggleDlg, title, selectedData }: UserFormProp) => {
    const user = usePage().props.auth.user;
    const isEditMode = !!selectedData; // Determine mode based on selectedData presence
    const { toast } = useToast();
    const formTitle = title || (isEditMode ? "UPDATE CLIENT" : "NOUVEAU CLIENT");
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
    // const { clients, addClient, updateClient} = useClientStore();
    const { users, addUser, updateUser } = useUserStore();

    // console.log(user.data.id)

    const validateForm = (data: FormData) => {
        const requiredFields = [
            'name',
            'email',
            'password',
            'role'
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
        name: selectedData?.name || "",
        email: selectedData?.email || "",
        password: selectedData?.password || "",
        role: selectedData?.role || "",
        // user_id: user.data.id
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
                updateUser(selectedData?.id, data);
                // console.log("Response:", data);
                toggleDlg(false); // Close dialog on success
                toast({ description: 'Customer updated successfully.' });
            } else {
                // Create a new Customer
                addUser(data);
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
            <DialogContent className="dark:bg-slate-800">
                <DialogHeader className="mb-5">
                    <DialogTitle className="flex space-x-2 text-lg font-bold text-orange-600">
                        <h1>{formTitle}</h1>
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={submit} className="text-base">
                    <div className="space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormComponent
                                name="name"
                                fieldType={FormFieldType.INPUT}
                                label="Nom"
                                placeholder=""
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                error={errorMessage == "name is required" ? errorMessage : errors.name}
                            />
                            <FormComponent
                                name="email"
                                fieldType={FormFieldType.INPUT}
                                label="Email"
                                placeholder=""
                                value={data.email}
                                onChange={(e) => setData("email", e.target.value)}
                                error={errorMessage == "email is required" ? errorMessage : errors.email}
                            />
                            <FormComponent
                                name="password"
                                fieldType={FormFieldType.INPUT}
                                label="Password"
                                placeholder=""
                                value={data.password}
                                onChange={(e) => setData("password", e.target.value)}
                                error={errorMessage == "password is required" ? errorMessage : errors.password}
                            />
                            <FormComponent
                                name="role"
                                fieldType={FormFieldType.SELECT}
                                label="Role"
                                placeholder=""
                                value={data.role}
                                onChange={(e) => setData("role", e.target.value)}
                                error={errorMessage == "role is required" ? errorMessage : errors.role}
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

export default UserForm;
