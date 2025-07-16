import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  Thermometer, 
  Droplets, 
  Wind,
  Eye,
  Sunrise,
  Sunset
} from "lucide-react";

const Weather = () => {
  const [selectedLocation, setSelectedLocation] = useState("Farm Location 1");

  const currentWeather = {
    temperature: 28,
    feelsLike: 32,
    humidity: 65,
    windSpeed: 12,
    visibility: 8,
    uvIndex: 6,
    condition: "Partly Cloudy",
    sunrise: "6:15 AM",
    sunset: "6:45 PM"
  };

  const forecast = [
    { day: "Today", temp: "28°/22°", condition: "Partly Cloudy", rain: 20, icon: Cloud },
    { day: "Tomorrow", temp: "30°/24°", condition: "Sunny", rain: 5, icon: Sun },
    { day: "Day 3", temp: "26°/20°", condition: "Rainy", rain: 80, icon: CloudRain },
    { day: "Day 4", temp: "25°/19°", condition: "Cloudy", rain: 40, icon: Cloud },
    { day: "Day 5", temp: "29°/23°", condition: "Sunny", rain: 10, icon: Sun }
  ];

  const cropSuggestions = [
    {
      crop: "Rice",
      suitability: "Excellent",
      reason: "High humidity and warm temperature perfect for rice cultivation",
      action: "Plant new seedlings in prepared fields",
      color: "bg-green-100 text-green-800"
    },
    {
      crop: "Wheat",
      suitability: "Good", 
      reason: "Current temperature suitable, monitor for upcoming rain",
      action: "Continue regular watering schedule",
      color: "bg-blue-100 text-blue-800"
    },
    {
      crop: "Corn",
      suitability: "Moderate",
      reason: "Weather conditions acceptable but rain expected in 3 days",
      action: "Prepare drainage systems and harvest mature crops",
      color: "bg-yellow-100 text-yellow-800"
    },
    {
      crop: "Tomatoes",
      suitability: "Poor",
      reason: "High humidity may cause fungal diseases",
      action: "Avoid planting, increase ventilation for existing crops",
      color: "bg-red-100 text-red-800"
    }
  ];

  const weatherAlerts = [
    {
      type: "Rain Warning",
      message: "Heavy rainfall expected in 2 days (15-20mm)",
      priority: "high",
      action: "Prepare harvesting equipment and drainage"
    },
    {
      type: "Temperature Alert",
      message: "High temperatures may stress young plants",
      priority: "medium", 
      action: "Increase irrigation frequency"
    }
  ];

  const locations = ["Farm Location 1", "Farm Location 2", "Farm Location 3"];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Weather Monitoring</h1>
        <p className="text-lg text-muted-foreground">
          Real-time weather data and crop recommendations
        </p>
      </div>

      {/* Location Selector */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {locations.map((location) => (
            <Button
              key={location}
              variant={selectedLocation === location ? "default" : "outline"}
              onClick={() => setSelectedLocation(location)}
            >
              {location}
            </Button>
          ))}
        </div>
      </div>

      {/* Current Weather */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cloud className="h-5 w-5" />
              Current Weather - {selectedLocation}
            </CardTitle>
            <CardDescription>Live weather conditions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <Thermometer className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                <div className="text-2xl font-bold">{currentWeather.temperature}°C</div>
                <div className="text-sm text-muted-foreground">Feels like {currentWeather.feelsLike}°C</div>
              </div>
              
              <div className="text-center p-4 border rounded-lg">
                <Droplets className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                <div className="text-2xl font-bold">{currentWeather.humidity}%</div>
                <div className="text-sm text-muted-foreground">Humidity</div>
              </div>
              
              <div className="text-center p-4 border rounded-lg">
                <Wind className="h-8 w-8 mx-auto mb-2 text-gray-500" />
                <div className="text-2xl font-bold">{currentWeather.windSpeed}</div>
                <div className="text-sm text-muted-foreground">km/h</div>
              </div>
              
              <div className="text-center p-4 border rounded-lg">
                <Eye className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                <div className="text-2xl font-bold">{currentWeather.visibility}</div>
                <div className="text-sm text-muted-foreground">km visibility</div>
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-6 p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-2">
                <Sunrise className="h-5 w-5 text-yellow-500" />
                <span>Sunrise: {currentWeather.sunrise}</span>
              </div>
              <div className="flex items-center gap-2">
                <Sunset className="h-5 w-5 text-orange-500" />
                <span>Sunset: {currentWeather.sunset}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weather Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>Weather Alerts</CardTitle>
            <CardDescription>Important weather notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weatherAlerts.map((alert, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant={alert.priority === "high" ? "destructive" : "secondary"}>
                      {alert.type}
                    </Badge>
                    <span className={`text-xs ${alert.priority === "high" ? "text-destructive" : "text-yellow-600"}`}>
                      {alert.priority.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm mb-2">{alert.message}</p>
                  <p className="text-xs text-muted-foreground italic">
                    Action: {alert.action}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 5-Day Forecast */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>5-Day Forecast</CardTitle>
          <CardDescription>Weather predictions for better planning</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {forecast.map((day, index) => {
              const IconComponent = day.icon;
              return (
                <div key={index} className="text-center p-4 border rounded-lg">
                  <div className="font-medium mb-2">{day.day}</div>
                  <IconComponent className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                  <div className="text-lg font-bold mb-1">{day.temp}</div>
                  <div className="text-sm text-muted-foreground mb-2">{day.condition}</div>
                  <Badge variant="outline" className="text-xs">
                    {day.rain}% rain
                  </Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Crop Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle>Crop Recommendations Based on Weather</CardTitle>
          <CardDescription>AI-powered suggestions for optimal farming decisions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cropSuggestions.map((suggestion, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-lg">{suggestion.crop}</h4>
                  <Badge className={suggestion.color}>
                    {suggestion.suitability}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {suggestion.reason}
                </p>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm font-medium">Recommended Action:</p>
                  <p className="text-sm">{suggestion.action}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Weather;