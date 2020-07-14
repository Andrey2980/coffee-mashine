"use strict";
let state = "waiting"; // "cooking" "ready"
let balance = document.querySelector(".balance"); // Объявляем функционал строчке баланс
let cup = document.querySelector(".cup img"); 


function cookCoffee(name, price,elem) { // выычисляем баланс после нажатия на кнопку выбора кофе ,elem вызывает начало цикла передачи картирнки!!!
  if (state != "waiting") { // если состояние кофе машины не ожидание то return (let state = "waiting";- обращение к глобальной переменной )
    return;
  }
  if (balance.value >= price) {
    
    balance.style.backgroundColor = "";
    balance.value -= price;
    changeDisplayText(`Ваш ${name} готовится`);
    
    console.log(elem); // возвращаем this у картинки при выборе конкретного напитка на кофемашине в index.php 
    let coffeeImg = elem.querySelector("img"); // берем конкретную картинку определенную elem
    console.log(coffeeImg);
    let coffeeSrc = coffeeImg.getAttribute("src"); // обращение к методу src картинки с
    console.log(coffeeSrc);
    console.log(coffeeImg.src);
    
    startCooking(name, coffeeSrc);
  } else {
    changeDisplayText("Недостаточно средств");// колличество символов вывода ограничено function changeDisplayText(text) 
    balance.style.backgroundColor = "rgb(255, 50, 50)";
    
  }
}
// Планирование setTimeout(func. ms) - отрабатывает один раз
// setInterval(func. ms) - отрабатывает пока не отключат
// Let timeout = setTimeout(func. ms)
// Let interval =setInterval(func. ms) 
//clearTimeout(timeout)
//clearInterval(interval)
function startCooking(name, src) { // Управление элементом бегунка готовности напитка
 /* let progressBar = document.querySelector(".progress-bar");  - передали в function changeProgressPercent(percent)*/
  let cup = document.querySelector(".cup img"); // забираем конкретное фотот кружки
  cup.setAttribute("src", src); // Замена картинки при выборе напитка, как получали картинки???
  cup.style.display = "inline"; // подключаем изображение центральной кружки к функционалу
  let t = 0;
  let cookingInterval = setInterval(() => { // Короткая запись движения бегунка готовности функция стрелки Function() {}
    t++;
    cup.style.opacity = t + "%"; // управление opacity картинки центральной кружки
    /*progressBar.style.width = t + "%";*/ // интервал от 0 до 100 (0,....10)+1 (управляем масштабом прогрессбара (там где стоит комент отключии масштаб - передали в function changeProgressPercent(percent)*)
    changeProgressPercent(t); // соединяем бегунок с процентом готовности напитка
    console.log(t);
    if (t == 100){ 
      state = "ready";
      clearInterval(cookingInterval); // сверка интервала  с "t"
      changeDisplayText(`Ваш ${name} готов!`); // меняем надпись при достижении  "t" значения 100
      cup.style.cursor = "pointer";
      cup.onclick = function() { // Управление функционалом плучения готового кофе
        takeCoffee();
      };
      
    }
  }, 50);
}

function takeCoffee(){ // Управление функционалом плучения готового кофе
 /* alert("Забрали коф");*/
 if (state != "ready") {
   return;
 }
 state = "waiting"; // сброс значения в состоянии ожидания
 changeProgressPercent(0);
 cup.style.opacity = 0;
 cup.style.display = "";
 cup.style.cursor = "";
 changeDisplayText ("Выберите кофе");
 cup.onclick = null; // сброс события после получения напитка
}

/*Внедрение имеющегося функционала для избежания доблирования кода*/
function changeProgressPercent(percent) {  // управление прогресбаром в процентах
  let progressBar = document.querySelector(".progress-bar");
  progressBar.style.width = percent + "%";
}

