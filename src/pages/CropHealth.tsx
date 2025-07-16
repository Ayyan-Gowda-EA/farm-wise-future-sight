import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Plus, 
  Trash2, 
  Eye, 
  Calendar,
  MapPin,
  TrendingUp,
  AlertTriangle
} from "lucide-react";

const CropHealth = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    cropName: "",
    variety: "",
    plantingDate: "",
    area: "",
    location: ""
  });

  const cropTypes = [
    "Rice", "Wheat", "Corn", "Tomatoes", "Potatoes", "Soybeans", 
    "Barley", "Sugarcane", "Cotton", "Cabbage", "Carrots", "Onions"
  ];

  const [crops, setCrops] = useState([
    {
      id: 1,
      name: "Rice",
      variety: "Basmati",
      plantingDate: "2024-01-15",
      area: "2.5 acres",
      location: "Field A",
      growthStage: "Flowering",
      health: "Excellent",
      progress: 85,
      issues: [],
      lastInspection: "2024-01-20"
    },
    {
      id: 2,
      name: "Wheat", 
      variety: "Durum",
      plantingDate: "2024-01-10",
      area: "1.8 acres",
      location: "Field B",
      growthStage: "Grain Development",
      health: "Good",
      progress: 70,
      issues: ["Minor nutrient deficiency"],
      lastInspection: "2024-01-18"
    },
    {
      id: 3,
      name: "Corn",
      variety: "Sweet Corn",
      plantingDate: "2024-01-05",
      area: "3.2 acres", 
      location: "Field C",
      growthStage: "Maturation",
      health: "Needs Attention",
      progress: 60,
      issues: ["Pest infestation detected", "Irregular watering"],
      lastInspection: "2024-01-19"
    }
  ]);

  const healthMetrics = {
    Excellent: { color: "bg-green-100 text-green-800", icon: "✓" },
    Good: { color: "bg-blue-100 text-blue-800", icon: "○" },
    "Needs Attention": { color: "bg-yellow-100 text-yellow-800", icon: "⚠" },
    Poor: { color: "bg-red-100 text-red-800", icon: "×" }
  };

  const growthStages = [
    "Germination", "Seedling", "Vegetative", "Flowering", 
    "Fruit Development", "Grain Development", "Maturation", "Harvest Ready"
  ];

  const handleAddCrop = () => {
    if (!formData.cropName || !formData.variety || !formData.plantingDate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const newCrop = {
      id: crops.length + 1,
      name: formData.cropName,
      variety: formData.variety,
      plantingDate: formData.plantingDate,
      area: formData.area || "1.0 acres",
      location: formData.location || "Field A",
      growthStage: "Germination",
      health: "Good",
      progress: 10,
      issues: [],
      lastInspection: new Date().toISOString().split('T')[0]
    };

    setCrops([...crops, newCrop]);
    
    toast({
      title: "Success",
      description: `${formData.cropName} added successfully`,
    });

    setFormData({
      cropName: "",
      variety: "",
      plantingDate: "",
      area: "",
      location: ""
    });
  };

  const handleDeleteCrop = (id: number) => {
    const crop = crops.find(c => c.id === id);
    setCrops(crops.filter(c => c.id !== id));
    
    toast({
      title: "Crop Deleted",
      description: `${crop?.name} has been removed from monitoring`,
    });
  };

  const handleInspectCrop = (id: number) => {
    toast({
      title: "Inspection Scheduled",
      description: "Field inspection has been scheduled for tomorrow",
    });
  };

  const getHealthRecommendations = (crop: any) => {
    const recommendations = [];
    
    if (crop.health === "Needs Attention" || crop.health === "Poor") {
      recommendations.push("Increase monitoring frequency");
      recommendations.push("Check soil moisture levels");
    }
    
    if (crop.issues.length > 0) {
      if (crop.issues.some((issue: string) => issue.includes("pest"))) {
        recommendations.push("Apply organic pesticide treatment");
      }
      if (crop.issues.some((issue: string) => issue.includes("nutrient"))) {
        recommendations.push("Soil nutrient analysis recommended");
      }
      if (crop.issues.some((issue: string) => issue.includes("water"))) {
        recommendations.push("Adjust irrigation schedule");
      }
    }
    
    if (crop.progress < 50) {
      recommendations.push("Monitor weather conditions closely");
    }
    
    return recommendations;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Crop Health Monitoring</h1>
        <p className="text-lg text-muted-foreground">
          Track growth progress and health status of your crops
        </p>
      </div>

      {/* Add New Crop Form */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add New Crop
          </CardTitle>
          <CardDescription>Register a new crop for health monitoring</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <Label htmlFor="cropName">Crop Type</Label>
              <Select value={formData.cropName} onValueChange={(value) => setFormData({...formData, cropName: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select crop" />
                </SelectTrigger>
                <SelectContent>
                  {cropTypes.map((crop) => (
                    <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="variety">Variety</Label>
              <Input
                id="variety"
                value={formData.variety}
                onChange={(e) => setFormData({...formData, variety: e.target.value})}
                placeholder="e.g., Basmati"
              />
            </div>
            
            <div>
              <Label htmlFor="plantingDate">Planting Date</Label>
              <Input
                id="plantingDate"
                type="date"
                value={formData.plantingDate}
                onChange={(e) => setFormData({...formData, plantingDate: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="area">Area (acres)</Label>
              <Input
                id="area"
                value={formData.area}
                onChange={(e) => setFormData({...formData, area: e.target.value})}
                placeholder="2.5"
              />
            </div>
            
            <div className="flex items-end">
              <Button onClick={handleAddCrop} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Crop
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Crop Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {crops.map((crop) => (
          <Card key={crop.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{crop.name} - {crop.variety}</CardTitle>
                <Badge className={healthMetrics[crop.health as keyof typeof healthMetrics].color}>
                  {healthMetrics[crop.health as keyof typeof healthMetrics].icon} {crop.health}
                </Badge>
              </div>
              <CardDescription className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {crop.location} • {crop.area}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Growth Progress */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Growth Progress</span>
                    <span>{crop.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${crop.progress}%` }}
                    />
                  </div>
                </div>

                {/* Growth Stage */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Current Stage:</span>
                  <Badge variant="outline">{crop.growthStage}</Badge>
                </div>

                {/* Planting Date */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Planted:</span>
                  <span className="text-sm">{crop.plantingDate}</span>
                </div>

                {/* Last Inspection */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Last Inspected:</span>
                  <span className="text-sm">{crop.lastInspection}</span>
                </div>

                {/* Issues */}
                {crop.issues.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-destructive mb-2 flex items-center gap-1">
                      <AlertTriangle className="h-4 w-4" />
                      Issues Detected:
                    </h4>
                    {crop.issues.map((issue, index) => (
                      <Badge key={index} variant="destructive" className="mr-2 mb-1 text-xs">
                        {issue}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => handleInspectCrop(crop.id)}
                    className="flex-1"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Inspect
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleDeleteCrop(crop.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Health Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Health Analysis & Recommendations
          </CardTitle>
          <CardDescription>Detailed insights and actionable recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {crops.map((crop) => (
              <div key={crop.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold">{crop.name} - {crop.variety}</h4>
                  <Badge className={healthMetrics[crop.health as keyof typeof healthMetrics].color}>
                    {crop.health}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Progress:</span>
                      <span className="ml-2 font-medium">{crop.progress}%</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Stage:</span>
                      <span className="ml-2 font-medium">{crop.growthStage}</span>
                    </div>
                  </div>

                  {crop.issues.length > 0 && (
                    <div>
                      <h5 className="text-sm font-medium text-destructive mb-1">Active Issues:</h5>
                      <ul className="text-sm space-y-1">
                        {crop.issues.map((issue, index) => (
                          <li key={index} className="text-muted-foreground">• {issue}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div>
                    <h5 className="text-sm font-medium mb-2">Recommendations:</h5>
                    <ul className="text-sm space-y-1">
                      {getHealthRecommendations(crop).map((rec, index) => (
                        <li key={index} className="text-muted-foreground">• {rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CropHealth;