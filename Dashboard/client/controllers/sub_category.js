const url1 = "http://localhost:5000/sub_category/";

//add SubCat
async function addSub_Cat() {
    let category_id = document.getElementById("category_list").value;
    let sub_categoryName = document.getElementById("sub_categoryName").value;
    await axios
        .post("http://localhost:5000/sub_category/add", {
            id_category: category_id,
            sub_categoryName: sub_categoryName,
        })
        .then(function(response) {
            window.location.href = "../views/addsub.html";
        })
        .catch(function(error) {
            console.log(error);
        });
}

//Display cat 
async function getCatS() {
    await axios
        .get(url1)
        .then(function(response) {
            const data = response.data;
            for (let i = 0; i < data.length; i++) {
                var option = `
              <tr>
                <td>${data[i].sub_categoryName}</td>
                <td>
                   <button id="edsub" class="btn btn-success float-right editSubCat"  data-toggle="modal"
                   data-target=".bd-example-modalEditS-lg" onclick="loadCategories()" data-id="${data[i]._id}" value="${data[i]._id}">Edit</button>
                   <button class="btn btn-danger float-right "  onclick="deleteSub_cat('${data[i]._id}')" value="${data[i]._id}">Delete</button>
                </td>
              </tr>
              
          `;
                document.getElementById("sub_category_tbody").innerHTML += option;
            }
        })
        .catch(function(error) {
            console.log(error);
        });
}
getCatS();

//loading categories when updatting a sub category
function loadCategories() {
    b
    fetch(`http://localhost:5000/category/`)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            //console.log(data)
            $("#category_list_E").append(`<option>Select Your Category</option>`);
            data.map((categories) => {
                $("#category_list_E").append(`
      <option value="${categories._id}">${categories.categoryName}</option>`);
            });
        });
    document.querySelector("#category_list_E").innerHTML = "";
}

//get all sub categories
async function getsub_Cat() {
    await axios
        .get(url1)
        .then(function(response) {
            const data = response.data;
            for (let i = 0; i < data.length; i++) {
                var option = `
          <option value="${data[i]._id}">${data[i].sub_categoryName}</option>
        `;
                document.getElementById("sub_category_list").innerHTML += option;
                document.getElementById("sub_category_listE").innerHTML += option;
            }
        })
        .catch(function(error) {
            console.log(error);
        });
}
getsub_Cat();

//deleting a single sub_category
async function deleteSub_cat(id) {
    await axios
        .delete("http://localhost:5000/sub_category/delete/" + id)
        .then(function(response) {
            window.location.href = "../views/addsub.html";
        })
        .catch(function(error) {
            console.log(error);
        });
}

//upadting a single sub_category
async function updateSubCat() {
    let categoryId = document.querySelector("#category_list_E").value;
    var id = document.querySelector("#sub_category_id").value;
    var subCate = document.querySelector("#sub_categoryName_E").value;

    console.log(categoryId, id, subCate);

    await axios
        .put(`http://localhost:5000/sub_category/update/${id}`, {
            id_category: categoryId,
            sub_categoryName: subCate,
        })
        .then(function(response) {
            window.location.href = "../views/addsub.html";
        })
        .catch(function(error) {
            console.log(error);
        });
}

//getting id after clicking edit
$(document).on("click", ".editSubCat", function(e) {
    e.preventDefault();
    var _self = $(this);
    var myBookId = _self.data("id");
    document.getElementById("sub_category_id").value = myBookId;
});