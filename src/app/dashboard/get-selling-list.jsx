"use server";

import { getUserID } from "@/app/helpers/getUserID";
import prisma from "@/app/lib/prisma"

export default async function getSellingsList(){
  const userID = await getUserID();

  if(!userID){
    return;
  }

  const sellingsProducts = await prisma.sellingProduct.findMany({
    where: {
      seller_id: userID
    }
  });

  return sellingsProducts;
}
