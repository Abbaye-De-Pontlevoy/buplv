import { redirect } from 'next/navigation';
import { cookies } from 'next/headers'

const Dashboard = () => {
	//const router = useRouter();

	const cookieStore = cookies();
	const buConnectedToken = cookieStore.get('buConnectedToken');

	// Vérifier si le cookie 'buConnectedToken' est présent
	if (!buConnectedToken) {
		// Rediriger vers la page de connexion si le cookie n'est pas présent
		redirect('/login');
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
