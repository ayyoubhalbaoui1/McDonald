let params = new URLSearchParams(location.search);
var productID = params.get("productID");
var subCatId = params.get("subcatid");
var ingre = params.get("ingre");
var price = params.get("price");
var subCatName = params.get("subCatname");
var products = document.getElementById("product");
var oneProduct = document.getElementById("oneProduct");
var oneP = "";
var qty = 1;
document.getElementById("subCatName").innerHTML = subCatName;

axios
  .get("http://localhost:5000/products/findProdBySubId/" + subCatId)
  .then((response) => {
    var html = response.data
      .map((product) => {
        return `
                        <a href="singleProduct.html?productID=${product._id}&ingre=${product.id_ingredient}&price=${product.productPrice}" class="col-md-4 d-flex flex-column align-items-center">
                            <img src="/img/${product.img}" alt="">
                            <h4 id="productName" class="justify-content-center ">${product.productName}</h4>
                            
                            <div class="price">${product.productPrice} DH</div>
                        </a>
             `;
      })
      .join(" ");

    products.innerHTML = html;
  });

axios
  .get("http://localhost:5000/products/" + productID)
  .then((response) => {
    axios.get("http://localhost:5000/ingredient/" + ingre).then((res) => {
      oneP = `
    <center>
    <h1 id="subCatName">${response.data.productName}</h1>
    <div class="col-md-6 justify-content-center">
    <img src="/img/${response.data.img}" style="width:70%;height:70%" alt="">
    <h5 id="ingrediants">${res.data.ingredientName}</h5>
    <div class="price" >${response.data.productPrice} DH
    
    </div>
    </div></center>
    
    
    `;
      oneProduct.innerHTML = oneP;
    });
  })
  .catch((error) => console.log(error));

async function checkPromo() {
  var codePromo = document.getElementById("coupon").value;
  var valid = document.getElementById("promoValid");
  var reduction = 0;

  await axios
    .get("http://localhost:5000/codepromo/")
    .then((response) => {
      const result = response.data.find((obj) => obj.code == codePromo);
      if (result) {
        console.log(result._id);
        reduction = result.redu;
        valid.innerHTML =
          "Your code is valid, this your reduction " + result.redu + "%";
        localStorage.setItem("reduction", reduction);
        localStorage.setItem("promocode", result._id);
      } else {
        console.log("no");
        valid.innerHTML = "Your code is not valid";
        localStorage.removeItem("reduction");
      }
    })
    .catch((er) => console.log(er));
  console.log(reduction);

  return reduction;
}

async function allTables() {
  var tables = document.getElementById("tables");
  var html = "";
  await axios
    .get("http://localhost:5000/servicetable/")
    .then((response) => {
      html = response.data
        .map((table) => {
          if (table.servicetablestatus === true) {
            return `
         <option value="${table._id}">${table.tablenumber}</option>
         `;
          }
        })
        .join(" ");

      tables.innerHTML += html;
    })
    .catch((er) => console.log(er));
}
allTables();

