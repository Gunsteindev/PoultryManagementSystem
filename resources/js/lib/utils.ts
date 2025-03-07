import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { BandPurchaseProp } from '../Pages/table/BandPurchaseTable';
import { PickupProp } from '../Pages/table/PickupTable';
import { BirdSaleProp } from '../Pages/table/BirdSaleTable';
import { useBandPurchaseStore } from '@/lib/Stores/bandPurchaseStore';
import { usePickupStore } from '@/lib/Stores/pickupStore';
import { useBirdSaleStore } from '@/lib/Stores/birdSaleStore';

// const { bandPurchases } = useBandPurchaseStore();
// const { pickups } = usePickupStore();
// const { birdSales } = useBirdSaleStore();


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// export const totalBirdCost = bandPurchases
//     .filter((e: BandPurchaseProp) => e.band_purchase_total_cost)
//     .reduce((accumulator: number, current: { band_purchase_total_cost: string; }) => {
//         // Convert the band_purchase_total_cost to a number before summing
//         const cost = parseFloat(current.band_purchase_total_cost);
//         return accumulator + (isNaN(cost) ? 0 : cost); // Add to accumulator, handle NaN
// }, 0) || 0;

export const totalBirdCost = (bandPurchases: BandPurchaseProp[]) => {
    return bandPurchases
        .filter((e: BandPurchaseProp) => e.band_purchase_total_cost)
        .reduce((accumulator: number, current: { band_purchase_total_cost: string; }) => {
            // Convert the band_purchase_total_cost to a number before summing
            const cost = parseFloat(current.band_purchase_total_cost);
            return accumulator + (isNaN(cost) ? 0 : cost); // Add to accumulator, handle NaN
    }, 0) || 0;
}

// export const totalBird = bandPurchases
//     .filter((e: BandPurchaseProp) => e.band_purchase_quantity)
//     .reduce((accumulator: number, current: { band_purchase_quantity: string; }) => {
//         // Convert the band_purchase_total_cost to a number before summing
//         const cost = parseFloat(current.band_purchase_quantity);
//         return accumulator + (isNaN(cost) ? 0 : cost); // Add to accumulator, handle NaN
// }, 0);

export const totalBird = (bandPurchases: BandPurchaseProp[]) => {
    return bandPurchases
        .filter((e: BandPurchaseProp) => e.band_purchase_quantity)
        .reduce((accumulator: number, current: { band_purchase_quantity: string; }) => {
            // Convert the band_purchase_total_cost to a number before summing
            const cost = parseFloat(current.band_purchase_quantity);
            return accumulator + (isNaN(cost) ? 0 : cost); // Add to accumulator, handle NaN
    }, 0);
}

// export const totalBirdSale = birdSales
//     .filter((e: BirdSaleProp) => e.bird_sale_quantity)
//     .reduce((accumulator: number, current: { bird_sale_quantity: string; }) => {
//         // Convert the band_purchase_total_cost to a number before summing
//         const cost = parseFloat(current.bird_sale_quantity);
//         return accumulator + (isNaN(cost) ? 0 : cost); // Add to accumulator, handle NaN
// }, 0);

export const totalBirdSale = (birdSales: BirdSaleProp[]) => {
    return  birdSales
        .filter((e: BirdSaleProp) => e.bird_sale_quantity)
        .reduce((accumulator: number, current: { bird_sale_quantity: string; }) => {
            // Convert the band_purchase_total_cost to a number before summing
            const cost = parseFloat(current.bird_sale_quantity);
            return accumulator + (isNaN(cost) ? 0 : cost); // Add to accumulator, handle NaN
    }, 0);
}

export const totalCratesData = (pickups: PickupProp[]) => {
    return pickups
    ?.filter((e: PickupProp) => e.pickup_crate_quantity)
    .reduce((accumulator: { totalCrates: number; totalQuantityRemain: number }, current: PickupProp) => {
        // Convert pickup_crate_quantity and pickup_quantity_remain to numbers before summing
        const crateQuantity = parseFloat(current.pickup_crate_quantity.toString());
        const quantityRemain = parseFloat(current.pickup_quantity_remain.toString());
        
        return {
            totalCrates: accumulator.totalCrates + (isNaN(crateQuantity) ? 0 : crateQuantity), // Add to totalCrates, handle NaN
            totalQuantityRemain: accumulator.totalQuantityRemain + (isNaN(quantityRemain) ? 0 : quantityRemain) // Add to totalQuantityRemain, handle NaN
        };
    }, { totalCrates: 0, totalQuantityRemain: 0 }) || { totalCrates: 0, totalQuantityRemain: 0 };
}
