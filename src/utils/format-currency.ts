export function formatCurrency(money: number) {
  const dollarFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return dollarFormat.format(money)
}