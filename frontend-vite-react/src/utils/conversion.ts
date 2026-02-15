
export const stringToBytes32 = (str: string): Uint8Array => {
  const bytes = new TextEncoder().encode(str);
  if (bytes.length > 32) {
    throw new Error("String too long for Bytes<32>");
  }
  const result = new Uint8Array(32);
  result.set(bytes);
  return result;
};

export const bytes32ToString = (bytes: Uint8Array): string => {
  let end = 0;
  while (end < bytes.length && bytes[end] !== 0) {
    end++;
  }
  return new TextDecoder().decode(bytes.slice(0, end));
};
