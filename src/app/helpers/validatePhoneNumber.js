
export default function isValidPhoneNumber(phoneNumber) {
	const pattern = /^\+33\d{9}$/;;

	phoneNumber = phoneNumber.replace(/\s/g, '');

  return pattern.test(phoneNumber);
}