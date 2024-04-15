import { useEffect, useState } from "react";
import ArticleSearch from "./ArticleSearch/ArticleSearch";
import { getAllClothesInfo } from "@/app/data/clothesJSONActions";
import { updateArticle } from "./modifierAction";

const ArticleModifier = () => {
  const [articleJSONData, setArticleJSONData] = useState(null);
  const [articleData, setArticleData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllClothesInfo().then((data) => {
      setArticleJSONData(data);
    });
  }, []);

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
        <form onSubmit={handleSubmit}>
          <span>
            <label>
              Marque
              <select
                name="brand"
                key="brand"
                value={articleData.brand}
                onChange={(e) =>
                  setArticleData({ ...articleData, brand: e.target.value })
                }
              >
                {articleJSONData.brand.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </label>
          </span>

          <span>
            <label>
              Article
              <select
                name="name"
                key="name"
                value={articleData.name}
                onChange={(e) =>
                  setArticleData({ ...articleData, name: e.target.value })
                }
              >
                {articleJSONData.name.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </label>
          </span>

          <span>
            <label>
              Taille
              <select
                name="size"
                key="size"
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
            </label>
          </span>

          <span>
            <label>
              État
              <select
                name="state"
                key="state"
                value={articleData.state}
                onChange={(e) =>
                  setArticleData({ ...articleData, state: e.target.value })
                }
              >
                <option key="1" value="1">
                  Enregistré
                </option>
                <option key="2" value="2">
                  Inventorié
                </option>
                <option key="3" value="3">
                  Vendu
                </option>
                <option key="0" value="0">
                  Supprimé
                </option>
                <option key="-1" value="-1">
                  Invendable
                </option>
              </select>
            </label>
          </span>

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
