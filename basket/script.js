 
 //  Task 10 ============================================
 //  Проект. Дана переменная card - корзина. Добавьте кнопку b-10 и функцию t10, которые сохраняют card в LS.*/
 const card = {
     'apple': 3,
     'grape': 2
 };

 function t10() {
     localStorage.setItem("card", JSON.stringify(card));
 }

 function refresh() {
     t11();
     t12();
     t13();
 }

 document.querySelector(".b-10").onclick = () => {
     t10();
     refresh();
 };


 //  Task 11 ============================================
 //  Создайте фукнцию t11 которая читает корзину из LS и выводит на страницу в виде таблицы. Формат -  
 //  название товара - количество. Функция должна вызываться всегда после перезаписи LS ( в данном случае - просто добавьте ее вызов в нужные функции). */
 function getCard() {
     let card = localStorage.getItem("card");
     return JSON.parse(card);
 }


 function t11() {
     let out = "";
     let card = getCard();

     for (let key in card) {
         out += `<div data-product="${key}" class="table-row">
         <div class="product-name">
             ${key}
         </div>
         <div class="quantity">
             <span class="quantity-value">${card[key]}</span>
             <span class="plus">+</span>
             <span class="minus">-</span>
         </div>
     </div>`;
     }
     document.querySelector(".out-10").innerHTML = out;
 }

 //   Task 12 ============================================
 //   Добавьте в таблицу кнопки плюс и минус возле каждого товара. При нажатии кнопки - изменяйте количество товаров в card, обновляйте LS, выводите на страницу. */
 function t12() {
     let card = getCard();

     document.querySelectorAll("[data-product]").forEach(elem => {
         let quantity = card[elem.getAttribute('data-product')];

         elem.querySelector(".plus").onclick = () => {
             quantity++;
             setQuantity();
         };

         elem.querySelector(".minus").onclick = () => {
             quantity--;
             setQuantity();
         };

         function setQuantity() {
             card[elem.getAttribute("data-product")] = quantity;
             localStorage.setItem("card", JSON.stringify(card));
             elem.querySelector(".quantity-value").textContent = quantity;
             refreshTotalAmout(document.querySelector('.table-footer'));
         }
     });
 }

 //  Task 13 ============================================
 //   Добавьте в таблицу footer который считает общее количество товара. */
 function t13() {
     let footer = document.createElement("div");
     document.querySelector(".out-10").append(footer);
     footer.classList.add("table-footer");
     refreshTotalAmout(footer);
 }

 function totalAmount() {
     let card = getCard();
     let total = 0;

     for (let key in card) {
         total += card[key];
     }

     return total;
 }

 function refreshTotalAmout(foote){
     foote.innerHTML = `Количество: <b>${totalAmount()}</b>`;
 }


 //   Task 14 ============================================
 //    Добавьте функцию t14, которая при загрузке страницы проверяет наличие card в LS и если есть -выводит его на страницу. 
 //     Если нет - пишет корзина пуста. */
 function t14(){
     if (localStorage.getItem("card")){
        refresh();
     }else{
         document.querySelector(".out-10").textContent = "Корзина пуста";
     }
 }
 window.onload(t14());