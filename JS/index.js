const currencyBtnsOne = document.querySelectorAll(".currencyBtnsOne div");
const currencyBtnsTwo = document.querySelectorAll(".currencyBtnsTwo div");
const leftP = document.querySelector(".left-p");
const rightP = document.querySelector(".right-p");
const rightInput = document.querySelector(".currencyValueRight");
const leftInput = document.querySelector(".currencyValueLeft");
const body = document.querySelector("body");

let rightActiveBtn = "USD";
let leftActiveBtn = "RUB";

// document.addEventListener("DOMContentLoaded", () => {
//     fetch(`https://v6.exchangerate-api.com/v6/d12ed17fd48c78afe9ea00fb/latest/RUB`)
//         .then(res => res.json())
//         .then(data => {

//             const rubBtn = document.querySelector(".currencyBtnsOne div:first-child");
//             rubBtn.style.backgroundColor = "purple";
//             leftInput.value = "100"
//             rightInput.value = leftInput.value * data.conversion_rates.USD
//             leftP.textContent = `1 RUB = ${data.conversion_rates.USD} USD`
//             rightP.textContent = `1 USD = ${1 / data.conversion_rates.USD} RUB`
//             leftInput.addEventListener("input", () => {
//                 rightInput.value = leftInput.value * data.conversion_rates.USD;
//                 leftP.textContent = `1 RUB = ${data.conversion_rates.USD} USD`
//                 rightP.textContent = `1 USD = ${1 / data.conversion_rates.USD} RUB`

//             })
//             simulateClick(rubBtn);

//             const usdBtn = document.querySelector(".currencyBtnsTwo div:nth-child(2)");
//             usdBtn.style.backgroundColor = "purple";
//             simulateClick(usdBtn);

//         })
// });

// function simulateClick(element) {
//     const event = new MouseEvent('click', {
//         bubbles: true,
//         cancelable: true,
//         view: window
//     });
//     element.dispatchEvent(event);
// }


// currencyBtnsOne.forEach((leftBtn) => {
//     leftBtn.addEventListener("click", (e1) => {
//         currencyBtnsOne.forEach((left) => {
//             left.style.backgroundColor = "";
//         })
//         e1.target.style.backgroundColor = "purple";

//         fetch(`https://v6.exchangerate-api.com/v6/d12ed17fd48c78afe9ea00fb/latest/${e1.target.textContent}`)
//             .then(res => {
//                 if (res.ok) {
//                     return res.json();
//                 }
//                 else {
//                     throw new Error("Nə isə problem var.")
//                 }
//             })
//             .then(data => {
//                 currencyBtnsTwo.forEach((rightBtn) => {
//                     rightBtn.addEventListener("click", (e2) => {

//                         currencyBtnsTwo.forEach((right) => {
//                             right.style.backgroundColor = "";
//                         })
//                         e2.target.style.backgroundColor = "purple";
//                         rightInput.value = leftInput.value * data.conversion_rates[e2.target.textContent];
//                         leftP.textContent = `1 ${e1.target.textContent} = ${data.conversion_rates[e2.target.textContent]} ${e2.target.textContent}`
//                         rightP.textContent = `1 ${e2.target.textContent} = ${1 / data.conversion_rates[e2.target.textContent]} ${e1.target.textContent}`

//                         leftInput.addEventListener("input", () => {
//                             rightInput.value = leftInput.value * data.conversion_rates[e2.target.textContent];
//                             leftP.textContent = `1 ${e1.target.textContent} = ${data.conversion_rates[e2.target.textContent]} ${e2.target.textContent}`
//                             rightP.textContent = `1 ${e2.target.textContent} = ${1 / data.conversion_rates[e2.target.textContent]} ${e1.target.textContent}`
//                         })

//                     })
//                 })
//             })
//             .catch(error => {
//                 alert(error, "Nə isə problem var.");
//             })
//     })
// })


// currencyBtnsTwo.forEach((rightBtn) => {

