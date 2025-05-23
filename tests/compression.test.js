/*
Compression tests
Примеры тестов: 
простейшие короткие, 
случайные - 50 чисел, 100 чисел, 500 чисел, 1000 чисел, 
граничные - все числа 1 знака, 
все числа из 2х знаков, 
все числа из 3х знаков, 
каждого числа по 3 - всего чисел 900. 
*/

import { expect } from "chai";
import { serialize, deserialize, compressionRatio } from "../index.js";

function generateRandomNumbers(count) {
  return Array.from(
    { length: count },
    () => Math.floor(Math.random() * 300) + 1
  );
}

const printTestData = (original, serialized, ratio) => {
  console.log(`Исходная строка: ${JSON.stringify(original)}`);
  console.log(`Сжатая строка: ${serialized}`);
  console.log(`Коэффициент сжатия: ${(100-ratio).toFixed(2)}%`);
}

describe("Input validation", function() {
  it("should throw error for non-array input", function() {
    expect(() => serialize("1,2,3")).to.throw("Input must be an array");
  });
  
  it("should throw error for numbers outside range", function() {
    expect(() => serialize([0, 1, 2])).to.throw("Allowed digits are from 1 to 300! But found 0");
    expect(() => serialize([1, 301, 2])).to.throw("Allowed digits are from 1 to 300! But found 301");
  });
  
  it("should throw error for non-integer values", function() {
    expect(() => serialize([1, 2.5, 3])).to.throw("All values must be integers");
  });
});

describe("Compression tests: ", function () {
  describe("simple short arrays", function () {
    it("should correctly serialize and deserialize [1]", function () {
      const numbers = [1];
      const serialized = serialize(numbers);
      const deserialized = deserialize(serialized);
      expect(deserialized).to.deep.equal(numbers);
      const ratio = compressionRatio(numbers, serialized);
      printTestData(numbers, serialized, ratio);
      expect(100 - ratio).to.be.above(0);
    });
    it("should correctly serialize and deserialize [1, 2]", function () {
      const numbers = [1, 2];
      const serialized = serialize(numbers);
      const deserialized = deserialize(serialized);
      expect(deserialized).to.deep.equal(numbers);
      const ratio = compressionRatio(numbers, serialized);
      printTestData(numbers, serialized, ratio);
      expect(100 - ratio).to.be.above(0);
    });
    it("should correctly serialize and deserialize [1, 2, 3]", function () {
      const numbers = [1, 2, 3];
      const serialized = serialize(numbers);
      const deserialized = deserialize(serialized);
      expect(deserialized).to.deep.equal(numbers);
      const ratio = compressionRatio(numbers, serialized);
      printTestData(numbers, serialized, ratio);
      expect(100 - ratio).to.be.above(0);
    });

    it("should correctly serialize and deserialize [1, 22, 300]", function () {
      const numbers = [1, 22, 300];
      const serialized = serialize(numbers);
      const deserialized = deserialize(serialized);

      expect(deserialized).to.deep.equal(numbers);
      const ratio = compressionRatio(numbers, serialized);
      printTestData(numbers, serialized, ratio);
      expect(100 - ratio).to.be.above(0);
    });

    it("should correctly serialize and deserialize array [300, 299, 298]", function () {
      const numbers = [300, 299, 298];
      const serialized = serialize(numbers);
      const deserialized = deserialize(serialized);

      expect(deserialized).to.deep.equal(numbers);
      const ratio = compressionRatio(numbers, serialized);
      printTestData(numbers, serialized, ratio);
      expect(100 - ratio).to.be.above(0);
    });
  });

  describe("random arrays", function () {
    it("should correctly serialize and deserialize random 50", function () {
      const numbers = generateRandomNumbers(50);
      const serialized = serialize(numbers);
      const deserialized = deserialize(serialized);

      expect(deserialized).to.deep.equal(numbers);
      const ratio = compressionRatio(numbers, serialized);
      printTestData(numbers, serialized, ratio);
      expect(100 - ratio).to.be.above(50);
    });

    it("should correctly serialize and deserialize random 100", function () {
      const numbers = generateRandomNumbers(100);
      const serialized = serialize(numbers);
      const deserialized = deserialize(serialized);

      expect(deserialized).to.deep.equal(numbers);
      const ratio = compressionRatio(numbers, serialized);
      printTestData(numbers, serialized, ratio);
      expect(100 - ratio).to.be.above(0);
    });

    it("should correctly serialize and deserialize random 500", function () {
      const numbers = generateRandomNumbers(500);
      const serialized = serialize(numbers);
      const deserialized = deserialize(serialized);

      expect(deserialized).to.deep.equal(numbers);
      const ratio = compressionRatio(numbers, serialized);
      printTestData(numbers, serialized, ratio);
      expect(100 - ratio).to.be.above(0);
    });

    it("should correctly serialize and deserialize random 1000", function () {
      const numbers = generateRandomNumbers(1000);
      const serialized = serialize(numbers);
      const deserialized = deserialize(serialized);

      expect(deserialized).to.deep.equal(numbers);
      const ratio = compressionRatio(numbers, serialized);
      printTestData(numbers, serialized, ratio);
      expect(100 - ratio).to.be.above(0);
    });
  });

  describe("edge case - number of digits", function () {
    it("should correctly serialize and deserialize edge case with all 1s", function () {
      const numbers = [...Array(9)].map((_, idx) => idx + 1);
      const serialized = serialize(numbers);
      const deserialized = deserialize(serialized);

      expect(deserialized).to.deep.equal(numbers);
      const ratio = compressionRatio(numbers, serialized);
      printTestData(numbers, serialized, ratio);
      expect(100 - ratio).to.be.above(0);
    });

    it("should correctly serialize and deserialize edge case with all 2-digit numbers", function () {
      const numbers = [...Array(100)].map((_, idx) => idx).splice(10);
      const serialized = serialize(numbers);
      const deserialized = deserialize(serialized);

      expect(deserialized).to.deep.equal(numbers);
      const ratio = compressionRatio(numbers, serialized);
      printTestData(numbers, serialized, ratio);
      expect(100 - ratio).to.be.above(0);
    });

    it("should correctly serialize and deserialize edge case with all 3-digit numbers", function () {
      const numbers = [...Array(301)].map((_, idx) => idx).splice(100);
      const serialized = serialize(numbers);
      const deserialized = deserialize(serialized);

      expect(deserialized).to.deep.equal(numbers);
      const ratio = compressionRatio(numbers, serialized);
      printTestData(numbers, serialized, ratio);
      expect(100 - ratio).to.be.above(0);
    });
  });
});

describe("edge case - number of digits", function () {
  it("should correctly serialize and deserialize every number 3 times (900 numbers) ", function () {
    const numbers = Array.from({ length: 300 }, (_, k) => [
      k + 1,
      k + 1,
      k + 1,
    ]).flat();
    const serialized = serialize(numbers);
    const deserialized = deserialize(serialized);

    expect(deserialized).to.deep.equal(numbers);
    const ratio = compressionRatio(numbers, serialized);
    printTestData(numbers, serialized, ratio);
    expect(100 - ratio).to.be.above(0);
  });
});
