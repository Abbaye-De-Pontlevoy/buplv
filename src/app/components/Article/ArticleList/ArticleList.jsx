import { ArticleDisplay } from "./ArticleDisplay";

const ArticleList = ({articleJSON, callAfterSubmit}) => {

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

export default ArticleList;