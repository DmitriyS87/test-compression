/*
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

describe("Compression tests: ", function () {
  describe("simple short arrays", function () {
    it("should correctly serialize and deserialize [0]", function () {
      const numbers = [1];
      const serialized = serialize(numbers);
      const deserialized = deserialize(serialized);

      expect(deserialized).to.deep.equal(numbers);
      const ratio = compressionRatio(numbers, serialized);
      expect(ratio).to.be.below(100);

      console.log(`Исходная строка: ${numbers}`);
      console.log(`Сжатая строка: ${serialized}`);
      console.log(`Коэффициент сжатия: ${ratio.toFixed(2)}%`);
    });

    it("should correctly serialize and deserialize [1, 2, 3]", function () {
      const numbers = [1, 2, 3];
      const serialized = serialize(numbers);
      const deserialized = deserialize(serialized);

      expect(deserialized).to.deep.equal(numbers);
      const ratio = compressionRatio(numbers, serialized);
      expect(ratio).to.be.below(100);

      console.log(`Исходная строка: ${JSON.stringify(numbers)}`);
      console.log(`Сжатая строка: ${serialized}`);
      console.log(`Коэффициент сжатия: ${ratio.toFixed(2)}%`);
    });

    it("should correctly serialize and deserialize array [300, 299, 298]", function () {
        const numbers = [300, 299, 298];
        const serialized = serialize(numbers);
        const deserialized = deserialize(serialized);
    
        expect(deserialized).to.deep.equal(numbers);
        const ratio = compressionRatio(numbers, serialized);
        expect(ratio).to.be.below(100);
    
        console.log(`Исходная строка: ${JSON.stringify(numbers)}`);
        console.log(`Сжатая строка: ${serialized}`);
        console.log(`Коэффициент сжатия: ${ratio.toFixed(2)}%`);
      });
  });

  describe("random arrays", function () {
    it("should correctly serialize and deserialize random 50", function () {
        const numbers = generateRandomNumbers(50);
        const serialized = serialize(numbers);
        const deserialized = deserialize(serialized);
    
        expect(deserialized).to.deep.equal(numbers);
        const ratio = compressionRatio(numbers, serialized);
        expect(ratio).to.be.below(100);
        
        console.log(`Исходная строка: ${JSON.stringify(numbers)}`);
        console.log(`Сжатая строка: ${serialized}`);
        console.log(`Коэффициент сжатия: ${ratio.toFixed(2)}%`);
    });

    it("should correctly serialize and deserialize random 100", function () {
        const numbers = generateRandomNumbers(100);
        const serialized = serialize(numbers);
        const deserialized = deserialize(serialized);
    
        expect(deserialized).to.deep.equal(numbers);
        const ratio = compressionRatio(numbers, serialized);
        expect(ratio).to.be.below(100);
        
        console.log(`Исходная строка: ${JSON.stringify(numbers)}`);
        console.log(`Сжатая строка: ${serialized}`);
        console.log(`Коэффициент сжатия: ${ratio.toFixed(2)}%`);
    });

    it("should correctly serialize and deserialize random 500", function () {
        const numbers = generateRandomNumbers(500);
        const serialized = serialize(numbers);
        const deserialized = deserialize(serialized);
    
        expect(deserialized).to.deep.equal(numbers);
        const ratio = compressionRatio(numbers, serialized);
        expect(ratio).to.be.below(100);
        
        console.log(`Исходная строка: ${JSON.stringify(numbers)}`);
        console.log(`Сжатая строка: ${serialized}`);
        console.log(`Коэффициент сжатия: ${ratio.toFixed(2)}%`);
    });

    it("should correctly serialize and deserialize random 1000", function () {
        const numbers = generateRandomNumbers(500);
        const serialized = serialize(numbers);
        const deserialized = deserialize(serialized);
    
        expect(deserialized).to.deep.equal(numbers);
        const ratio = compressionRatio(numbers, serialized);
        expect(ratio).to.be.below(100);
        
        console.log(`Исходная строка: ${JSON.stringify(numbers)}`);
        console.log(`Сжатая строка: ${serialized}`);
        console.log(`Коэффициент сжатия: ${ratio.toFixed(2)}%`);
    });
  });

  describe("edge case - number of digits", function () {
    it("should correctly serialize and deserialize edge case with all 1s", function () {
        const numbers = Array(1000).fill(1);
        const serialized = serialize(numbers);
        const deserialized = deserialize(serialized);
    
        expect(deserialized).to.deep.equal(numbers);
        const ratio = compressionRatio(numbers, serialized);
        expect(ratio).to.be.below(100);
    
        console.log(`Исходная строка: ${JSON.stringify(numbers)}`);
        console.log(`Сжатая строка: ${serialized}`);
        console.log(`Коэффициент сжатия: ${ratio.toFixed(2)}%`);
      });
    
      it("should correctly serialize and deserialize edge case with all 2-digit numbers", function () {
        const numbers = Array(1000).fill(99);
        const serialized = serialize(numbers);
        const deserialized = deserialize(serialized);
    
        expect(deserialized).to.deep.equal(numbers);
        const ratio = compressionRatio(numbers, serialized);
        expect(ratio).to.be.below(100);
    
        console.log(`Исходная строка: ${JSON.stringify(numbers)}`);
        console.log(`Сжатая строка: ${serialized}`);
        console.log(`Коэффициент сжатия: ${ratio.toFixed(2)}%`);
      });
    
      it("should correctly serialize and deserialize edge case with all 3-digit numbers", function () {
        const numbers = Array(1000).fill(299);
        const serialized = serialize(numbers);
        const deserialized = deserialize(serialized);
    
        expect(deserialized).to.deep.equal(numbers);
        const ratio = compressionRatio(numbers, serialized);
        expect(ratio).to.be.below(100);
    
        console.log(`Исходная строка: ${JSON.stringify(numbers)}`);
        console.log(`Сжатая строка: ${serialized}`);
        console.log(`Коэффициент сжатия: ${ratio.toFixed(2)}%`);
      });

      it("should correctly serialize and deserialize 900 numbers in the pattern [1, 10, 100]", function () {
        const numbers = Array.from({ length: 300 }, () => [1, 10, 100]).flat();
        const serialized = serialize(numbers);
        const deserialized = deserialize(serialized);
    
        expect(deserialized).to.deep.equal(numbers);
        const ratio = compressionRatio(numbers, serialized);
        expect(ratio).to.be.below(100);
    
        console.log(`Исходная строка: ${JSON.stringify(numbers)}`);
        console.log(`Сжатая строка: ${serialized}`);
        console.log(`Коэффициент сжатия: ${ratio.toFixed(2)}%`);
      });
  })
});
