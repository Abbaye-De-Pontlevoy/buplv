import { ArticleDisplay } from "./ArticleDisplay";

const ArticleList = ({articleList, callAfterDelete}) => {
	return (
		<ul>{
			articleList.map((article) => (
				<li key={article.id}>
					<ArticleDisplay article={article} callAfterDelete={callAfterDelete} />
				</li>
			))
		}</ul>
	);
}

export default ArticleList;