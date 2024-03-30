import { useEffect, useState } from "react";

import "./styles.css";

const ArticleForm = ({ callAfterSubmit, title }) => {
  const [articleData, setArticleData] = useState({});
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(0);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      // get article list from the server
      const response = await fetch("/api/clothesJSON");
      const data = await response.json();
      setArticleData(data);

      setIsLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    setSize("");
    setBrand("");
  }, [name]);

  useEffect(() => {
    setSize("");
  }, [brand]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    // add article to the server
    const apiURL = "/api/article/add-article/";
    const submitData = {
      name: name,
      brand: brand,
      size: size,
      quantity: quantity,
      price: articleData[name][brand]["price"],
    };
    for (let i = 0; i < quantity; i++) {
      const response = await fetch(apiURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });
      const data = await response.json();
    }

    // call the parent function
    if (callAfterSubmit) await callAfterSubmit();

    setName("");

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
              name="name"
              key="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!articleData || isLoading}
            >
              <option key="default" value="">
                Article
              </option>
              {Object.keys(articleData).map((articleName) => (
                <option key={articleName} value={articleName}>
                  {articleName}
                </option>
              ))}
            </select>
          </td>
          <td>
            <select
              name="brand"
              key="brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              disabled={!name || isLoading}
            >
              <option key="default" value="">
                Marque
              </option>
              {name &&
                articleData[name] &&
                Object.keys(articleData[name]).map((article) => (
                  <option key={article} value={article}>
                    {article}
                  </option>
                ))}
            </select>
          </td>
          <td>
            <select
              name="size"
              key="size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              disabled={!brand || !name || isLoading}
            >
              <option key="default" value="">
                Taille
              </option>
              {name &&
                brand &&
                articleData[name][brand] &&
                articleData[name][brand]["size"] &&
                articleData[name][brand]["size"].map((article) => (
                  <option key={article} value={article}>
                    {article}
                  </option>
                ))}
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
              {name &&
                brand &&
                size &&
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
