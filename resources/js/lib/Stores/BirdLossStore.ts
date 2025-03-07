import { create } from 'zustand';
import axios from 'axios';

export interface BirdLossProp {
    bird_loss_id: number;
    bird_loss_batiment: string;
    bird_loss_category: string;
    bird_loss_quantity: string;
    bird_loss_date: string;
}

export interface AddBirdLossProp {
    bird_loss_batiment: string;
    bird_loss_category: string;
    bird_loss_quantity: string;
    bird_loss_date: string;
    user_id: any;
}

export interface BirdLossResponse {
    data: BirdLossProp[];
}

interface BirdLossStore {
    birdLosses: BirdLossProp[];
    isLoading: boolean;
    error: string | null;
    fetchBirdLosses: () => Promise<void>;
    addBirdLoss: (birdLoss: AddBirdLossProp) => Promise<void>;
    updateBirdLoss: (birdLossId: number | undefined, updatedBirdLoss: Partial<BirdLossProp>) => Promise<void>;
    deleteBirdLoss: (birdLossId: number) => Promise<void>;
}

export const useBirdLossStore = create<BirdLossStore>((set) => ({
    birdLosses: [],
    isLoading: false,
    error: null,

    // Automatically fetch birdLosses when the store is initialized
    fetchBirdLosses: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get<BirdLossResponse>('/api/birdloss');
            set({ birdLosses: response.data.data, isLoading: false });
        } catch (error: any) {
            set({ error: error.message || 'Failed to fetch birdLosses', isLoading: false });
        }
    },

    // Add a new birdLoss
    addBirdLoss: async (birdLoss: AddBirdLossProp) => {
        try {
            const response = await axios.post<BirdLossProp>('/api/birdloss', birdLoss);
            // const newBirdLoss: BirdLossProp = { ...response.data, bird_loss_id: response.data.bird_loss_id || Date.now() };
            // set((state) => ({
            //     birdLosses: [...state.birdLosses, newBirdLoss],
            // }));
            useBirdLossStore.getState().fetchBirdLosses();
        } catch (error: any) {
            console.error('Failed to add birdLoss:', error);
        }
    },

    // Update an existing birdLoss
    updateBirdLoss: async (birdLossId: number | undefined, updatedBirdLoss: Partial<BirdLossProp>) => {
        if (birdLossId === undefined) {
            console.error('BirdLoss ID is undefined. Cannot update birdLoss.');
            return;
        }

        try {
            const response = await axios.put(`/api/birdloss/${birdLossId}`, updatedBirdLoss);
            const updatedData = response.data.data;
            set((state) => ({
                birdLosses: state.birdLosses.map((birdLoss) =>
                    birdLoss.bird_loss_id === birdLossId ? { ...birdLoss, ...updatedData } : birdLoss
                ),
            }));
            console.log('Updated birdLoss successfully:', updatedData);
        } catch (error: any) {
            console.error('Failed to update birdLoss:', error.message || error);
        }
    },

    // Delete a birdLoss
    deleteBirdLoss: async (birdLossId: number) => {
        try {
            await axios.delete(`/api/birdloss/${birdLossId}`);
            set((state) => ({
                birdLosses: state.birdLosses.filter((birdLoss) => birdLoss.bird_loss_id !== birdLossId),
            }));
        } catch (error: any) {
            console.error('Failed to delete birdLoss:', error);
        }
    },
}));

// Automatically call fetchBirdLosses when the store is initialized
useBirdLossStore.getState().fetchBirdLosses();





