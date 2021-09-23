import { useEffect } from 'react';
import { Dispatch } from 'react';
import { SetStateAction } from 'react';
import { createContext, ReactNode, useState } from 'react';
import api from '../services/api';

interface FoodProviderProps {
  children: ReactNode;
}

interface Food {
  id: number;
  name: string;
  description: string;
  available: boolean;
  price: number;
  image: string;
}

interface FoodContextData {
  foods: Food[];
  food: Food;
  setFood: Dispatch<SetStateAction<Food>>;
  setFoods: Dispatch<SetStateAction<Food[]>>;
  loadFoods: () => Promise<void>;
  removeFood: (id: number) => void;
}

export const FoodContext = createContext<FoodContextData>({} as FoodContextData);

export function FoodProvider({ children }: FoodProviderProps): JSX.Element {
  const [foods, setFoods] = useState<Food[]>([]);
  const [food, setFood] = useState<Food>({} as Food);

  async function loadFoods() {
    setFoods([]);
    await api.get('/foods').then(response => setFoods(response.data));
  }

  async function removeFood(id: number) {
    await api.delete(`/foods/${id}`);
    loadFoods();
  };

  useEffect(() => { loadFoods() }, []);

  return (
    <FoodContext.Provider
      value={{
        foods,
        food,
        setFoods,
        setFood,
        removeFood,
        loadFoods
      }}
    >
      {children}
    </FoodContext.Provider>
  );
}