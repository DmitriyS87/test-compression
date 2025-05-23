# Compression Serialization Test

This project implements a compression serialization algorithm for an array of integers within the range of 1 to 300. 

## Original task description

There is a set (an array where order is not important) of integers in the range from 1 to 300.
The number of integers is up to 1000. Write a serialization/deserialization function to a string so that the resulting string is compact.
The goal of the task is to maximize data compression compared to simple serialization without using a compression algorithm (at least 50% on average).
The serialized string must contain only ASCII characters. Any programming language can be used.
Along with the solution, provide a set of tests - the original string, the compressed string, and the compression ratio.
Test examples: simple short cases, random sets - 50 numbers, 100 numbers, 500 numbers, 1000 numbers, boundary cases - all single-digit numbers, all two-digit numbers, all three-digit numbers, three occurrences of each number - a total of 900 numbers.

### russian translation

Есть множество (массив, где порядок не важен) целых чисел в диапазоне от 1 до 300. 
Количество чисел - до 1000. Напишите функцию сериализации / десериализации в строку, чтобы итоговая строка была компактной.
Цель задачи - максимально сжать данные относительно простой сериализации без алгоритма сжатия (хотя бы 50% в среднем). 
Сериализованная строка должна содержать только ASCII символы. Можно использовать любой язык программирования.
Вместе с решением нужно прислать набор тестов  - исходная строка, сжатая строка, коэффициент сжатия.
Примеры тестов: простейшие короткие, случайные - 50 чисел, 100 чисел, 500 чисел, 1000 чисел, граничные - все числа 1 знака, все числа из 2х знаков, все числа из 3х знаков, каждого числа по 3 - всего чисел 900.


## Installation

To run this project, you will need Node.js installed on your machine. Follow these steps to set up the project:

1. Clone the repository:

   ```bash
   git clone git@github.com:DmitriyS87/test-compression.git
   cd test-compression
   ```

2. Install dependencies:

   ```bash
    npm install
   ```

3. Run predefined tests:
   ```bash
    npm run test
   ```

4. Run to use custom input in console:
   ```bash
    npm run start
   ```



