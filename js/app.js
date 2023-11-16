const formEl = document.querySelector('#search-form')
const inputEl = document.querySelector('#search-input')
const buttonEl = document.querySelector('#search-btn')
const mealsEl = document.querySelector('#meals')

function fetchMeals(mealName = 'Chicken') {
	buttonEl.innerHTML = 'Loading...'
	buttonEl.setAttribute('disabled', true)
	fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
		.then(res => res.json())
		.then(data => renderMeals(data.meals))
		.catch(error => console.log(error))
		.finally(() => {
			buttonEl.innerHTML = 'Search'
			buttonEl.removeAttribute('disabled')
		})
}

function renderMeals(meals = []) {
	mealsEl.innerHTML = ''

	meals.map(item => {
		mealsEl.innerHTML += `
      <div class='shadow-md rounded-xl p-4'>
        <img class='w-full h-[250px] rounded-xl object-cover' src='${item.strMealThumb}'>

        <h2 class='text-xl mt-3 text-gray-700 text-center'>${item.strMeal}</h2>
      </div>
    `
	})
}

formEl.addEventListener('submit', e => {
	e.preventDefault()
	fetchMeals(inputEl.value)
})

fetchMeals()
