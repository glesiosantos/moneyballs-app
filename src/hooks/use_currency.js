export default function useCurrency (amount) {
  let posNegSymbol = ''

  if(amount > 0) posNegSymbol = '+'
  else if(amount < 0) posNegSymbol = '-'

  const amountPositive = Math.abs(amount)

  const amountFormat = amountPositive.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximunFrationDigits: 2
  })

  return `${posNegSymbol} R$ ${amountFormat}`
}
