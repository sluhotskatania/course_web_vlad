import { closeModal } from "./modal.js";
import { productForm } from "./modal.js";
import { openModalEdit } from "./modal.js";
import { filtration } from "./filter.js";

const storedData = localStorage.getItem('products');
let products;
// Перевірка, чи дані існують та чи не є порожніми
if (storedData && JSON.parse(storedData).length > 0) {
    // Масив не порожній, ви можете виконати потрібні дії
    products = JSON.parse(storedData);
} else {
    products = [];
}

function generateUniqueId() {
    // Використовуємо поточний час для забезпечення унікальності
    const timestamp = new Date().getTime();
    // Генеруємо випадкове число
    const random = Math.floor(Math.random() * 1000);
    // Комбінуємо час та випадкове число для створення унікального ID
    let uniqueId = "id" + timestamp + random;
    return uniqueId;
}

function validatePrice(price) {
    // Перевірка, чи ціна є числом і чи вона більше за нуль
    return !isNaN(price) && parseFloat(price) > 0;
}

export const saveProduct = () => {
    const price = document.getElementById("price").value;

    // Перевірка валідності ціни
    if (!validatePrice(price)) {
        alert("Ціна повинна бути числом більше за нуль.");
        return; // Зупинити виконання функції, якщо ціна недійсна
    }

    // Отримати дані з форми
    const title = document.getElementById("title").value;
    const material = document.getElementById("material").value;
    const weight = document.getElementById("weight").value;
    const discountPercentage =
        document.getElementById("discountPercentage").value;
    const brand = document.getElementById("brand").value;
    const category = document.getElementById("category").value;
    const thumbnail = document.getElementById("thumbnail").value;

    // Створити об'єкт із забраними даними
    const product = {
        title: title,
        material: material,
        weight: weight,
        discountPercentage: discountPercentage,
        price: price,
        brand: brand,
        category: category,
        thumbnail: thumbnail,
    };

    // Перевіряємо, чи створюється новий продукт, чи редагується існуючий
    const productId = document.getElementById("productId").value;
    // Якщо елемент існує:
    if (productId) {
        // console.log(productId);
        product.id = productId;
        // Шукаємо індекс існуючого елемента
        console.log("Products:", products);
        const findIndex = products.findIndex((item) => item.id == productId);
        // Замінюємо елемент масиву по індексу новим
        products[findIndex] = product;
    } else {
        product.id = generateUniqueId();
        products.push(product);
    }
    // Сетимо продукти в LS
    localStorage.setItem("products", JSON.stringify(products));
    // Очищуємо форму
    productForm.reset();
    // Видаляємо скритий атрибут з форми із значенням productId
    document.getElementById("productId").removeAttribute("value");
    // Закриваємо модальне вікно
    closeModal();
    // getAndShowAllProducts();
    filtration();
};

export const editProduct = (id) => {
    // Шукаємо в масиві потрібний продукт
    const product = products.find(item => id === item.id);
    // console.log(product);
    // Вставляємо дані продукту у форму
    document.getElementById("productId").value = product.id;
    document.getElementById("title").value = product.title;
    document.getElementById("material").value = product.material;
    document.getElementById("weight").value = product.weight;
    document.getElementById("price").value = product.price;
    document.getElementById("discountPercentage").value = product.discountPercentage;
    document.getElementById("brand").value = product.brand;
    document.getElementById("category").value = product.category;
    document.getElementById("thumbnail").value = product.thumbnail;

    openModalEdit();
};

export const deleteProduct = (id) => {
    if (confirm(`Do you really want to remove this product?`)) {
        // Видаляємо продукт з масиву за його ідентифікатором
        products = products.filter(product => product.id !== id);
        // Оновлюємо дані в LocalStorage
        localStorage.setItem("products", JSON.stringify(products));
        // Оновлюємо відображення списку продуктів
        filtration();
    }
};

export const productsRender = (products) => {
    // Вибираємо та очищуємо контейнер
    const container = document.getElementsByClassName("product-container")[0];
    container.innerHTML = "";
    // Рендерінг карточок
    products.forEach((product) => {
        let pcard = document.createElement("div");
        pcard.classList.add("product-card");
        pcard.innerHTML = `
            <img src=${product.thumbnail} alt="product image">
                    <div class="product-card-title">${product.title}</div>
                    <div class="product-card-material">${product.material}</div>
                    <div class="product-card-weight">${product.weight} кг</div>
                    <div class="product-card-brand">${product.brand}</div>
                    <div class="product-card-discount"><span>${product.discountPercentage}</span><span>%</span></div>
                    <div class="product-card-category">${product.category}</div>
                    <div class="product-card-cartbox">
                        <div class="product-card-price"><span>${product.price}</span> <span>$</span></div>
                        <div class="manage-buttons">
                            <div id="edit${product.id}" class="fa fa-pencil-square-o" ></
                        <div>
                            <div id="delete${product.id}" class="fa fa-trash" ></div>
                        </div>
                    </div>
            `;

        container.appendChild(pcard);
        document
            .getElementById(`edit${product.id}`)
            .addEventListener("click", () => {
                editProduct(product.id);
            });
        document
            .getElementById(`delete${product.id}`)
            .addEventListener("click", () => {
                deleteProduct(product.id);
            });
    });
};
