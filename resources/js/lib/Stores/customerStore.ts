import { create } from 'zustand';
import axios from 'axios';

export interface ClientProp {
    client_id?: number; // Assuming $this->id is a number
    client_name: string;
    client_company: string;
    client_telephone: string;
    client_email: string;
    client_position: string;
    client_location: string;
}

export interface ClientResponse {
    data: ClientProp[];
}

interface ClientStore {
    clients: ClientProp[];
    isLoading: boolean;
    error: string | null;
    fetchClients: () => Promise<void>;
    addClient: (client: ClientProp) => Promise<void>;
    updateClient: (clientId: number | undefined, updatedClient: Partial<ClientProp>) => Promise<void>;
    deleteClient: (clientId: number) => Promise<void>;
}

export const useClientStore = create<ClientStore>((set) => ({
    clients: [],
    isLoading: false,
    error: null,

    // Fetch all clients from the API
    fetchClients: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get<ClientResponse>('/api/client');
            set({ clients: response.data.data, isLoading: false });
        } catch (error: any) {
            set({ error: error.message || 'Failed to fetch clients', isLoading: false });
        }
    },

    // Add a new client
    addClient: async (client: ClientProp) => {
        try {
            const response = await axios.post<ClientProp>('/api/client', client);
            // set((state) => ({
            //     clients: [...state.clients, response.data],
            // }));
            useClientStore.getState().fetchClients();
        } catch (error: any) {
            console.error('Failed to add client:', error);
        }
    },

    // Update an existing client
    updateClient: async (clientId: number | undefined, updatedClient: Partial<ClientProp>) => {
        if (clientId === undefined) {
            console.error('Client ID is undefined. Cannot update client.');
            return;
        }
    
        try {
            const response = await axios.put(`/api/client/${clientId}`, updatedClient);
        
            // Extract the updated client data from the response
            const updatedData = response.data.data;
        
            set((state) => ({
                clients: state.clients.map((client) =>
                client.client_id === clientId ? { ...client, ...updatedData } : client
                ),
            }));
        
            console.log('Updated client successfully:', updatedData); // Debugging output
        } catch (error: any) {
            console.error('Failed to update client:', error.message || error);
        }
    },
  
    // Delete a client
    deleteClient: async (clientId: number) => {
        try {
            await axios.delete(`/api/client/${clientId}`);
            set((state) => ({
                clients: state.clients.filter((client) => client.client_id !== clientId),
            }));
        } catch (error: any) {
            console.error('Failed to delete client:', error);
        }
    },
}));


useClientStore.getState().fetchClients();