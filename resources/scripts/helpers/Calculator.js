export function computeInterestPercentage(interest_rate, interest_type) {
  if(interest_type != 'percentage') {
    return interest_rate;
  }

  // interest rate / 100
  return Number(interest_rate) / 100;
}

export function computeProfit(computed_interest, months_to_pay) {
  // interest * months to pay
  return Number(computed_interest) * Number(months_to_pay);
}

export function computeInterest(amount_loan, interest_percentage, interest_type, interest_rate) {
  if(interest_type == 'percentage') {
    // amount loan * interest percentage
    return Number(amount_loan) * Number(interest_percentage);
  }

  return Number(interest_rate);
}

export function computePerMonth(condition, amount_loan, months_to_pay, computed_profit) {
  if(condition == 'interest-only'
  || condition == 'due-date-and-interest') {
    // per payment = (profit + loan amount) / months to pay
    return Number((Number(computed_profit) + Number(amount_loan)) /
          Number(months_to_pay));
  }

  return Number(amount_loan) /
    Number(months_to_pay);
}

export function computePerDay(computed_per_month) {
  // monthly / 30
  return Number(computed_per_month) / 30;
}

export function computePerHalfMonth(computed_per_month) {
  // monthly / 2
  return Number(computed_per_month) / 2;
}