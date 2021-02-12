const url3 = "http://localhost:5000/product/";

async function getdata() {
    await axios
        .get(url3)
        .then(function(res) {


            const data = res.data;
            for (let i = 0; i < data.length; i++) {

                var option = `
            <div id="${data[i]._id}">
            <p>${data[i].productName}</p>
            <p>${data[i].productPrice}DH</p>

            </div>
              `;
                document.getElementById("showComands").innerHTML += option;

                document.getElementById('showComands').innerHTML += `<button type="button" class="btn btn-danger"  onclick="testMyD('${data[i].productName}', '${data[i].productPrice}')" >Print Command</button> <hr>`
            }
        })
        .catch(function(err) {
            console.log(err);
        });
}
getdata();


function testMyD(name, price) {
    const doc = new jsPDF();
    doc.text("********************************Command Details****************************" + "\n " + name + "\n" + price, 9, 9);
    doc.save("a4.pdf");
}