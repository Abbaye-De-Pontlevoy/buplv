"use server";

let settings = {
  publicAccess: true,
  allowArticleRegistration: false,
  endRegisterDate: null,
  paymentMethods: ["espèces", "carte banquaire", "chèque"],
  APELPart: 0.1,
};

export const getSettings = async () => {
  await verifySettings();
  return settings;
};

export const updateSettings = async (newSettings) => {
  await verifySettings();
  settings = { ...settings, ...newSettings };
};

export const verifySettings = async () => {
  // verify if public access is allowed
  if (!settings.publicAccess) settings.allowArticleRegistration = false;

  // Verify if the register is closed
  const endRegisterDate = new Date(settings.endRegisterDate);
  if (Date.now() >= endRegisterDate) {
    settings.allowArticleRegistration = false;
  }
};