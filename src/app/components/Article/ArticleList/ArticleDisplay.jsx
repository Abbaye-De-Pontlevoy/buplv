import { useState } from "react";

import "./styles.css";

export const ArticleDisplay = ({ article, callAfterDelete }) => {
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
        {article.state === 1
          ? "Inventorié"
          : article.state === 2
          ? "Vendu"
          : ""}
      </td>
      <td>{article.price} €</td>
      <td className="tdDeleteButton">
        <form className="deleteButtonForm" onSubmit={deleteHandler}>
          <button type="submit" className="deleteButton" disabled={isDisabled}>
            x
          </button>
        </form>
      </td>
    </tr>
  );
};
