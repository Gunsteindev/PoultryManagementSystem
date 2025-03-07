import { create } from 'zustand';
import axios from 'axios';

export interface BandPurchaseProp {
    band_id: number;
    band_purchase_band_code: string;
    band_purchase_code: string;
    band_purchase_date: string;
    band_purchase_description: string;
    band_purchase_quantity: string;
    band_purchase_reduction: string;
    band_purchase_total_cost: string;
    band_purchase_unit_price: string;
}

export interface AddBandPurchaseProp {
    band_purchase_band_code: string;
    band_purchase_code: string;
    band_purchase_date: string;
    band_purchase_description: string;
    band_purchase_quantity: string;
    band_purchase_reduction: string;
    band_purchase_total_cost: string;
    band_purchase_unit_price: string;
}

export interface BandPurchaseResponse {
    data: BandPurchaseProp[];
}

interface BandPurchaseStore {
    bandPurchases: BandPurchaseProp[];
    isLoading: boolean;
    error: string | null;
    fetchBandPurchases: () => Promise<void>;
    addBandPurchase: (bandPurchase: AddBandPurchaseProp) => Promise<void>;
    updateBandPurchase: (bandPurchaseId: number | undefined, updatedBandPurchase: Partial<BandPurchaseProp>) => Promise<void>;
    deleteBandPurchase: (bandPurchaseId: number) => Promise<void>;
}

export const useBandPurchaseStore = create<BandPurchaseStore>((set) => ({
    bandPurchases: [],
    isLoading: false,
    error: null,

    // Automatically fetch bandPurchases when the store is initialized
    fetchBandPurchases: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get<BandPurchaseResponse>('/api/bandpurchase');
            set({ bandPurchases: response.data.data, isLoading: false });
        } catch (error: any) {
            set({ error: error.message || 'Failed to fetch bandPurchases', isLoading: false });
        }
    },

    // Add a new bandPurchase
    addBandPurchase: async (bandPurchase: AddBandPurchaseProp) => {
        try {
            const response = await axios.post<BandPurchaseProp>('/api/bandpurchase', bandPurchase);
            // const newBandPurchase: BandPurchaseProp = { ...response.data, band_id: response.data.band_id || Date.now() };
            // set((state) => ({
            //     bandPurchases: [...state.bandPurchases, newBandPurchase],
            // }));
            useBandPurchaseStore.getState().fetchBandPurchases();
        } catch (error: any) {
            console.error('Failed to add bandPurchase:', error);
        }
    },

    // Update an existing bandPurchase
    updateBandPurchase: async (bandPurchaseId: number | undefined, updatedBandPurchase: Partial<BandPurchaseProp>) => {
        if (bandPurchaseId === undefined) {
            console.error('bandPurchase ID is undefined. Cannot update bandPurchase.');
            return;
        }

        try {
            const response = await axios.put(`/api/bandpurchase/${bandPurchaseId}`, updatedBandPurchase);
            const updatedData = response.data.data;
            set((state) => ({
                bandPurchases: state.bandPurchases.map((bandPurchase) =>
                    bandPurchase.band_id === bandPurchaseId ? { ...bandPurchase, ...updatedData } : bandPurchase
                ),
            }));
            console.log('Updated bandPurchase successfully:', updatedData);
        } catch (error: any) {
            console.error('Failed to update bandPurchase:', error.message || error);
        }
    },

    // Delete a bandPurchase
    deleteBandPurchase: async (bandPurchaseId: number) => {
        try {
            await axios.delete(`/api/bandpurchase/${bandPurchaseId}`);
            set((state) => ({
                bandPurchases: state.bandPurchases.filter((bandPurchase) => bandPurchase.band_id !== bandPurchaseId),
            }));
        } catch (error: any) {
            console.error('Failed to delete bandPurchase:', error);
        }
    },
}));

// Automatically call fetchBandPurchases when the store is initialized
useBandPurchaseStore.getState().fetchBandPurchases();





