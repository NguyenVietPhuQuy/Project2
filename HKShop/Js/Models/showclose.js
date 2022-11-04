const cartClose = document.querySelector(".fa-close")
const cartShow = document.querySelector(".fa-show")
cartShow.addEventListener("click",function(){
    document.querySelector(".cart").style.right = "0"
})
cartClose.addEventListener("click",function(){
    document.querySelector(".cart").style.right = "-100%"
})