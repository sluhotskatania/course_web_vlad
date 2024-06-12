import { paginationRender } from "./pagination.js";
import { productsRender } from "./productController.js";

export const getAndShowAllProducts = () => {
    const container = document.getElementsByClassName("product-container")[0];
    container.innerHTML = "";
    if (localStorage.getItem("products")) {
        const productArray = JSON.parse(localStorage.getItem("products"));
        paginationRender();
    }
};

export const prepareApp = async () => {
    const storedData = localStorage.getItem("products");
    if (storedData && JSON.parse(storedData).length > 0) {
        getAndShowAllProducts();
        paginationRender();
    } else {
        const container = document.querySelector(".product-container");
        container.insertAdjacentHTML(
            "afterbegin",
            `<button id="prepareBtn">Start</button>`
        );
        const prepareBtn = document.getElementById("prepareBtn");
        prepareBtn.addEventListener("click", await pushDefaultProductsToLS);
    }
};

async function pushDefaultProductsToLS() {
            getAndShowAllProducts();
            paginationRender();
}