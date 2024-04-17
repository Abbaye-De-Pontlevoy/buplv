import { useState } from "react";
import { getArticleByID } from "../../helpers/getArticleByID";

import "./styles.css";

const ArticleSearch = ({ onArticleSearch, placeholder="Rechercher par ID", buttonText="Rechercher"}) => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const articleID = e.target.articleId.value;

    try {
      const result = await getArticleByID(articleID);
      if (!result) setError("Article non trouvé.");
      await onArticleSearch(result);
    } catch (e) {
      setError(e.message);
    }

    e.target.articleId.value = "";

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSearch} id="articleSearchForm">
      <span id="articleSearchSpan">
        <input type="number" name="articleId" placeholder={placeholder}></input>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Chargement..." : buttonText}
        </button>
      </span>
      <p className="error">{error}</p>
    </form>
  );
};

export default ArticleSearch;
