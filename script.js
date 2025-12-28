const apiKey = "843b9e78f90cba2fff89d5f5821c7cc7";

const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");
const bgContainer = document.getElementById("bg-container");
const weatherCard = document.querySelector(".weather-card");

async function checkWeather(city) {
    if (!city) return;

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );

        if (!response.ok) {
            alert("City not found");
            return;
        }

        const data = await response.json();

        document.getElementById("city-name").textContent = data.name;
        document.getElementById("temp").textContent = Math.round(data.main.temp) + "°C";
        document.getElementById("humidity").textContent = data.main.humidity + "%";
        document.getElementById("wind").textContent = data.wind.speed + " km/h";

        const desc = data.weather[0].description;
        document.getElementById("description").textContent =
            desc.charAt(0).toUpperCase() + desc.slice(1);

        document.getElementById("weather-icon").src =
            `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

        updateBackground(data.weather[0].main);

        weatherCard.style.opacity = "1";
        weatherCard.style.transform = "translateY(0)";
    } catch (err) {
        console.error(err);
    }
}

function updateBackground(condition) {
    const type = condition.toLowerCase();
    let url = "";

    if (type.includes("cloud")) {
        url = "https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?q=80&w=1920";
    } else if (type.includes("clear")) {
        url = "https://images.unsplash.com/photo-1506466010722-395aa2bef877?q=80&w=1920";
    } else if (type.includes("rain")) {
        url = "https://images.unsplash.com/photo-1534274988757-a28bf1f539cf?q=80&w=1920";
    } else if (type.includes("snow")) {
        url = "https://images.unsplash.com/photo-1478265409131-1f65c88f965c?q=80&w=1920";
    } else if (type.includes("mist") || type.includes("fog")) {
        url = "https://images.unsplash.com/photo-1543968996-ee822b8176ba?q=80&w=1920";
    } else {
        url = "https://images.unsplash.com/photo-1516912481808-34061f8bc9a2?q=80&w=1920";
    }

    bgContainer.style.backgroundImage =
        `linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)),url('${url}')`;
}

searchBtn.addEventListener("click", () => {
    checkWeather(cityInput.value.trim());
});

cityInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        checkWeather(cityInput.value.trim());
    }
});

window.onload = () => checkWeather("London");
