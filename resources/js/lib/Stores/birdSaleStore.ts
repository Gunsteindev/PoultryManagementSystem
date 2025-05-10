import { create } from 'zustand';
import axios from 'axios';

export interface BirdSaleProp {
    bird_sale_id: number;
    bird_sale_batiment_code: string;
    bird_sale_code: string;
    bird_sale_date: string;
    bird_sale_description: string;
    bird_sale_quantity: string;
    bird_sale_reduction: string;
    bird_sale_total_cost: string;
    bird_sale_unit_price: string;
}

export interface AddBirdSaleProp {
    bird_sale_batiment_code: string;
    bird_sale_code: string;
    bird_sale_date: string;
    bird_sale_description: string;
    bird_sale_quantity: string;
    bird_sale_reduction: string;
    bird_sale_total_cost: string;
    bird_sale_unit_price: string;
    user_id: any;
}

export interface BirdSaleResponse {
    data: BirdSaleProp[];
}

interface BirdSaleStore {
    birdSales: BirdSaleProp[];
    isLoading: boolean;
    error: string | null;
    fetchBirdSales: () => Promise<void>;
    addBirdSale: (birdSale: AddBirdSaleProp) => Promise<void>;
    updateBirdSale: (birdSaleId: number | undefined, updatedBirdSale: Partial<BirdSaleProp>) => Promise<void>;
    deleteBirdSale: (birdSaleId: number) => Promise<void>;
}

export const useBirdSaleStore = create<BirdSaleStore>((set) => ({
    birdSales: [],
    isLoading: false,
    error: null,

    // Automatically fetch birdSales when the store is initialized
    fetchBirdSales: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get<BirdSaleResponse>('/api/birdsale');
            set({ birdSales: response.data.data, isLoading: false });
        } catch (error: any) {
            set({ error: error.message || 'Failed to fetch birdSales', isLoading: false });
        }
    },

    // Add a new birdSale
    addBirdSale: async (birdSale: AddBirdSaleProp) => {
        try {
            const response = await axios.post<AddBirdSaleProp>('/api/birdsale', birdSale);
            // const newBirdSale: BirdSaleProp = { ...response.data, bird_sale_id: response.data.bird_sale_id || Date.now() };
            // set((state) => ({
            //     birdSales: [...state.birdSales, newBirdSale],
            // }));
            useBirdSaleStore.getState().fetchBirdSales();
        } catch (error: any) {
            console.error('Failed to add birdSale:', error);
        }
    },

    // Update an existing birdSale
    updateBirdSale: async (birdSaleId: number | undefined, updatedBirdSale: Partial<BirdSaleProp>) => {
        if (birdSaleId === undefined) {
            console.error('BirdSale ID is undefined. Cannot update birdSale.');
            return;
        }

        try {
            const response = await axios.put(`/api/birdsale/${birdSaleId}`, updatedBirdSale);
            const updatedData = response.data.data;
            set((state) => ({
                birdSales: state.birdSales.map((birdSale) =>
                    birdSale.bird_sale_id === birdSaleId ? { ...birdSale, ...updatedData } : birdSale
                ),
            }));
            console.log('Updated birdSale successfully:', updatedData);
        } catch (error: any) {
            console.error('Failed to update birdSale:', error.message || error);
        }
    },

    // Delete a birdSale
    deleteBirdSale: async (birdSaleId: number) => {
        try {
            await axios.delete(`/api/birdsale/${birdSaleId}`);
            set((state) => ({
                birdSales: state.birdSales.filter((birdSale) => birdSale.bird_sale_id !== birdSaleId),
            }));
        } catch (error: any) {
            console.error('Failed to delete birdSale:', error);
        }
    },
}));

// Automatically call fetchBirdSales when the store is initialized
useBirdSaleStore.getState().fetchBirdSales();