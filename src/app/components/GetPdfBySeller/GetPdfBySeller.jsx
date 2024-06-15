import { useEffect, useState } from "react";
import { getSellerList } from "@/app/helpers/getSellerList";
import { getPdfFromSellerID } from "../QRCodePDFGenerator/generatePDF";

const GetPdfBySeller = ({className}) => {
    const [userFindMethod, setUserFindMethod] = useState("");
    const [userList, setUserList] = useState([]);
    const [userFindValue, setUserFindValue] = useState("");
	const [isLoading, setIsLoading] = useState(false);

    // Fetch data for userList
    useEffect(() => {
        const fetchData = async () => {
            const data = await getSellerList();
            setUserList(data);
        };
        fetchData();
    }, []);

	useEffect(() => {
		if(!userFindMethod) setUserFindValue("");
	}, [userFindMethod]);

    return (
        <form
            className={className}
            onSubmit={async (e) => {
                e.preventDefault();
				setIsLoading(true);
                await getPdfFromSellerID(e.target.userFindValue.value);
				setIsLoading(false);
            }}
        >
            <select
                name="userFindMethod"
                key="userFindMethod"
                className="width-full"
                value={userFindMethod}
                onChange={(e) => setUserFindMethod(e.target.value)}
            >
                <option key="default" value="">
                    Méthode de recherche
                </option>
                <option key="id" value="id">
                    ID
                </option>
                <option key="name" value="name">
                    Nom
                </option>
                <option key="email" value="email">
                    Email
                </option>
            </select>

            <select
                name="userFindValue"
                key="userFindValue"
                className="width-full"
                value={userFindValue}
                onChange={(e) => setUserFindValue(e.target.value)}
                disabled={!userFindMethod}
            >
                <option key="default" value="">
                    Vendeurs
                </option>

                {
                    // Render options for each user based on the selected method
                    userFindMethod &&
                        userList.length > 0 &&
                        userList.map((user) => (
                            <option key={user.id} value={user.id}>
                                {userFindMethod == "id"
                                    ? user.id
                                    : userFindMethod == "name"
                                    ? user.name
                                    : user.email}
                            </option>
                        ))
                }
            </select>

            <button type="submit" className="width-full" disabled={isLoading || !userFindValue}>
                {isLoading ? "Téléchargement..." : "Générer le PDF"}
            </button>
        </form>
    );
};

export default GetPdfBySeller;
