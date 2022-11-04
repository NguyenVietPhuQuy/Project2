import Product from "../../../admin/js/product";


export default class ProductAxios {
    constructor() {};
  
       layDSSP () {
         return axios({
           method: "get",
           url: "https://635205159d64d7c7130c9c5f.mockapi.io/products"
         });
       };
     
       themSP (sp) {
         return axios({
           method: "post",
           url: "https://635205159d64d7c7130c9c5f.mockapi.io/products",
           data: sp
         });
       };
     
       xoaSP (id){
         return axios({
             method: "delete",
             url: `https://635205159d64d7c7130c9c5f.mockapi.io/products/${id}`,
           });
       }
       xemSP (id){
        return axios({
          method: "get",
          url: `https://635205159d64d7c7130c9c5f.mockapi.io/products/${id}`,
        });
       };
       capNhatSP(id, sp){
        return axios({
          method: "put",
          url: `https://635205159d64d7c7130c9c5f.mockapi.io/products/${id}`,
          data: sp
        });
       };
       timSP(){
         return axios({
           method: 'get',
          url: `https://635205159d64d7c7130c9c5f.mockapi.io/products`,
         })
       }
     }