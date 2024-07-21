// variables
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mood = "create"; // to control mood app
let swaping; // global variable to appear all function
let moodSearch; // to control mood search
// variable form reciept
let clientName = document.getElementById("clientName");
let clientAddress = document.getElementById("clientAddress");
let phone = document.getElementById("phone");
let tbodyForReciept = "";
// ****************************************************************

//calc total
function calcTotal() {
    // condition for sure from price not empty
    if (price.value !== "") {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = "#060";
    }
    else {
        total.innerHTML = "";
        total.style.background = "red";
    }
}
// ****************************************************************

// create product
//the first create array for saving
let dataProduct;
if (localStorage.product != null) {
    dataProduct = JSON.parse(localStorage.product)
}
else {
    dataProduct = [];
}
// when click on submit
submit.onclick = function () {
    // the second create object to collect property's product
    let newProduct = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }
    if (title.value !== "" && price.value !== "") {
        if (count.value < 100) {
            // when mood app => create
            if (mood === "create") {

                // push project in array
                // create product same as number of count
                if (newProduct.count > 1) {
                    for (let i = 0; i < newProduct.count; i++) {
                        dataProduct.push(newProduct);
                    }
                }
                else {
                    dataProduct.push(newProduct);
                }
            }
            //when mood app => update
            else {
                dataProduct[swaping] = newProduct;
                mood = "create";
                submit.innerHTML = "create";
                count.style.display = "block";
            }
            clearData();
        }
        else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "must have count less than 100",
            });
        }
    }
    else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: 'please check data'
        });

    }
    //store in local storge => using JSON to convert to string because local stortge
    window.localStorage.setItem("product", JSON.stringify(dataProduct));
    showData();
}
// ****************************************************************

// clear input => after creating
function clearData() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
}
// ****************************************************************

//show date in table after reading data
function showData() {
    let table = "";
    for (let i = 0; i < dataProduct.length; i++) {
        table += `
        <tr>
            <td>${i + 1}</td>
            <td>${dataProduct[i].title}</td>
            <td>${dataProduct[i].price}</td>
            <td>${dataProduct[i].taxes}</td>
            <td>${dataProduct[i].ads}</td>
            <td>${dataProduct[i].discount}</td>
            <td>${dataProduct[i].total}</td>
            <td>${dataProduct[i].category}</td>
            <td><button id= "update" onclick = "updateDate(${i})"><i class = "fas fa-upload"></i></button></td>
            <td><button onclick="deleteData(${i})" id= "delete"><i class = "fas fa-trash"></i></button></td>
        </tr>
        `
    }

    document.getElementById("tbody").innerHTML = table;
    let btnDeleteAll = document.getElementById("deleteall");
    if (dataProduct.length > 0) {
        btnDeleteAll.innerHTML = `
        <button onclick="deleteAll()">delete all(${dataProduct.length})</button>
        <button id="myBtn" onclick="makeReceipt()">make receipt</button>
        `
    }
    else {
        btnDeleteAll.innerHTML = "";
    }
    calcTotal();
}
// ****************************************************************
// show data in all time
showData();


// delete one product
function deleteData(id) {
    dataProduct.splice(id, 1);
    window.localStorage.product = JSON.stringify(dataProduct);
    showData();
}
// ****************************************************************

//delete all product
function deleteAll() {
    // using sweetalart2 
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#590264",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.clear();
            dataProduct.splice(0);
            showData();
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        }
    });
}
// ****************************************************************

// update
function updateDate(id) {
    title.value = dataProduct[id].title;
    price.value = dataProduct[id].price;
    taxes.value = dataProduct[id].taxes;
    ads.value = dataProduct[id].ads;
    discount.value = dataProduct[id].discount;
    calcTotal();
    category.value = dataProduct[id].category;
    count.style.display = "none";
    submit.innerHTML = "update";
    mood = "update";
    swaping = id;
    scroll({
        top: 0,
        behavior: "smooth",
    });
}
// ****************************************************************

//search
function search(id) {
    let searchInput = document.getElementById("search");
    if (id === "searchTilte") {
        moodSearch = "title";
        searchInput.placeholder = "search by title";
    }
    else {
        searchInput.placeholder = "search by category";
        moodSearch = "category";
    }
    searchInput.focus();
    searchInput.value = "";
    showData();
}

function searchDate(val) {
    let table = "";
    if (moodSearch === "title") {
        for (let i = 0; i < dataProduct.length; i++) {
            if (dataProduct[i].title.includes(val.toLowerCase())) {
                table += `
            <tr>
            <td>${i + 1}</td>
            <td>${dataProduct[i].title}</td>
            <td>${dataProduct[i].price}</td>
            <td>${dataProduct[i].taxes}</td>
            <td>${dataProduct[i].ads}</td>
            <td>${dataProduct[i].discount}</td>
            <td>${dataProduct[i].total}</td>
            <td>${dataProduct[i].category}</td>
            <td><button id= "update" onclick = "updateDate(${i})"><i class = "fas fa-upload"></i></button></td>
            <td><button onclick="deleteData(${i})" id= "delete"><i class = "fas fa-trash"></i></button></td>
            </tr>
            `
            }
        }
    }
    else {
        for (let i = 0; i < dataProduct.length; i++) {
            if (dataProduct[i].category.includes(val.toLowerCase())) {
                table += `
            <tr>
            <td>${i + 1}</td>
            <td>${dataProduct[i].title}</td>
            <td>${dataProduct[i].price}</td>
            <td>${dataProduct[i].taxes}</td>
            <td>${dataProduct[i].ads}</td>
            <td>${dataProduct[i].discount}</td>
            <td>${dataProduct[i].total}</td>
            <td>${dataProduct[i].category}</td>
            <td><button id= "update" onclick = "updateDate(${i})"><i class = "fas fa-upload"></i></button></td>
            <td><button onclick="deleteData(${i})" id= "delete"><i class = "fas fa-trash"></i></button></td>
            </tr>
            `
            }
        }
    }
    document.getElementById("tbody").innerHTML = table;
}

