"use server";

let settings = {
  publicAccess: true,
  allowArticleRegistration: false,
  endRegisterDate: "2025-01-01",
  paymentMethods: ["espèces", "carte banquaire", "chèque"],
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
    settings.publicAccess = false;
    settings.allowArticleRegistration = false;
  }
};