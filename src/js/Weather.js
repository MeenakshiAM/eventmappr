// Weather App JavaScript
class WeatherApp {
    constructor() {
        this.initializeApp();
        this.setupEventListeners();
    }

    initializeApp() {
        this.cityInput = document.getElementById('cityInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.loadingState = document.getElementById('loadingState');
        this.errorState = document.getElementById('errorState');
        this.errorMessage = document.getElementById('errorMessage');
        this.weatherResults = document.getElementById('weatherResults');
        
        // Current weather elements
        this.currentLocation = document.getElementById('currentLocation');
        this.currentDate = document.getElementById('currentDate');
        this.currentIcon = document.getElementById('currentIcon');
        this.currentTemp = document.getElementById('currentTemp');
        this.currentCondition = document.getElementById('currentCondition');
        this.feelsLike = document.getElementById('feelsLike');
        this.humidity = document.getElementById('humidity');
        this.windSpeed = document.getElementById('windSpeed');
        
        // Recommendation elements
        this.bestDay = document.getElementById('bestDay');
        this.eventTips = document.getElementById('eventTips');
        
        // Forecast container
        this.forecastContainer = document.getElementById('forecastContainer');
        
        // Set current date
        this.updateCurrentDate();
    }

    setupEventListeners() {
        this.searchBtn.addEventListener('click', () => this.handleSearch());
        this.cityInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSearch();
            }
        });
        
        // Mobile menu toggle (basic implementation)
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        if (mobileToggle) {
            mobileToggle.addEventListener('click', () => {
                navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            });
        }
    }

    updateCurrentDate() {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        document.getElementById('currentDate').textContent = now.toLocaleDateString('en-US', options);
    }

    async handleSearch() {
        const city = this.cityInput.value.trim();
        
        if (!city) {
            this.showError('Please enter a city name');
            return;
        }

        this.showLoading();
        
        try {
            // First, get coordinates for the city
            const coordinates = await this.getCoordinates(city);
            
            // Then get weather data
            const weatherData = await this.getWeatherData(coordinates.lat, coordinates.lon);
            
            // Display the weather data
            this.displayWeatherData(weatherData, city);
            
        } catch (error) {
            console.error('Weather fetch error:', error);
            this.showError(error.message || 'Failed to fetch weather data. Please try again.');
        }
    }

    async getCoordinates(city) {
        const response = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
        );
        
        if (!response.ok) {
            throw new Error('Failed to find city location');
        }
        
        const data = await response.json();
        
        if (!data.results || data.results.length === 0) {
            throw new Error('City not found. Please check the spelling and try again.');
        }
        
        const result = data.results[0];
        return {
            lat: result.latitude,
            lon: result.longitude,
            name: result.name,
            country: result.country
        };
    }

    async getWeatherData(lat, lon) {
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=5`
        );
        
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }
        
        const data = await response.json();
        return data;
    }

    displayWeatherData(data, cityName) {
        this.hideLoadingAndError();
        
        // Update current weather
        this.currentLocation.textContent = `${cityName}`;
        this.currentTemp.textContent = `${Math.round(data.current.temperature_2m)}°C`;
        this.currentCondition.textContent = this.getWeatherDescription(data.current.weather_code);
        this.currentIcon.textContent = this.getWeatherIcon(data.current.weather_code);
        this.feelsLike.textContent = `${Math.round(data.current.apparent_temperature)}°C`;
        this.humidity.textContent = `${data.current.relative_humidity_2m}%`;
        this.windSpeed.textContent = `${Math.round(data.current.wind_speed_10m)} km/h`;
        
        // Generate forecast cards
        this.generateForecastCards(data.daily);
        
        // Generate event recommendations
        this.generateEventRecommendations(data.daily);
        
        // Show results
        this.weatherResults.classList.remove('hidden');
        
        // Scroll to results
        this.weatherResults.scrollIntoView({ behavior: 'smooth' });
    }

    generateForecastCards(dailyData) {
        this.forecastContainer.innerHTML = '';
        
        const today = new Date();
        const bestDayIndex = this.findBestEventDay(dailyData);
        
        for (let i = 0; i < 5; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            
            const card = document.createElement('div');
            card.className = `forecast-card ${i === bestDayIndex ? 'best-day' : ''}`;
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', `Weather forecast for ${this.getDayName(date, i)}`);
            
            const dayName = this.getDayName(date, i);
            const icon = this.getWeatherIcon(dailyData.weather_code[i]);
            const condition = this.getWeatherDescription(dailyData.weather_code[i]);
            const maxTemp = Math.round(dailyData.temperature_2m_max[i]);
            const minTemp = Math.round(dailyData.temperature_2m_min[i]);
            
            card.innerHTML = `
                <div class="forecast-day">${dayName}</div>
                <div class="forecast-icon">${icon}</div>
                <div class="forecast-temps">
                    <span class="temp-high">${maxTemp}°</span>
                    <span class="temp-low">${minTemp}°</span>
                </div>
                <div class="forecast-condition">${condition}</div>
            `;
            
            // Add keyboard support
            card.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    this.showDayDetails(i, dailyData);
                }
            });
            
            card.addEventListener('click', () => {
                this.showDayDetails(i, dailyData);
            });
            
            this.forecastContainer.appendChild(card);
        }
    }

    generateEventRecommendations(dailyData) {
        const bestDayIndex = this.findBestEventDay(dailyData);
        const bestDay = this.getDayName(new Date(Date.now() + bestDayIndex * 24 * 60 * 60 * 1000), bestDayIndex);
        const bestWeather = this.getWeatherDescription(dailyData.weather_code[bestDayIndex]);
        const bestTemp = Math.round(dailyData.temperature_2m_max[bestDayIndex]);
        
        this.bestDay.innerHTML = `🌤 <strong>Best day for events: ${bestDay}</strong> (${bestTemp}°C, ${bestWeather})`;
        
        // Generate event tips based on weather patterns
        const tips = this.generateEventTips(dailyData, bestDayIndex);
        this.eventTips.innerHTML = tips;
    }

    findBestEventDay(dailyData) {
        let bestScore = -1;
        let bestDay = 0;
        
        for (let i = 0; i < dailyData.weather_code.length; i++) {
            const weatherCode = dailyData.weather_code[i];
            const maxTemp = dailyData.temperature_2m_max[i];
            const minTemp = dailyData.temperature_2m_min[i];
            
            let score = 0;
            
            // Weather condition scoring (0-100)
            if (weatherCode <= 3) score += 100; // Clear to partly cloudy
            else if (weatherCode <= 48) score += 70; // Foggy
            else if (weatherCode <= 67) score += 40; // Light rain
            else if (weatherCode <= 77) score += 20; // Snow
            else score += 10; // Severe weather
            
            // Temperature scoring (ideal range: 18-25°C)
            const avgTemp = (maxTemp + minTemp) / 2;
            if (avgTemp >= 18 && avgTemp <= 25) score += 50;
            else if (avgTemp >= 15 && avgTemp <= 30) score += 30;
            else if (avgTemp >= 10 && avgTemp <= 35) score += 15;
            
            // Prefer weekend days (simplified - in real app, you'd check actual day of week)
            if (i === 5 || i === 6) score += 10; // Assuming Saturday/Sunday
            
            if (score > bestScore) {
                bestScore = score;
                bestDay = i;
            }
        }
        
        return bestDay;
    }

    generateEventTips(dailyData, bestDayIndex) {
        const weatherCode = dailyData.weather_code[bestDayIndex];
        const maxTemp = Math.round(dailyData.temperature_2m_max[bestDayIndex]);
        const minTemp = Math.round(dailyData.temperature_2m_min[bestDayIndex]);
        
        let tips = [];
        
        // Temperature-based tips
        if (maxTemp >= 25) {
            tips.push("🌡️ Warm weather - perfect for outdoor events! Consider providing shade and hydration stations.");
        } else if (maxTemp >= 18) {
            tips.push("☀️ Pleasant temperatures - ideal for all types of outdoor activities.");
        } else if (maxTemp >= 10) {
            tips.push("🧥 Cool weather - indoor venues or heated outdoor spaces recommended.");
        } else {
            tips.push("❄️ Cold temperatures - consider indoor venues or provide warming stations.");
        }
        
        // Weather condition tips
        if (weatherCode <= 3) {
            tips.push("🌤️ Clear skies expected - perfect for photography and outdoor ceremonies.");
        } else if (weatherCode <= 48) {
            tips.push("🌫️ Some fog or clouds possible - still good for events with backup indoor options.");
        } else if (weatherCode >= 51) {
            tips.push("🌧️ Rain expected - have indoor alternatives or covered areas ready.");
        }
        
        // General event planning tips
        if (Math.abs(maxTemp - minTemp) > 15) {
            tips.push("🌡️ Large temperature variation - advise guests to dress in layers.");
        }
        
        return tips.join(' ');
    }

    getDayName(date, index) {
        if (index === 0) return 'Today';
        if (index === 1) return 'Tomorrow';
        
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[date.getDay()];
    }

    getWeatherIcon(weatherCode) {
        const iconMap = {
            0: '☀️',   // Clear sky
            1: '🌤️',   // Mainly clear
            2: '⛅',   // Partly cloudy
            3: '☁️',   // Overcast
            45: '🌫️',  // Fog
            48: '🌫️',  // Depositing rime fog
            51: '🌦️',  // Light drizzle
            53: '🌦️',  // Moderate drizzle
            55: '🌧️',  // Dense drizzle
            56: '🌨️',  // Light freezing drizzle
            57: '🌨️',  // Dense freezing drizzle
            61: '🌧️',  // Slight rain
            63: '🌧️',  // Moderate rain
            65: '⛈️',  // Heavy rain
            66: '🌨️',  // Light freezing rain
            67: '🌨️',  // Heavy freezing rain
            71: '❄️',  // Slight snow fall
            73: '❄️',  // Moderate snow fall
            75: '❄️',  // Heavy snow fall
            77: '🌨️',  // Snow grains
            80: '🌦️',  // Slight rain showers
            81: '🌧️',  // Moderate rain showers
            82: '⛈️',  // Violent rain showers
            85: '❄️',  // Slight snow showers
            86: '❄️',  // Heavy snow showers
            95: '⛈️',  // Thunderstorm
            96: '⛈️',  // Thunderstorm with slight hail
            99: '⛈️'   // Thunderstorm with heavy hail
        };
        
        return iconMap[weatherCode] || '🌤️';
    }

    getWeatherDescription(weatherCode) {
        const descriptions = {
            0: 'Clear sky',
            1: 'Mainly clear',
            2: 'Partly cloudy',
            3: 'Overcast',
            45: 'Foggy',
            48: 'Depositing rime fog',
            51: 'Light drizzle',
            53: 'Moderate drizzle',
            55: 'Dense drizzle',
            56: 'Light freezing drizzle',
            57: 'Dense freezing drizzle',
            61: 'Slight rain',
            63: 'Moderate rain',
            65: 'Heavy rain',
            66: 'Light freezing rain',
            67: 'Heavy freezing rain',
            71: 'Slight snow',
            73: 'Moderate snow',
            75: 'Heavy snow',
            77: 'Snow grains',
            80: 'Slight rain showers',
            81: 'Moderate rain showers',
            82: 'Violent rain showers',
            85: 'Slight snow showers',
            86: 'Heavy snow showers',
            95: 'Thunderstorm',
            96: 'Thunderstorm with hail',
            99: 'Thunderstorm with heavy hail'
        };
        
        return descriptions[weatherCode] || 'Unknown';
    }

    showDayDetails(dayIndex, dailyData) {
        const date = new Date();
        date.setDate(date.getDate() + dayIndex);
        const dayName = this.getDayName(date, dayIndex);
        const condition = this.getWeatherDescription(dailyData.weather_code[dayIndex]);
        const maxTemp = Math.round(dailyData.temperature_2m_max[dayIndex]);
        const minTemp = Math.round(dailyData.temperature_2m_min[dayIndex]);
        
        alert(`${dayName} Details:\n\nCondition: ${condition}\nHigh: ${maxTemp}°C\nLow: ${minTemp}°C\n\nClick OK to continue.`);
    }

    showLoading() {
        this.hideResults();
        this.errorState.classList.add('hidden');
        this.loadingState.classList.remove('hidden');
        this.searchBtn.disabled = true;
        this.searchBtn.textContent = 'Searching...';
    }

    showError(message) {
        this.hideResults();
        this.loadingState.classList.add('hidden');
        this.errorMessage.textContent = message;
        this.errorState.classList.remove('hidden');
        this.searchBtn.disabled = false;
        this.searchBtn.innerHTML = '<span class="search-icon">🔍</span> Get Forecast';
    }

    hideLoadingAndError() {
        this.loadingState.classList.add('hidden');
        this.errorState.classList.add('hidden');
        this.searchBtn.disabled = false;
        this.searchBtn.innerHTML = '<span class="search-icon">🔍</span> Get Forecast';
    }

    hideResults() {
        this.weatherResults.classList.add('hidden');
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new WeatherApp();
});

// Service Worker for offline support (optional enhancement)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}