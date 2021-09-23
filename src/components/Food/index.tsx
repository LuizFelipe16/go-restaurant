import { FiEdit3, FiTrash } from 'react-icons/fi';

import { Container } from './styles';
import api from '../../services/api';
import { useState } from 'react';
import { useFood } from '../../hooks/useFood';
import { useEffect } from 'react';

interface IfFood {
  id: number;
  name: string,
  description: string,
  available: boolean;
  price: number,
  image: string
}

interface FoodProps {
  food: IfFood;
  handleEditFood: (food: IfFood) => void;
}

function Food(props: FoodProps) {
  const { removeFood } = useFood();
  const [food, setFood] = useState<IfFood>(props.food);
  const [isAvailable, setIsAvailable] = useState(props.food.available);

  useEffect(() => {
    setFood(props.food)
  }, [props.food]);

  const toggleAvailable = async () => {
    await api.put(`/foods/${food.id}`, {
      id: food.id,
      name: food.name,
      description: food.description,
      available: !isAvailable,
      price: food.price,
      image: food.image
    });

    setIsAvailable(!isAvailable);
  }

  const setEditingFood = () => {
    const { food, handleEditFood } = props;

    handleEditFood(food);
  }

  return (
    <Container available={isAvailable}>
      <header>
        <img src={food.image} alt={food.name} />
      </header>
      <section className="body">
        <h2>{food.name}</h2>
        <p>{food.description}</p>
        <p className="price">
          R$ <b>{food.price}</b>
        </p>
      </section>
      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={setEditingFood}
            data-testid={`edit-food-${food.id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => removeFood(food.id)}
            data-testid={`remove-food-${food.id}`}
          >
            <FiTrash size={20} />
          </button>
        </div>

        <div className="availability-container">
          <p>{isAvailable ? 'Disponível' : 'Indisponível'}</p>

          <label htmlFor={`available-switch-${food.id}`} className="switch">
            <input
              id={`available-switch-${food.id}`}
              type="checkbox"
              checked={isAvailable}
              onChange={toggleAvailable}
              data-testid={`change-status-food-${food.id}`}
            />
            <span className="slider" />
          </label>
        </div>
      </section>
    </Container>
  );
};

export default Food;