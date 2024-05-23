/**
 * Calculates the strength of a password based on various criteria.
 *
 * @param {string} password - The password to evaluate.
 * @returns {number} The strength score of the password (between 0 and 100).
 */
function getPasswordStrength(password) {
  let score = 0;

  // Password length
  if (password.length < 8) {
    return 3 * password.length;
  }

  score += 5 * password.length;

  // Presence of digits
  if (/\d/.test(password)) {
    score += 10;
  }

  // Presence of lowercase and uppercase letters
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
    score += 20;
  }

  // Presence of special characters
  if (/[^a-zA-Z0-9]/.test(password)) {
    score += 20;
  }

  // Presence of repeated characters
  if (/(.)\1/.test(password)) {
    score -= 5;
  }

  return Math.min(100, Math.max(0, score));
}

export default getPasswordStrength;