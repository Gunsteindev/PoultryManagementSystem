import React from "react";
import {  Select,  SelectContent,  SelectTrigger,  SelectValue } from "@/Components/components/ui/select";
import { Input } from "@/Components/components/ui/input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/Components/components/ui/calendar";
import * as LucideIcons from "lucide-react";
import { Button } from "@/Components/components/ui/button"
import { Calendar as CalendarIcon, ChevronDownIcon  } from "lucide-react"

export enum FormFieldType {
    INPUT = "input",
    NUMBER = "number",
    TEXTAREA = "textarea",
    PHONE_INPUT = "phoneInput",
    CHECKBOX = "checkbox",
    DATE_PICKER = "datePicker",
    SELECT = "select",
    SKELETON = "skeleton",
}

type FormFieldTypeKey = typeof FormFieldType[keyof typeof FormFieldType];

interface FormFieldProps {
    name: string;
    fieldType: FormFieldType;
    label?: string;
    placeholder?: string;
    value?: string | number | boolean | null;
    onChange: (value: any) => void; // This will receive the date directly
    error?: string;
    dateFormat?: string;
    showTimeSelect?: boolean;
    children?: React.ReactNode;
    // Adapt these to accept Inertia's useForm properties
    watch?: Record<string, any>; // Instead of ReturnType<typeof useForm>["watch"]
    setValue?: (name: string, value: any, options?: { shouldValidate?: boolean, shouldDirty?: boolean }) => void; // Inertia's setData signature
}

const renderField = (field: FormFieldProps) => {
    const { name, fieldType, placeholder, value, onChange, children, watch, setValue, error, dateFormat, showTimeSelect } = field;
    
    const handleSelectChange = (newValue: string) => {
        // console.log('Selected value:', newValue);
        onChange({ target: { name, value: newValue } });
    };

    const [open, setOpen] = React.useState(false)
    const [date, setDate] = React.useState<Date | undefined>(undefined)

    console.log(placeholder);

    // const Icon = field.icon
    // ? (LucideIcons[field.icon] as React.FC<{ size?: number }>)
    // : null;

    // const commonProps = {
    //     id: field.name,
    //     className: cn(Icon && "pl-10"),
    //     ...register(field.name, { required: field.required }),
    // };

    switch (fieldType) {
        case FormFieldType.INPUT:
            return (
                <Input
                    type="text"
                    name={name}
                    placeholder={placeholder}
                    value={(value as string) || ""}
                    onChange={onChange}
                    className="rounded-md w-full max-w-md dark:border-gray-400"
                />
            );
        case FormFieldType.DATE_PICKER:
            const selectedDate = value ? new Date(value as string) : undefined;
            return (
                // <DatePicker
                //     selected={value ? new Date(value as string) : null}
                //     onChange={(date) => onChange({ target: { name, value: date } })}
                //     dateFormat={dateFormat || "MM-dd-yyyy"}
                //     showTimeSelect={showTimeSelect || false}
                //     className="rounded-md xl:w-[21vw] xl:h-[4.5vh] dark:border-gray-400 dark:bg-transparent"
                // />

                <DatePicker
                    selected={value ? new Date(value as string) : null}
                    onChange={(date) => {
                        const formattedDate = date ? format(date, dateFormat || "MM-dd-yyyy") : null;
                        onChange({ target: { name, value: formattedDate } });
                    }}
                    dateFormat={dateFormat || "MM-dd-yyyy"}
                    showTimeSelect={!!showTimeSelect}
                    className="rounded-md w-full max-w-md h-aou dark:border-gray-400 dark:bg-transparent"
                />

                // <Popover open={open} onOpenChange={setOpen}>
                //     <PopoverTrigger asChild>
                //         <Button
                //             variant="outline"
                //             id="date"
                //             className="w-48 justify-between font-normal"
                //         >
                //             {selectedDate ? format(selectedDate, dateFormat || "PPP") : "Select date"}
                //             <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
                //         </Button>
                //     </PopoverTrigger>
                //     <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                //         <Calendar
                //             mode="single"
                //             selected={selectedDate}
                //             onSelect={(date) => {
                //                 // When a date is selected, call the onChange prop with the date
                //                 onChange(date); // Directly pass the date object
                //                 setOpen(false);
                //             }}
                //             initialFocus
                //             captionLayout="dropdown"
                //         />
                //     </PopoverContent>
                // </Popover>
            );
        case FormFieldType.NUMBER:
            return (
                <Input
                    type="number"
                    name={name}
                    placeholder={placeholder}
                    value={(value as number) || ""}
                    onChange={onChange}
                    className="rounded-md w-full max-w-md dark:border-gray-400"
                />
            );
        case FormFieldType.PHONE_INPUT:
            return (
                <Input
                    type="tel"
                    name={name}
                    placeholder={placeholder}
                    value={(value as string) || ""}
                    onChange={onChange}
                    className="rounded-md w-full max-w-md dark:border-gray-400"
                />
            );
        case FormFieldType.TEXTAREA:
            return (
                <textarea
                    name={name}
                    placeholder={placeholder}
                    value={(value as string) || ""}
                    onChange={onChange}
                    className="rounded-md w-full max-w-md dark:border-gray-400 bg-transparent"
                />
            );
        case FormFieldType.CHECKBOX:
            return (
                <input
                    type="checkbox"
                    name={name}
                    checked={(value as boolean) || false}
                    onChange={onChange}
                    className="rounded-md w-full max-w-md dark:border-gray-400"
                />
            );
        case FormFieldType.SELECT:
            return (
                <Select value={value as string} onValueChange={handleSelectChange}>
                    <SelectTrigger className="rounded-md w-full max-w-md dark:border-gray-400 bg-transparent">
                    <SelectValue placeholder={placeholder}>
                            {value ? value : placeholder}
                        </SelectValue>
                    </SelectTrigger>
                    <SelectContent>{children}</SelectContent>
                </Select>
            );
        default:
            return null;
    }
};

const FormComponent: React.FC<FormFieldProps> = (props) => {
    const { name, label, error } = props;

    return (
        <div className="form-group space-y-2">
            <label htmlFor={name} className="form-label font-semibold">
                {label}
            </label>
            <div>{renderField(props)}</div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
};

export default FormComponent;
