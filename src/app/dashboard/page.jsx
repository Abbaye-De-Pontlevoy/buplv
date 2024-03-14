"use client"

import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const Dashboard = () => {
  const router = useRouter();

  // Récupérer la valeur du cookie 'buConnectedToken'
  const buConnectedToken = Cookies.get('buConnectedToken');

  // Vérifier si le cookie 'buConnectedToken' est présent
  if (!buConnectedToken) {
    // Rediriger vers la page de connexion si le cookie n'est pas présent
    router.push('/login');
	return;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      {/* Contenu de votre tableau de bord ici */}
    </div>
  );
};

export default Dashboard;
