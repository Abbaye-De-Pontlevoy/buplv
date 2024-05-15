import { ArticleDisplay } from "./ArticleDisplay";

const ArticleList = ({
  className,
  articleList,
  enabledRemoveButton,
  callAfterDelete,
  displayTotal = false,
  priceFactor = 1,
}) => {
  return (
    <div className={"overFlowSlider " + className}>
      <table id="articleTable">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Marque</th>
            <th>Taille</th>
            <th>État</th>
            <th>Prix</th>
            <th id="thDelete">Supprimer</th>
          </tr>
        </thead>
        <tbody>
          {articleList.map((article) => (
            <ArticleDisplay
              key={article.id}
              article={article}
              enabledRemoveButton={enabledRemoveButton}
              callAfterDelete={callAfterDelete}
              priceFactor={priceFactor}
            />
          ))}
          {displayTotal && (
            <tr>
              <td colSpan="3"></td>
              <td colSpan="1" ><strong>Total</strong></td>
              <td colSpan="2">
                <strong>{articleList.reduce((acc, article) => acc + article.price, 0)} €</strong>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ArticleList;
