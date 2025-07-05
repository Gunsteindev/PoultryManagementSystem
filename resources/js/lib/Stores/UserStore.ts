import { create } from 'zustand';
import axios from 'axios';

export interface UserProp {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;
}

export interface AddUserProp {
    name: string;
    email: string;
    password: string;
    role: string;
}

export interface UserResponse {
    data: UserProp[];
}

interface UserStore {
    users: UserProp[];
    isLoading: boolean;
    error: string | null;
    fetchUsers: () => Promise<void>;
    addUser: (user: AddUserProp) => Promise<void>;
    updateUser: (userId: number | undefined, updatedUser: Partial<UserProp>) => Promise<void>;
    deleteUser: (userId: number) => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
    users: [],
    isLoading: false,
    error: null,

    // Automatically fetch users when the store is initialized
    fetchUsers: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get<UserResponse>('/api/users');
            set({ users: response.data.data, isLoading: false });
        } catch (error: any) {
            set({ error: error.message || 'Failed to fetch users', isLoading: false });
        }
    },

    // Add a new user
    addUser: async (user: AddUserProp) => {
        try {
            await axios.post<UserProp>('/api/users', user);
            useUserStore.getState().fetchUsers();
        } catch (error: any) {
            console.error('Failed to add user:', error);
        }
    },

    // Update an existing user
    updateUser: async (userId: number | undefined, updatedUser: Partial<UserProp>) => {
        if (userId === undefined) {
            console.error('user ID is undefined. Cannot update user.');
            return;
        }

        try {
            const response = await axios.put(`/api/users/${userId}`, updatedUser);
            const updatedData = response.data.data;
            set((state) => ({
                users: state.users.map((user) =>
                    user.id === userId ? { ...user, ...updatedData } : user
                ),
            }));
            console.log('Updated user successfully:', updatedData);
        } catch (error: any) {
            console.error('Failed to update user:', error.message || error);
        }
    },

    // Delete a batiment
    deleteUser: async (userId: number) => {
        try {
            await axios.delete(`/api/users/${userId}`);
            set((state) => ({
                users: state.users.filter((user) => user.id !== userId),
            }));
        } catch (error: any) {
            console.error('Failed to delete user:', error);
        }
    },
}));

// Automatically call fetchUsers when the store is initialized
useUserStore.getState().fetchUsers();





