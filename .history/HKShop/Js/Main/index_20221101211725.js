// VÍ DỤ MẪU VỀ LƯU LOCALSTORAGE-DATABASE CPU
// function setStudentList() {
//      var studentListJSON = JSON.stringify(studentList);
//      localStorage.setItem("SL", studentListJSON);
//    }

//    function getStudentList() {
//      var studentListJSON = localStorage.getItem("SL");
//      if (!studentListJSON) return;

//      studentList = mapData(JSON.parse(studentListJSON));

//      renderStudents();
//    }


let product__list = [];

/**1- Fetch API **/
function fetchApi() {
    axios(
        {
            url: "https://635205159d64d7c7130c9c5f.mockapi.io/products",
            method: "GET"
        }
    )
        .then(function (response) {
            console.log(response.data); //test hiện ra đối tượng chưa?
            let product__list = response.data;
            let studentListJSON = JSON.stringify(product__list);
            localStorage.setItem("productList", studentListJSON);
            renderData(response.data)
        })
        .catch(function (err) { console.log(err) })

}
/**2- renderData **/

function renderData(data) {
    if (!data) data = product__list;
    var renderHTML = '';
    for (let i = 0; i < data.length; i++) {
        let result = data[i];
        renderHTML += `
        <div class="product__items" id="product__items">
        <div class="product__item">
        <img src=${result.img} alt="">
        <div class="product__design">
            <h3 id="product__name">${result.name}</h3>
            <div class="product__content">
            <header class="product__desc" id="">${result.desc}</header>
            <div class="product__information">
                <div class="product__price">price:<span class="product__price-span">${result.price}</span>
                </div>
                <div class="product__screen">Screen:<span class="product__screen-span">${result.screen}</span></div>
                <div class="product__back">Back:<span class="product__back-span">${result.backCamera}</span></div>
                <div class="product__front">Front:<span class="product__front-span">${result.frontCamera}</span>
                </div>
                </div>
                <button class="product-btn" onclick="addToCart('${result.id}')">
                     Add to cart
                </button>
           </div>
            </div>
            </div>
        </div>
        </div>
        </div>
        `
    }
    console.log(renderHTML)
    document.querySelector("#product__list").innerHTML = renderHTML;
}

/**3- filter/onchangeProduct **/
let filterProduct = () => {
    axios(
        {
            url: "https://635205159d64d7c7130c9c5f.mockapi.io/products",
            method: "GET"
        }
    )
        .then((response) => {
            let filterValue = document.getElementById('search__select').value;
            let result = [];
            if (filterValue === '') { result = response.data; }
            else {
                response.data.map((productResult) => { if (productResult.type === filterValue) { result.push(productResult) } })
            }
            renderData(result)
        })
        .catch((error) => { console.log(error) })
}
document.getElementById('search__select').onclick = filterProduct;
/**4- Function về Cart  **/

  // tạo ra 1 biến để lưu thông tin mảng trả về local storage
    let dataSaving = JSON.parse(localStorage.getItem("dataSaving"))  || [];
    
    function updateData(){
        localStorage.setItem("dataSaving",JSON.stringify(dataSaving));
    }
    updateData() 

  // tạo ra hàm onclick trên cart mỗi khi nhấn
    let addToCart =(id)=>{
        if(dataSaving.some(item=>item.id === id)){
            dataSaving.some(item=>{if(item.id ===id){item.quantity++}})
            }
        else {
            const item = product__list.find(x =>x.id===id);
            console.log(product__list)
            dataSaving.push({...item, quantity:1});
        }
        updateData() 
        console.log(dataSaving)
    }

 window.addToCart = addToCart;
/**4- khi mở trang thì load hàm fetchApi đầu tiên **/
window.onload = function () { fetchApi() }