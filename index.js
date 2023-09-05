import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push ,onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-97e6f-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    push(shoppingListInDB, inputValue)
    
    clearInputFieldEl()
    // appendItemToShoppingListEl(inputValue)
})

onValue(shoppingListInDB, function(snapshot) {

    if(snapshot.exists()){
    let itemArray = Object.entries(snapshot.val())
    
     clearShoppingFieldEl()

    for (let i = 0; i < itemArray.length; i++) {
        let currentItem = itemArray[i]
        let currentItemID = currentItem[0]
        let currentItemValue = currentItem[1]
        appendItemToShoppingListEl(currentItem)    
    }
}else{
    shoppingListEl.innerHTML = "No item here....yet"
}
})

function clearShoppingFieldEl() {
    shoppingListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToShoppingListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")
    newEl.textContent = itemValue

    newEl.addEventListener("click", function () {
        let exactLocationOfItemDB = ref(database,`shoppingList/${itemID}`)
        remove(exactLocationOfItemDB)    
    })

    shoppingListEl.append(newEl)
}


document.querySelector('.switcher-btn').onclick = () =>{
    document.querySelector('.switcher').classList.toggle('active');
}

const themeButtons = document.querySelectorAll('.theme-buttons');

const defaulttheme = localStorage.getItem('theme') || 'image1';
setTheme(defaulttheme);

themeButtons.forEach(char => {
    
char.addEventListener("click", (e)=> {
   let spanValue = char.getAttribute('data-value');
    setTheme(spanValue)
})
});

function setTheme(theme){
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
}
