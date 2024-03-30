function getPasswordStrength(password) {
  let score = 0;

  // Longueur du mot de passe
  if (password.length <= 8) {
    return 3*password.length;
  }

  score += 3*password.length;

  // Présence de chiffres
  if (/\d/.test(password)) {
    score += 10;
  }

  // Présence de lettres minuscules et majuscules
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
    score += 20;
  }

  // Présence de caractères spéciaux
  if (/[^a-zA-Z0-9]/.test(password)) {
    score += 20;
  }

  // Présence de caractères répétés
  if (/(.)\1/.test(password)) {
    score -= 10;
  }


  return Math.min(100, Math.max(0, score));
}

export default getPasswordStrength;