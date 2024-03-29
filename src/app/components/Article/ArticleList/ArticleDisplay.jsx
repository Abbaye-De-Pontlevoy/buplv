import { useState } from "react";

export const ArticleDisplay = ({ article, callAfterDelete }) => {
	const [isDisabled, setIsDisabled] = useState(false);

	const deleteHandler = async (e) => {
		e.preventDefault();
		setIsDisabled(true);
		await callAfterDelete(article.id);
		//setIsDisabled(false);
	}

	return (
		<form onSubmit={deleteHandler}>
			<label>{article.name} - {article.brand} - {article.size} {article.state === 1 ? "(Inventorié)" : article.state === 2 ? "(Vendu)": ""}</label>
			<button type="submit" disabled={isDisabled}>x</button>
		</form>
	);
}