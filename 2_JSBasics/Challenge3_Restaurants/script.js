var bills = [124, 48, 268];

var calculateTip = function (price) {
    if (price < 50) {
        return price * 0.2;
    } else if (price > 200) {
        return price * 0.1;
    } else {
        return price * 0.15;
    }
};

var tips = [calculateTip(bills[0]), calculateTip(bills[1]), calculateTip(bills[2])];
var totals = [bills[0] + tips[0], bills[1] + tips[1], bills[2] + tips[2]];

console.log(tips);
console.log(totals);