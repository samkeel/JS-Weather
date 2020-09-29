const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {
    console.log(data);
    // const cityDetails = data.cityDetails;
    // const weather = data.weather;    

    // destructure properties
    const { cityDetails, weather } = data;

    //update template details
    details.innerHTML = `
        <h5 class="my-3">${cityDetails.EnglishName}, ${cityDetails.AdministrativeArea.EnglishName}</h5>
            <div class="my-3">${weather.WeatherText}</div>
            <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    // remove d-none class if present
    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }
};

const updateCity = async (city) => {
    const cityDetails = await getCity(city);
    const weather = await getWeather(cityDetails.Key);

    return {
        cityDetails,
        weather
    };
};

cityForm.addEventListener('submit', e => {
    e.preventDefault();
    // get form city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    // update the UI with the city info
    updateCity(city)
        // .then(data => console.log(data))
        .then(data => updateUI(data))
        .catch(err => console.log(err));
});