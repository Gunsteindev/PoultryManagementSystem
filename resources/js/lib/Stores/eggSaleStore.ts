import { create } from 'zustand';
import axios from 'axios';

export interface EggSaleProp {
    eggsale_id: number
    eggsale_code: string,
    eggsale_description: string,
    eggsale_unit_price: string,
    eggsale_quantity: string,
    eggsale_reduction: string,
    eggsale_total_cost: string,
    eggsale_client_name: string,
    eggsale_date: string,
}

export interface AddEggSaleProp {
    eggsale_code: string,
    eggsale_description: string,
    eggsale_unit_price: string,
    eggsale_quantity: string,
    eggsale_reduction: string,
    eggsale_total_cost: string,
    eggsale_client_name: string,
    eggsale_date: string,
    user_id: any;
}

export interface EggSaleResponse {
    data: EggSaleProp[];
}

interface EggSaleStore {
    eggSales: EggSaleProp[];
    isLoading: boolean;
    error: string | null;
    fetchEggSales: () => Promise<void>;
    addEggSale: (eggSale: AddEggSaleProp) => Promise<void>;
    updateEggSale: (eggSaleId: number | undefined, updatedEggSale: Partial<EggSaleProp>) => Promise<void>;
    deleteEggSale: (eggSaleId: number) => Promise<void>;
}

export const useEggSaleStore = create<EggSaleStore>((set) => ({
    eggSales: [],
    isLoading: false,
    error: null,

    // Automatically fetch eggSales when the store is initialized
    fetchEggSales: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get<EggSaleResponse>('/api/eggsale');
            set({ eggSales: response.data.data, isLoading: false });
        } catch (error: any) {
            set({ error: error.message || 'Failed to fetch eggSales', isLoading: false });
        }
    },

    // Add a new eggSale
    addEggSale: async (eggSale: AddEggSaleProp) => {
        try {
            const response = await axios.post<AddEggSaleProp>('/api/eggsale', eggSale);
            // const newEggSale: EggSaleProp = { ...response.data, eggsale_id: response.data.eggsale_id || Date.now() };
            // set((state) => ({
            //     eggSales: [...state.eggSales, newEggSale],
            // }));
            useEggSaleStore.getState().fetchEggSales();
        } catch (error: any) {
            console.error('Failed to add eggSale:', error);
        }
    },

    // Update an existing eggSale
    updateEggSale: async (eggSaleId: number | undefined, updatedEggSale: Partial<EggSaleProp>) => {
        if (eggSaleId === undefined) {
            console.error('EggSale ID is undefined. Cannot update eggSale.');
            return;
        }

        try {
            const response = await axios.put(`/api/eggsale/${eggSaleId}`, updatedEggSale);
            const updatedData = response.data.data;
            set((state) => ({
                eggSales: state.eggSales.map((eggSale) =>
                    eggSale.eggsale_id === eggSaleId ? { ...eggSale, ...updatedData } : eggSale
                ),
            }));
            console.log('Updated eggSale successfully:', updatedData);
        } catch (error: any) {
            console.error('Failed to update eggSale:', error.message || error);
        }
    },

    // Delete a eggSale
    deleteEggSale: async (eggSaleId: number) => {
        try {
            await axios.delete(`/api/eggsale/${eggSaleId}`);
            set((state) => ({
                eggSales: state.eggSales.filter((eggSale) => eggSale.eggsale_id !== eggSaleId),
            }));
        } catch (error: any) {
            console.error('Failed to delete eggSale:', error);
        }
    },
}));

// Automatically call fetchEggSales when the store is initialized
useEggSaleStore.getState().fetchEggSales();





