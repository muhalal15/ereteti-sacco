// Simple tests for the delivery checks in js/main.js (JS Lab 3, Step 4).
// Results are printed to the browser console on deliveries.html.

function runTests() {
    var cases = [
        ["member ER-0001 is accepted", checkMemberNumber("ER-0001").ok === true],
        ["member 123 is rejected", checkMemberNumber("123").ok === false],
        ["empty member number is rejected", checkMemberNumber("").ok === false],
        ["5.5 litres is accepted", checkLitres("5.5").ok === true],
        ["0 litres is rejected", checkLitres("0").ok === false],
        ["abc litres is rejected", checkLitres("abc").ok === false],
        ["80 litres is rejected as too high", checkLitres("80").ok === false],
        ["empty litres is rejected", checkLitres("").ok === false]
    ];
    var passed = 0;
    for (var i = 0; i < cases.length; i++) {
        if (cases[i][1]) {
            passed++;
            console.log("PASS: " + cases[i][0]);
        } else {
            console.log("FAIL: " + cases[i][0]);
        }
    }
    console.log("Tests: " + passed + " of " + cases.length + " passed.");
}

document.addEventListener("DOMContentLoaded", runTests);
