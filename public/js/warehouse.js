const add = document.querySelector("#add");
const addform =document.querySelector(".add-form");
const main = document.querySelector(".content");
var edit = document.querySelectorAll("#edit");
const editform = document.querySelector(".edit-form");

const addcancel = document.querySelector("#add-cancel");
const editcancel = document.querySelector("#edit-cancel");

add.addEventListener("click",() =>{
    addform.classList.add("active")
    nav.classList.add("blur")
    main.classList.add("blur")
});

edit.forEach((button)=>{
    button.addEventListener("click",() =>{
        const actionform = document.querySelector("#editsubmit");
        const name = document.querySelector(".edit-form input#warehouse_name");
        const manager = document.querySelector(".edit-form input#manager_name");
        const email = document.querySelector(".edit-form input#email"); 
        const number = document.querySelector(".edit-form input#tel");
        const address = document.querySelector(".edit-form input#address");
        const street = document.querySelector(".edit-form input#street");
        const address2 = document.querySelector(".edit-form input#address2");
        const state = document.querySelector(".edit-form input#state");
        const city = document.querySelector(".edit-form input#city");
        const zipcode = document.querySelector(".edit-form input#zipcode");
        
        editform.classList.add("active")
        nav.classList.add("blur")
        main.classList.add("blur")

        let wh = JSON.parse(button.value);
        actionform.action = '/edw/'+ wh.warehouseID;
        name.value = wh.name;
        manager.value = wh.manager;
        address.value = wh.address;
        street.value = wh.street;
        address2.value = wh.address2;
        state.value = wh.state;
        city.value = wh.city;
        zipcode.value = wh.zipcode;
        email.value = wh.email;
        number.value = wh.number;
    });
});

addcancel.addEventListener("click",() =>{
    addform.classList.remove("active")
    nav.classList.remove("blur")
    main.classList.remove("blur")
});

editcancel.addEventListener("click",() =>{
    editform.classList.remove("active")
    nav.classList.remove("blur")
    main.classList.remove("blur")
});

