import { getUserID } from "@/app/helpers/getUserID";
import prisma from "@/app/lib/prisma"

export async function GET(request){
  const userID = await getUserID(request);

  if(!userID){
    return;
  }

  const articles = await prisma.article.findMany({
    where: {
      seller_id: userID
    }
  });
  
  return Response.json({ articles });
}
