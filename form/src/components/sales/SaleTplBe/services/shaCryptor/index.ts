import sha256 from "./sha256.min";

const shaCryptor = (caller: any, custId: any, timestamp: any, path: any) => {
  const hash = (sha256 as any).create();

  hash.update(
    `caller=${encodeURIComponent(caller)}&custId=${encodeURIComponent(
      custId
    )}&timestamp=${encodeURIComponent(timestamp)}&path=${encodeURIComponent(
      path
    )}&key=${encodeURIComponent("b3Blcy1taW5pLXdlYg==")}`
  );

  return hash.hex();
};

export default shaCryptor;
