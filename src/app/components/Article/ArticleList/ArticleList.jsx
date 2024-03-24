import { ArticleDisplay } from "./ArticleDisplay";

export const ArticleList = ({articleJSON, callAfterSubmit}) => {

	return (
		<ul>{
			Object.keys(articleJSON).map((index) => (
				<li key={articleJSON[index].id}>
					<ArticleDisplay article={articleJSON[index]} callAfterSubmit={callAfterSubmit} />
				</li>
			))
		}</ul>
	);
}