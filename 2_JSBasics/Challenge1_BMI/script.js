var markHeight = prompt("How tall is Mark in meters?");
var markWeight = prompt("How much does Mark weight in kilograms?");

var johnHeight = prompt("How tall is John in meters?");
var johnWeight = prompt("How much does John weight in kilograms?");

var markBMI = markWeight / markHeight ^ 2;
var johnBMI = johnWeight / johnHeight ^ 2;

var markHigherBMI = markBMI > johnBMI;

console.log("Is Mark's BMI higher than John's?" + markHigherBMI);