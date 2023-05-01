const list = document.querySelector("#arrow-list")
const nav = document.querySelector(".sidebar")
const content = document.querySelector(".content")

list.addEventListener("click", ()=>{
    if(nav.classList.contains("hide")){
        nav.classList.remove("hide")
        content.classList.add("active")
    }else{
        nav.classList.add("hide")
        content.classList.remove("active")
    }
})