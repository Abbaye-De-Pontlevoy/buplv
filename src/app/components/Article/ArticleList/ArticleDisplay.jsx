import { useState } from "react";
import removeArticleAction from "./removeArticleAction";

export const ArticleDisplay = ({ article, callAfterSubmit }) => {
	const [isDisabled, setIsDisabled] = useState(false);

	const deleteHandler = async (e) => {
		e.preventDefault();
		setIsDisabled(true);
		await removeArticleAction({ id: article.id });
		await callAfterSubmit();
		setIsDisabled(false);
	}

	return (
		<form onSubmit={deleteHandler}>
			<label>{article.name} - {article.brand} - {article.size}</label>
			<button type="submit" disabled={isDisabled}>x</button>
		</form>
	);
}