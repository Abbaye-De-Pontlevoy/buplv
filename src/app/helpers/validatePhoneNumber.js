
/**
 * Checks if a phone number is valid.
 *
 * @param {string} phoneNumber - The phone number to validate.
 * @returns {boolean} - Returns true if the phone number is valid, otherwise false.
 */
export default function isValidPhoneNumber(phoneNumber) {
	const pattern = /^\+33\d{9}$/;;

	phoneNumber = phoneNumber.replace(/\s/g, '');

  return pattern.test(phoneNumber);
}