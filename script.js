let weather = {
    apikey: '',
    
        fetchWeather: function(city) {
            fetch(`https://api.weatherapi.com/v1/forecast.json?key=${this.apikey}&q=${city}&days=7&aqi=no`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("City not found");
                }
                return response.json();
            })
            .then(data => this.displayWeather(data))
            .catch(error => {
                console.error(error);
                document.querySelector(".weather").innerText = "City not found!";
                document.querySelector(".weather").classList.remove("loading");
            });
        },
    
        displayWeather: function(data) {
            const { name, region, country } = data.location;
            const { temp_c, humidity, wind_kph } = data.current;
            const condition = data.current.condition;
    
            document.querySelector(".city").innerText = `Weather in ${name}, ${region}, ${country}`;
            document.querySelector(".icon").src = condition.icon;
            document.querySelector(".description").innerText = condition.text;
            document.querySelector(".temp").innerText = `${temp_c}°C`;
            document.querySelector(".humidity").innerText = `Humidity: ${humidity}%`;
            document.querySelector(".wind").innerText = `Wind speed: ${wind_kph} km/h`;
            document.querySelector(".weather").classList.remove("loading");
    
            // Change the background image based on the weather condition
            this.changeBackground(condition.text);
            
            
        },
    
    
        changeBackground: function(condition) {
            console.log("Current condition:", condition); // Log the current condition
            let imageUrl;
    
            switch (condition.toLowerCase()) {
                case 'sunny':
                case 'clear':
                    imageUrl = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.efaT9R4rLo_uiIzfk3wtdgHaEK%26pid%3DApi&f=1&ipt=991f85b844fc690bab30598df126250989622425b36508a8ab715abd08a225a2&ipo=imageshttps://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.b_JvX2dX5y0vxw-H_OizTQHaEo%26pid%3DApi&f=1&ipt=4e392b7ac7f6f6dd78c92fff54c57bf872417f7337a4f4e45182fbbe8efe0b94&ipo=images";
                    break;
                case 'rain':
                case 'drizzle':
                case 'partly cloudy':
                case 'showers':
                    imageUrl = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.fwLuHVW8she87nsuCwGWeQHaEo%26pid%3DApi&f=1&ipt=7a34815ad4af80f1fe9068d5684db528fe381a43116aed781011564f7198cba0&ipo=images";
                    break;
                case 'cloudy':
                case 'mist':
                    imageUrl = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.yIIGDKT0_tptR701VdgYPgHaEK%26pid%3DApi&f=1&ipt=9575734501b0049db6b46197cbd97f1258ea006f2f64a9e57b8e65cee133eb03&ipo=images";
                    break;
                case 'snow':
                    imageUrl = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.Cfip7j0ICCx_1MSpzJCG4wHaEK%26pid%3DApi&f=1&ipt=51d3a7143c1c36b2c11e0376fe291a485acc86d1b808d7616ac69aabf3eb805a&ipo=images";
                    break;
                case 'storm':
                case 'thunderstorm':
                    imageUrl = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.YkUKct-ttl8ymeJwZXdHawHaEo%26pid%3DApi&f=1&ipt=c58cc13753773e6763463399c3cb772f39578e24b381fc810900162539630708&ipo=images";
                    break;
                default:
                    imageUrl = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.ZWiQI6Q9G2Y4-O3h2ieTngHaE8%26pid%3DApi&f=1&ipt=6890a917131fef5ce16c5f65940fd7b4033905b69600917e1cc6a7b31e8f7f3a&ipo=images";
            }
    
            document.body.style.backgroundImage = `url('${imageUrl}')`;
            console.log("Background image set to:", imageUrl);
        },
    
        search: function() {
            this.fetchWeather(document.querySelector(".searchbar").value);
        }
    };
    
    // Event listeners
    document.querySelector(".search button").addEventListener("click", function() {
        weather.search();
    });
    
    document.querySelector(".searchbar").addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            weather.search();
        }
    });
    
    // Fetch weather for a default city when the page loads
    weather.fetchWeather("Chennai");
    