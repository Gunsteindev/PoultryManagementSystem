import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/Components/components/ui/form";
import { Input } from "@/Components/components/ui/input";
import React from "react";
import { Control, UseFormWatch, UseFormSetValue } from "react-hook-form";
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { E164Number } from 'libphonenumber-js';
import { Textarea } from "@/Components/components/ui/textarea";
import { Checkbox } from "@/Components/components/ui/checkbox";
import { Select, SelectTrigger, SelectValue, SelectContent } from '@/Components/components/ui/select';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/Components/components/ui/calendar";

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
  control: Control<any>;
  fieldType: FormFieldType;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
  watch?: UseFormWatch<any>;
  setValue?: UseFormSetValue<any>;
}

const RenderField = ({ field, props }: { field: any, props: CustomFormFieldProp }) => {
  const { watch, setValue } = props;
  const { fieldType, name, placeholder, showTimeSelect, dateFormat, renderSkeleton } = props;

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <FormControl>
          <Input placeholder={placeholder} {...field} className="dark:border-white text-lg" />
        </FormControl>
      );

    case FormFieldType.NUMBER:
      return (
        <FormControl>
          <Input type="number" placeholder={placeholder} {...field} className="dark:border-white text-lg" />
        </FormControl>
      );

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
      );

    case FormFieldType.PHONE_INPUT:
      return (
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
      );

    case FormFieldType.DATE_PICKER:
      return (
        <FormControl>
          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                className={cn(
                  "w-full justify-start text-left font-normal border p-1.5 rounded-md",
                  !watch?.(name) && "text-muted-foreground"
                )}
              >
                {watch?.(name) ? format(new Date(watch(name)), "PPP") : "Pick a date"}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={watch?.(name) ? new Date(watch(name)) : undefined}
                onSelect={(date) => date && setValue?.(name, date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </FormControl>
      );

    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger className="shad-select-trigger dark:border-white">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="shad-select-content dark:bg-slate-800">
              {props.children}
            </SelectContent>
          </Select>
        </FormControl>
      );

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
      );

    case FormFieldType.SKELETON:
      return renderSkeleton ? renderSkeleton(field) : null;

    default:
      return null;
  }
};

const CustomFormField = (props: CustomFormFieldProp) => {
  const { control, fieldType, name, label } = props;

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
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
