import { create } from 'zustand';
import axios from 'axios';

export interface FoodProp {
    food_id?: number;
    food_code: string;
    food_name: string;
    food_supplier_name: string;
    food_price_per_bag: string;
    food_discount: string;
    food_quantity: string;
    food_purchase_date: string;
    food_total_cost: string;
}

export interface FoodResponse {
    data: FoodProp[];
}

interface FoodStore {
    foods: FoodProp[];
    isLoading: boolean;
    error: string | null;
    fetchFoods: () => Promise<void>;
    addFood: (food: FoodProp) => Promise<void>;
    updateFood: (foodId: number | undefined, updatedFood: Partial<FoodProp>) => Promise<void>;
    deleteFood: (foodId: number) => Promise<void>;
}

export const useFoodStore = create<FoodStore>((set) => ({
    foods: [],
    isLoading: false,
    error: null,

    // Fetch all foods from the API
    fetchFoods: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get<FoodResponse>('/api/foodPurchase');
            set({ foods: response.data.data, isLoading: false });
        } catch (error: any) {
        set({ error: error.message || 'Failed to fetch foods', isLoading: false });
        }
    },

    // Add a new food
    addFood: async (food: FoodProp) => {
        try {
            const response = await axios.post<FoodProp>('/api/foodPurchase', food);
            // const newFood = response.data; // Adjust for API response structure
            // console.log(response.data)
            // set((state) => ({
            //     foods: [...state.foods, newFood],
            // }));
            useFoodStore.getState().fetchFoods();
        } catch (error: any) {
            console.error('Failed to add food:', error.message || error);
        }
    },
    

    // Update an existing food
    updateFood: async (foodId: number | undefined, updatedFood: Partial<FoodProp>) => {
        if (foodId === undefined) {
            console.error('Food ID is undefined. Cannot update food.');
            return;
        }
    
        try {
            const response = await axios.put(`/api/foodPurchase/${foodId}`, updatedFood);
        
            // Extract the updated food data from the response
            const updatedData = response.data.data;
        
            set((state) => ({
                foods: state.foods.map((food) =>
                food.food_id === foodId ? { ...food, ...updatedData } : food
                ),
            }));
        
            console.log('Updated food successfully:', updatedData); // Debugging output
        } catch (error: any) {
            console.error('Failed to update food:', error.message || error);
        }
    },
  
    // Delete a food
    deleteFood: async (foodId: number) => {
        try {
            await axios.delete(`/api/foodPurchase/${foodId}`);
            set((state) => ({
                foods: state.foods.filter((food) => food.food_id !== foodId),
            }));
        } catch (error: any) {
            console.error('Failed to delete food:', error);
        }
    },
}));

useFoodStore.getState().fetchFoods();


