import { productsRender } from "./productController.js";
import { paginationRender } from "./pagination.js";


const categoryFilter = (products, selectedCategory) => {
    return new Promise((resolve) => {
        if (selectedCategory === "all") {
            resolve(products);
        } else {
            const filteredArray = products.filter(
                (product) => product.category == selectedCategory
            );
            resolve(filteredArray);
        }
    });
};

const searchFilter = (products, searchString) => {
    return new Promise((resolve) => {
        const filteredArray = products.filter((product) => {
            // Використовуємо регулярний вираз для ігнорування регістру та пошуку рядка в назві продукту
            const regex = new RegExp(searchString, "i");
            return regex.test(product.title) || regex.test(product.description);
        });
        resolve(filteredArray);
    });
};

const sortFilter = (products, sortOption) => {
    return new Promise((resolve) => {
        let sortedArray;
        switch (sortOption) {
            case "incPr":
                sortedArray = sortProducts(products, "price", 0);
                break;
            case "decPr":
                sortedArray = sortProducts(products, "price", 1);
                break;
            case "nf":
                sortedArray = sortProducts(products, "id", 0);
                break;
            case "of":
                sortedArray = sortProducts(products, "id", 1);
                break;
            case "nosort":
                sortedArray = products;
                break;
            default:
                console.error("Непідтримуваний метод сортування.");
                break;
        }
        resolve(sortedArray);
    });
};

export const filtration = async () => {
    try {
        const productArray = JSON.parse(localStorage.getItem("products"));
        const category = document.getElementById("filter-category").value;
        const searchString = document
            .getElementById("filter-search")
            .value.trim();
        const sortMethod = document.getElementById("filter-sort").value;

        const filteredByCategory = await categoryFilter(productArray, category);
        const filteredBySearch = await searchFilter(
            filteredByCategory,
            searchString
        );
        const filteredAndSorted = await sortFilter(
            filteredBySearch,
            sortMethod
        );

        productsRender(filteredAndSorted);
        localStorage.setItem(
            "filtered-products",
            JSON.stringify(filteredAndSorted)
        );
        paginationRender();
        return filteredAndSorted;
    } catch (error) {
        console.error("Виникла помилка:", error);
    }
};

function sortProducts(arr, propertyName, sortOrder) {
    if (sortOrder === 0) {
        arr.sort((a, b) => (a[propertyName] < b[propertyName] ? -1 : 1));
    } else if (sortOrder === 1) {
        arr.sort((a, b) => (a[propertyName] > b[propertyName] ? -1 : 1));
    } else {
        console.error(
            "Непідтримуваний порядок сортування. Використовуйте 0 або 1."
        );
    }
    return arr;
}