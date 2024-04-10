"use server";

import { clothesJSON } from "./clothesJSON";

export async function getAllClothesInfo() {
  let brand = new Set();
  let name = new Set();
  let size = new Set();

  for (let grade in clothesJSON) {
    for (let sex in clothesJSON[grade]) {
      for (let currentBrand in clothesJSON[grade][sex]) {
        brand.add(currentBrand);
        for (let currentName in clothesJSON[grade][sex][currentBrand]) {
          name.add(currentName);
          clothesJSON[grade][sex][currentBrand][currentName].size.forEach((s) =>
            size.add(s)
          );
        }
      }
    }
  }

  // Convertir les ensembles en tableaux et trier les résultats
  let brandArray = Array.from(brand).sort();
  let nameArray = Array.from(name).sort();
  let sizeArray = Array.from(size).sort();

  return {
    brand: brandArray,
    name: nameArray,
    size: sizeArray,
  };
}
