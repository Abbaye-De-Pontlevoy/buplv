import { useState } from "react";

import "./styles.css";

export const ArticleDisplay = ({
  article,
  enabledRemoveButton,
  callAfterDelete,
  priceFactor = 1,
}) => {
  const [isDisabled, setIsDisabled] = useState(false);

  // Function to handle the deletion of an article
  const deleteHandler = async (e) => {
    e.preventDefault();
    setIsDisabled(true);
    await callAfterDelete(article.id);
    setIsDisabled(false);
  };

  return (
    <tr className="articleLine">
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
      <td>{article.price * priceFactor} €</td>
      <td className="tdDeleteButton">
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
