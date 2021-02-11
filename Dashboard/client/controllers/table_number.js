//adding new table number
async function addNumber() {
    let tableNumber = Math.floor(Math.random() * 1000 + 1);
    console.log(tableNumber);
    await axios
        .post("http://localhost:5000/table/add", {
            table_number: tableNumber,
            tableStatus: false,
        })
        .then(function(response) {
            window.location.href = "./table.html";
        })
        .catch(function(error) {
            console.log(error);
        });
}

//Getting all tables number and display them in aform of a QR
async function getNumber() {
    var show = document.getElementById("td_bodyy");
    var shoDiv = document.getElementById("divShoww");
    await axios
        .get("http://localhost:5000/table")
        .then(function(response) {
            const data = response.data;

            console.log(data);
            data.map((num) => {
                $("#td_bodyy").append(new QRCode(shoDiv, `${num.table_number}`));
                document.getElementById("#td_bodyy").appendChild(num.table_number);
                $("#divShoww").append(
                    `<button class="btn btn-danger" onclick="deleteTableNum('${num._id}')" >delete</button>`
                );
            });
            // for (let i = 0; i < data.length; i++) {
            //     console.log(data);
            //     $("#divShow").append(`<hr>`);
            //     $("#td_body").append(new QRCode(shoDiv, `${data[i].table_number}`));
            //     $("#divShow").append(
            //         `<button class="btn btn-danger" onclick="deleteTableNum('${data[i]._id}')" >delete</button>`
            //     );
            // }
            // data.map((num) => {
            //     console.log(num.table_number);
            //     localStorage.setItem("numtable", num.table_number)
            //     document.getElementById("karbal").value = localStorage.getItem("numtable")
            //     $("#divShow").append(`<hr>`);
            //     $("#td_body").append(new QRCode(shoDiv, `${num.table_number}`));
            //     $("#divShow").append(
            //         `<button class="btn btn-danger" onclick="deleteTableNum('${num._id}')" >delete</button>`
            //     );

            // const data = response.data;
            // data.map(num => {
            //     $('#divShoww').append(`<hr>`)
            //     $('#td_bodyy').append(new QRCode(shoDiv, `${num.code}`))
            //     $('#divShoww').append(`<button class="btn btn-danger" onclick="deleteCode('${num._id}')" >Delete</button>`)
            // })

            // new QRCode(document.getElementById("ttest"), `${num.table_number} points`)
            // });
        })
        .catch(function(error) {
            console.log(error);
        });
}
getNumber();

//deleting a single table number
async function deleteTableNum(id) {
    await axios
        .delete("http://localhost:5000/table/delete/" + id)
        .then(function(response) {
            window.location.href = "../views/table.html";
        })
        .catch(function(error) {
            console.log(error);
        });
}