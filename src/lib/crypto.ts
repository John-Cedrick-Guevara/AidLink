import crypto from "crypto";

const ALGO = "aes-256-gcm";

// ENV must contain 32-byte hex key (64 hex characters)
if (!process.env.ENCRYPTION_KEY) {
  throw new Error(
    "ENCRYPTION_KEY is not set in environment variables. " +
      "Generate one using: node -e \"console.log(require('crypto').randomBytes(32).toString('hex'))\""
  );
}

const SECRET_KEY = Buffer.from(process.env.ENCRYPTION_KEY, "hex");

if (SECRET_KEY.length !== 32) {
  throw new Error(
    `ENCRYPTION_KEY must be exactly 32 bytes (64 hex characters). Current length: ${SECRET_KEY.length} bytes. ` +
      "Generate a new one using: node -e \"console.log(require('crypto').randomBytes(32).toString('hex'))\""
  );
}

export function encrypt(text: string) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ALGO, SECRET_KEY, iv);

  const encrypted = Buffer.concat([
    cipher.update(text, "utf8"),
    cipher.final(),
  ]);

  const tag = cipher.getAuthTag();

  return {
    content: encrypted.toString("hex"),
    iv: iv.toString("hex"),
    tag: tag.toString("hex"),
  };
}

export function decrypt({
  content,
  iv,
  tag,
}: {
  content: string;
  iv: string;
  tag: string;
}) {
  const decipher = crypto.createDecipheriv(
    ALGO,
    SECRET_KEY,
    Buffer.from(iv, "hex")
  );

  decipher.setAuthTag(Buffer.from(tag, "hex"));

  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(content, "hex")),
    decipher.final(),
  ]);

  return decrypted.toString("utf8");
}
