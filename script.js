const displayText = document.querySelector('.display-title');

const draggables = document.querySelectorAll('.bill');

const dropzone = document.getElementById('dropzone');
const acceptro = document.querySelector('.acceptor-led');

const rect = dropzone.getBoundingClientRect();
const rectLeft = rect.left;
const rectRight = rect.right;
const rectTop = rect.top;
const rectBottom = rect.bottom;


let coffeeBtn = document.querySelectorAll('.coffee-button')
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
    let btn = event.target.closest('.coffee-button');
    
    if(!btn) {
        return
    } 


    selectCoffe = btn.dataset.name;
    coffePrice = btn.dataset.price;
 

    displayText.textContent = `Вы выбрали кофе ${selectCoffe}, цена ${coffePrice}`;

    if(balance >=  coffePrice) {
      	startCoffee()
    } else {
		let paragraph = document.createElement('p')
    	paragraph.textContent = "Пожалуйста внесите сумму в купюроприемник"
    	displayText.append(paragraph)
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

    if(event.pageX > rectLeft && event.pageX < rectRight && event.pageY > rectTop + 50 && event.pageY < rectBottom + 70) {
      curMoney.style.display = 'none'

      displayText.textContent = `Ваш баланс пополнен на ${curMoney.dataset.value}  €`
      acceptro.style.background = "green"

      setTimeout(() => {
        
        balance += Number(curMoney.dataset.value)
		console.log('Внес деньги', balance)
        displayText.textContent = `Ваш баланс ${balance} €`
        let text = document.createElement('p')
        text.textContent = "Выберите кофе"
        displayText.append(text)
      }, 1000)

      setTimeout(() => {
        acceptro.style.background = '#f1c27d'
      }, 1000)

      over.addEventListener('click', () => {
		
		setTimeout(() => {
        	displayText.textContent = `Ваша сдача составляет ${balance} €`
			console.log('Возврат сдачи', balance)
      }, 1000)
		
      setTimeout(() => {
                      displayText.textContent = " "
                      balance = 0;
					  console.log('баланс очищен')
                      coffePrice = null;
                      selectCoffe = null;
                  }, 5000)
        
      })
    }
  };

  curMoney.ondragstart = function() {
  return false;
  };

}

  })
})


function startCoffee () {
	indecator.classList.toggle('active');

	coffeeBtn.forEach(btn => {
		btn.disabled = true

		setTimeout(() => {
			btn.disabled = false
		}, 11000);
	} )
	

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
              
            	displayText.textContent = `Ваш кофе готов, ваш баланс ${balance} €`
              	let changeText = document.createElement('p')
            	changeText.textContent = "Пожалуйста нажмите на кнопку чтобы вернуть сдачу"
				displayText.append(changeText)
                indecator.classList.remove('active')
                indecator.style.transition = '1s'
            }, 11000) 

			balance = balance - coffePrice
            
      }
}
