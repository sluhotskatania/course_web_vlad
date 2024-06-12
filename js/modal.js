import { saveProduct } from "./productController.js";

const modal = document.getElementById("myModal");

export const openModalCreate = () => {
    modal.style.display = "flex";
    modalTitle.textContent = "Створити продукт";
};

export const openModalEdit = () => {
    modal.style.display = "flex";
    modalTitle.textContent = "Редагувати продукт";
};

export const closeModal = () => {
    document.getElementById("productId").removeAttribute('value');
    modal.style.display = "none";
};

export const productForm = document.forms.productForm;

productForm.addEventListener("submit", function (event) {
    event.preventDefault();
    saveProduct();
});

// Додано обробник події для закриття модального вікна при кліку на область overlay або кнопку з атрибутом data-close
modal.addEventListener("click", function (event) {
    if (event.target.dataset.close) {
        closeModal();
    }
});
