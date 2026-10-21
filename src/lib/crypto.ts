import { createHash, randomBytes, scrypt, timingSafeEqual } from "node:crypto";

export async function hashPassword(password: string) {
	const salt = randomBytes(16).toString("hex");
	const hash = await scryptAsync(password, salt);
	return `${salt}:${hash.toString("hex")}`;
}

async function scryptAsync(password: string, salt: string) {
	return new Promise<Buffer<ArrayBuffer>>((res, rej) => {
		scrypt(password, salt, 64, (err, derivedKey) => {
			if (err) return rej(err);
			res(derivedKey);
		});
	});
}

export async function verifyPassword(password: string, storeHash: string) {
	const [salt, hashHex] = storeHash.split(":");
	const stored = Buffer.from(hashHex, "hex");
	const derived = await scryptAsync(password, salt);

	return timingSafeEqual(stored, derived);
}

export function generatorApiKey() {
	const raw = randomBytes(32).toString("base64");
	const hash = hashApiKey(raw);

	const prefix = raw.slice(0, 8);
	return { raw, hash, prefix };
}
export function hashApiKey(key: string) {
	return createHash("sha256").update(key).digest("hex");
}
