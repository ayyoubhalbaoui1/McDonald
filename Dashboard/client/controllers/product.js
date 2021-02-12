const url3 = "http://localhost:5000/product/";

//add new product
async function addProduct() {
    let id_ingrediant = document.getElementById("ingrediant_list").value;
    let id_sub_category = document.getElementById("sub_category_list").value;
    let productName = document.getElementById("productName").value;
    let productPrice = document.getElementById("productPrice").value;
    await axios
        .post("http://localhost:5000/product/add", {
            id_sub_category: id_sub_category,
            id_ingrediant: id_ingrediant,
            productName: productName,
            productPrice: productPrice,
        })
        .then(function(response) {
            window.location.href = "../views/addpro.html";
        })
        .catch(function(error) {
            console.log(error);
        });
}

//get all categories and display them in a table
async function getCatS() {
    await axios
        .get(url3)
        .then(function(response) {
            const data = response.data;
            console.log(data);
            for (let i = 0; i < data.length; i++) {
                var option = `
              <tr>
                <td>${data[i].productName}</td>
                <td>${data[i].productPrice}DH</td>
                <input id="product_id" type="hidden" value="${data[i]._id}"> </input>
                <td>
                   <button class="btn btn-success editproduct"  data-toggle="modal"
                   data-target=".bd-example-modal5-lg" data-id="${data[i]._id}">Edit</button>
                   <button class="btn btn-danger"  onclick="deleteproduct('${data[i]._id}')" value="${data[i]._id}">Delete</button>
                </td>
              </tr>
              
          `;
                document.getElementById("product_tbody").innerHTML += option;
            }
        })
        .catch(function(error) {
            console.log(error);
        });
}
getCatS();

// //loading categories when updatting a sub category
// function loadCategories() {
//   fetch(`http://localhost:5000/category/`)
//     .then((res) => {
//       return res.json();
//     })
//     .then((data) => {
//       //console.log(data)
//       $("#category_list_E").append(`<option>Select Your Category</option>`);
//       data.map((categories) => {
//         $("#category_list_E").append(`
//       <option value="${categories._id}">${categories.categoryName}</option>`);
//       });
//     });
//   document.querySelector("#category_list_E").innerHTML = "";
// }

//deleting a single product
async function deleteproduct(id) {
    await axios
        .delete("http://localhost:5000/product/delete/" + id)
        .then(function(response) {
            window.location.href = "../views/addpro.html";
        })
        .catch(function(error) {
            console.log(error);
        });
}

//Display all ingredients 
async function getCatSE() {
    await axios
        .get("http://localhost:5000/ingrediant/")
        .then(function(response) {
            const data = response.data;
            console.log(data);
            for (let i = 0; i < data.length; i++) {

                var option = `
              <tr>
                <td>${data[i].ingrediant}</td>
                <td>
                   <button class="btn btn-success float-right editIngredinat"  data-toggle="modal"
                   data-target=".bd-example-modalEditIngrediant-lg" data-id="${data[i]._id}">Edit</button>
                   <button class="btn btn-danger float-right"  onclick="deleteIngrediant('${data[i]._id}')" value="${data[i]._id}">Delete</button>
                </td>
              </tr>
              
          `;
                document.getElementById("editIng").innerHTML += option;
            }
        })
        .catch(function(error) {
            console.log(error);
        });
}
getCatSE();

// //upadting a single sub_category
// async function updateSubCat() {
//   let categoryId = document.querySelector("#category_list_E").value;
//   var id = document.querySelector("#sub_category_id").value;
//   var subCate = document.querySelector("#sub_categoryName_E").value;

//   console.log(categoryId, id, subCate);

//   await axios
//     .put(`http://localhost:5000/sub_category/update/${id}`, {
//       id_category: categoryId,
//       sub_categoryName: subCate,
//     })
//     .then(function (response) {
//       window.location.href = "../views/dashboard.html";
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// }

// //getting id after clicking edit
// $(document).on("click", ".editSubCat", function (e) {
//   e.preventDefault();
//   var _self = $(this);
//   var myBookId = _self.data("id");
//   document.getElementById("sub_category_id").value = myBookId;
// });

//getting id after clicking edit


$(document).on("click", ".editproduct", function(e) {
    e.preventDefault();
    var _self = $(this);
    var myBookId = _self.data("id");
    document.getElementById("product_id").value = myBookId;
});




// edit product
async function editProduct() {
    let id_ingrediant = document.getElementById("ingrediant_listE").value;
    let id_sub_category = document.getElementById("sub_category_listE").value;
    let productName = document.getElementById("productNameE").value;
    let productPrice = document.getElementById("productPriceE").value;
    let id = document.querySelector("#product_id").value;

    console.log(id_ingrediant, id_sub_category, productPrice, productName, id);
    await axios
        .patch(`http://localhost:5000/product/${id}`, {
            productName: productName,
            id_subcategory: id_sub_category,
            id_ingredient: id_ingrediant,
            productPrice: productPrice,
            score: "10",
        })
        .then((res) => {
            window.location.href = "../views/addpro.html";
        })
        .catch((err) => {
            console.log(err);
        });
}