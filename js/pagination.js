import { productsRender } from "./productController.js";

export const paginationRender = (page = 1) => {
    const paginationContainer = document.querySelector(".pagination-container");
    // Встановлюємо кількість продуктів на сторінці    
    const productsPerPage = 5;
    let productCount;
    let productsData;

    if (localStorage.getItem("filtered-products")) {
        productsData = JSON.parse(localStorage.getItem("filtered-products"));
    } else {
        productsData = JSON.parse(localStorage.getItem("products"));
    }

    productCount = productsData.length;
    let skip = (page - 1) * productsPerPage; 
    const croppedArray = productsData.slice(skip, skip + productsPerPage)
    
    productsRender(croppedArray)
    
    let lastPageNumber = Math.ceil(productCount / productsPerPage); 

    if (productCount <= productsPerPage) {
        paginationContainer.innerHTML = "";
    } else {
        paginationContainer.innerHTML = "";
        paginationContainer.insertAdjacentHTML(
            "afterbegin",
            `<div class="pagination-btn" id="prevPage" disabled><span class="arrow">&laquo;</span> Prev</div>
        <div class="pagination-btn" id="firstPage">1</div>
        <div class="pagination-btn dots" id="dotsPrevPage">...</div>
        <div class="pagination-btn current-page" id="currentPage">${page}</div>
        <div class="pagination-btn dots" id="dotsNextPage">...</div>
        <div class="pagination-btn" id="lastPage">${lastPageNumber}</div>
        <div class="pagination-btn" id="nextPage">Next <span class="arrow">&raquo;</span></div>
    `
        );
        
        
        const prevPage = document.getElementById("prevPage");
        const dotsPrevPage = document.getElementById("dotsPrevPage");
        const nextPage = document.getElementById("nextPage");
        const dotsNextPage = document.getElementById("dotsNextPage");
        const firstPage = document.getElementById("firstPage");
        const lastPage = document.getElementById("lastPage");
        
        
        if ( page > 1 ) {
            prevPage.addEventListener("click", () =>
                paginationRender(page - 1)
            );
            dotsPrevPage.addEventListener("click", () =>
                paginationRender(page - 1)
            );

        }

        if ( page < lastPageNumber) {
            nextPage.addEventListener("click", () =>
                paginationRender(page + 1)
            );
            dotsNextPage.addEventListener("click", () =>
                paginationRender(page + 1)
            );
        }
        
        
        firstPage.addEventListener("click", () =>
            paginationRender(1)
        );
    
      
        lastPage.addEventListener("click", () =>
            paginationRender(lastPageNumber)
        );

        if (page == 1) {
            prevPage.style.transform = "none";
            prevPage.style.backgroundColor = "#ccc"
            prevPage.style.borderColor = "#ccc";
            firstPage.style.transform = "none";
            firstPage.style.backgroundColor = "#ccc";
            firstPage.style.borderColor = "#ccc";
        }
        if (page == lastPageNumber) {
            nextPage.style.transform = "none";
            nextPage.style.backgroundColor = "#ccc";
            nextPage.style.borderColor = "#ccc";
            lastPage.style.transform = "none";
            lastPage.style.backgroundColor = "#ccc";
            lastPage.style.borderColor = "#ccc";
        }
    }
};

