import { getUserID } from "@/app/helpers/getUserID";
import prisma from "@/app/lib/prisma"

export async function GET(request){
  const userID = await getUserID(request);

  if(!userID){
    return;
  }

  const sellingProducts = await prisma.sellingProduct.findMany({
    where: {
      seller_id: userID
    }
  });
  
  return Response.json({ sellingProducts });
}
