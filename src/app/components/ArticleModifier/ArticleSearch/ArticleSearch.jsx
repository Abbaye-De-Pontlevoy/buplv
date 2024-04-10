import { useState } from "react";
import { getArticleByID } from "./ArticleSearchAction";

const ArticleSearch = ({onArticleSearch}) => {
  const [articleID, setArticleID] = useState(0);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await getArticleByID(articleID);
      if (!result) setError("Article non trouvé.");
      await onArticleSearch(result);
    } catch (e) {
      setError(e.message);
    }

    setIsLoading(false);
  };

  return (
    <>
      {/* Searc Form */}
      <form onSubmit={handleSearch}>
        <span>
          <label>
            ID :{" "}
            <input
              type="number"
              value={articleID}
              onChange={(e) => {
                setError("");
                setArticleID(e.target.value);
              }}
            ></input>
          </label>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Chargement..." : "Rechercher"}
          </button>
        </span>
        <p className="error">{error}</p>
      </form>
    </>
  );
};

export default ArticleSearch;
