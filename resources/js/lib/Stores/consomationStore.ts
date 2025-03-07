import { create } from 'zustand';
import axios from 'axios';

export interface ConsomationProp {
    consomation_id: number;
    consomation_name: string;
    consomation_batiment: string;
    consomation_quantity: string;
    consomation_date: string;
}

export interface AddConsomationProp {
    consomation_name: string;
    consomation_batiment: string;
    consomation_quantity: string;
    consomation_date: string;
    
}

export interface ConsomationResponse {
    data: ConsomationProp[];
}

interface ConsomationStore {
    consomations: ConsomationProp[];
    isLoading: boolean;
    error: string | null;
    fetchConsomations: () => Promise<void>;
    addConsomation: (consomation: AddConsomationProp) => Promise<void>;
    updateConsomation: (consomatonId: number | undefined, updatedConsomation: Partial<ConsomationProp>) => Promise<void>;
    deleteConsomation: (consomatonId: number) => Promise<void>;
}

export const useConsomationStore = create<ConsomationStore>((set) => ({
    consomations: [],
    isLoading: false,
    error: null,

    // Automatically fetch consomations when the store is initialized
    fetchConsomations: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get<ConsomationResponse>('/api/consomation');
            set({ consomations: response.data.data, isLoading: false });
        } catch (error: any) {
            set({ error: error.message || 'Failed to fetch consomations', isLoading: false });
        }
    },

    // Add a new consomation
    addConsomation: async (consomation: AddConsomationProp) => {
        try {
            const response = await axios.post<ConsomationProp>('/api/consomation', consomation);
            // const newConsomation: ConsomationProp = { ...response.data, consomation_id: response.data.consomation_id || Date.now() };
            // set((state) => ({
            //     consomations: [...state.consomations, newConsomation],
            // }));
            useConsomationStore.getState().fetchConsomations();
        } catch (error: any) {
            console.error('Failed to add consomation:', error);
        }
    },

    // Update an existing consomation
    updateConsomation: async (consomatonId: number | undefined, updatedConsomation: Partial<ConsomationProp>) => {
        if (consomatonId === undefined) {
            console.error('Consomation ID is undefined. Cannot update consomation.');
            return;
        }

        try {
            const response = await axios.put(`/api/consomation/${consomatonId}`, updatedConsomation);
            const updatedData = response.data.data;
            set((state) => ({
                consomations: state.consomations.map((consomation) =>
                    consomation.consomation_id === consomatonId ? { ...consomation, ...updatedData } : consomation
                ),
            }));
            console.log('Updated consomation successfully:', updatedData);
        } catch (error: any) {
            console.error('Failed to update consomation:', error.message || error);
        }
    },

    // Delete a consomation
    deleteConsomation: async (consomatonId: number) => {
        try {
            await axios.delete(`/api/consomation/${consomatonId}`);
            set((state) => ({
                consomations: state.consomations.filter((consomation) => consomation.consomation_id !== consomatonId),
            }));
        } catch (error: any) {
            console.error('Failed to delete consomation:', error);
        }
    },
}));

// Automatically call fetchConsomations when the store is initialized
useConsomationStore.getState().fetchConsomations();





