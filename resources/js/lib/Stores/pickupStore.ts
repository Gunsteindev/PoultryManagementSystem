import { create } from 'zustand';
import axios from 'axios';

export interface PickupProp {
    pickup_id: any;
    pickup_batiment: string,
    pickup_code: string,
    pickup_crate_quantity: string | number,
    pickup_quantity_remain: string | number,
    pickup_quantity_loss: string | number,
    pickup_total_quantity: string | number,
    pickup_date: string | Date,
}

export interface AddPickupProp {
    pickup_batiment: string,
    pickup_code: string,
    pickup_crate_quantity: string | number,
    pickup_quantity_remain: string | number,
    pickup_quantity_loss: string | number,
    pickup_total_quantity: string | number,
    pickup_date: string | Date,
    user_id: number,
}

export interface PickupResponse {
    data: PickupProp[];
}

interface PickupStore {
    pickups: PickupProp[];
    isLoading: boolean;
    error: string | null;
    fetchPickups: () => Promise<void>;
    addPickup: (pickup: AddPickupProp) => Promise<void>;
    updatePickup: (pickupId: number | undefined, updatedPickup: Partial<PickupProp>) => Promise<void>;
    deletePickup: (pickupId: number) => Promise<void>;
}

export const usePickupStore = create<PickupStore>((set) => ({
    pickups: [],
    isLoading: false,
    error: null,

    // Automatically fetch pickups when the store is initialized
    fetchPickups: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get<PickupResponse>('/api/pickup');
            set({ pickups: response.data.data, isLoading: false });
        } catch (error: any) {
            set({ error: error.message || 'Failed to fetch pickups', isLoading: false });
        }
    },

    // Add a new pickup
    addPickup: async (pickup: AddPickupProp) => {
        try {
            const response = await axios.post<PickupProp>('/api/pickup', pickup);
            // const newPickup: PickupProp = { ...response.data, pickup_id: response.data.pickup_id || Date.now() };
            // set((state) => ({
            //     pickups: [...state.pickups, newPickup],
            // }));
            usePickupStore.getState().fetchPickups();
        } catch (error: any) {
            console.error('Failed to add pickup:', error);
        }
    },

    // Update an existing pickup
    updatePickup: async (pickupId: number | undefined, updatedPickup: Partial<PickupProp>) => {
        if (pickupId === undefined) {
            console.error('Pickup ID is undefined. Cannot update pickup.');
            return;
        }

        try {
            const response = await axios.put(`/api/pickup/${pickupId}`, updatedPickup);
            const updatedData = response.data.data;
            set((state) => ({
                pickups: state.pickups.map((pickup) =>
                    pickup.pickup_id === pickupId ? { ...pickup, ...updatedData } : pickup
                ),
            }));
            console.log('Updated pickup successfully:', updatedData);
        } catch (error: any) {
            console.error('Failed to update pickup:', error.message || error);
        }
    },

    // Delete a pickup
    deletePickup: async (pickupId: number) => {
        try {
            await axios.delete(`/api/pickup/${pickupId}`);
            set((state) => ({
                pickups: state.pickups.filter((pickup) => pickup.pickup_id !== pickupId),
            }));
        } catch (error: any) {
            console.error('Failed to delete pickup:', error);
        }
    },
}));

// Automatically call fetchPickups when the store is initialized
usePickupStore.getState().fetchPickups();





