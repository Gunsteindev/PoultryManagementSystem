import { create } from 'zustand';
import axios from 'axios';

export interface SupplierProp {
    supplier_id?: number;
    supplier_name: string;
    supplier_company: string;
    supplier_position: string;
    supplier_role: string;
    supplier_address: string;
    supplier_telephone: string;
}

export interface SupplierResponse {
    data: SupplierProp[];
}

interface SupplierStore {
    suppliers: SupplierProp[];
    isLoading: boolean;
    error: string | null;
    fetchSuppliers: () => Promise<void>;
    addSupplier: (supplier: SupplierProp) => Promise<void>;
    updateSupplier: (supplierId: number | undefined, updatedSupplier: Partial<SupplierProp>) => Promise<void>;
    deleteSupplier: (supplierId: number) => Promise<void>;
}

export const useSupplierStore = create<SupplierStore>((set) => ({
    suppliers: [],
    isLoading: false,
    error: null,

    // Fetch all suppliers from the API
    fetchSuppliers: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get<SupplierResponse>('/api/supplier');
            set({ suppliers: response.data.data, isLoading: false });
        } catch (error: any) {
            set({ error: error.message || 'Failed to fetch suppliers', isLoading: false });
        }
    },

    // Add a new supplier
    addSupplier: async (supplier: SupplierProp) => {
        try {
            const response = await axios.post<SupplierProp>('/api/supplier', supplier);
            // set((state) => ({
            //     suppliers: [...state.suppliers, response.data],
            // }));
            useSupplierStore.getState().fetchSuppliers();
        } catch (error: any) {
            console.error('Failed to add supplier:', error);
        }
    },

    // Update an existing supplier
    updateSupplier: async (supplierId: number | undefined, updatedSupplier: Partial<SupplierProp>) => {
        if (supplierId === undefined) {
            console.error('Supplier ID is undefined. Cannot update supplier.');
            return;
        }
    
        try {
            const response = await axios.put(`/api/supplier/${supplierId}`, updatedSupplier);
        
            // Extract the updated supplier data from the response
            const updatedData = response.data.data;
        
            set((state) => ({
                suppliers: state.suppliers.map((supplier) =>
                supplier.supplier_id === supplierId ? { ...supplier, ...updatedData } : supplier
                ),
            }));
        
            console.log('Updated supplier successfully:', updatedData); // Debugging output
        } catch (error: any) {
            console.error('Failed to update supplier:', error.message || error);
        }
    },
  
    // Delete a supplier
    deleteSupplier: async (supplierId: number) => {
        try {
            await axios.delete(`/api/supplier/${supplierId}`);
            set((state) => ({
                suppliers: state.suppliers.filter((supplier) => supplier.supplier_id !== supplierId),
            }));
        } catch (error: any) {
            console.error('Failed to delete supplier:', error);
        }
    },
}));

useSupplierStore.getState().fetchSuppliers();


