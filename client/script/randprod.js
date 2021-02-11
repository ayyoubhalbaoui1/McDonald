var html = "";

axios.get("http://localhost:5000/category").then((response) => {

  for (let index = 0; index < response.data.length; index++) {
        html += `
    <div class="rec-prod d-flex justify-content-center align-items-center flex-column mt-5">
        <img src="/img/${response.data[index].img}" alt="">
       
        <a style="color: #1C4018" href=" subcat.html?catid=${response.data[index]._id}&catname=${response.data[index].categoryname}">
        <h4 class="text-center">${response.data[index].categoryname}</h4></a>
    </div>
  `;
  }

  document.getElementById("randprod").innerHTML = html;
});
