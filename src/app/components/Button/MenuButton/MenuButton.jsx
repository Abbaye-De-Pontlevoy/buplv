import menuAction from "./menuAction";

const MenuButton = () => {
	return (
		<form action={menuAction}>
			<button type="submit">Menu</button>
		</form>
	);
};

export default MenuButton;