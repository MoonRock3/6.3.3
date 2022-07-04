const userSurname = document.querySelector('[name="surname"]');
const userName = document.querySelector('[name="name"]');

const goodsElements = document.querySelectorAll(".checkbox");
const countElements = document.querySelectorAll('[type="number"]');

const btn = document.querySelector(".btn");
const resultElem = document.querySelector(".sum");

let sum = 0;

const checkboxes = {};
const counts = {};

function assignCheckboxes() {
  goodsElements.forEach((el) => {
    checkboxes[el.dataset.goods] = el;
  });
}

assignCheckboxes();

function assignCounts() {
  countElements.forEach((el) => {
    counts[el.id] = el;
  });
}

assignCounts();

function showSum() {
  sum = 0;
  for (const item in checkboxes) {
    sum +=
      checkboxes[item].checked * checkboxes[item].value * counts[item].value;
  }
  resultElem.textContent = sum;
}

countElements.forEach((elem) => {
  elem.addEventListener("change", function () {
    if (elem.value === "") {
      elem.value = 0;
    } else {
      elem.value = parseInt(elem.value.replace(/e/, ""));
      if (elem.value < 0) {
        elem.value = -elem.value;
      }
    }
    showSum();
  });
});

goodsElements.forEach((product) => {
  product.addEventListener("change", function () {
    if (!product.checked) {
      counts[product.dataset.goods].value = 0;
    } else {
      if (counts[product.dataset.goods].value === "0") {
        counts[product.dataset.goods].value = 1;
      }
    }
    showSum();
  });
});

btn.addEventListener("click", function () {
  alert(
    `Заказчик: ${userSurname.value} ${userName.value}\nИтого: ${resultElem.textContent} р.`
  );
});
