"use server";

import { promises as fs } from 'fs';
import path from 'path';

export async function getClothesJSON() {
  // read file using fs module
  const data = await fs.readFile(path.resolve(process.cwd(), 'src/app/data/clothesJSON.json'), 'utf8');
  // parse JSON string to JSON object
  const clothesJSON = await JSON.parse(data);
  return clothesJSON;
}

export async function getAllClothesInfo() {
  const clothesJSON = await getClothesJSON();

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
  const data = newClothesJSONString; // newClothesJSONString already contains the JSON.stringify() result

  try {
    await fs.writeFile(path.resolve(process.cwd(), 'src/app/data/clothesJSON.json'), data, 'utf8');

    return {
      success: true,
      msg: "Les données des vêtements ont été mises à jour.",
    };
  } catch (e) {
    console.error(e.message);
    return {
      success: false,
      msg: e.message,
    };
  }
}
