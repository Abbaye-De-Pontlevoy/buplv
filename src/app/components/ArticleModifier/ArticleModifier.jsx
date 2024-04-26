import { useEffect, useState } from "react";
import ArticleSearch from "../ArticleSearch/ArticleSearch";
import { getAllClothesInfo } from "@/app/data/clothesJSONActions";
import { updateArticle } from "./modifierAction";

import "./styles.css";

const ArticleModifier = () => {
  // Initialize state variables
  const [articleJSONData, setArticleJSONData] = useState(null);
  const [articleData, setArticleData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch clothesJSON data when component mounts
  useEffect(() => {
    getAllClothesInfo().then((data) => {
      setArticleJSONData(data);
    });
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    const result = await updateArticle(articleData);
    if (result) alert("Article modifié avec succès.");
    else setError("Erreur lors de la modification de l'article.");
    setIsLoading(false);
  };

  return (
    <>
      <ArticleSearch onArticleSearch={setArticleData} />

      {/* Modification Form */}
      {articleData && articleJSONData && (
        <form id="modificationForm" onSubmit={handleSubmit}>
          <table id="modificationTable">
            <tbody>
              <tr>
                <td>
                  <label htmlFor="id">ID : </label>
                </td>
                <td>
                  <input
                    name="id"
                    id="id"
                    className="modificationSelect"
                    value={articleData.id}
                    disabled={true}
                  ></input>
                </td>
              </tr>

              <tr>
                <td>
                  <label htmlFor="brand">Marque : </label>
                </td>
                <td>
                  <select
                    name="brand"
                    id="brand"
                    className="modificationSelect"
                    value={articleData.brand}
                    onChange={(e) =>
                      setArticleData({ ...articleData, brand: e.target.value })
                    }
                    disabled={articleData.state === 3}
                  >
                    {articleJSONData.brand.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>

              <tr>
                <td>
                  <label htmlFor="name">Article : </label>
                </td>
                <td>
                  <select
                    name="name"
                    id="name"
                    className="modificationSelect"
                    value={articleData.name}
                    onChange={(e) =>
                      setArticleData({ ...articleData, name: e.target.value })
                    }
                    disabled={articleData.state === 3}
                  >
                    {articleJSONData.name.map((name) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>

              <tr>
                <td>
                  <label htmlFor="size">Taille : </label>
                </td>
                <td>
                  <select
                    name="size"
                    id="size"
                    className="modificationSelect"
                    value={articleData.size}
                    onChange={(e) =>
                      setArticleData({ ...articleData, size: e.target.value })
                    }
                  >
                    {articleJSONData.size.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>

              <tr>
                <td>
                  <label htmlFor="state">État : </label>
                </td>
                <td>
                  <select
                    name="state"
                    id="state"
                    className="modificationSelect"
                    value={articleData.state}
                    onChange={(e) =>
                      setArticleData({ ...articleData, state: e.target.value })
                    }
                    disabled={articleData.state === 3}
                  >
                    {articleData.state === 3 && (
                      <option key="3" value="3">
                        Vendu
                      </option>
                    )}
                    <option key="1" value="1">
                      Enregistré
                    </option>
                    <option key="2" value="2">
                      Inventorié
                    </option>
                    <option key="0" value="0">
                      Supprimé
                    </option>
                    <option key="-1" value="-1">
                      Invendable
                    </option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>

          {articleData.state === 3 && (
            <p className="error">
              Article déjà vendu, veuillez passer par la section
              'Vente/Inventaire' pour modifier son état.
            </p>
          )}

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Chargement..." : "Modifier"}
          </button>
          <p className="error">{error}</p>
        </form>
      )}
    </>
  );
};

export default ArticleModifier;
