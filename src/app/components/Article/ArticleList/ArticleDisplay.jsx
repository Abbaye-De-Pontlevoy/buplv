import { useState } from "react";

import "./styles.css";

export const ArticleDisplay = ({
  article,
  enabledRemoveButton,
  callAfterDelete,
}) => {
  const [isDisabled, setIsDisabled] = useState(false);

  const deleteHandler = async (e) => {
    e.preventDefault();
    setIsDisabled(true);
    await callAfterDelete(article.id);
    //setIsDisabled(false);
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
      <td>{article.price} €</td>
      <td className="tdDeleteButton">
        {article.state === 1 ? (
          <form className="deleteButtonForm" onSubmit={deleteHandler}>
            <button
              type="submit"
              className="deleteButton"
              disabled={isDisabled || !enabledRemoveButton}
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
