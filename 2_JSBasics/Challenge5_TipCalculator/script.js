var johnBills = {
    bills: [40, 3, 4.5, 10, 40],
    tips: [],
    totals: [],
    calculateTip: function () {
        for (var i = 0; i < this.bills.length; i++) {
            var bill = this.bills[i];
            var rate;
            if (bill < 50) {
                rate = 0.2;
            } else if (bill > 200) {
                rate = 0.1;
            } else {
                rate = 0.15;
            }
            var tip = bill * rate;
            this.tips.push(tip);
            this.totals.push(bill + tip);
        }
    }
}

var markBills = {
    bills: [2.5, 200, 18, 32, 3],
    tips: [],
    totals: [],
    calculateTip: function () {
        for (var i = 0; i < this.bills.length; i++) {
            var bill = this.bills[i];
            var rate;
            if (bill < 100) {
                rate = 0.2;
            } else if (bill > 300) {
                rate = 0.25;
            } else {
                rate = 0.10;
            }
            var tip = bill * rate;
            this.tips.push(tip);
            this.totals.push(bill + tip);
        }
    }
}

var calculateAverageTip = function (tips) {
    var total = 0;
    var amount = tips.length;
    for (var i = 0; i < amount; i++) {
        total += tips[i];
    }
    return total / amount;
}

johnBills.calculateTip();
markBills.calculateTip();

var averageJohn = calculateAverageTip(johnBills.tips);
var averageMark = calculateAverageTip(markBills.tips);

if (averageJohn > averageMark) {
    console.log("John's family paid higher tips with an average of " + averageJohn);
} else if (averageMark > averageJohn) {
    console.log("Mark's family paid higher tips with an average of " + averageMark);
} else {
    console("They have the same average tip of " + averageJohn);
}