import { MdAccountCircle } from "react-icons/md";
import { cookies } from "next/headers";

import "../../../globals.css";
import "./styles.css";
import { isUserConnected } from "@/app/helpers/isUserConnected";

const AccountButton = async ({ className }) => {
  return (
    <>
      {(await isUserConnected()) ? (
        <a href="/dashboard" id="accountSpan" className={className}>
          Mon compte
          <MdAccountCircle size={32} />
        </a>
      ) : (
        <a href="/login" id="accountSpan" className={className}>
          Me connecter
          <MdAccountCircle size={32} />
        </a>
      )}
    </>
  );
};

export default AccountButton;
