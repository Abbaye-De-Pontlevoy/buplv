import { useState } from "react";

import "./styles.css";

/**
 * Renders a single article in a table row.
 *
 * @param {Object} props - The component props.
 * @param {string} props.className - The additional CSS class for the table row.
 * @param {Object} props.article - The article object to display.
 * @param {Function} props.callAfterDelete - The callback function to be called after deleting the article.
 * @param {boolean} [props.enabledRemoveButton=false] - Whether the remove button should be enabled.
 * @param {number} [props.priceFactor=1] - The factor to multiply the article price by.
 * @returns {JSX.Element} The rendered article table row.
 */
export const ArticleDisplay = ({
  className,
  article,
  callAfterDelete,
  enabledRemoveButton = false,
  priceFactor = 1,
}) => {
  const [isDisabled, setIsDisabled] = useState(false);

  /**
   * Handles the deletion of an article.
   *
   * @param {Event} e - The event object.
   * @returns {Promise<void>} A promise that resolves after the article is deleted.
   */
  const deleteHandler = async (e) => {
    e.preventDefault();
    setIsDisabled(true);
    await callAfterDelete(article.id);
    setIsDisabled(false);
  };

  return (
    <tr className={"articleLine " + className}>
      <td>{article.name}</td>
      <td>{article.brand}</td>
      <td>{article.size}</td>
      <td>
        {article.state === -1
          ? "Invendable"
          : article.state === 2
          ? "Inventorié"
          : article.state === 3
          ? "Vendu"
          : "Enregistré"}
      </td>
      <td className="text-center">{(article.price * priceFactor).toFixed(2)} €</td>
      <td className="flex-column flex-center">
        {/* Display the delete button if the user is allowed to remove articles */}
        {/* Else, display a dash */}
        {/* The delete button is disabled while the article is being deleted */}
        {article.state === 1 || enabledRemoveButton ? (
          <form className="deleteButtonForm" onSubmit={deleteHandler}>
            <button
              type="submit"
              className="deleteButton"
              disabled={isDisabled}
            >
              x
            </button>
          </form>
        ) : (
          "-"
        )}
      </td>
    </tr>
  );
};
