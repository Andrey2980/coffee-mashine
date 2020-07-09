"usestrict";
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