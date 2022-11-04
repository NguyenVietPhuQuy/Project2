const cartClose = document.querySelector(".fa-close")
const cartShow = document.querySelector(".fa-show")
cartShow.addEventListener("click",function(){
    document.querySelector(".cart").style.right = "129px"
})
cartClose.addEventListener("click",function(){
    document.querySelector(".cart").style.right = "-100%"
})