function makeReceipt() {
    document.getElementById("modelContent").style.display = "block";
    document.getElementById("modelContent2").style.display = "none";
    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal
    btn.onclick = function () {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }

    }

    showDataInModal();
}

let newArray = [];
let firstArray = [];

function add(id) {
    document.getElementById("tableForReciept").style.display = "table";
    document.getElementById("tbodyForReciept").style.display = "content";
    newArray.push(dataProduct[id])
    dataProduct.splice(id, 1);

    showDataInModal();
    showDataInReciept();
    document.getElementById("save").onclick = function () {

        window.localStorage.product = JSON.stringify(dataProduct);
        document.getElementById("myModal").style.display = "none";
        newArray = [];
        reset();
        showData();
    }
}


function showDataInReciept() {
    let table = "";
    for (let i = 0; i < newArray.length; i++) {
        table += `
            <tr>
                <td>${i + 1}</td>
                <td>${newArray[i].title}</td>
                <td>${newArray[i].total}</td>
                <td>${newArray[i].category}</td>
                <td><button onclick = "deleteFromReciept(${i})"><i class ="fas fa-trash"></i></button></td>
            </tr>
        `
    }
    document.getElementById("tbodyForReciept").innerHTML = table;
}


function deleteFromReciept(id) {
    dataProduct.push(newArray[id]);
    newArray.splice(id, 1);
    document.getElementById("tbodyForModal").innerHTML = "";
    showDataInReciept();
    showDataInModal();
}

function showDataInModal() {
    let table = '';
    for (let i = 0; i < dataProduct.length; i++) {
        table += `
        <tr id="${i}">
        <td>${i + 1}</td>
        <td>${dataProduct[i].title}</td>
        <td>${dataProduct[i].total}</td>
        <td>${dataProduct[i].category}</td>
        <td><button onclick="add(${i})" id= "add"><i class = "fas fa-plus"></i></button></td>
        </tr>
        `
    }
    document.getElementById("tbodyForModal").innerHTML = table;
}



// function add(id) {
//     console.log(id)
//     if (clientName.value != "" && phone.value != "") {

//         document.getElementById("save").onclick = function () {

//             window.localStorage.product = JSON.stringify(dataProduct);
//             showData();
//         }
//         document.getElementById("searchInModal").value = "";
//         showDataInModal();
//         document.getElementById("tableForReciept").style.display = "table";
//         document.getElementById("tbodyForReciept").style.display = "content";
//         tbodyForReciept += `
//         <tr>
//             <td>${id}</td>
//             <td>${dataProduct[id].title}</td>
//             <td>${dataProduct[id].total}</td>
//             <td>${dataProduct[id].category}</td>
//             <td><button><i class ="fas fa-trash"></i></button></td>
//             </tr>
//             `
//         document.getElementById(`${id}`).style.display = "none";
//         document.getElementById("tbodyForReciept").innerHTML = tbodyForReciept;

//     }
//     else {
//         Swal.fire({
//             icon: "error",
//             title: "Oops...",
//             text: "Something went wrong!",
//             footer: 'first fill data'
//         });
//     }


// }

function searchDateInModal(val) {
    let table = "";
    for (let i = 0; i < dataProduct.length; i++) {
        if (dataProduct[i].title.includes(val.toLowerCase())) {
            table += `
        <tr>
        <td>${i + 1}</td>
        <td>${dataProduct[i].title}</td>
        <td>${dataProduct[i].total}</td>
        <td>${dataProduct[i].category}</td>
        <td><button onclick="add(${i})" id= "add"><i class = "fas fa-plus"></i></button></td>
        </tr>
        `
        }
    }
    document.getElementById("tbodyForModal").innerHTML = table;
}

function next() {
    if (clientName.value !== "" && phone !== "") {
        document.getElementById("modelContent2").style.display = "block";
        document.getElementById("modelContent").style.display = "none";
        document.getElementById("contentReciept").innerHTML = `
    <h5>client name : </h5><span>${clientName.value}</span>
    <hr>
    <h5>client address : </h5><span>${clientAddress.value}</span>
    <hr>
    <h5>phone : </h5><span>${phone.value}</span>
    <hr>
    <h5>Date : </h5><small>${Date()}</small>
    `
    }
    else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: 'please check data'
        });
    }
}

function previous() {

    document.getElementById("modelContent2").style.display = "none";
    document.getElementById("modelContent").style.display = "block";

}

function reset() {
    clientName.value = "";
    clientAddress.value = "";
    phone.value = "";
    document.getElementById("tbodyForReciept").innerHTML = "";
    document.getElementById("contentReciept").innerHTML = ``;
}


const body = document.querySelector("body");
const toggle = document.getElementById("toggle");
const modelContent = document.getElementById("modelContent");
const modelContent2 = document.getElementById("modelContent2");
const inputs = document.querySelectorAll("input");
toggle.onclick = function() {
    
    toggle.classList.toggle("active");
    body.classList.toggle("active");
    modelContent.classList.toggle("active-toggle");
    modelContent2.classList.toggle("active-toggle");
    inputs.forEach(function(ele) {
        ele.classList.toggle("active");
    });
}

let upButton = document.getElementById("up");
onscroll = function() {
    if(this.scrollY >= 440) {
        upButton.style.display="block";
    }
    else {
        upButton.style.display="none";
    }
}

upButton.onclick = function() {
    window.scrollTo({
        top:0,
        behavior: "smooth",
    })
}

