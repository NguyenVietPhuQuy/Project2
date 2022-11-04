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
    var valForm = validationForm();
    if (!valForm) return;
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
     alert("không có ID này! Vui lòng nhập lại");
     return -1
}
function getInformation(valID) {
    var getValue = document.getElementById("id").value;
    var valID = findID(getValue);
    axios(
        {
           url: `https://635205159d64d7c7130c9c5f.mockapi.io/products/${valID}`,
           method:"GET"
        }
    )
    .then(function(response){
        console.log(response.data)
        let returnInformation = response.data;
        document.getElementById('id').value = returnInformation.id;
        document.getElementById('name').value = returnInformation.name;
        document.getElementById('price').value = returnInformation.price;
        document.getElementById('screen').value = returnInformation.screen;
        document.getElementById('backCamera').value = returnInformation.backCamera;
        document.getElementById('frontCamera').value = returnInformation.frontCamera;
        document.getElementById('img').value = returnInformation.img;
        document.getElementById('information').value = returnInformation.desc;
        document.getElementById('type').value = returnInformation.type;
        
        document.getElementById("id").disabled =true;
        document.getElementById('btnCapNhat').style.display="none";
        document.getElementById('btnThemNV').style.display="none";
        document.getElementById("btnHoanThanh").style.display="block";

    })
    .catch(function(err){console.log(err)})
}

function saveInformation(id){
    var id = document.getElementById('id').value;
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
        url: `https://635205159d64d7c7130c9c5f.mockapi.io/products/${id}`,
        method: "PUT",
        data: list,
    })
    promise.then(function (response) 
        { console.log(response.data); 
            alert('cập nhập thành công');
            document.getElementById('id').value ="";
            document.getElementById('name').value="";
            document.getElementById('price').value="";
            document.getElementById('screen').value="";
            document.getElementById('backCamera').value="";
            document.getElementById('frontCamera').value="";
            document.getElementById('img').value="";
            document.getElementById('information').value="";
            document.getElementById('type').value="";
            document.getElementById("id").disabled =false;
            document.getElementById('btnCapNhat').style.display="block";
            document.getElementById('btnThemNV').style.display="block";
            document.getElementById("btnHoanThanh").style.display="none";
            fetchApi() })
        .catch(function (err) { console.log(err) });
}

//** 7--- Function Validation - Form

function getMyEl(el) { return document.getElementById(el); }

//**Tạo require --Create required-check--- 

function required(id, span) {
    var spanDiv = getMyEl(span);
    var result = getMyEl(id).value;
    if (result === "") {
        spanDiv.style.display = "inline-block";
        spanDiv.innerHTML = "*This field is required";
        return false;
    }
    spanDiv.innerHTML = "";
    return true;
}

function requiredSelect(id, span) {
    var spanDiv = getMyEl(span);
    var result = getMyEl(id).value;
    if (result === "Unknow") {
        spanDiv.style.display = "inline-block";
        spanDiv.innerHTML = "*This field need to be selected";
        return false;
    }
    spanDiv.innerHTML = "";
    return true;
}

function requiredSelect(id, span) {
    var spanDiv = getMyEl(span);
    var result = getMyEl(id).value;
    if (result === "Unknow") {
        spanDiv.style.display = "inline-block";
        spanDiv.innerHTML = "*This field need to be selected";
        return false;
    }
    spanDiv.innerHTML = ""
    return true;
}
//** tạo Length --Create length-check*/
function length(id, span, min, max) {
    var spanDiv = getMyEl(span);
    var result = getMyEl(id).value;
    if (result.length < min || result.length > max) {
        spanDiv.style.display = "inline-block";
        spanDiv.innerHTML = `*value limited, please input from ${min} to ${max} values`;
        return false;
    }
    spanDiv.innerHTML = ""
    return true;
}
function lengthValue(id, span, min, max) {
    var spanDiv = getMyEl(span);
    var result = getMyEl(id).value;
    if (result < min || result > max) {
        spanDiv.style.display = "inline-block";
        spanDiv.innerHTML = `*value limited, please input from ${min} to ${max} values`;
        return false;
    }
    spanDiv.innerHTML = ""
    return true;
}
//** tạo pattern - Create pattern validation **/


function patternName(id, span) {
    let spanDiv = getMyEl(span);
    let result = getMyEl(id).value;
    let pattern = /^[a-zA-Z0-9]+$/g;
    if (pattern.test(result)) {
        spanDiv.innerHTML = ""
        return true;
    }
    spanDiv.style.display = "inline-block";
    spanDiv.innerHTML = `*only word is accepted`;
    return false;
}

function patternPrice(id, span) {
    let spanDiv = getMyEl(span);
    let result = getMyEl(id).value;
    let pattern = /^([0-9])+$/g;
    if (pattern.test(result)) {
        spanDiv.innerHTML = ""
        return true;
    }
    spanDiv.style.display = "inline-block";
    spanDiv.innerHTML = `*only number is accepted`;
    return false;
}



//** Hàm tổng tích hợp các validation - Validation Form all */
function validationForm() {
    let isValid = true;
    isValid &= required("name", "spanName");
    isValid &= required("price", "spanPrice") && patternPrice("price", "spanPrice");
    isValid &= required("screen", "spanScreen");
    isValid &= required("backCamera", "spanbackcamera");
    isValid &= required("frontCamera", "spanfrontcamera");
    isValid &= required("img", "spanimg");
    isValid &= required("information", "spaninformation");
    isValid &= requiredSelect("type", "spantype");
    return isValid;
}
