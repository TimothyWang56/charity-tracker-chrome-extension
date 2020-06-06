'use strict';

let balance = document.getElementById('balance');
let moneyInput = document.getElementById('moneyInput');
let addToFundsButton = document.getElementById('addToFundsButton');

function updateBalanceDisplay() {
    chrome.storage.sync.get('balance', function(data) {
        balance.innerHTML = data.balance;
    });
}

updateBalanceDisplay();

function isValidFloat(str) {
    return (/^-?[\d]*(\.[\d]+)?$/g).test(str);
}

addToFundsButton.onclick = function() {
    const amountToAddStr = moneyInput.value;
    if (isValidFloat(amountToAddStr)) {
        const amountToAdd = Math.round(parseFloat(amountToAddStr) * 100)/100;
        chrome.storage.sync.get('balance', function(data) {
            let newBalance = Math.round((data.balance + amountToAdd)*100)/100;
            chrome.storage.sync.set({balance: newBalance}, function() {
                updateBalanceDisplay();
                moneyInput.value = "";
            });
        });
    } else {
        chrome.extension.getBackgroundPage().console.log('not correct format for a number')
        moneyInput.value = "";
    }
}