//     rightBtn.addEventListener("click", (e1) => {
//         fetch(`https://v6.exchangerate-api.com/v6/d12ed17fd48c78afe9ea00fb/latest/${e1.target.textContent}`)
//             .then(res => {
//                 if (res.ok) {
//                     return res.json();
//                 }
//                 else {
//                     throw new Error("Nə isə problem var.")
//                 }
//             })
//             .then(data => {
//                 currencyBtnsOne.forEach((leftBtn) => {
//                     leftBtn.addEventListener("click", (e2) => {
//                         rightInput.value = leftInput.value / data.conversion_rates[e2.target.textContent];
//                         leftP.textContent = `1 ${e2.target.textContent} = ${1 / data.conversion_rates[e2.target.textContent]} ${e1.target.textContent}`
//                         rightP.textContent = `1 ${e1.target.textContent} = ${data.conversion_rates[e2.target.textContent]} ${e2.target.textContent}`

//                         leftInput.addEventListener("input", () => {
//                             rightInput.value = leftInput.value / data.conversion_rates[e2.target.textContent];
//                             leftP.textContent = `1 ${e2.target.textContent} = ${1 / data.conversion_rates[e2.target.textContent]} ${e1.target.textContent}`
//                             rightP.textContent = `1 ${e1.target.textContent} = ${data.conversion_rates[e2.target.textContent]} ${e2.target.textContent}`
//                         })
//                     })
//                 })
//             })
//             .catch(error => {
//                 alert(error, "Nə isə problem var.");
//             })
//     })
// })

const valueCalc = function (leftValue) {
    const leftActiveBtn = document.querySelector(".currencyBtnsOne .activeBtn")
    const rightActiveBtn = document.querySelector(".currencyBtnsTwo .activeBtn")

    if (leftActiveBtn.textContent !== rightActiveBtn.textContent) {
        fetch(`https://v6.exchangerate-api.com/v6/d12ed17fd48c78afe9ea00fb/latest/USD`)
            .then(res => res.json())
            .then(data => {
                let leftNum = data.conversion_rates[leftActiveBtn.textContent]
                let rightNum = data.conversion_rates[rightActiveBtn.textContent]
                rightInput.value = Math.round(((leftValue * rightNum) / leftNum) * 1000) / 1000
                leftP.textContent = `1 ${leftActiveBtn.textContent} = ${Math.round(((1 * rightNum) / leftNum) * 1000) / 1000} ${rightActiveBtn.textContent}`
                rightP.textContent = `1 ${rightActiveBtn.textContent} = ${Math.round(((1 * leftNum) / rightNum) * 1000) / 1000} ${leftActiveBtn.textContent}`
            })
    }
    else {
        rightInput.value = leftValue;
        leftP.textContent = `1 ${leftActiveBtn.textContent} = 1 ${leftActiveBtn.textContent}`
        rightP.textContent = `1 ${leftActiveBtn.textContent} = 1 ${leftActiveBtn.textContent}`
    }
}

currencyBtnsOne.forEach((leftBtn) => {
    leftBtn.addEventListener("click", (e) => {
        if (window.navigator.onLine) {
            const oldBtn = document.querySelector(".currencyBtnsOne .activeBtn")
            oldBtn.classList.remove("activeBtn")
            leftBtn.classList.add("activeBtn")
            if (leftActiveBtn !== document.querySelector(".currencyBtnsOne .activeBtn").textContent) {
                leftActiveBtn = document.querySelector(".currencyBtnsOne .activeBtn").textContent
                valueCalc(leftInput.value)
            }
        }
        else {
            body.style.display = "none"
            alert("Error Offline")
        }
    })
})

currencyBtnsTwo.forEach((rightBtn) => {
    rightBtn.addEventListener("click", (e) => {
        if (window.navigator.onLine) {
            const oldBtn = document.querySelector(".currencyBtnsTwo .activeBtn")
            oldBtn.classList.remove("activeBtn")
            rightBtn.classList.add("activeBtn")
            if (rightActiveBtn !== document.querySelector(".currencyBtnsTwo .activeBtn").textContent) {
                rightActiveBtn = document.querySelector(".currencyBtnsTwo .activeBtn").textContent
                valueCalc(leftInput.value)
            }
        }
        else {
            body.style.display = "none"
            alert("Error Offline")
        }
    })
})

leftInput.addEventListener("input", () => {
    if (window.navigator.onLine) {
        valueCalc(leftInput.value)
    }
    else {
        body.style.display = "none"
        alert("Error Offline")
    }
})
