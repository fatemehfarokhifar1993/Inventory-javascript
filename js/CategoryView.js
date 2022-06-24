import Storage from "./Storage.js";
const categoryTitle = document.querySelector("#category-title");
const categoryDescription = document.querySelector("#category-description");
const addNewCetgoryBtn = document.querySelector("#add-new-category");
const toggleAddCategoryBtn = document.getElementById("toggle-add-category");
const cancelAddCategory = document.querySelector("#cancel-add-category");
const categoryWrapper = document.querySelector("#category-wrapper");
class CategoryView {
  constructor() {
    addNewCetgoryBtn.addEventListener("click", (e) => this.addNewCategory(e));
    toggleAddCategoryBtn.addEventListener("click", (e) =>
      this.toggleAddCategory(e)
    );
    cancelAddCategory.addEventListener("click", (e) =>
      this.cancelAddCategory(e)
    );
    this.categories = [];
  }

  addNewCategory(e) {
    e.preventDefault();
    const title = categoryTitle.value;
    const description = categoryDescription.value;
    if (!title || !description) return;
    Storage.saveCategory({ title, description });
    this.categories = Storage.getAllCategories();
    this.createCategoriesList();
    categoryDescription.value = "";
    categoryTitle.value = "";
    categoryWrapper.style.display = "none";
    toggleAddCategoryBtn.style.display = "block";
  }
  setApp() {
    this.categories = Storage.getAllCategories();
  }
  createCategoriesList() {
    let result = `<option value="">select a category</option>`;
    this.categories.forEach((element) => {
      result += `<option value=${element.id}>${element.title}</option>`;
    });

    const categoryDOM = document.getElementById("new-product-category");
    categoryDOM.innerHTML = result;
  }
  toggleAddCategory(e) {
    e.preventDefault();
    categoryWrapper.style.display = "block";
    toggleAddCategoryBtn.style.display = "none";
  }
  cancelAddCategory(e) {
    e.preventDefault();
    categoryWrapper.style.display = "none";
    toggleAddCategoryBtn.style.display = "block";
  }
}

export default new CategoryView();
