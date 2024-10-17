import { Buffer } from "node:buffer";
import readline from "node:readline";
import { fileURLToPath } from 'url';


export const serialize = (numbers) => {
  inputValidation(numbers);

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

export function compressionRatio(original, serialized) {
  const originalSize = JSON.stringify(original).length;
  return Number(((serialized.length / originalSize) * 100).toFixed(2));
}

function inputValidation (numbers) {
  if (numbers.length === 0 || numbers.length > 1000) {
    throw new Error("You have to input from 1 to 1000 digits!");
  }

  if (
    numbers.some((number) => {
      const value = Number(number);
      if (Number.isNaN(value)) {
        throw new Error("You have to enter integer digits only!");
      }
      if (value <= 0 || value > 300) {
        throw new Error("Allowed digits are from 1 to 300!");
      }
    })
  ) {
    throw new Error("You have to input only digits from 1 to 1000 and comma separators");
  }

  return true;
};


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}


async function main() {
  try {
    const numbersInput = await askQuestion(
      "Please enter numbers separated by commas (1-300): "
    );
    const numbers = numbersInput
      .split(",")
      .map((num) => parseInt(num.trim(), 10));

    console.log("You entered:", numbers);

    const serialized = serialize(numbers);
    console.log("Serialized output:", serialized);
    console.log("Result compression:", compressionRatio(numbers, serialized));
    rl.close();
  } catch (error) {
    console.error("Error:", error);
    rl.close();
  }
}

const __filename = fileURLToPath(import.meta.url);

if (process.argv[1] === __filename) {
  main();
}
