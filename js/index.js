let boxWidth = $(".nav-tab").outerWidth();
let mealsData = document.getElementById("mealsData");
let buttonId;
$(document).ready(() => {
     SearchByName("").then(() => {
        $(".loading").fadeOut(500)
        $("body").css("overflow", "visible")

    })
})
function openSideNav(){
    $(".side-nav-menu").animate({left: 0},500)
    $(".open-close-icon").removeClass("fa-align-justify");
    $(".open-close-icon").addClass("fa-x");
    $(".links li ").animate({top: 0},500)

}
function closeSideNav() {
    $(".side-nav-menu").animate({left:-boxWidth},500)
    $(".open-close-icon").addClass("fa-align-justify")
    $(".open-close-icon").removeClass("fa-x")
    $(".links li ").animate({top:300},500)
}

closeSideNav();

$(".side-nav-menu i.open-close-icon").click(()=>{
     if($(".side-nav-menu").css("left")=="0px"){
        closeSideNav();
    }else{
        openSideNav();
    }
})

function displayMeals(arr){
    let box ="";

    for(let i = 0  ; i < arr.length ;i++){
        box+=`<div class="col-md-3">
                <div onclick="getFoodInsideHome(${arr[i].idMeal})" class="meal bg-info rounded-2 pointer">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="meal">
                    <div class="meal-layer d-flex align-items-center text-black p-2" >
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
            </div>`
    }
    mealsData.innerHTML=box
}
async function getCategores(){
    let response =await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response =await response.json()
    console.log(response.categories);
    displayCategores(response.categories)
}
function displayCategores(arr){
    let box ="";

    for(let i = 0  ; i < arr.length ;i++){
        box+=`<div class="col-md-3">
                <div onclick="getCategoriesInsideCategories('${arr[i].strCategory}')" class="meal rounded-2 pointer">
                    <img class="w-100" src="${arr[i].strCategoryThumb}" alt="meal">
                    <div class="meal-layer text-center text-black p-2" >
                        <h3>${arr[i].strCategory}</h3>
                        <p>${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
            </div>`
    }
    mealsData.innerHTML=box
}
async function getArea(){
    let response =await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    response =await response.json()
    console.log(response.meals);
    displayArea(response.meals)
}
function displayArea(arr){
    let box ="";

    for(let i = 0  ; i < arr.length ;i++){
        box+=`<div class="col-md-3">
                <div onclick="getFoodInsideArea('${arr[i].strArea}')" class="area rounded-2 text-center pointer ">
                    <i class="fa-solid fa-house-laptop "></i>
                    <h3>${arr[i].strArea}</h3>
                </div>
            </div>`
    }
    mealsData.innerHTML=box
}

async function getIngredients(){
    let response =await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    response =await response.json()
    console.log(response.meals);
    displayIngredients(response.meals.slice(0,20))
}
function displayIngredients(arr){
    let box ="";

    for(let i = 0  ; i < arr.length ;i++){
        box+=`<div class="col-md-3">
                <div onclick="getFoodInsideIngradiens('${arr[i].strIngredient}')" class="area rounded-2 text-center pointer">
                    <i class="fa-solid fa-drumstick-bite"></i>
                    <h3>${arr[i].strIngredient}</h3>
                    <p id="IngredientsDes">${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
            </div>`
    }
    mealsData.innerHTML=box
}
function getContactUs(){
    displayContactUs();
}
function displayContactUs(){
    let box ="";
        box+=`<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-50 text-center
    ">
        <div class="row g-4  ">
            <div class="col-md-6">
                <input onkeyup="validation()" id="inputName" type="text" class="form-control"placeholder="name">
            </div>
            <div class="col-md-6">
                <input onkeyup="validation()" id="inputEmail" type="email" class="form-control"placeholder="email">
            </div>
            <div class="col-md-6">
                <input onkeyup="validation()" id="inputPhone" type="text" class="form-control"placeholder="phone">
            </div>
            <div class="col-md-6">
                <input onkeyup="validation()" id="inputAge" type="number" class="form-control"placeholder="age">
            </div>
            <div class="col-md-6">
                <input onkeyup="validation()" id="inputPass" type="password" class="form-control"placeholder="password">
            </div>
            <div class="col-md-6">
                <input onkeyup="validation()" id="inputRePaa" type="password" class="form-control"placeholder="R-password">
            </div>
        </div>
        <button disabled id="buttonId" class="btn btn-outline-danger px-2 mt-3">submit</button>    
        
    </div>
</div>`
    
    mealsData.innerHTML=box
 buttonId= document.getElementById("buttonId");

}

