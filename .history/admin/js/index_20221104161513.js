//*tạo mảng lưu trữ thông tin API trả về
product_list = []

//1-Fetch API
function fetchApi() {
    let promise = axios({
        url: 'https://635205159d64d7c7130c9c5f.mockapi.io/products',
        methot: "GET",
    })
    promise.then(function (res) { console.log(res.data); product_list = res.data; tableData() })
        .catch(function (err) { console.log(err) })
}
//*reload API về mỗi khi load trang lên
window.onload = function () { fetchApi() }

//2-in ra table
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
    <button class="btn btn-danger" onclick=" deleteProduct('${valTable.id}') "> Xóa </button> 
    </th>
    </tr>
     `
    }
    document.getElementById("tableDanhSach").innerHTML = tableHtml;
}

//3-Chức năng thêm sản phẩm
function createProduct() {
    let id = document.getElementById('id').value;
    let name = document.getElementById('name').value;
    let price = document.getElementById('price').value;
    let screen = document.getElementById('screen').value;
    let back = document.getElementById('backCamera').value;
    let front = document.getElementById('frontCamera').value;
    let imgProduct = document.getElementById('img').value;
    let desk = document.getElementById('information').value;
    let type = document.getElementById('type').value;
    let list = new product(id, name, price, screen, back, front, imgProduct, desk, type);
    // truyền dữ liệu xuống API để thêm sản phẩm dưới database
    let promise = axios({
        url: 'https://635205159d64d7c7130c9c5f.mockapi.io/products',
        method: "POST",
        data: list,
    })
    promise.then(function (response) { console.log(response.data); fetchApi() })
        .catch(function (err) { console.log(err) });
}

//4-chức năng xóa sản phẩm dựa vào id khi tạo button động ValTable.id
function deleteProduct(id) {
    axios({
        url: `https://635205159d64d7c7130c9c5f.mockapi.io/products/${id}`,
        method: "DELETE"
    })
        .then(function (response) { console.log(response); fetchApi() })
        .catch(function (err) { console.log(err) })
}


//5-chức năng tìm kiếm sản phẩm
function searchProduct() {
    search = [];
    let keyword = document.getElementById('searchName').value.trim().toLowerCase();
    //check type
    for (let i = 0; i < product_list.length; i++) {
        let productCompare = product_list[i].type.toLowerCase().trim()
        if (productCompare.includes(keyword)) { search.push(product_list[i]) }
    };
    //check name
    for (let i = 0; i < product_list.length; i++) {
        let productName = product_list[i].name.toLowerCase().trim()
        if (productName.includes(keyword)) { search.push(product_list[i]) }
    };
    //check screen
    for (let i = 0; i < product_list.length; i++) {
        let productScreen = product_list[i].screen.toLowerCase().trim()
        if (productScreen.includes(keyword)) { search.push(product_list[i]) }
    };
    tableData(search);
}

//6-chức năng cập nhập sản phẩm
function findID(returnId) {
    for (let item of product_list) {
        let idResult = item.id;
        if (idResult === returnId) { return idResult };
    }
    return -1;
}




// function getInformation() {
//     document.getElementById('id').value = id;
//     document.getElementById('name').value = name;
//     document.getElementById('price').value = price;
//     document.getElementById('screen').value = screen;
//     document.getElementById('backCamera').value = back;
//     document.getElementById('frontCamera').value = front;
//     document.getElementById('img').value = imgProduct;
//     document.getElementById('information').value = desk;
//     document.getElementById('type').value = type;

// }