import { useEffect, useState } from "react";
import { addArticle } from "./articleFormAction";
import { clothesJSON } from "@/app/data/clothesJSON";

import "./styles.css";

const ArticleForm = ({ callAfterSubmit, title }) => {
  const articleData = clothesJSON;
  const [grade, setGrade] = useState("");
  const [sex, setSex] = useState("");
  const [name, setName] = useState({
    brand: "",
    name: "",
  });
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setSex("");
  }, [grade]);

  useEffect(() => {
    setName({
      brand: "",
      name: "",
    });
  }, [sex]);

  useEffect(() => {
    setSize("");
  }, [name]);

  useEffect(() => {
    setQuantity(0);
  }, [size]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    // add article to the server
    const submitData = {
      name: name.name,
      brand: name.brand,
      size: size,
      quantity: quantity,
      price: articleData[grade][sex][name.brand][name.name]["price"],
    };
    const result = await addArticle(submitData);

    // call the parent function
    if (callAfterSubmit) await callAfterSubmit();

    setGrade("");

    setIsLoading(false);
  };

  return (
    <div className="addArticleContainer">
      <h3 id="articleFormTitle">{title}</h3>
      <form onSubmit={handleSubmit} id="addArticleForm">
        <table>
          <tbody>
            <tr>
              <td>
                <select
                  name="grade"
                  key="grade"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  disabled={!articleData || isLoading}
                >
                  <option key="default" value="">
                    Niveau
                  </option>
                  {Object.keys(articleData).map((grade) => (
                    <option key={grade} value={grade}>
                      {grade}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <select
                  name="sex"
                  key="sex"
                  value={sex}
                  onChange={(e) => setSex(e.target.value)}
                  disabled={!grade || isLoading}
                >
                  <option key="default" value="">
                    Sexe
                  </option>
                  {grade &&
                    Object.keys(articleData[grade]).map((sex) => (
                      <option key={sex} value={sex}>
                        {sex}
                      </option>
                    ))}
                </select>
              </td>
              <td>
                <select
                  name="name"
                  key="name"
                  value={`${name.brand}-${name.name}`}
                  onChange={(e) => {
                    const [brand, articleName] = e.target.value.split("-");
                    setName({ brand, name: articleName });
                  }}
                  disabled={!sex || isLoading}
                >
                  <option key="default" value="">
                    Article
                  </option>
                  {grade && sex &&
                    Object.keys(articleData[grade][sex]).map((brand) =>
                      Object.keys(articleData[grade][sex][brand]).map(
                        (articleName) => (
                          <option
                            key={brand + articleName}
                            value={`${brand}-${articleName}`}
                          >
                            {`(${brand}) ${articleName}`}
                          </option>
                        )
                      )
                    )}
                </select>
              </td>
              <td>
                <select
                  name="size"
                  key="size"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  disabled={!name.brand || isLoading}
                >
                  <option key="default" value="">
                    Taille
                  </option>
                  {grade && sex && name.brand &&
                    articleData[grade][sex][name.brand][name.name]["size"].map(
                      (size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      )
                    )}
                </select>
              </td>
              <td>
                <select
                  name="quantity"
                  key="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  disabled={!size || isLoading}
                >
                  <option key="default" value="">
                    Quantité
                  </option>
                  {grade && sex && name.brand && size &&
                    Array.from({ length: 5 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                </select>
              </td>
              <td id="tdAddButton">
                <button
                  id="addArticleButton"
                  type="submit"
                  disabled={!quantity || isLoading}
                >
                  ✓
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default ArticleForm;
