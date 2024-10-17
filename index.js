// граничные условия
// 1 до 300
// max 1000
// target compression ~50%
// только ASCII символы

import { Buffer } from "node:buffer";

export const serialize = (numbers) => {
  if (numbers.length <= 3) {
    return numbers.join(",");
  }

  let bitString = "";

  numbers.forEach((num) => {
    bitString += Number(num).toString(2).padStart(9, "0");
  });

  let byteArray = [];
  for (let i = 0; i < bitString.length; i += 8) {
    let byte = bitString.slice(i, i + 8);
    byteArray.push(parseInt(byte.padEnd(8, "0"), 2));
  }

  return Buffer.from(byteArray).toString("base64");
};

export const deserialize = (bytes) => {
  if (bytes.length === 1) {
    return [Number(bytes)];
  }

  if (bytes.includes(",")) {
    return bytes.split(",").map(Number);
  }

  let buffer = Buffer.from(bytes, "base64");

  let textBit = "";
  buffer.forEach((byte) => {
    textBit += byte.toString(2).padStart(8, "0");
  });

  let numbers = [];
  for (let i = 0; i < textBit.length; i += 9) {
    let nineBits = textBit.slice(i, i + 9);
    if (nineBits.length === 9) {
      numbers.push(parseInt(nineBits, 2));
    }
  }

  return numbers;
};
