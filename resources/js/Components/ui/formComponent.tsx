import React from "react";
import {  Select,  SelectContent,  SelectTrigger,  SelectValue } from "@/Components/ui/select";
import { Input } from "@/Components/ui/input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';

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

interface CustomFormFieldProps {
    name: string;
    fieldType: FormFieldType;
    label: string;
    placeholder?: string;
    value: string | number | boolean | null;
    onChange: (value: any) => void;
    error?: string;
    dateFormat?: string;
    showTimeSelect?: boolean;
    children?: React.ReactNode;
}

const renderField = (field: CustomFormFieldProps) => {
    const { name, fieldType, placeholder, value, onChange, children, error, dateFormat, showTimeSelect } = field;
    
    const handleSelectChange = (newValue: string) => {
        // console.log('Selected value:', newValue);
        onChange({ target: { name, value: newValue } });
    };

    console.log(placeholder);

    switch (fieldType) {
        case FormFieldType.INPUT:
            return (
                <Input
                    type="text"
                    name={name}
                    placeholder={placeholder}
                    value={(value as string) || ""}
                    onChange={onChange}
                    className="rounded-md xl:w-[14vw] dark:border-gray-400"
                />
            );
        case FormFieldType.DATE_PICKER:
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
                    showTimeSelect={showTimeSelect || false}
                    className="rounded-md xl:w-[14vw] h-[3vh] dark:border-gray-400 dark:bg-transparent"
                />
            );
        case FormFieldType.NUMBER:
            return (
                <Input
                    type="number"
                    name={name}
                    placeholder={placeholder}
                    value={(value as number) || ""}
                    onChange={onChange}
                    className="rounded-md xl:w-[14vw] dark:border-gray-400"
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
                    className="rounded-md xl:w-[14vw]"
                />
            );
        case FormFieldType.TEXTAREA:
            return (
                <textarea
                    name={name}
                    placeholder={placeholder}
                    value={(value as string) || ""}
                    onChange={onChange}
                    className="rounded-md xl:w-[14vw] dark:border-gray-400 bg-transparent"
                />
            );
        case FormFieldType.CHECKBOX:
            return (
                <input
                    type="checkbox"
                    name={name}
                    checked={(value as boolean) || false}
                    onChange={onChange}
                    className="form-checkbox"
                />
            );
        case FormFieldType.SELECT:
            return (
                <Select value={value as string} onValueChange={handleSelectChange}>
                    <SelectTrigger className="rounded-md xl:w-[14vw] dark:border-gray-400 bg-transparent">
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

const FormComponent: React.FC<CustomFormFieldProps> = (props) => {
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
