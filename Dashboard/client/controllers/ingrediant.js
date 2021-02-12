const url2 = "http://localhost:5000/ingrediant/";

//Display all ingredients 
async function getCatS() {
    await axios
        .get(url2)
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
                document.getElementById("ingrediant_tbody").innerHTML += option;
            }
        })
        .catch(function(error) {
            console.log(error);
        });
}
getCatS();

//add ingredient

async function addingrediant() {
    let ingrediantName = document.getElementById("ingrediantName").value;
    await axios
        .post("http://localhost:5000/ingrediant/add", {
            ingrediant: ingrediantName,
        })
        .then(function(response) {
            window.location.href = "../views/addingre.html";
        })
        .catch(function(error) {
            console.log(error);
        });
}

//get all ingredients

async function getIngrediant() {
    await axios
        .get(url2)
        .then(function(response) {
            const data = response.data;
            for (let i = 0; i < data.length; i++) {
                var option = `<option value="${data[i]._id}">${data[i].ingrediant}</option>
        `;
                document.getElementById("ingrediant_list").innerHTML += option;
                document.getElementById("ingrediant_list").innerHTML += option;
                document.getElementById("editIng").innerHTML += option;
            }
        })
        .catch(function(error) {
            console.log(error);
        });
}
getIngrediant();

//delete ingrediant
async function deleteIngrediant(id) {
    await axios
        .delete("http://localhost:5000/ingrediant/delete/" + id)
        .then(function(response) {
            window.location.href = "../views/addingre.html";
        })
        .catch(function(error) {
            console.log(error);
        });
}

//updating ingrediant
async function updateIngrediant() {
    let ingrediant = document.querySelector("#ingrediantNameE").value;
    var id = document.getElementById("ingredian_idE").value;
    await axios
        .put(`http://localhost:5000/ingrediant/update/${id}`, {
            ingrediant: ingrediant,
        })
        .then(function(response) {
            window.location.href = "../views/addingre.html";
        })
        .catch(function(error) {
            console.log(error);
        });
}

//getting
$(document).on("click", ".editIngredinat", function(e) {
    e.preventDefault();
    var _self = $(this);
    var myBookId = _self.data("id");
    document.getElementById("ingredian_idE").value = myBookId;
});