import { create } from 'zustand';
import axios from 'axios';

export interface TreatmentProp {
    treatment_id: number;
    treatment_name: string;
    treatment_batiment_code: string;
    treatment_veto_name: string;
    treatment_comment: string;
}

export interface AddTreatmentProp {
    treatment_name: string;
    treatment_batiment_code: string;
    treatment_veto_name: string;
    treatment_comment: string;
    user_id: any;
}

export interface TreatmentResponse {
    data: TreatmentProp[];
}

interface TreatmentStore {
    treatments: TreatmentProp[];
    isLoading: boolean;
    error: string | null;
    fetchTreatments: () => Promise<void>;
    addTreatment: (treatment: AddTreatmentProp) => Promise<void>;
    updateTreatment: (treatmentId: number | undefined, updatedTreatment: Partial<TreatmentProp>) => Promise<void>;
    deleteTreatment: (treatmentId: number) => Promise<void>;
}

export const useTreatmentStore = create<TreatmentStore>((set) => ({
    treatments: [],
    isLoading: false,
    error: null,

    // Automatically fetch treatments when the store is initialized
    fetchTreatments: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get<TreatmentResponse>('/api/treatment');
            set({ treatments: response.data.data, isLoading: false });
        } catch (error: any) {
            set({ error: error.message || 'Failed to fetch treatments', isLoading: false });
        }
    },

    // Add a new treatment
    addTreatment: async (treatment: AddTreatmentProp) => {
        try {
            const response = await axios.post<TreatmentProp>('/api/treatment', treatment);
            // const newTreatment: TreatmentProp = { ...response.data, treatment_id: response.data.treatment_id || Date.now() };
            // set((state) => ({
            //     treatments: [...state.treatments, newTreatment],
            // }));
            useTreatmentStore.getState().fetchTreatments();
        } catch (error: any) {
            console.error('Failed to add treatment:', error);
        }
    },

    // Update an existing treatment
    updateTreatment: async (treatmentId: number | undefined, updatedTreatment: Partial<TreatmentProp>) => {
        if (treatmentId === undefined) {
            console.error('Treatment ID is undefined. Cannot update treatment.');
            return;
        }

        try {
            const response = await axios.put(`/api/treatment/${treatmentId}`, updatedTreatment);
            const updatedData = response.data.data;
            set((state) => ({
                treatments: state.treatments.map((treatment) =>
                    treatment.treatment_id === treatmentId ? { ...treatment, ...updatedData } : treatment
                ),
            }));
            console.log('Updated treatment successfully:', updatedData);
        } catch (error: any) {
            console.error('Failed to update treatment:', error.message || error);
        }
    },

    // Delete a batiment
    deleteTreatment: async (treatmentId: number) => {
        try {
            await axios.delete(`/api/treatment/${treatmentId}`);
            set((state) => ({
                treatments: state.treatments.filter((treatment) => treatment.treatment_id !== treatmentId),
            }));
        } catch (error: any) {
            console.error('Failed to delete treatment:', error);
        }
    },
}));

// Automatically call fetchTreatments when the store is initialized
useTreatmentStore.getState().fetchTreatments();





