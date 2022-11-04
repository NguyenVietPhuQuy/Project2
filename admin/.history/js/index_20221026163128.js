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
promise.then(function(res){console.log(res.data);tableData(res.data)})
        .catch(function(err){console.log(err)})
    }

//*in ra table
function tableData(data) {
    if (!data) data = product_list;
    var tableHtml = '';
    for (var i = 0; i < data.length; i++) {
        var valTable = data[i]
        tableHtml +=
            `<tr>
    <th>${valTable.id}</th>
    <th>${valTable.name}</th>
    <th>${valTable.price}</th>
    <th>${valTable.screen}</th>
    <th>${valTable.backCamera}</th>									
    <th>${valTable.frontCamera}</th>
    <th>${valTable.img}</th>
    <th>${valTable.desc}</th>									
    <th>${valTable.type}</th>
    <th>
    <button class="btn btn-danger" onclick=" deleteEmployee('${valTable.employeeID}') "> Xóa </button>
    </th>
    </tr>
     `
    }
    console.log(tableHtml)
    document.getElementById("tableDanhSach").innerHTML = tableHtml;
}

//*reload API về mỗi khi load trang lên
window.onload = function(){fetchApi()}