function validation(){
    
    if(inputName()&&
    inputEmail()&&
    inputAge()&&
    inputPass()&&
    inputRePaa()&&
    inputPhone()){
        buttonId.removeAttribute("disabled")
    }

}

function inputName(){
  return (/^[a-zA-Z '.-]*$/.test(document.getElementById("inputName").value))
}
function inputPass(){
  return (/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(document.getElementById("inputPass").value))
}
function inputRePaa(){
  return (document.getElementById("inputRePaa").value) == (document.getElementById("inputPass").value)
}
function inputAge(){
  return (/^\S[0-9]{0,3}$/.test(document.getElementById("inputAge").value))
}
function inputPhone(){
  return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("inputPhone").value))
}

function inputEmail(){
  return  (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("inputEmail").value))
}




function displaySearch(term){
    let box ="";
        box+=`
    <div class="row py-4" >
        <div class="col-md-6">
            <input onkeyup="SearchByName(this.value)" class="form-control bg-transparent "  type="text" placeholder="Search by name ">
        </div>
        <div class="col-md-6">
            <input onkeyup="SearchByName(this.value)"  class="form-control bg-transparent " maxlength="1" type="text" placeholder="Search by frist latter ">
        </div>
    </div>
`
    
    mealsData.innerHTML=box
}
async function SearchByName(term){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    response = await response.json()
    console.log(response.meals);
    if(true){
        displayMeals(response.meals)
    }
    else{
        displayMeals([0])
    }
}
async function SearchByLatter(term){
    let response = await fetch(`www.themealdb.com/api/json/v1/1/search.php?f=a${term}`)
    response = await response.json()
    // console.log(response.meals);
    if(true){
        displayMeals(response.meals)
    }
    else{
        displayMeals([0])

    }
}
async function getCategoriesInsideCategories(categories){
  let  response =await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categories}`)
  response =await response.json();
displayMeals(response.meals.slice(0,20));  
}
async function getFoodInsideArea(categories){
  let  response =await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${categories}`)
  response =await response.json();
displayMeals(response.meals.slice(0,20));  
}
async function getFoodInsideIngradiens(categories){
  let  response =await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${categories}`)
  response =await response.json();
displayMeals(response.meals.slice(0,20));  
}
async function getFoodInsideHome(categories){
  let  response =await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${categories}`)
  response =await response.json();
  console.log(response);
  displayDetails(response.meals[0])
}
function displayDetails(data){
    let box ="";
        box+=`            <div class="col-md-4 ">
                <div class="imgs-layer ">
                    <img class="w-100 rounded-3" src="${data.strMealThumb}" alt="">
                    <h3>${data.strMeal}</h3>
                </div>
            </div>
            <div class="col-md-8 ">
                <div class="desc">
                    <h1>Instructions</h1>
                    <p>${data.strInstructions
                    }</p>
                    <h3><span>Area :${data.strArea}</span></h3>
                    <h3><span>Category : ${data.strCategory}</span></h3>
                    <h3><span>Recipes :</span></h3>
                    <ul class="d-flex list-unstyled m-3 flex-wrap g-3">
                        <li class="list bg-light text-black m-1 p-1 rounded-3 "> ${data.strMeasure1+data.strIngredient1} </li>
                        <li class="list bg-light text-black m-1 p-1 rounded-3 "> ${data.strMeasure2+data.strIngredient2}</li>
                        <li class="list bg-light text-black m-1 p-1 rounded-3 "> ${data.strMeasure3+data.strIngredient3}</li>
                        <li class="list bg-light text-black m-1 p-1 rounded-3 "> ${data.strMeasure4+data.strIngredient4}</li>
                        <li class="list bg-light text-black m-1 p-1 rounded-3 "> ${data.strMeasure5+data.strIngredient5}</li>
                        <li class="list bg-light text-black m-1 p-1 rounded-3 "> ${data.strMeasure6+data.strIngredient6}</li>
                        <li class="list bg-light text-black m-1 p-1 rounded-3 "> ${data.strMeasure7+data.strIngredient7}</li>
                        <li class="list bg-light text-black m-1 p-1 rounded-3 "> ${data.strMeasure8+data.strIngredient8}</li>
                        <li class="list bg-light text-black m-1 p-1 rounded-3 "> ${data.strMeasure9+data.strIngredient9}</li>
                        <li class="list bg-light text-black m-1 p-1 rounded-3 "> ${data.strMeasure10+data.strIngredient10}</li>

                    </ul>
                    <h3><span>Tags :${data.strTags}</span></h3>

                    <a class="btn btn-danger" href="${data.strSource}">source</a>
                    <a class="btn btn-success" href="${data.strYoutube}">Youtube</a>
                </div>
            </div>`
    
    mealsData.innerHTML=box
}
