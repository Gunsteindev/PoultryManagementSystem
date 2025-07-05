import React from "react";
import * as LucideIcons from "lucide-react";
import { Input } from "@/Components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover";
import { Calendar } from "@/Components/ui/calendar";
import { Textarea } from "@/Components/ui/textarea";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { UseFormRegister, UseFormSetValue, UseFormWatch, Control, FieldErrors } from "react-hook-form";


// FieldProps type definition moved here since './types' does not exist
export type FieldType =
    | "text"
    | "email"
    | "number"
    | "password"
    | "select"
    | "multiselect"
    | "file"
    | "image"
    | "checkbox"
    | "date"
    | "textarea";

export interface FieldProps {
    name: string;
    label: string;
    type: FieldType;
    options?: string[]; // only for select
    required?: boolean;
    icon?: keyof typeof LucideIcons;
}

// interface DynamicFormFieldProps {
//     fields: FieldProps[];
//     register: ReturnType<typeof import("react-hook-form").useForm>["register"];
//     setValue: ReturnType<typeof import("react-hook-form").useForm>["setValue"];
//     watch: ReturnType<typeof import("react-hook-form").useForm>["watch"];
//     errors: import("react-hook-form").FieldErrors;
// }

interface DynamicFormFieldProps {
  fields: FieldProps[];
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
  control: Control<any>;
  errors: FieldErrors<any>;
}


const renderDynamicField = (
    field: FieldProps,
    register: DynamicFormFieldProps["register"],
    setValue: DynamicFormFieldProps["setValue"],
    watch: DynamicFormFieldProps["watch"],
    imagePreviews: Record<string, string>,
    setImagePreviews: React.Dispatch<React.SetStateAction<Record<string, string>>>) => {
    
    const Icon = field.icon
    ? (LucideIcons[field.icon] as React.FC<{ size?: number }>)
    : null;

    const commonProps = {
        id: field.name,
        className: cn(Icon && "pl-10"),
        ...register(field.name, { required: field.required }),
    };

    switch (field.type) {
        case "select":
            return (
                <Select onValueChange={(val) => setValue(field.name, val)}>
                <SelectTrigger className={commonProps.className}>
                    <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                    {field.options?.map((option) => (
                    <SelectItem key={option} value={option}>
                        {option}
                    </SelectItem>
                    ))}
                </SelectContent>
                </Select>
            );

        case "textarea":
            return <Textarea {...commonProps} />;

        case "checkbox":
            return (
                <div className="flex items-center gap-2 mt-1">
                <input type="checkbox" {...commonProps} className="size-4" />
                <Label htmlFor={field.name}>{field.label}</Label>
                </div>
            );

        case "file":
        case "image":
            return (
                <>
                <Input
                    type="file"
                    accept={field.type === "image" ? "image/*" : undefined}
                    {...commonProps}
                    onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file && field.type === "image") {
                        const url = URL.createObjectURL(file);
                        setImagePreviews((prev) => ({ ...prev, [field.name]: url }));
                    }
                    }}
                />
                {imagePreviews[field.name] && (
                    <img
                    src={imagePreviews[field.name]}
                    alt="Preview"
                    className="mt-2 rounded border w-32 h-32 object-cover"
                    />
                )}
                </>
            );

        case "date":
            return (
                <Popover>
                <PopoverTrigger asChild>
                    <button
                    type="button"
                    className={cn(
                        "w-full justify-start text-left font-normal border p-1.5 rounded-md",
                        Icon && "pl-10",
                        !watch(field.name) && "text-muted-foreground"
                    )}
                    >
                    {watch(field.name)
                        ? format(watch(field.name) as Date, "PPP")
                        : "Pick a date"}
                    </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                        selected={watch(field.name) as Date | undefined}
                        onSelect={(date) => setValue(field.name, date)}
                        initialFocus
                    />
                </PopoverContent>
                </Popover>
            );

        default:
            return <Input type={field.type} {...commonProps} />;
    }
};

const DynamicFormField: React.FC<DynamicFormFieldProps> = ({
    fields,
    register,
    setValue,
    watch,
    errors }) => {
    
        const [imagePreviews, setImagePreviews] = React.useState<Record<string, string>>(
        {}
    );

    return (
        <>
            {fields.map((field) => {
                const Icon = field.icon
                ? (LucideIcons[field.icon] as React.FC<{ size?: number }>)
                : null;

                return (
                    <div key={field.name} className="flex flex-col gap-2 col-span-1">
                        {field.type !== "checkbox" && (
                            <Label htmlFor={field.name} className="text-start">
                                {field.label}
                            </Label>
                        )}
                        <div className="relative">
                            {Icon && field.type !== "checkbox" && (
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                                <Icon size={18} />
                                </span>
                            )}
                            {renderDynamicField(
                                field,
                                register,
                                setValue,
                                watch,
                                imagePreviews,
                                setImagePreviews
                            )}
                        </div>
                        {errors[field.name] && (
                            <span className="text-start text-sm text-red-600">
                                {field.label} is required
                            </span>
                        )}
                    </div>
                );
            })}
        </>
    );
};

export default DynamicFormField;


