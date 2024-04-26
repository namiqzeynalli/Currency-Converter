const currencyBtnsOne = document.querySelectorAll(".currencyBtnsOne div");
const currencyBtnsTwo = document.querySelectorAll(".currencyBtnsTwo div");
const leftP = document.querySelector(".left-p");
const rightP = document.querySelector(".right-p");
const rightInput = document.querySelector(".currencyValueRight");
const leftInput = document.querySelector(".currencyValueLeft");
const body = document.querySelector("body");
let rightActiveBtn = "USD";
let leftActiveBtn = "RUB";

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
