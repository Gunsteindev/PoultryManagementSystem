import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/Components/ui/dialog"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form } from "@/Components/ui/form"
import CustomFormField from '@/Components/ui/customFormField';
import { Store } from "lucide-react"
import { Button } from "@/components/ui/button"
import { perteFormSchema } from "@/lib/validation"
import { SelectItem } from "@/Components/ui/select"
import { useForm } from '@inertiajs/react';
import FormComponent from '@/Components/ui/formComponent';
import { FormEventHandler } from 'react';
import { FormFieldType } from '@/Components/ui/formComponent';



interface PerteFormProp {
    showDlg: boolean,
    toggleDlg: (open: boolean) => void
    title?: string
    
}

const PerteForm = ({ showDlg, toggleDlg, title}: PerteFormProp) => {

    const formTitle = title ? title : "PERTE DE VOLAILLE"

    const { data, setData, post, processing, errors, reset } = useForm({
        lost_category: "",
        lost_code_batiment: "",
        lost_quantity: "",
        lost_date: ""
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        // console.log(data)

        post('lost')
        toggleDlg(false);

    }

   
    return (
        <Dialog open={showDlg} onOpenChange={toggleDlg}>
            <DialogContent className="dark:bg-slate-800 xl:max-w-[20vw]">
                <DialogHeader className="mb-5">
                    <DialogTitle className="flex space-x-2 text-lg font-bold text-orange-600"><h1>{formTitle}</h1></DialogTitle>
                </DialogHeader>
                <form onSubmit={submit} className='text-base'>
                    <div className="space-y-3">
                        <FormComponent
                            name="lost_date"
                            fieldType={FormFieldType.INPUT}
                            label="Date"
                            placeholder=""
                            value={data.lost_date}
                            onChange={(e) => setData("lost_date", e.target.value)}
                            error={errors.lost_date}
                        />
                        <FormComponent
                            name="lost_category"
                            fieldType={FormFieldType.INPUT}
                            label="Category"
                            placeholder=""
                            value={data.lost_category}
                            onChange={(e) => setData("lost_category", e.target.value)}
                            error={errors.lost_category}
                        />
                        <FormComponent
                            name="lost_code_batiment"
                            fieldType={FormFieldType.INPUT}
                            label="Code Batiment"
                            placeholder=""
                            value={data.lost_code_batiment}
                            onChange={(e) => setData("lost_code_batiment", e.target.value)}
                            error={errors.lost_code_batiment}
                        />
                        <FormComponent
                            name="lost_quantity"
                            fieldType={FormFieldType.NUMBER}
                            label="Quantity"
                            placeholder=""
                            value={data.lost_quantity}
                            onChange={(e) => setData("lost_quantity", e.target.value)}
                            error={errors.lost_quantity}
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

export default PerteForm