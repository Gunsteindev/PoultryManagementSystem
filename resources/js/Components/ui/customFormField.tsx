import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/Components/ui/form"
import { Input } from "@/Components/ui/input"
import React from "react";
import { Control } from "react-hook-form"
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { E164Number } from 'libphonenumber-js';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/Components/ui/select';
import { Textarea } from "@/Components/ui/textarea";
import { Checkbox } from "@/Components/ui/checkbox";
import { Image } from "lucide-react";

export enum FormFieldType {
    INPUT = "input",
    NUMBER = "number",
    TEXTAREA = "textarea",
    PHONE_INPUT = "phoneInput",
    CHECKBOX = "checkbox",
    DATE_PICKER = "datePicker",
    SELECT = "select",
    SKELETON = "skeleton"
}

interface CustomFormFieldProp {
    control: Control<any>
    fieldType: FormFieldType
    name: string
    label?: string
    placeholder?: string
    iconSrc?: string
    iconAlt?: string
    disabled?: boolean
    dateFormat?: string
    showTimeSelect?: boolean
    children?: React.ReactNode
    renderSkeleton?: (field: any) => React.ReactNode
}



const RenderField = ({ field, props }: { field: any, props: CustomFormFieldProp}) => {
    const { fieldType, iconSrc, iconAlt, placeholder, showTimeSelect, dateFormat, renderSkeleton } = props
    
    switch(fieldType) {
        case FormFieldType.INPUT: 
            return(
                <div className="flex rounded-md">
                    <FormControl>
                        <Input className="dark:border-white text-lg" placeholder={placeholder} {...field} />
                    </FormControl>
                </div>
            )
        case FormFieldType.NUMBER: 
            return(
                <div className="flex rounded-md">
                    <FormControl>
                        <Input type="number" className="dark:border-white text-lg" placeholder={placeholder} {...field} />
                    </FormControl>
                </div>
            )
        case FormFieldType.TEXTAREA:
            return (
                <FormControl> 
                    <Textarea 
                        placeholder={placeholder}
                        {...field}
                        className="shad-textarea dark:border-white"
                        disabled={props.disabled}
                    />
                </FormControl>
            )
        case FormFieldType.PHONE_INPUT:
            return(
                <FormControl>
                    <PhoneInput 
                        className="input-phone" 
                        defaultCountry="GH" 
                        placeholder={placeholder} 
                        value={field.value as E164Number | undefined} 
                        onChange={field.onChange}
                        international
                        withCountryCallingCode
                    />
                </FormControl>
            )
        case FormFieldType.DATE_PICKER:
            return(
                <div className="flex rounded-md border border-dark-500 bg-dark-400">
                    {/* {iconSrc && (
                        <Image className="ml-2" src={iconSrc} height={24} width={24} alt={iconAlt || "ICON"} />
                    )} */}
                    <FormControl>
                        <DatePicker 
                            selected={field.value} 
                            onChange={(date) => field.onChange(date)} 
                            dateFormat={dateFormat ?? 'MM/dd/yyyy'}
                            showTimeSelect={showTimeSelect ?? false}
                            timeInputLabel="Time:"
                            wrapperClassName="date-picker"
                        />
                    </FormControl>
                </div>
            )
        case FormFieldType.SELECT:
            return (
                <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger className="shad-select-trigger dark:border-white">
                                <SelectValue placeholder={placeholder}/>
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent className="shad-select-content dark:bg-slate-800">
                            {props.children}
                        </SelectContent>
                    </Select>
                </FormControl>
            )
        case FormFieldType.SKELETON:
            return renderSkeleton ? renderSkeleton(field) : null
        case FormFieldType.CHECKBOX:
            return (
                <FormControl>
                    <div className="flex items-center gap-4">
                        <Checkbox 
                            id={props.name}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                        <label htmlFor={props.name} className="checkbox-label">
                            {props.label}
                        </label>
                    </div>
                </FormControl>
            )
        default:
            break
    }
}


const CustomFormField = (props: CustomFormFieldProp) => {

    const { control, fieldType, name, label } = props

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex-1">
                    {fieldType !== FormFieldType.CHECKBOX && label && (
                        <FormLabel>{label}</FormLabel>
                    )}
                    <RenderField field={field} props={props} />
                    <FormMessage className="shad-error"/>
                </FormItem>
            )}
        />
    )
}

export default CustomFormField