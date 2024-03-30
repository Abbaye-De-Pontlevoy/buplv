import "./styles.css";

const Menu = ({current}) => {
	const menuContent = [
		{ name: 'Accueil', path: '/' },
		{ name: 'Tableau de bord', path: '/dashboard' },
		{ name: 'Mon Profil (à venir)', path: '/profil' },
		{ name: 'Contact (à venir)', path: '/contact' },
	];

	return (
		<span className="menuSpan">
			{menuContent.map((item, index) => {
				return (
					<a key={index} href={item.path} className={current === item.path ? 'active' : ''}> {item.name} </a>
				);
			})}
		</span>
	);
}

export default Menu;