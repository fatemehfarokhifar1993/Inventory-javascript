import Storage from "./Storage.js";
const quantityValue = document.getElementById("quantity");
const addNewProductBtn = document.getElementById("add-new-product");
const searchInput = document.querySelector("#search-input");
const selectedSort = document.querySelector("#sort-products");
class ProductView {
  constructor() {
    addNewProductBtn.addEventListener("click", (e) => this.addNewProduct(e));
    searchInput.addEventListener("input", (e) => this.searchProducts(e));
    selectedSort.addEventListener("change", (e) => this.sortProducrs(e));
    this.products = [];
  }
  addNewProduct(e) {
    e.preventDefault();
    const title = document.querySelector("#new-product-title").value;
    const quantity = document.querySelector("#new-product-quantity").value;
    const category = document.querySelector("#new-product-category").value;
    if (!title || !category || !quantity) return;
    Storage.saveProducts({ title, quantity, category });
    this.products = Storage.getAllProducts();
    this.createProductsList(this.products);
    document.querySelector("#new-product-title").value = "";
    document.querySelector("#new-product-quantity").value = "";
    document.querySelector("#new-product-category").value = "";
  }
  setApp() {
    this.products = Storage.getAllProducts();
  }
  createProductsList(products) {
    const productsDOM = document.getElementById("products-list");
    let result = "";
    products.forEach((item) => {
      const selectedCategory = Storage.getAllCategories().find(
        (c) => c.id == item.category
      );

      result += `
        <div class="product">
        <p class="product-title">${item.title}</p>
        <span class="product-date">${new Date().toLocaleDateString(
          "fa-IR"
        )}</span>
            <span class="product-category">${selectedCategory.title}</span>
            <span class="product-quantity">${item.quantity}</span>
            <button class="delete-product"  data-product-id=${
              item.id
            }>delete</button>
            </div>
            `;
    });

    productsDOM.innerHTML = result;
    quantityValue.innerHTML = this.products.length;

    const deleteBtns = [...document.querySelectorAll(".delete-product")];
    deleteBtns.forEach((item) => {
      item.addEventListener("click", (e) => this.deleteProduct(e));
    });
  }
  searchProducts(e) {
    const value = e.target.value.trim().toLowerCase();
    const filteredProducts = this.products.filter((p) =>
      p.title.toLowerCase().includes(value)
    );
    this.createProductsList(filteredProducts);
  }
  sortProducrs(e) {
    const value = e.target.value;
    this.products = Storage.getAllProducts(value);
    this.createProductsList(this.products);
  }
  deleteProduct(e) {
    const produdcId = e.target.dataset.productId;
    Storage.deleteProduct(produdcId);
    this.products = Storage.getAllProducts();
    this.createProductsList(this.products);
  }
}
export default new ProductView();
