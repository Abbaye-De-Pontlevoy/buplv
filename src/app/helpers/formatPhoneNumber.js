export function formatPhoneNumber(phoneNumber) {
	// Remove all space characters and keep only the first 11 digits
	const cleanedPhoneNumber = phoneNumber.replace(/\D/g, "").slice(0, 11);

	// Add the country code (+ 33)
	let formattedPhoneNumber = "+33";

	// Add the first digit (+ 33 X)
	formattedPhoneNumber += ` ${cleanedPhoneNumber.substr(2, 1)}`;

	// Add the next two digits (+ 33 X XX XX ...)
	for (let i = 3; i < cleanedPhoneNumber.length; i += 2) {
		formattedPhoneNumber += ` ${cleanedPhoneNumber.substr(i, 2)}`;
	}

	return formattedPhoneNumber;
}