import ProductAxios from "../Services/productAxios";


et sp = new ProductService();

let productList = [];

let getDataUI = () => {
     sp.layDSSP()
          .then( result=> {
               hienThiDS(result.data);
               localStorage.setItem("productList", productList)
               productList = result.data;
               console.log(productList);
          })
          .catch( error => {
               console.log(error);
          });
}
getDataUI();