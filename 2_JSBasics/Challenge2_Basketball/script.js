var johnScore = (89 + 120 + 90) / 3;
var mikeScore = (116 + 94 + 123) / 3;
var maryScore = (97 + 134 + 105) / 3;

if (johnScore > mikeScore && johnScore > maryScore) {
    console.log("The winner is John with an average of " + johnScore);
} else if (mikeScore > johnScore && mikeScore > maryScore) {
    console.log("The winner is Mike with an average of " + mikeScore);
} else if (maryScore > johnScore && maryScore > mikeScore) {
    console.log("The winner is Mary with an average of " + maryScore);
}
