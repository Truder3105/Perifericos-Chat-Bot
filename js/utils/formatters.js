export function formatCurrency(amount, currency) {
  try {
    const locale = currency === "COP" ? "es-CO" : "en-US";
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      maximumFractionDigits: currency === "COP" ? 0 : 0,
    }).format(amount);
  } catch {
    return `${amount} ${currency}`;
  }
}

export function usdToCop(usd, rate) {
  return Math.round(Number(usd) * Number(rate));
}

export function priceTag({ usd, rate }) {
  const usdN = Number(usd);
  const copN = usdToCop(usdN, rate);
  return {
    usd: formatCurrency(usdN, "USD"),
    cop: formatCurrency(copN, "COP"),
    copValue: copN,
  };
}
