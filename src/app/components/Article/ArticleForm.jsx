import { useEffect, useState } from "react";

const ArticleForm = () => {
    const [articleData, setArticleData] = useState({});
    const [name, setName] = useState("");
    const [brand, setBrand] = useState("");
    const [size, setSize] = useState("");
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
			// get article list from the server
            const response = await fetch("/api/clothesJSON");
            const data = await response.json();
            setArticleData(data);
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
		const apiURL = "/api/selling/add-selling/";
		const sellingData = {
			name: name,
			brand: brand,
			size: size,
			quantity: quantity,
			price: articleData[name][brand]["price"],
		};
		for(let i = 0; i < quantity; i++) {
			const response = await fetch(apiURL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(sellingData),
			});
			const data = await response.json();
		}
	}

    return (
        <form onSubmit={handleSubmit}>
            <select name="name" key="name" value={name} onChange={(e) => setName(e.target.value)} disabled={!articleData}>
                <option key="default" value="">Sélectionner un article</option>
                {
                    Object.keys(articleData).map((articleName) => (
                        <option key={articleName} value={articleName}>{articleName}</option>
                    ))
                }
            </select>

            <select name="brand" key="brand" value={brand} onChange={(e) => setBrand(e.target.value)} disabled={!name}>
                <option key="default" value="">Sélectionner une marque</option>
                {
                    name && articleData[name] && Object.keys(articleData[name]).map((article) => (
                        <option key={article} value={article}>{article}</option>
                    ))
                }
            </select>

            <select name="size" key="size" value={size} onChange={(e) => setSize(e.target.value)} disabled={!brand || !name}>
                <option key="default" value="">Sélectionner une taille</option>
                {
                    name && brand && articleData[name][brand] && articleData[name][brand]["size"] && articleData[name][brand]["size"].map((article) => (
                        <option key={article} value={article}>{article}</option>
                    ))
                }
            </select>
        
            <select name="quantity" key="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} disabled={!size}>
				<option key="default" value="">Sélectionner une quantité</option>
				{
					Array.from({ length: 5 }, (_, i) => (
						<option key={i+1} value={i+1}>{i+1}</option>
					))
				}
			</select>

            <button type="submit" disabled={!quantity}>Ajouter</button>
        </form>
    );
};

export default ArticleForm;
