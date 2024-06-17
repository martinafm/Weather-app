const APIKey = "335a97c2eaa043397dcd8937779c2841";
const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
	e.preventDefault();
	const location = document.getElementById("location").value;
	getEntranceWeather(location);
});

function getEntranceWeather(location) {
	document.getElementById("error-msg").textContent = "";
	const APIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIKey}&lang=pl&units=metric`;

	fetch(APIUrl)
		.then((res) => {
			if (!res.ok) {
				const errorMsg = document.getElementById("error-msg");
				if (res.status === 404) {
					errorMsg.textContent = "Nie znaleziono podanej lokalizacji.";
				} else if (res.status === 401) {
					errorMsg.textContent = "Brak autoryzacji, sprawdź klucz dostępu.";
				} else if (res.status === 400) {
					errorMsg.textContent = "Brak autoryzacji, sprawdź klucz dostępu.";
				} else if (res.status >= 500) {
					errorMsg.textContent = "Coś poszło nie tak.";
				}
				throw new Error(res.statusText);
			}
			return res.json();
		})
		.then((data) => {
			console.log(data);
			const temp = data.main.temp;
			const feelTemp = data.main.feels_like;
			const hum = data.main.humidity;
			const wind = data.wind.speed;
			const pressure = data.main.pressure;
			const weatherDesc = data.weather[0].description;

			document.getElementById("city").textContent = location;
			document.getElementById("temp").textContent = Math.floor(temp) + "°C";
			document.getElementById("feels-like").textContent =
				Math.floor(feelTemp) + "°C";
			document.getElementById("hum").textContent = hum + "%";
			document.getElementById("wind").textContent = Math.floor(wind) + " km/h";
			document.getElementById("pressure").textContent = pressure + " hPa";
			document.getElementById("desc").textContent = weatherDesc;

			const status = data.weather[0].id;
			const weatherIcon = document.querySelector(".weather-icon");
			if (status >= 200 && status < 300) {
				document.body.style.backgroundImage = "url('./img/storm.jpg')";
				weatherIcon.innerHTML = '<i class="fa-solid fa-cloud-bolt"></i>';
			} else if (status >= 300 && status < 400) {
				document.body.style.backgroundImage = "url('./img/rainy.jpg')";
				weatherIcon.innerHTML = '<i class="fa-solid fa-cloud-sun-rain"></i>';
			} else if (status >= 500 && status < 600) {
				document.body.style.backgroundImage = "url('./img/rainy.jpg')";
				weatherIcon.innerHTML = '<i class="fa-solid fa-cloud-sun-rain"></i>';
			} else if (status >= 600 && status < 700) {
				document.body.style.backgroundImage = "url('./img/snow.jpg')";
				weatherIcon.innerHTML = '<i class="fa-regular fa-snowflake"></i>';
			} else if (status >= 700 && status < 800) {
				document.body.style.backgroundImage = "url('./img/fog.jpg')";
				weatherIcon.innerHTML = '<i class="fa-solid fa-smog"></i>';
			} else if (status === 800) {
				document.body.style.backgroundImage = "url('./img/clear-sky.jpg')";
				weatherIcon.innerHTML = '<i class="fa-solid fa-sun"></i>';
			} else if (status > 800 && status < 900) {
				document.body.style.backgroundImage = "url('./img/cloudy.jpg')";
				weatherIcon.innerHTML = '<i class="fa-solid fa-cloud"></i>';
			} else {
				document.body.style.backgroundImage = "url('./img/clear-sky.png')";
				weatherIcon.innerHTML = '<i class="fa-solid fa-sun"></i>';
			}
		})
		.catch((error) => {
			console.error("Error:", error);
			if (error.cod == "404") {
				document.getElementById("error-msg").textContent =
					"Nie znaleziono podanej lokalizacji.";
			}
		});
}

const enterKey = (e) => {
	if (e.key === "Enter") {
		form.submit();
	}
};

function lz(i) {
	return `${i}`.padStart(2, "0");
}

function getCurrentDate() {
	const now = new Date();
	const days = [
		"Niedziela",
		"Poniedziałek",
		"Wtorek",
		"Środa",
		"Czwartek",
		"Piątek",
		"Sobota",
	];
	const date = document.getElementById("date");
	const day = document.getElementById("day");
	
    day.textContent = `${days[now.getDay()]}, `
	date.textContent = `${lz(now.getDate())}.${lz(
		now.getMonth() + 1
	)}.${now.getFullYear()}`;
}

getEntranceWeather("Warszawa");
getCurrentDate();
