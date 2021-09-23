import { Container } from './styles';

interface InputProps {
  name: string;
  placeholder: string;
  onChange?: any;
  value?: string | number;
}

function Input({ name, placeholder, onChange, value }: InputProps) {
  return (
    <Container>
      <input
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        value={value}
      />
    </Container>
  );
};

export default Input;