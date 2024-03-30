"use server";

const ibantools = require("ibantools");

const areIBANandBICcorrects = async ({ iban, bic }) => {
  iban = iban.replace(/\s/g, "");
  const validIban = ibantools.isValidIBAN(iban);
  const validBic = ibantools.isValidBIC(bic);
  
	const result = {
		validIban,
		validBic,
	};

	console.log(result);
	
	return result;
};

export default areIBANandBICcorrects;
