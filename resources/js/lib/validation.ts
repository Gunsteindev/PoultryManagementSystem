import { z } from "zod"

export const productFormSchema = z.object({
    category: z.string(),
	compartment: z.string(),
	pickupCode: z.string(),
	quantity: z.string(),
	loss: z.string(),
	location: z.string()
})

export const batimentFormSchema = z.object({
	codeBatiment: z.string(),
	description: z.string(),
	capacity: z.string()
})

export const perteFormSchema = z.object({
	category: z.string(),
	storageLocation: z.string(),
	quantity: z.string(),
	// code: z.string()
})

export const SaleFormSchema = z.object({
    category: z.string(),
	description: z.string(),
	unitPrice: z.string(),
	quantity: z.string(),
	reduction: z.string(),
	totalPrice: z.string(),
	code: z.string()
})

export const supplierFormSchema = z.object({
    name: z.string(),
	company: z.string(),
	position: z.string(),
	phone: z.string()
})

export const treatmentFormSchema = z.object({
	group: z.string(),
	doctor: z.string(),
	description: z.string()
})

export const foodFormSchema = z.object({
    designation: z.string(),
	pricePerBag: z.string(),
	quantity: z.string(),
	reduction: z.string()
})

export const consomationformSchema = z.object({
    block: z.string(),
	food: z.string(),
	quantityPerBag: z.string()
})