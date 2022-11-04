const product =[];

/** Fetch API **/
let promise = axios (
    {
        url:"https://635205159d64d7c7130c9c5f.mockapi.io/products",
        method: "GET"
    }
)
promise.then(function(response){console.log(response.data)})
.catch(function(err){console.log(err)})
 
