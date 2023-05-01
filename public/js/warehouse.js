const add = document.querySelector("#add");
const form =document.querySelector(".form");
const main = document.querySelector(".content")

const cancel = document.querySelector("#cancel");

add.addEventListener("click",() =>{
    form.classList.add("active")
    nav.classList.add("blur")
    main.classList.add("blur")
});

cancel.addEventListener("click",() =>{
    form.classList.remove("active")
    nav.classList.remove("blur")
    main.classList.remove("blur")
});