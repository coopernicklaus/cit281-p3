function coinCombo(amount) {
  const combos = [];
  for (let q = 0; q <= Math.floor(amount / 25); q++) {
    for (let d = 0; d <= Math.floor((amount - 25 * q) / 10); d++) {
      for (let n = 0; n <= Math.floor((amount - 25 * q - 10 * d) / 5); n++) {
        let p = amount - 25 * q - 10 * d - 5 * n;
        combos.push({ quarters: q, dimes: d, nickels: n, pennies: p });
      }
    }
  }
  return {
    amount,
    combinations: combos,
    totalCombinations: combos.length,
  };
}

function coinValue(coinCounts) {
  const {
    pennies = 0,
    nickels = 0,
    dimes = 0,
    quarters = 0,
    halves = 0,
    dollars = 0,
  } = coinCounts;

  const totalCents =
    pennies * 1 +
    nickels * 5 +
    dimes * 10 +
    quarters * 25 +
    halves * 50 +
    dollars * 100;

  return {
    coins: { pennies, nickels, dimes, quarters, halves, dollars },
    totalCents,
    totalDollars: (totalCents / 100).toFixed(2),
  };
}

module.exports = {
  coinCombo,
  coinValue,
};

// ----------------------------
// Manual Test Cases
// ----------------------------
if (require.main === module) {

  console.log('\n===== Manual Tests for coinCombo() =====');
  const testCombo1 = coinCombo(5);
  console.log(`Test 1 - coinCombo(5)`);
  console.log(`Expected combinations > 0, Actual: ${testCombo1.totalCombinations}`);
  console.log('Sample:', testCombo1.combinations.slice(0, 3));

  const testCombo2 = coinCombo(0);
  console.log(`\nTest 2 - coinCombo(0)`);
  console.log(`Expected: 1 combination with all zeros`);
  console.log('Actual:', testCombo2.combinations);

  const testCombo3 = coinCombo(-5);
  console.log(`\nTest 3 - coinCombo(-5)`);
  console.log(`Expected: 0 combinations`);
  console.log('Actual:', testCombo3.totalCombinations);


  console.log('\n===== Manual Tests for coinValue() =====');
  const testValue1 = coinValue({ pennies: 4, nickels: 1, dimes: 2, quarters: 1, halves: 0, dollars: 1 });
  console.log(`Test 1 - coinValue({4p,1n,2d,1q,0h,1$})`);
  console.log(`Expected cents: 4 + 5 + 20 + 25 + 0 + 100 = 154`);
  console.log('Actual:', testValue1.totalCents, `($${testValue1.totalDollars})`);

  const testValue2 = coinValue({});
  console.log(`\nTest 2 - coinValue({})`);
  console.log(`Expected: 0 cents`);
  console.log('Actual:', testValue2.totalCents, `($${testValue2.totalDollars})`);

  const testValue3 = coinValue({ pennies: '10', nickels: '2', dollars: '1' });
  console.log(`\nTest 3 - coinValue(string inputs)`);
  console.log(`Expected: 10 + 10 + 100 = 120`);
  console.log('Actual:', testValue3.totalCents, `($${testValue3.totalDollars})`);
}