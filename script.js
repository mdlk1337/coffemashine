const displayText = document.querySelector('.display-title');

const bill = document.querySelectorAll('.bill');

const dropzone = document.getElementById('dropzone');
const acceptro = document.querySelector('.acceptor-led');

const dropzoneRect = dropzone.getBoundingClientRect();
const dropzoneRectLeft = dropzoneRect.left;
const dropzoneRectRight = dropzoneRect.right;
const dropzoneRectTop = dropzoneRect.top;
const dropzoneRectBottom = dropzoneRect.bottom;


let coffeeBtn = document.querySelectorAll('.coffee-button')
let coffeeBtns = document.querySelector('.coffee-buttons');
let coffeeName = document.querySelectorAll('.coffee-name');
let change = document.querySelector('.over');
let indecator = document.querySelector('.indecator');
let coffeeImg = document.querySelector('.coffee');


let coffeePrices = document.querySelectorAll('.coffee-price');
let coffeePrice = null;
let selectCoffee = null;
let balance = 0;

coffeeBtns.addEventListener('click', (event) => {
    let btn = event.target.closest('.coffee-button');

    if (!btn) {
        return
    }

    selectCoffee = btn.dataset.name;
    coffeePrice = btn.dataset.price;


    displayText.textContent = `Вы выбрали кофе ${selectCoffee}, цена ${coffeePrice}`;

    if (balance >= coffeePrice) {
        startCoffee()
    } else {
        let paragraph = document.createElement('p')
        paragraph.textContent = "Пожалуйста внесите сумму в купюроприемник"
        displayText.append(paragraph)
    }
})

bill.forEach((money) => {

    money.addEventListener('mouseover', (event) => {
        let currentBill = event.currentTarget;
        currentBill.onmousedown = (event) => {
            currentBill.style.position = 'absolute';
            currentBill.style.zIndex = 1000;
            currentBill.style.transform = 'rotate(90deg)'

            moveAt(event.pageX, event.pageY);

            function moveAt(pageX, pageY) {
                currentBill.style.left = pageX - currentBill.offsetWidth / 2 + 'px'
                currentBill.style.top = pageY - currentBill.offsetHeight / 2 + 'px'
            }

            function onMouseMove(event) {
                moveAt(event.pageX, event.pageY)
            }

            document.addEventListener('mousemove', onMouseMove);

            currentBill.onmouseup = (event) => {

                document.removeEventListener('mousemove', onMouseMove);
                currentBill.onmouseup = null;

                if (event.pageX > dropzoneRectLeft && event.pageX < dropzoneRectRight && event.pageY > dropzoneRectTop + 50 && event.pageY < dropzoneRectBottom + 70) {
                    currentBill.style.display = 'none'

                    displayText.textContent = `Ваш баланс пополнен на ${currentBill.dataset.value}  €`
                    acceptro.style.background = "green"

                    setTimeout(() => {

                        balance += Number(currentBill.dataset.value)
                        console.log('Внес деньги', balance)
                        displayText.textContent = `Ваш баланс ${balance} €`
                        let text = document.createElement('p')
                        text.textContent = "Выберите кофе"
                        displayText.append(text)
                    }, 1000)

                    setTimeout(() => {
                        acceptro.style.background = '#f1c27d'
                    }, 1000)

                    change.addEventListener('click', () => {

                        setTimeout(() => {
                            displayText.textContent = `Ваша сдача составляет ${balance} €`
                            console.log('Возврат сдачи', balance)
                        }, 1000)

                        setTimeout(() => {
                            displayText.textContent = " "
                            balance = 0;
                            console.log('баланс очищен')
                            coffeePrice = null;
                            selectCoffee = null;
                        }, 5000)

                    })
                }
            };

            currentBill.ondragstart = function () {
                return false;
            };

        }

    })
})


function startCoffee() {
    indecator.classList.toggle('active');

    coffeeBtn.forEach(btn => {
        btn.disabled = true

        setTimeout(() => {
            btn.disabled = false
        }, 11000);
    })


    let textCoffeeReady = document.createElement('p');
    textCoffeeReady.textContent = 'Ваш кофе готовиться, ожидайте'
    displayText.append(textCoffeeReady)


    if (selectCoffee !== null) {
        coffeeImg.animate([

            { opacity: 0 },
            { opacity: 1 }
        ],
            {
                duration: 11000,
                easing: 'ease-in-out'
            });

        setTimeout(() => {

            displayText.textContent = `Ваш кофе готов, ваш баланс ${balance} €`
            let changeText = document.createElement('p')
            changeText.textContent = "Пожалуйста нажмите на кнопку чтобы вернуть сдачу"
            displayText.append(changeText)
            indecator.classList.remove('active')
            indecator.style.transition = '1s'
        }, 11000)

        balance = balance - coffeePrice

    }
}
