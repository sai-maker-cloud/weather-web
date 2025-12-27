const apiKey = "843b9e78f90cba2fff89d5f5821c7cc7";
const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");
const bgContainer = document.getElementById("bg-container");

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
        document.getElementById("temp").textContent = `${Math.round(data.main.temp)}°C`;
        document.getElementById("humidity").textContent = `${data.main.humidity}%`;
        document.getElementById("wind-speed").textContent = `${data.wind.speed} km/h`;
        
        const desc = data.weather[0].description;
        document.getElementById("description").textContent = desc.charAt(0).toUpperCase() + desc.slice(1);

        const iconCode = data.weather[0].icon;
        document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        updateBackground(data.weather[0].main);

        const weatherInfo = document.getElementById("weather-info");
        weatherInfo.style.display = "block";
        weatherInfo.style.opacity = "1";

    } catch (error) {
        console.error(error);
    }
}

function updateBackground(condition) {
    const type = condition.toLowerCase();
    let url = "";

    if (type.includes("cloud")) {
        url = "https://www.peakpx.com/en/hd-wallpaper-desktop-ogazg";
    } else if (type.includes("clear")) {
        url = "https://images.unsplash.com/photo-1506466010722-395aa2bef877?q=80&w=1920";
    } else if (type.includes("rain") || type.includes("drizzle")) {
        url = "https://images.unsplash.com/photo-1534274988757-a28bf1f539cf?q=80&w=1920";
    } else if (type.includes("snow")) {
        url = "https://images.unsplash.com/photo-1478265409131-1f65c88f965c?q=80&w=1920";
    } else if (type.includes("mist") || type.includes("haze") || type.includes("fog")) {
        url = "https://images.unsplash.com/photo-1543968996-ee822b8176ba?q=80&w=1920";
    } else if (type.includes("thunderstorm")) {
        url = "https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?q=80&w=1920";
    } else {
        url = "https://images.unsplash.com/photo-1516912481808-34061f8bc9a2?q=80&w=1920";
    }

    bgContainer.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${url}')`;
}

searchBtn.addEventListener("click", () => checkWeather(cityInput.value));

cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") checkWeather(cityInput.value);
});

window.onload = () => checkWeather("London");