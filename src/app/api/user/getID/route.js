import { getUserID } from "@/app/helpers/getUserID";

export async function POST(request) {
    const userID = await getUserID(request);
  
    // Respond with it
    return Response.json({ userID });
  }
  