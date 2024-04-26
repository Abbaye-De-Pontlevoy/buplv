"use client";

import { useEffect, useState } from "react";
import { addArticle } from "./articleFormAction";
import { clothesJSON } from "@/app/data/clothesJSON";

import "./styles.css";

const ArticleForm = ({ callAfterSubmit, title }) => {
  // Initialize state variables
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

  // Reset the 'sex' state when 'grade' changes
  useEffect(() => {
    setSex("");
  }, [grade]);

  // Reset the 'name' state when 'sex' changes
  useEffect(() => {
    setName({
      brand: "",
      name: "",
    });
  }, [sex]);

  // Reset the 'size' state when 'name' changes
  useEffect(() => {
    setSize("");
  }, [name]);

  // Reset the 'quantity' state when 'size' changes
  useEffect(() => {
    setQuantity(0);
  }, [size]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    // Prepare data to be submitted
    const submitData = {
      name: name.name,
      brand: name.brand,
      size: size,
      quantity: quantity,
      price: articleData[grade][sex][name.brand][name.name]["price"],
    };

    // Call the 'addArticle' function to add the article to the server
    const result = await addArticle(submitData);

    // Call the parent function if provided
    if (callAfterSubmit) await callAfterSubmit();

    // Reset the 'grade' state
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
                {/* Select the 'grade' */}
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
                  {/* Render options for each grade */}
                  {Object.keys(articleData).map((grade) => (
                    <option key={grade} value={grade}>
                      {grade}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                {/* Select the 'sex' */}
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
                  {/* Render options for each sex based on the selected grade */}
                  {grade &&
                    Object.keys(articleData[grade]).map((sex) => (
                      <option key={sex} value={sex}>
                        {sex}
                      </option>
                    ))}
                </select>
              </td>
              <td>
                {/* Select the 'name' */}
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
                  {/* Render options for each article name based on the selected grade, sex, and brand */}
                  {grade &&
                    sex &&
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
                {/* Select the 'size' */}
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
                  {/* Render options for each size based on the selected grade, sex, brand, and article name */}
                  {grade &&
                    sex &&
                    name.brand &&
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
                {/* Select the 'quantity' */}
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
                  {/* Render options for quantity */}
                  {grade &&
                    sex &&
                    name.brand &&
                    size &&
                    Array.from({ length: 5 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                </select>
              </td>
              <td id="tdAddButton">
                {/* Submit button */}
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
