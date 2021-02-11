const url = "http://localhost:5000/category/";

//add new category
async function addCat() {
    let categoryName = document.getElementById("categoryName").value;
    await axios
        .post("http://localhost:5000/category/add", {
            categoryName: categoryName,
        })
        .then(function(response) {
            console.log(response);
            window.location.href = "../views/addcat.html";
        })
        .catch(function(error) {
            console.log(error);
        });
}

//get all categories
async function getCat() {
    await axios
        .get(url)
        .then(function(response) {
            const data = response.data;
            for (let i = 0; i < data.length; i++) {
                var option = `<option value="${data[i]._id}">${data[i].categoryName}</option>
          `;
                document.getElementById("category_list").innerHTML += option;
            }
        })
        .catch(function(error) {
            console.log(error);
        });
}
getCat();

//Display all categories
async function getCatM() {
    await axios
        .get(url)
        .then(function(response) {
            const data = response.data;
            for (let i = 0; i < data.length; i++) {
                var option = `
              <tr>
                <td>${data[i].categoryName}</td>
                <td>
                   <button class="btn btn-success  float-right editCat"  data-toggle="modal"
                   data-target=".bd-example-modal-lg" data-id="${data[i]._id}">Edit</button>
                   <button  class="btn btn-danger float-right"  onclick="deleteCat('${data[i]._id}')" value="${data[i]._id}">Delete</button>
                </td>
              </tr>
              
          `;
                document.getElementById("category_tbody").innerHTML += option;
            }
        })
        .catch(function(error) {
            console.log(error);
        });
}
getCatM();

//delete_Cat

async function deleteCat(id) {
    await axios
        .delete("http://localhost:5000/category/delete/" + id)
        .then(function(response) {
            window.location.href = "../views/addcat.html";
        })
        .catch(function(error) {
            console.log(error);
        });
}

//update Cate
async function updateCat() {
    let categoryName = document.querySelector("#name").value;
    var id = document.getElementById("category_id").value;

    await axios
        .put(`http://localhost:5000/category/update/${id}`, {
            categoryName: categoryName,
        })
        .then(function(response) {
            window.location.href = "../views/addcat.html";
        })
        .catch(function(error) {
            console.log(error);
        });
}

//get id
$(document).on("click", ".editCat", function(e) {
    e.preventDefault();
    var _self = $(this);
    var myBookId = _self.data("id");
    document.getElementById("category_id").value = myBookId;
});