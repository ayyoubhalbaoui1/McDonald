const url3 = "http://localhost:5000/product/";

//add  product
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
            window.location.href = "./dashboard.html";
        })
        .catch(function(error) {
            console.log(error);
        });
}

//Display Cate

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
                <td>
                   <button class="btn btn-success float-right editmodal"  data-toggle="modal"
                   data-target=".bd-example-modal-lg" data-id="${data[i]._id}">Edit</button>
                   <button class="btn btn-danger float-right"  onclick="deleteproduct('${data[i]._id}')" value="${data[i]._id}">Delete</button>
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
            window.location.href = "../views/dashboard.html";
        })
        .catch(function(error) {
            console.log(error);
        });
}

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