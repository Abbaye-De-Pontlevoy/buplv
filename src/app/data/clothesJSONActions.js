"use server";

import { promises as fs } from 'fs';
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

export async function updateClothesJSON(newClothesJSONString) {
  const data = "export let clothesJSON = " + newClothesJSONString + ";";

  try {
    await fs.writeFile(process.cwd() + '/src/app/data/clothesJSON.js', data, 'utf8');

    return {
      success: true,
      msg: "Les données ont été mises à jour.",
    };
  } catch (e) {
    console.log(e.message);
    return {
      success: false,
      msg: e.message,
    };
  }
}
