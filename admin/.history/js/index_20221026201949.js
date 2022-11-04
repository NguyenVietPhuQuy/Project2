product_list=[]
function createProduct(){
    let id = document.getElementById('id').value;
    let name= document.getElementById('name').value;
    let price = document.getElementById('price').value;
    let screen = document.getElementById('screen').value;
    let back = document.getElementById('backCamera').value;
    let front = document.getElementById('frontCamera').value;
    let imgProduct = document.getElementById('img').value;
    let desk = document.getElementById('information').value;
    let type = document.getElementById('type').value;
    let list = new product(id,name,price,screen,back,front,imgProduct,desk,type);
    // truyền dữ liệu xuống API để thêm sản phẩm dưới database

    let promise =axios({
        url: 'https://635205159d64d7c7130c9c5f.mockapi.io/products',
        method:"POST",
        data:list,
    })
    promise.then(function(response){console.log(response)},tableData())
            .catch(function(err){console.log(err)});
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
    <th><img src=${valTable.img}></img></th>
    <th>${valTable.desc}</th>									
    <th>${valTable.type}</th>
    <th>
    <button class="btn btn-danger" onclick=" deleteEmployee('${valTable.employeeID}') "> Xóa </button>
    </th>
    </tr>
     `
    }
    document.getElementById("tableDanhSach").innerHTML = tableHtml;
}

//*reload API về mỗi khi load trang lên
window.onload = function(){fetchApi()}
