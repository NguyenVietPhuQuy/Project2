product_list=[]
let createProduct = () =>{
    let id = document.getElementById('id').value
    let name= document.getElementById('name').value
    let price = document.getElementById('price').value
    let screen = document.getElementById('screen').value
    let backCamera= document.getElementById().value
    let frontCamera = document.getElementById().value
    let desk = document.getElementById().value
    let type = document.getElementById().value
}
function fetchApi (){
 axios({
    url:'https://635205159d64d7c7130c9c5f.mockapi.io/products',
    methot:"GET",
})
.then(function(res){console.log(res.data)})
        .catch(function(err){console.log(err)})
    }