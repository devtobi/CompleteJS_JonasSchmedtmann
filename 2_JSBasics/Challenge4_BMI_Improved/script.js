var john = {
    name: "John Johnson",
    mass: "150",
    height: "1.65",
    calcBMI: function () {
        this.bmi = this.mass / this.height ^ 2;
        return this.bmi;
    }
};

var mark = {
    name: "Mark Markson",
    mass: "55",
    height: "2.00",
    calcBMI: function () {
        this.bmi = this.mass / this.height ^ 2;
        return this.bmi;
    }
}

mark.calcBMI();
john.calcBMI();

if (mark.bmi > john.bmi) {
    console.log("Mark has a higher BMI (" + mark.bmi + ")");
} else if (john.bmi > mark.bmi) {
    console.log("John has a higher BMI (" + john.bmi + ")");
} else {
    console.log("Mark and John both have the BMI of " + mark.bmi);
}