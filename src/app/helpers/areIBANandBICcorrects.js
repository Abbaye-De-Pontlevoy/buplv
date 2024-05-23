"use server";

const ibantools = require("ibantools");

// Function to check if the IBAN and BIC are correct
/**
 * Checks if the provided IBAN and BIC are correct.
 *
 * @param {Object} params - The parameters object.
 * @param {string} params.iban - The IBAN to be checked.
 * @param {string} params.bic - The BIC to be checked.
 * @returns {Promise<Object>} - A promise that resolves to an object containing the validity of the IBAN and BIC.
 */
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
