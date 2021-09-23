import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';
import { FormEvent, useState } from 'react';
import { useFood } from '../../hooks/useFood';
import api from '../../services/api';
import { useEffect } from 'react';

interface ModalAddFoodProps {
  isOpen: boolean;
  setIsOpen: () => void;
}

export function ModalAddFood({ isOpen, setIsOpen }: ModalAddFoodProps) {
  const { loadFoods } = useFood();

  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);

  async function handleSubmitFormAddNewFood(e: FormEvent) {
    e.preventDefault();

    await api.post('/foods', {
      image,
      name,
      description,
      price,
      available: false
    });

    loadFoods();

    initialState();
  }

  function initialState() {
    setImage('');
    setName('');
    setDescription('');
    setPrice(0);
  }

  useEffect(() => {
    initialState();
  }, [])

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form onSubmit={handleSubmitFormAddNewFood}>
        <h1>Novo Prato</h1>
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

        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};