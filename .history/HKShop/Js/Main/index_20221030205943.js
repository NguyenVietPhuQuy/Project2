const product = [];

/** Fetch API **/
function fetchApi(){
axios(
    {
        url: "https://635205159d64d7c7130c9c5f.mockapi.io/products",
        method: "GET"
    }
)
    .then(function (response) { console.log(response.data), renderData(response.data) })
    .catch(function (err) { console.log(err) })

}
/*renderData*/

function renderData(data) {
    if (!data) data = product;
    const renderHTML = ''
    for (var i = 0; i < data.length; i++) {
        let result = data[i];
        renderHTML +=`
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
            </div>
        </div>
        </div>
        `
    }
    document.getElementById('product__items').innerHTML = renderHTML;
}

window.onload = function() {fetchApi()}