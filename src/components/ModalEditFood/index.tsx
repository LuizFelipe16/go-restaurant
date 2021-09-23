import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';
import { useFood } from '../../hooks/useFood';
import { FormEvent, useState } from 'react';
import { useEffect } from 'react';
import api from '../../services/api';

interface ModalEditFoodProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleUpdateFood?: (data: any) => void;
}

export function ModalEditFood({ isOpen, setIsOpen }: ModalEditFoodProps) {
  const { food, loadFoods } = useFood();

  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);

  useEffect(() => {
    setImage(food.image);
    setName(food.name);
    setDescription(food.description);
    setPrice(food.price);
  }, [food]);

  async function handleSubmitFormEditFood(e: FormEvent) {
    e.preventDefault();

    await api.put(`/foods/${food.id}`, {
      image: image,
      name: name,
      description: description,
      price: price,
      available: food.available
    });

    loadFoods();
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form onSubmit={handleSubmitFormEditFood}>
        <h1>Editar Prato</h1>
        <Input
          name="image"
          placeholder="Cole o link aqui"
          value={image}
          onChange={(e: any) => setImage(e.target.value)}
        />

        <Input
          name="name"
          placeholder="Ex: Moda Italiana"
          value={name}
          onChange={(e: any) => setName(e.target.value)}
        />
        <Input
          name="price"
          placeholder="Ex: 19.90"
          value={price}
          onChange={(e: any) => setPrice(e.target.value)}
        />

        <Input
          name="description"
          placeholder="Descrição"
          value={description}
          onChange={(e: any) => setDescription(e.target.value)}
        />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};