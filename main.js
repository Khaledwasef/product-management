
let tilte = document.getElementById("title");
let price = document.getElementById("price");
let tasxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mood = "create";
let tmp;
let searchForm = document.getElementById("search");
searchForm.style.display = "none";
// get total price
function getTotal() {
    if (price.value != "") {
        let result = (+price.value + +tasxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = `green`;
    }
    else {
        total.innerHTML = "";
        total.style.backgroundColor = "#a00d02";
    }
}
// create product
let dateProduct = [];
if (localStorage.product != null) {
    dateProduct = JSON.parse(localStorage.product)
}
else {
    dateProduct = [];
}

submit.onclick = function () {
    let newPriduct = {
        tilte: tilte.value.toLowerCase(),
        price: price.value,
        tasxes: tasxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }
    if (tilte.value != "" && price.value != "" && category.value != "" && newPriduct.count <= 100) {
        if (mood === "create") {
            if (newPriduct.count > 1) {
                for (let i = 0; i < newPriduct.count; i++) {
                    dateProduct.push(newPriduct);
                }
            } else {
                dateProduct.push(newPriduct);
            }
        } else {
            dateProduct[tmp] = newPriduct;
            mood = "create";
            submit.innerHTML = "create";
            count.style.display = "block";
        }
        clearData();
    }


    window.localStorage.setItem("product", JSON.stringify(dateProduct));
    console.log(dateProduct);
    clearData();
    showData();

}


// clear for inputs
function clearData() {
    tilte.value = "";
    price.value = "";
    tasxes.value = "";
    ads.value = "";
    discount.value = "";
    count.value = "";
    total.innerHTML = "";
    category.value = "";
}

//read
function showData() {
    let table = "";
    for (let i = 0; i < dateProduct.length; i++) {
        table += `
        <tr>
            <td>${i + 1}</td>
            <td>${dateProduct[i].tilte}</td>
            <td>${dateProduct[i].price}</td>
            <td>${dateProduct[i].tasxes}</td>
            <td>${dateProduct[i].ads}</td>
            <td>${dateProduct[i].discount}</td>
            <td>${dateProduct[i].total}</td>
            <td>${dateProduct[i].category}</td>
            <td><button id= "update" onclick = "updateDate(${i})">update</button></td>
            <td><button onclick="deleteData(${i})" id= "delete">delete</button></td>
           
        </tr>
        `
    }

    document.getElementById("tbody").innerHTML = table;
    let btnDelete = document.getElementById("deleteAll");
    if (dateProduct.length > 0) {
        btnDelete.style.display = "block";
    }
    else {
        btnDelete.style.display = "none";
    }
    getTotal();
}

showData();
// delete
function deleteData(i) {
    dateProduct.splice(i, 1);
    localStorage.product = JSON.stringify(dateProduct);
    showData();
}

//update
function updateDate(i) {
    tilte.value = dateProduct[i].tilte;
    price.value = dateProduct[i].price;
    tasxes.value = dateProduct[i].tasxes;
    ads.value = dateProduct[i].ads;
    discount.value = dateProduct[i].discount;
    category.value = dateProduct[i].category;
    count.style.display = "none";
    submit.innerHTML = "update";
    getTotal();
    mood = "update";
    tmp = i;
    scroll({
        top: 0,
        behavior: "smooth",
    })
}

//search
let moodSearch = "title";
function searchProduct(id) {
    searchForm.style.display = "block";
    searchForm.focus();
    searchForm.value = "";
    showData();
    if (id === "searchTitle") {
        moodSearch = "title";
        searchForm.placeholder = "search by title";
    }
    else {
        moodSearch = "category";
        searchForm.placeholder = "search by category";
    }
}

function searchDate(value) {
    let table = "";
    if (moodSearch === "title") {
        for (let i = 0; i < dateProduct.length; i++) {
            if (dateProduct[i].tilte.includes(value.toLowerCase())) {
                table += `
        <tr>
            <td>${i + 1}</td>
            <td>${dateProduct[i].tilte}</td>
            <td>${dateProduct[i].price}</td>
            <td>${dateProduct[i].tasxes}</td>
            <td>${dateProduct[i].ads}</td>
            <td>${dateProduct[i].discount}</td>
            <td>${dateProduct[i].total}</td>
            <td>${dateProduct[i].category}</td>
            <td><button id= "update" onclick = "updateDate(${i})">update</button></td>
            <td><button onclick="deleteData(${i})" id= "delete">delete</button></td>
           
        </tr>
        `
            }
        }
    }

    else {
        for (let i = 0; i < dateProduct.length; i++) {
            if (dateProduct[i].category.includes(value)) {
                table += `
        <tr>
            <td>${i + 1}</td>
            <td>${dateProduct[i].tilte}</td>
            <td>${dateProduct[i].price}</td>
            <td>${dateProduct[i].tasxes}</td>
            <td>${dateProduct[i].ads}</td>
            <td>${dateProduct[i].discount}</td>
            <td>${dateProduct[i].total}</td>
            <td>${dateProduct[i].category}</td>
            <td><button id= "update" onclick = "updateDate(${i})">update</button></td>
            <td><button onclick="deleteData(${i})" id= "delete">delete</button></td>
           
        </tr>
        `
            }
        }
    }

    document.getElementById("tbody").innerHTML = table;
}

function deleteAll() {
    localStorage.clear();
    dateProduct.splice(0);
    showData();
}

//clean data 
