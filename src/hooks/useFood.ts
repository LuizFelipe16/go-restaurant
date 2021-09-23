import { useContext } from "react"
import { FoodContext } from "../contexts/FoodContext"

export function useFood() {
  const data = useContext(FoodContext);

  return data;
}