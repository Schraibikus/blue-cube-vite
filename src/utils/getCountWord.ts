// служит для предоставления правильного окончания слов
export default function getCountWord(count: number): string {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return " товаров";
  }

  switch (lastDigit) {
    case 1:
      return " товар";
    case 2:
    case 3:
    case 4:
      return " товара";
    default:
      return " товаров";
  }
}
