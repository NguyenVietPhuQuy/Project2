product_list=[]
let createProduct = () =>{
    let id = document.getElementById('id').value;
    let name= document.getElementById('name').value;
    let price = document.getElementById('price').value;
    let screen = document.getElementById('screen').value;
    let backCamera= document.getElementById('backcamera').value;
    let frontCamera = document.getElementById('frontcamera').value;
    let desk = document.getElementById().value;
    let type = document.getElementById().value;
    let list = new product(id,name,price,screen,backCamera,frontCamera,desk,type);
}




//*Fetch API
function fetchApi(){
let promise= axios({
    url:'https://635205159d64d7c7130c9c5f.mockapi.io/products',
    methot:"GET",
})
promise.then(function(res){console.log(res.data);tableData()})
        .catch(function(err){console.log(err)})
    }

//*in ra table
function tableData(data){
    if (!data) {data = product_list;}
    tableHTML='';
    for (let item of data){
    tableHTML +=`<tr>
    <th>${item.id}</th>
    <th>${item.name}</th>
    <th>${item.price}</th>
    <th>${item.screen}</th>
    <th>${item.backCamera}</th>
    <th>${item.frontCamera}</th>
    <th>${item.img}</th>
    <th>${item.desk}</th>
    <th>${item.type}</th>
    <th><em class="fa fa-cog"></em></th>
    </tr>
    `
}
    document.getElementById('printJS').innerHTML=tableHTML;
}

//*reload API về mỗi khi load trang lên
window.onload = function(){fetchApi()}
