import { useNavigate } from 'react-router-dom';
import { HangmanGate } from '../components/Auth/HangmanGate';

export const LoginPage = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    // Aquí ocurre la magia: Redirigimos a la nueva página
    navigate('/sorpresa');
  };

  return (
    <HangmanGate onSuccess={handleSuccess} />
  );
};