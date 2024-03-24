import validateEmail from "@/app/helpers/validateEmail";
import validatePassword from "@/app/helpers/validatePassword";
import prisma from "@/app/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request) {
  // Read data off req body
  const body = await request.json();
  const {
	student_name,
	grade,
	email,
	phone,
	address,
	password,
  iban,
  bic,
  country_code
  } = body;


  // Validate data
  if (!validateEmail(email) || !validatePassword(password)) {
    return Response.json(
      {
        error: "Invalid email or password",
      },
      { status: 400 }
    );
  }

  // Hash the password
  const hash = bcrypt.hashSync(password, 8);

  // Create a user in db
  await prisma.seller.create({
	data: {
		student_name: student_name,
		grade: grade,
		email: email,
		phone: phone,
		address: address,
		password: hash,
    iban: iban,
    bic: bic,
    country_code: country_code
	},
});

  // return something
  return Response.json({});
}