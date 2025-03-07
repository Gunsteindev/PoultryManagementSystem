import { create } from 'zustand';
import axios from 'axios';

export interface BatimentProp {
    id: number;
    batiment_id: number;
    batiment_capacity: string;
    batiment_category: string;
    batiment_code: string;
    batiment_description: string;
}

export interface AddBatimentProp {
    batiment_capacity: string;
    batiment_category: string;
    batiment_code: string;
    batiment_description: string;
}

export interface BatimentResponse {
    data: BatimentProp[];
}

interface BatimentStore {
    batiments: BatimentProp[];
    isLoading: boolean;
    error: string | null;
    fetchBatiments: () => Promise<void>;
    addBatiment: (batiment: AddBatimentProp) => Promise<void>;
    updateBatiment: (batimentId: number | undefined, updatedBatiment: Partial<BatimentProp>) => Promise<void>;
    deleteBatiment: (batimentId: number) => Promise<void>;
}

export const useBatimentStore = create<BatimentStore>((set) => ({
    batiments: [],
    isLoading: false,
    error: null,

    // Automatically fetch batiments when the store is initialized
    fetchBatiments: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get<BatimentResponse>('/api/batiment');
            set({ batiments: response.data.data, isLoading: false });
        } catch (error: any) {
            set({ error: error.message || 'Failed to fetch batiments', isLoading: false });
        }
    },

    // Add a new batiment
    addBatiment: async (batiment: AddBatimentProp) => {
        try {
            const response = await axios.post<BatimentProp>('/api/batiment', batiment);
            // const newBatiment: BatimentProp = { ...response.data, batiment_id: response.data.batiment_id || Date.now() };
            // console.log(response.data)  
            // set((state) => ({
            //     batiments: [newBatiment, ...state.batiments],
            // }));
            useBatimentStore.getState().fetchBatiments();
        } catch (error: any) {
            console.error('Failed to add batiment:', error);
        }
    },
    

    // Update an existing batiment
    updateBatiment: async (batimentId: number | undefined, updatedBatiment: Partial<BatimentProp>) => {
        if (batimentId === undefined) {
            console.error('Batiment ID is undefined. Cannot update batiment.');
            return;
        }

        try {
            const response = await axios.put(`/api/batiment/${batimentId}`, updatedBatiment);
            const updatedData = response.data.data;
            set((state) => ({
                batiments: state.batiments.map((batiment) =>
                    batiment.batiment_id === batimentId ? { ...batiment, ...updatedData } : batiment
                ),
            }));
            console.log('Updated batiment successfully:', updatedData);
        } catch (error: any) {
            console.error('Failed to update batiment:', error.message || error);
        }
    },

    // Delete a batiment
    deleteBatiment: async (batimentId: number) => {
        try {
            await axios.delete(`/api/batiment/${batimentId}`);
            set((state) => ({
                batiments: state.batiments.filter((batiment) => batiment.batiment_id !== batimentId),
            }));
        } catch (error: any) {
            console.error('Failed to delete batiment:', error);
        }
    },
}));

// Automatically call fetchBatiments when the store is initialized
useBatimentStore.getState().fetchBatiments();





