"use server";

const ibantools = require("ibantools");

// Function to check if the IBAN and BIC are correct
const areIBANandBICcorrects = async ({ iban, bic }) => {
  iban = iban.replace(/\s/g, "");
  const validIban = ibantools.isValidIBAN(iban);
  const validBic = ibantools.isValidBIC(bic);
  
	const result = {
		validIban,
		validBic,
	};
	
	return result;
};

export default areIBANandBICcorrects;