function changeDisplayText(text) {
  if (text.length > 50) {
    text = text.slice(0, 20) + "...";
  }
  let displayText = document.querySelector(".display span"); // передаем парамиетры достаточности средств во вкладку выберите кофе
  displayText.innerHTML = text;
}

//_______________________________________________/*Drag'n'Drop*/___________________________________________

//Учим купюру перемащаться в купюроприемник

let money = document.querySelectorAll(".money img");

for (let i = 0; i<money.length; i++) {  //получаем свойство купюр и передаем сразу на три купюры
  money[i].onmousedown = takeMoney;
  
  // for(let i = 0; i < money.length; i++) {
  // money[i].onclick = takeMoney;
  //}
 
}

// В функцию, которая присвоена событию, первым параметром передается оюъектссобытия - event,


function takeMoney(event) {
  event.preventDefault(); // Отключение тени купюры ...???
  /*console.log(this);    //  когда this присваетвается через атрибут onclick ( образуется функция обертка) - в даннослучае this получен из свойства onmousedown события takeMoney передается this  на событие которое совершено... 
  console.log(event); 
  console.log([event.target, event.clientX, event.clientY]);*/ 
  let bill = this;
              // Вытаскиваем купюру их дом дерева (absolut, relative, fixed) - координаты определяем относительно точек отсчета каждого метода
  // получаем всю информацию о местоположении элемента
 /* console.log( bill.style.height);
  console.log(  bill.style.width);  -  это не работает*/
  console.log( bill.getBoundingClientRect());
  
  let billCoords = bill.getBoundingClientRect(); //Обьявление переменной позволяющей осуществлять записи действий клиента (привязка по курсору)
  
  let billHeight = billCoords.height;
  let billWidth = billCoords.width;
  
  bill.style.position = "absolute";
  if (!bill.style.transform) {
    bill.style.top = (event.clientY - billHeight/2) + "px"; // якорь картинок верхний левый угол переопределяем привязку курсора
    bill.style.left = (event.clientX - billWidth/2)  + "px";
    bill.style.transform = "rotate(90deg)"; // Поворот купюры  метод - transform 
  } else {
    bill.style.top = (event.clientY - billWidth/2) + "px"; // якорь картинок верхний левый угол переопределяем привязку курсора
    bill.style.left = (event.clientX - billHeight/2)  + "px";
  } 
  bill.style.transmition ="transform .3s"; //Анимация поворота купюры 
 
 window.onmousemove = function(event) {    // определяем систему оттсчета местоположения курсора сетка по размеру окна
   /*console.log([event.clientX, event.clientY]);*/
   let billCoords = bill.getBoundingClientRect(); //Обьявление переменной позволяющей осуществлять записи действий клиента (привязка по курсору)
   let billHeight = billCoords.height;
   let billWidth = billCoords.width;
   bill.style.top = (event.clientY - billWidth/2) + "px"; // привязка купюры к курсору 
   bill.style.left = (event.clientX - billHeight/2)  + "px";//
 }
 
 bill.onmouseup = function () {  // отвязка купюры от курсора при отжатии правой кнопки мыши купюра отваливается  
   window.onmousemove = null;
  // console.log ( inAtm(bill) );
  if ( inAtm(bill) ) {
    let cashContainer = document.querySelector(".cash-container");
    bill.style.position = "";
    bill.style.transform = "rotate(90deg) translateX(25%)";
    
    cashContainer.append(bill); // Присоединение купюры к .cash-container
    bill.style.transition = "transform 1.5s"; // анимация заезжания купюры
    setTimeout(() => {
      bill.style.transform = "rotate(90deg) translateX(-75%)";
      bill.ontransitionend = () => { // удаление купюры после заезда
        balance.value = +balance.value + +bill.dataset.cost; // подключение события к строчке баланса
        bill.remove();
      }
    }, 10);
    /*console.log(bill.getAttribute("data-cost") );
    console.log( bill.dataset.cost );*/
    /*balance.value = +balance.value + +bill.dataset.cost;
    bill.remove();*/ //удаляем элемент
  }
 };
}

