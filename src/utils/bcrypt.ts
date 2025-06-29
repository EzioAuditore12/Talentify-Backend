import { compare, genSalt, hash } from "bcrypt";

async function generatePassword(password: string) {
	const salt = await genSalt();
	return await hash(password, salt);
}

async function comparePasswords(
	passwordInput: string,
	passwordStored: string,
): Promise<boolean> {
	return await compare(passwordInput, passwordStored);
}

export { generatePassword, comparePasswords };
