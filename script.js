const displayText = document.querySelector('.display-title');

const draggables = document.querySelectorAll('.bill');

const dropzone = document.getElementById('dropzone');
const acceptro = document.querySelector('.acceptor-led');

let rect = dropzone.getBoundingClientRect();
let rectLeft = rect.left;
let rectRight = rect.right;
let rectTop = rect.top;
let rectBottom = rect.bottom;



let coffeBtns = document.querySelector('.coffee-buttons');
let coffeName = document.querySelectorAll('.coffee-name');
let over = document.querySelector('.over');
let indecator = document.querySelector('.indecator');
let coffeeImg = document.querySelector('.coffee');


let coffePrices = document.querySelectorAll('.coffee-price');
let coffePrice = null;
let selectCoffe = null;
let balance = 0;

coffeBtns.addEventListener('click', (event) => {
    let btn = event.target.closest('.coffee-button')
    
    if(!btn) {
        return
    } 


    selectCoffe = btn.dataset.name
    coffePrice = btn.dataset.price
 

    displayText.textContent = `Вы выбрали кофе ${selectCoffe}, цена ${coffePrice}`

    if(balance === 0) {
      let paragraph = document.createElement('p')
    paragraph.textContent = "Пожалуйста внесите сумму в купюроприемник"
    displayText.append(paragraph)
    }
    

    if(balance === 0) {
      return
    }else {
      indecator.classList.toggle('active');

      let textCoffeeReady = document.createElement('p');
      textCoffeeReady.textContent = 'Ваш кофе готовиться, ожидайте'
      displayText.append(textCoffeeReady)
      

      if(selectCoffe !== null) {
        coffeeImg.animate([
            
            { opacity: 0 }, 
            { opacity: 1 }
            ], 
            {
            
            duration: 11000, 
            easing: 'ease-in-out'
            });
            
            setTimeout(() => {
              
              displayText.textContent = "Ваш кофе готов до свидания"
                  setTimeout(() => {
                      displayText.textContent = " "
                      balance = 0;
                      coffePrice = null;
                      selectCoffe = null;
                  }, 2000)
                  indecator.classList.remove('active')
                  indecator.style.transition = '1s'
            }, 11000) 
      }
    }
})

draggables.forEach((money) => {

    money.addEventListener('mouseover', (moneyC) => {

      let curMoney = moneyC.currentTarget;


      curMoney.onmousedown = (event) => {
  
  curMoney.style.position = 'absolute';
  curMoney.style.zIndex = 1000;
  curMoney.style.transform = 'rotate(90deg)'

  moveAt(event.pageX, event.pageY);

  function moveAt(pageX, pageY) {
    curMoney.style.left = pageX - curMoney.offsetWidth / 2 + 'px'
    curMoney.style.top = pageY - curMoney.offsetHeight / 2 + 'px'
  }

   function onMouseMove(event) {
    moveAt(event.pageX, event.pageY)
  }
  
  document.addEventListener('mousemove', onMouseMove);

  curMoney.onmouseup = (event)  => {

    document.removeEventListener('mousemove', onMouseMove);
    curMoney.onmouseup = null;

    if(selectCoffe === null) {
    displayText.textContent = 'Пожалуйста сначала выберите кофе';
    return
  }

    if(event.pageX > rectLeft && event.pageX < rectRight && event.pageY > rectTop + 50 && event.pageY < rectBottom + 70) {
      curMoney.style.display = 'none'

      displayText.textContent = `Ваш баланс пополнен на ${curMoney.dataset.value}  €`
      acceptro.style.background = "green"

      setTimeout(() => {
        
        balance += Number(curMoney.dataset.value)
        displayText.textContent = `Ваш баланс ${balance} €`
        let text = document.createElement('p')
        text.textContent = "Выберите кофе"
        displayText.append(text)
      }, 2000)

      setTimeout(() => {
        acceptro.style.background = '#f1c27d'
      }, 1000)

      over.addEventListener('click', () => {

        if(selectCoffe === null) {
          displayText.textContent = 'Пожалуйста выберите кофе'
        }

        if(coffePrice === null) {
          return
        }

        setTimeout(() => {
        let order = balance - coffePrice
        displayText.textContent = `Ваша сдача составляет ${order} €`
      }, 1000)
        
      })
    }
  };

  curMoney.ondragstart = function() {
  return false;
  };

}

  })
})