function inAtm(bill) {  //Находим и получаем координаты atm и купюр
  let atm = document.querySelector(".atm img");
  
  let atmCoords = atm.getBoundingClientRect(); // вычисление диапазона купюроприемника atm
  let atmLeftX = atmCoords.x;
  let atmRightX = atmCoords.x + atmCoords.width;
  let atmTopY = atmCoords.y;
  let atmBottomY = atmCoords.y + atmCoords.height/3;
  
  let billCoords = bill.getBoundingClientRect(); // вычисление диапазона купюры
  let billLeftX = billCoords.x;
  let billRightX = billCoords.x + billCoords.width;
  let billY = billCoords.y;
  if(
       billLeftX > atmLeftX
    && billRightX < atmRightX
    && billY > atmTopY
    && billY < atmBottomY
    ) {
    return true;
    } else {
    return false;
    }
}

// Получение сдачи, создание элементов с использованием JS
let changeButton = document.querySelector(".change-button"); // Привязка баланса к выдаче сдачи
changeButton.onclick = takeChange;

function takeChange() {
  /*console.log(balance.value);*/
  if (+balance.value >=10) {
    createCoin("10");
    balance.value -= 10; 
    return setTimeout(takeChange, 300);
  } else if (+balance.value >=5) {
    createCoin("5");
    balance.value -= 5; 
    return setTimeout(takeChange, 300);
  } else if (+balance.value >=2) {
    createCoin("2");
    balance.value -= 2; 
    return setTimeout(takeChange, 300);
  } else if (+balance.value >=1) {
    createCoin("1");
    balance.value -= 1; 
    return setTimeout(takeChange, 300);
  }
} 

function createCoin(cost) { 
  let coinSrc = "";
  switch (cost) {    // switch - case можно использовать только при равенстве
    case "10":
      coinSrc = "img/10rub.png";
      break;
    case "5":
      coinSrc = "img/5rub.png";
      break;
    case "2":
      coinSrc = "img/2rub.png";
      break; 
    case "1":
      coinSrc = "img/1rub.png";
      break;
    default:
      console.error("Такой монеты не существует");
      /*if (cost == "10") {
        //
      } else if (cost == "5") {
        //
      } else if (cost == "2") {
        
      } else*/
      // альтернативная запись
  }
  
  let changeBox = document.querySelector(".change-box");
  let coin = document.createElement("img");
  let changeBoxWith = changeBox.getBoundingClientRect().width;
  let changeBoxHeight = changeBox.getBoundingClientRect().height;
  coin.setAttribute("src", coinSrc);
  coin.style.width = "50px";
  coin.style.cursor = "pointer";
  coin.style.position = "absolute";//relative
  coin.style.top = Math.floor(Math.random() * (changeBoxHeight - 50)) + "px";
  coin.style.left = Math.floor(Math.random() * (changeBoxWith - 50)) + "px";
  changeBox.append(coin);            // Добавляет элемент в конец контейнера
  //changeBox.prepend(coin);        добавляет элемент в перед родительским
  //changeBox.after(coin);         Добавляет элемент после родительского
  //changeBox.before(coin);       Добавляет элемент до родительского
  //changeBox.replaceWith(coin); Заменяет родительский элемент
  coin.style.transition = "transform .5s, opasity .5s"; // Анимация падения монеток
  coin.style.transform = "translateY(-20%)";
  coin.style.transform = 0;
  setTimeout(() => {                             // Функция обертка
    coin.style.transform = "translateY(0%)";
    coin.style.opasity = 1;
  }, 10);                                    // При нуле работает не корректно
  
  coin.onclick = () => {
    coin.style.transform = "translateY(-20%)";
    coin.style.opasity = 0;
    coin.ontransitionend = () => {
      coin.remove();
    };
  };
  
}















