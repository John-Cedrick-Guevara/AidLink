export function getTotalAmoaunt(funds: { id: string; amount: number }[] | null): number {
  if (!funds) return 0;
  return funds.reduce((acc, fund) => acc + fund.amount, 0);
}