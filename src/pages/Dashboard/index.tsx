import Header from '../../components/Header';
import Food from '../../components/Food';
import { ModalAddFood } from '../../components/ModalAddFood';
import { ModalEditFood } from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';
import { useState } from 'react';
import { useFood } from '../../hooks/useFood';

interface IfFood {
  id: number;
  name: string,
  description: string,
  available: boolean;
  price: number,
  image: string
}

function Dashboard() {
  const { foods, setFood } = useFood();

  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  }

  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen);
  }

  const handleEditFood = (food: IfFood) => {
    setFood({
      id: food.id,
      name: food.name,
      description: food.description,
      image: food.image,
      available: food.available,
      price: food.price
    });

    setEditModalOpen(true);
  }

  return (
    <>
      <Header openModal={toggleModal} />

      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
      />

      <FoodsContainer data-testid="foods-list">
        {foods && foods.map(food => (
          <Food
            key={food.id}
            food={food}
            handleEditFood={() => handleEditFood(food)}
          />
        ))
        }
      </FoodsContainer>
    </>
  );
}

export default Dashboard;