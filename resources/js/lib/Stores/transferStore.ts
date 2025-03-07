import { create } from 'zustand';
import axios from 'axios';

export interface TransferProp {
    transfer_id: number;
    transfer_batiment_code: string;
    transfer_band_code: string;
    transfer_quantity: string;
}

export interface AddTransferProp {
    transfer_batiment_code: string;
    transfer_band_code: string;
    transfer_quantity: string;
}

export interface TransferResponse {
    data: TransferProp[];
}

interface TransferStore {
    transfers: TransferProp[];
    isLoading: boolean;
    error: string | null;
    fetchTransfers: () => Promise<void>;
    addTransfer: (transfer: AddTransferProp) => Promise<void>;
    updateTransfer: (transferId: number | undefined, updatedTransfer: Partial<TransferProp>) => Promise<void>;
    deleteTransfer: (transferId: number) => Promise<void>;
}

export const useTransferStore = create<TransferStore>((set) => ({
    transfers: [],
    isLoading: false,
    error: null,

    // Automatically fetch transfers when the store is initialized
    fetchTransfers: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get<TransferResponse>('/api/transfer');
            set({ transfers: response.data.data, isLoading: false });
        } catch (error: any) {
            set({ error: error.message || 'Failed to fetch transfers', isLoading: false });
        }
    },

    // Add a new transfer
    addTransfer: async (transfer: AddTransferProp) => {
        try {
            const response = await axios.post<TransferProp>('/api/transfer', transfer);
            // const newTransfer: TransferProp = { ...response.data, transfer_id: response.data.transfer_id || Date.now() };
            // set((state) => ({
            //     transfers: [...state.transfers, newTransfer],
            // }));
            useTransferStore.getState().fetchTransfers();
        } catch (error: any) {
            console.error('Failed to add transfer:', error);
        }
    },

    // Update an existing transfer
    updateTransfer: async (transferId: number | undefined, updatedTransfer: Partial<TransferProp>) => {
        if (transferId === undefined) {
            console.error('Transfer ID is undefined. Cannot update transfer.');
            return;
        }

        try {
            const response = await axios.put(`/api/transfer/${transferId}`, updatedTransfer);
            const updatedData = response.data.data;
            set((state) => ({
                transfers: state.transfers.map((transfer) =>
                    transfer.transfer_id === transferId ? { ...transfer, ...updatedData } : transfer
                ),
            }));
            console.log('Updated transfer successfully:', updatedData);
        } catch (error: any) {
            console.error('Failed to update transfer:', error.message || error);
        }
    },

    // Delete a transfer
    deleteTransfer: async (transferId: number) => {
        try {
            await axios.delete(`/api/transfer/${transferId}`);
            set((state) => ({
                transfers: state.transfers.filter((transfer) => transfer.transfer_id !== transferId),
            }));
        } catch (error: any) {
            console.error('Failed to delete transfer:', error);
        }
    },
}));

// Automatically call fetchBatiments when the store is initialized
useTransferStore.getState().fetchTransfers();





