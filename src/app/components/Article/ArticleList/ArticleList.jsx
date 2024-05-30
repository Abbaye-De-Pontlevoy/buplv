import { ArticleDisplay } from "./ArticleDisplay";

/**
 * Renders a list of articles.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.className - The CSS class name for the component.
 * @param {Array} props.articleList - The list of articles to display.
 * @param {boolean} props.enabledRemoveButton - Determines whether the remove button is enabled.
 * @param {Function} props.callAfterDelete - The callback function to be called after an article is deleted.
 * @param {boolean} [props.displayTotal=false] - Determines whether to display the total price.
 * @param {number} [props.priceFactor=1] - The price factor to apply.
 * @returns {JSX.Element} The rendered component.
 */
const ArticleList = ({
  className,
  articleList,
  enabledRemoveButton,
  callAfterDelete,
  displayTotal = false,
  priceFactor = 1,
}) => {
  return (
    <div className={"overFlowXSlider width-full " + className}>
      <table id="articleTable">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Marque</th>
            <th>Taille</th>
            <th>État</th>
            <th>{priceFactor === 1 ? "Prix" : "Gain Vendeur"}</th>
            <th className="flex-column flex-center">Supprimer</th>
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
                <strong>{articleList.reduce((acc, article) => acc + article.price, 0)}&nbsp;€</strong>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ArticleList;
