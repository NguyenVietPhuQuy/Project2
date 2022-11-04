import ProductAxios from "../Services/productAxios";


let sp = new ProductAxios();

let productList = [];

let getDataUI = () => {
     sp.layDSSP()
          .then( result=> {
               
               localStorage.setItem("productList", productList)
               productList = result.data;
               console.log(productList);
          })
          .catch( error => {
               console.log(error);
          });
}
getDataUI();