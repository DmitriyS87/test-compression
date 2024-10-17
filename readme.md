# Compression Serialization Test Project

This project implements a compression serialization algorithm for an array of integers within the range of 1 to 300. 

## Original task

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



