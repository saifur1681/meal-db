const InputFieldValue = async () => {
    const inputFieldId = document.getElementById('search-field');
    const inputFieldValue = inputFieldId.value;

    if (inputFieldValue.length == 0) {
        document.getElementById('displayData-div').textContent = '';
        const errorDiv = document.getElementById('errordiv')
        const h3 = document.createElement('h3');
        h3.innerText = 'Please enter your food name';
        errorDiv.appendChild(h3);
    }

    else {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputFieldValue}`
        const res = await fetch(url)
        const data = await res.json()
        displayDataMeal(data.meals)
    }
    inputFieldId.value = "";

};

const displayDataMeal = meals => {
    const displayDataDiv = document.getElementById('displayData-div');
    displayDataDiv.textContent = '';
    document.getElementById('errordiv').textContent = '';
    document.getElementById('sigleMeal-div').textContent = '';
    // error handeling.....
    /*  if (meals.length == -1) {
         const errorDiv = document.getElementById('errordiv')
         const h3 = document.createElement('h3');
         h3.innerText = 'No Food Found';
         errorDiv.appendChild(h3);
      } */
    meals.forEach(meal => {
        console.log(meal)
        const div = document.createElement('div')
        div.innerHTML = `
        <div onclick="loadMealById('${meal.idMeal}')" class="col">
        <div class="card">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions.slice(0, 200)}
                    </p>
            </div>
        </div>
    </div>
        `;
        displayDataDiv.appendChild(div);
    })
};

const loadMealById = async mealId => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`

    const res = await fetch(url)
    const data = await res.json()
    displayMealById(data.meals[0])
};

const displayMealById = meal => {
    // console.log(meal)
    const singleMealDiv = document.getElementById('sigleMeal-div');
    singleMealDiv.textContent = '';
    const div = document.createElement('div')
    div.innerHTML = `
    <div class="card mx-auto w-50" style="width: 18rem;">
  <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${meal.strMeal}</h5>
    <p class="card-text">${meal.strInstructions.slice(0, 300)}</p>
    <a href="${meal.strYoutube}" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
    `;
    singleMealDiv.appendChild(div)
}