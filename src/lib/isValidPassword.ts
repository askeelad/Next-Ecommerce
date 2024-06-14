const isValidPassword = async (password: string, hashedPassword: string) => {
  console.log(await hashpassword(password));
  return (await hashpassword(password)) === hashedPassword;
};

export default isValidPassword;

async function hashpassword(password: string) {
  const arrayBuffer = await crypto.subtle.digest(
    "SHA-512",
    new TextEncoder().encode(password)
  );

  return Buffer.from(arrayBuffer).toString("base64");
}