async function checkCard(price) {
  var codecard = document.getElementById("codecard").value;
  var card_valid = document.getElementById("cardValid");
  var points = 0;

  await axios
    .get("http://localhost:5000/cardfidele/")
    .then((response) => {
      const result = response.data.find((obj) => obj.pin == codecard);
      if (result) {
        if (price > 7 && price < 20) {
          points = 5;
        } else if (price > 21 && price < 49) {
          points = 12;
        } else points = 20;

        localStorage.removeItem("cardId");
        localStorage.setItem("cardId", result._id);
        localStorage.removeItem("points");
        localStorage.setItem("oldPoints", result.points);
        localStorage.setItem("pin", result.pin);
        localStorage.setItem("points", points);
        // card_valid.innerHTML = "Your have " + result.points + " points";
        new QRCode(card_valid, `${result.points} points`);
      } else {
        if (price > 7 && price < 20) {
          points = 5;
        } else if (price > 21 && price < 49) {
          points = 12;
        } else points = 20;
        new QRCode(card_valid, `${points} points`);
        newPin = generateString(8);
        localStorage.setItem("newpin", newPin);
        newCard = {
          pin: newPin,
          points: points,
        };
        axios
          .post("http://localhost:5000/cardfidele/", newCard)
          .then(function (response) {
            localStorage.setItem("cardId", response.data._id);
            localStorage.setItem("newpin", response.data.pin);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    })
    .catch((er) => console.log(er));
}

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function generateString(length) {
  let result = " ";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

document.getElementById("totalPrice").innerHTML = price;
document.querySelector(".minus-btn").setAttribute("disabled", "disabled");

const totalPrice = () => {
  var total = qty * price;
  document.getElementById("totalPrice").innerHTML = total;

  localStorage.setItem("totalPrice", total);
  localStorage.setItem("qty", qty);
};
document.querySelector(".plus-btn").addEventListener("click", () => {
  qty = document.getElementById("qty").value;
  qty++;
  document.getElementById("qty").value = qty;
  if (qty > 1) {
    document.querySelector(".minus-btn").removeAttribute("disabled");
    document.querySelector(".minus-btn").classList.remove("disabled");
  }
  totalPrice();
  getDataFromStorage();
});
document.querySelector(".minus-btn").addEventListener("click", () => {
  qty = document.getElementById("qty").value;
  qty--;
  document.getElementById("qty").value = qty;

  if (qty == 1) {
    document.querySelector(".minus-btn").setAttribute("disabled", "disabled");
  }
  totalPrice();
  getDataFromStorage();
});
const getDataFromStorage = async () => {
  document.getElementById("totalPrice2").innerHTML =
    localStorage.getItem("totalPrice") + " Dhs";
  document.getElementById("quantity2").innerHTML = localStorage.getItem("qty");
  document.getElementById("finalPrice").innerHTML = localStorage.getItem(
    "totalPrice"
  );
  var totalPrice = localStorage.getItem("totalPrice");
  var finalRed = localStorage.getItem("reduction");
  localStorage.getItem("pin");

  console.log(finalRed + "res");
  var finalprice = 0;
  if (finalRed === null) {
    finalprice = totalPrice;
    localStorage.setItem("totalPrice", finalprice);
  } else {
    finalprice = totalPrice - (totalPrice * finalRed) / 100;
    localStorage.setItem("totalPrice", finalprice);
  }
  document.getElementById("finalPrice").innerHTML = finalprice;
};

const commande = async () => {
  var totalPrice2 = localStorage.getItem("totalPrice");
  var productId = productID;
  var qty = localStorage.getItem("qty");
  var table = document.getElementById("tables").value;
  var way = document.getElementById("way").value;
  var cardId = localStorage.getItem("cardId");
  var promocode = localStorage.getItem("promocode");
  var newpin = localStorage.getItem("newpin");
  console.log(productId, totalPrice2, qty, table, promocode, cardId, way);

  await axios
    .post("http://localhost:5000/commande/", {
      productid: productId,
      price: totalPrice2,
      quantite: qty,
      tableserv: table,
      promocode: promocode,
      cardfidele: cardId,
      way: way,
    })
    .then(function (response) {
      axios
        .patch("http://localhost:5000/servicetable/update/" + table, {
          servicetablestatus: 0,
        })
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (err) {
          console.log(err);
        });
      console.log("commande created%");
    })
    .catch(function (error) {
      console.log(error);
    });
  if (cardId == "") {
    // await axios
    //   .put("http://localhost:5000/cardfidele/" + cardId, {
    //     pin: newpin,
    //     points: parseInt(localStorage.getItem("oldPoints")),
    //   })
    //   .then((response) => {
    //     response.data;
    //     console.log(response.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  } else {
    await axios
      .put("http://localhost:5000/cardfidele/" + cardId, {
        pin: localStorage.getItem("pin"),
        points:
          parseInt(localStorage.getItem("points")) +
          parseInt(localStorage.getItem("oldPoints")),
      })
      .then((response) => {
        response.data;
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // window.location.href = "home.html";
  console.log(localStorage.getItem("newpin"));

  // localStorage.clear();
  // localStorage.setItem("Lang", "en");
};
