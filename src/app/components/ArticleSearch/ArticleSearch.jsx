import { useState } from "react";
import { getArticleByID } from "../../helpers/getArticleByID";

import "./styles.css";

const ArticleSearch = ({
    onArticleSearch,
    placeholder = "Rechercher par ID",
    buttonText = "Rechercher",
}) => {
    // Initialize state variables
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Handle the search form submission
    const handleSearch = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Get the article ID from the form
        const articleID = e.target.articleId.value;

        // Try to find it in the database
        try {
            if (!articleID) throw new Error("Veuillez entrer un ID d'article.");
            const result = await getArticleByID(articleID);
            if (!result) setError("Article non trouvé.");
            // if the article is found, call the onArticleSearch function
            await onArticleSearch(result);
        } catch (e) {
            setError(e.message);
        }

        // Reset the form
        e.target.articleId.value = "";

        setIsLoading(false);
    };

    return (
        <form onSubmit={handleSearch} id="articleSearchForm">
            <span id="articleSearchSpan">
                <input
                    type="number"
                    name="articleId"
                    placeholder={placeholder}
                ></input>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Chargement..." : buttonText}
                </button>
            </span>
            <p className="error">{error}</p>
        </form>
    );
};

export default ArticleSearch;
