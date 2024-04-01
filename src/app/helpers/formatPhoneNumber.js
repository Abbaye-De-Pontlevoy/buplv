
export function formatPhoneNumber(phoneNumber) {
	const cleanedPhoneNumber = phoneNumber.replace(/\D/g, "").slice(0, 11);

	let formattedPhoneNumber = "+33";

	formattedPhoneNumber += ` ${cleanedPhoneNumber.substr(2, 1)}`;

	for (let i = 3; i < cleanedPhoneNumber.length; i += 2) {
		formattedPhoneNumber += ` ${cleanedPhoneNumber.substr(i, 2)}`;
	}

	return formattedPhoneNumber;
}