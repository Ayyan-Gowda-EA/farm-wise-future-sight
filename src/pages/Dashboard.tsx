import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Cloud, 
  Thermometer, 
  Eye, 
  TrendingUp, 
  Bug, 
  History,
  MapPin,
  Droplets
} from "lucide-react";
import paddyBg from "@/assets/paddy-bg.jpg";

const Dashboard = () => {
  const weatherData = {
    temperature: 28,
    humidity: 65,
    condition: "Partly Cloudy",
    rainfall: 12.5
  };

  const currentCrops = [
    { name: "Rice", area: "2.5 acres", status: "Healthy", growth: 75 },
    { name: "Wheat", area: "1.8 acres", status: "Needs Attention", growth: 60 },
    { name: "Corn", area: "3.2 acres", status: "Excellent", growth: 85 }
  ];

  const alerts = [
    { type: "Weather", message: "Rain expected in 2 days - prepare for harvesting", priority: "medium" },
    { type: "Disease", message: "Leaf blight detected in sector 3", priority: "high" },
    { type: "Soil", message: "Nitrogen levels low in field B", priority: "low" }
  ];

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${paddyBg})` }}
    >
      <div className="min-h-screen bg-background/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Welcome to AgriSmart Dashboard
            </h1>
            <p className="text-lg text-muted-foreground">
              Monitor your farm's health and make data-driven decisions
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Temperature</CardTitle>
                <Thermometer className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{weatherData.temperature}°C</div>
                <p className="text-xs text-muted-foreground">
                  Optimal for rice cultivation
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Humidity</CardTitle>
                <Droplets className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{weatherData.humidity}%</div>
                <p className="text-xs text-muted-foreground">
                  Good moisture levels
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Crops</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentCrops.length}</div>
                <p className="text-xs text-muted-foreground">
                  Total farming area: 7.5 acres
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Predicted Income</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹1,25,000</div>
                <p className="text-xs text-muted-foreground">
                  This season estimate
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Current Crops */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Current Crops</CardTitle>
                <CardDescription>Monitor your active cultivations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentCrops.map((crop, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{crop.name}</h4>
                        <p className="text-sm text-muted-foreground">{crop.area}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={crop.status === "Healthy" ? "default" : crop.status === "Excellent" ? "default" : "destructive"}>
                          {crop.status}
                        </Badge>
                        <p className="text-sm text-muted-foreground mt-1">{crop.growth}% growth</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button asChild className="w-full mt-4">
                  <Link to="/health">View Detailed Health Report</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Alerts */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Alerts</CardTitle>
                <CardDescription>Important notifications for your farm</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alerts.map((alert, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        alert.priority === "high" ? "bg-destructive" : 
                        alert.priority === "medium" ? "bg-yellow-500" : "bg-green-500"
                      }`} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">{alert.type}</Badge>
                          <span className={`text-xs ${
                            alert.priority === "high" ? "text-destructive" : 
                            alert.priority === "medium" ? "text-yellow-600" : "text-green-600"
                          }`}>
                            {alert.priority.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-sm mt-1">{alert.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Access key features quickly</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <Button asChild variant="outline" className="h-20 flex-col">
                  <Link to="/weather">
                    <Cloud className="h-6 w-6 mb-2" />
                    Weather
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-20 flex-col">
                  <Link to="/soil">
                    <MapPin className="h-6 w-6 mb-2" />
                    Soil Monitor
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-20 flex-col">
                  <Link to="/health">
                    <Eye className="h-6 w-6 mb-2" />
                    Crop Health
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-20 flex-col">
                  <Link to="/predictions">
                    <TrendingUp className="h-6 w-6 mb-2" />
                    Predictions
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-20 flex-col">
                  <Link to="/diseases">
                    <Bug className="h-6 w-6 mb-2" />
                    Diseases
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-20 flex-col">
                  <Link to="/history">
                    <History className="h-6 w-6 mb-2" />
                    History
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;