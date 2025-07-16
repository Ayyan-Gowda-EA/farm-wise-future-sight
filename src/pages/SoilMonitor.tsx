import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  MapPin, 
  TestTube, 
  Gauge,
  Plus,
  Trash2,
  Activity
} from "lucide-react";

const SoilMonitor = () => {
  const { toast } = useToast();
  const [selectedField, setSelectedField] = useState("Field A");
  const [formData, setFormData] = useState({
    fieldName: "",
    soilType: "",
    ph: "",
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    organicMatter: "",
    moisture: ""
  });

  const soilTypes = [
    "Clay", "Sandy", "Loamy", "Silty", "Peaty", "Chalky", "Saline"
  ];

  const fields = [
    {
      name: "Field A",
      soilType: "Loamy",
      ph: 6.8,
      nitrogen: 45,
      phosphorus: 35,
      potassium: 180,
      organicMatter: 3.2,
      moisture: 65,
      lastTested: "2024-01-10",
      status: "Excellent"
    },
    {
      name: "Field B", 
      soilType: "Clay",
      ph: 7.2,
      nitrogen: 38,
      phosphorus: 28,
      potassium: 165,
      organicMatter: 2.8,
      moisture: 70,
      lastTested: "2024-01-08",
      status: "Good"
    },
    {
      name: "Field C",
      soilType: "Sandy",
      ph: 6.2,
      nitrogen: 25,
      phosphorus: 18,
      potassium: 120,
      organicMatter: 1.8,
      moisture: 45,
      lastTested: "2024-01-12",
      status: "Needs Attention"
    }
  ];

  const cropRecommendations = {
    "Clay": {
      suitable: ["Rice", "Wheat", "Sugarcane", "Cabbage"],
      moderately: ["Corn", "Barley"],
      unsuitable: ["Carrot", "Radish", "Potato"]
    },
    "Sandy": {
      suitable: ["Potato", "Carrot", "Radish", "Watermelon"],
      moderately: ["Corn", "Tomato"],
      unsuitable: ["Rice", "Sugarcane"]
    },
    "Loamy": {
      suitable: ["Tomato", "Corn", "Wheat", "Rice", "Beans", "Cabbage"],
      moderately: ["Sugarcane"],
      unsuitable: []
    },
    "Silty": {
      suitable: ["Wheat", "Corn", "Soybeans"],
      moderately: ["Rice", "Vegetables"],
      unsuitable: ["Root vegetables"]
    },
    "Peaty": {
      suitable: ["Cabbage", "Lettuce", "Spinach"],
      moderately: ["Potatoes", "Carrots"],
      unsuitable: ["Cereals", "Grasses"]
    },
    "Chalky": {
      suitable: ["Cabbage", "Spinach", "Corn"],
      moderately: ["Wheat", "Barley"],
      unsuitable: ["Potatoes", "Berries"]
    },
    "Saline": {
      suitable: ["Salt-tolerant crops", "Barley"],
      moderately: ["Sugar beet"],
      unsuitable: ["Most vegetables", "Fruits"]
    }
  };

  const handleAddField = () => {
    if (!formData.fieldName || !formData.soilType) {
      toast({
        title: "Error",
        description: "Please fill in field name and soil type",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Success", 
      description: `Field ${formData.fieldName} added successfully`,
    });

    setFormData({
      fieldName: "",
      soilType: "",
      ph: "",
      nitrogen: "",
      phosphorus: "",
      potassium: "",
      organicMatter: "",
      moisture: ""
    });
  };

  const handleDeleteField = (fieldName: string) => {
    toast({
      title: "Field Deleted",
      description: `${fieldName} has been removed from monitoring`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Excellent": return "bg-green-100 text-green-800";
      case "Good": return "bg-blue-100 text-blue-800";
      case "Needs Attention": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getNutrientLevel = (value: number, type: string) => {
    const ranges = {
      nitrogen: { low: 30, high: 50 },
      phosphorus: { low: 25, high: 40 },
      potassium: { low: 150, high: 200 }
    };

    const range = ranges[type as keyof typeof ranges];
    if (value < range.low) return "Low";
    if (value > range.high) return "High";
    return "Optimal";
  };

  const selectedFieldData = fields.find(f => f.name === selectedField);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Soil Monitoring</h1>
        <p className="text-lg text-muted-foreground">
          Monitor soil conditions and get crop recommendations
        </p>
      </div>

      {/* Field Selector */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {fields.map((field) => (
            <Button
              key={field.name}
              variant={selectedField === field.name ? "default" : "outline"}
              onClick={() => setSelectedField(field.name)}
              className="flex items-center gap-2"
            >
              <MapPin className="h-4 w-4" />
              {field.name}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Current Field Status */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TestTube className="h-5 w-5" />
              {selectedField} - Soil Analysis
            </CardTitle>
            <CardDescription>
              Last tested: {selectedFieldData?.lastTested}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedFieldData && (
              <>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold">Soil Type: {selectedFieldData.soilType}</h3>
                    <Badge className={getStatusColor(selectedFieldData.status)}>
                      {selectedFieldData.status}
                    </Badge>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteField(selectedField)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Field
                  </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">pH Level</div>
                    <div className="text-2xl font-bold">{selectedFieldData.ph}</div>
                    <Badge variant="outline" className="mt-1">
                      {selectedFieldData.ph >= 6.0 && selectedFieldData.ph <= 7.5 ? "Optimal" : "Adjust"}
                    </Badge>
                  </div>
                  
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">Nitrogen</div>
                    <div className="text-2xl font-bold">{selectedFieldData.nitrogen}</div>
                    <Badge variant="outline" className="mt-1">
                      {getNutrientLevel(selectedFieldData.nitrogen, "nitrogen")}
                    </Badge>
                  </div>
                  
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">Phosphorus</div>
                    <div className="text-2xl font-bold">{selectedFieldData.phosphorus}</div>
                    <Badge variant="outline" className="mt-1">
                      {getNutrientLevel(selectedFieldData.phosphorus, "phosphorus")}
                    </Badge>
                  </div>
                  
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">Potassium</div>
                    <div className="text-2xl font-bold">{selectedFieldData.potassium}</div>
                    <Badge variant="outline" className="mt-1">
                      {getNutrientLevel(selectedFieldData.potassium, "potassium")}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">Organic Matter</div>
                    <div className="text-2xl font-bold">{selectedFieldData.organicMatter}%</div>
                    <Badge variant="outline" className="mt-1">
                      {selectedFieldData.organicMatter >= 2.5 ? "Good" : "Low"}
                    </Badge>
                  </div>
                  
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">Moisture</div>
                    <div className="text-2xl font-bold">{selectedFieldData.moisture}%</div>
                    <Badge variant="outline" className="mt-1">
                      {selectedFieldData.moisture >= 40 && selectedFieldData.moisture <= 70 ? "Optimal" : "Monitor"}
                    </Badge>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Add New Field */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add New Field
            </CardTitle>
            <CardDescription>Register a new field for monitoring</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="fieldName">Field Name</Label>
                <Input
                  id="fieldName"
                  value={formData.fieldName}
                  onChange={(e) => setFormData({...formData, fieldName: e.target.value})}
                  placeholder="e.g., Field D"
                />
              </div>
              
              <div>
                <Label htmlFor="soilType">Soil Type</Label>
                <Select value={formData.soilType} onValueChange={(value) => setFormData({...formData, soilType: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select soil type" />
                  </SelectTrigger>
                  <SelectContent>
                    {soilTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="ph">pH Level</Label>
                  <Input
                    id="ph"
                    type="number"
                    step="0.1"
                    value={formData.ph}
                    onChange={(e) => setFormData({...formData, ph: e.target.value})}
                    placeholder="6.5"
                  />
                </div>
                <div>
                  <Label htmlFor="moisture">Moisture %</Label>
                  <Input
                    id="moisture"
                    type="number"
                    value={formData.moisture}
                    onChange={(e) => setFormData({...formData, moisture: e.target.value})}
                    placeholder="60"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <Label htmlFor="nitrogen">N</Label>
                  <Input
                    id="nitrogen"
                    type="number"
                    value={formData.nitrogen}
                    onChange={(e) => setFormData({...formData, nitrogen: e.target.value})}
                    placeholder="40"
                  />
                </div>
                <div>
                  <Label htmlFor="phosphorus">P</Label>
                  <Input
                    id="phosphorus"
                    type="number"
                    value={formData.phosphorus}
                    onChange={(e) => setFormData({...formData, phosphorus: e.target.value})}
                    placeholder="30"
                  />
                </div>
                <div>
                  <Label htmlFor="potassium">K</Label>
                  <Input
                    id="potassium"
                    type="number"
                    value={formData.potassium}
                    onChange={(e) => setFormData({...formData, potassium: e.target.value})}
                    placeholder="170"
                  />
                </div>
              </div>

              <Button onClick={handleAddField} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Field
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Crop Recommendations */}
      {selectedFieldData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Crop Recommendations for {selectedFieldData.soilType} Soil
            </CardTitle>
            <CardDescription>
              Based on soil type analysis and current conditions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold text-green-600 mb-3">Highly Suitable</h4>
                <div className="space-y-2">
                  {cropRecommendations[selectedFieldData.soilType as keyof typeof cropRecommendations]?.suitable.map((crop) => (
                    <Badge key={crop} className="bg-green-100 text-green-800 mr-2 mb-2">
                      {crop}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-yellow-600 mb-3">Moderately Suitable</h4>
                <div className="space-y-2">
                  {cropRecommendations[selectedFieldData.soilType as keyof typeof cropRecommendations]?.moderately.map((crop) => (
                    <Badge key={crop} className="bg-yellow-100 text-yellow-800 mr-2 mb-2">
                      {crop}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-red-600 mb-3">Not Recommended</h4>
                <div className="space-y-2">
                  {cropRecommendations[selectedFieldData.soilType as keyof typeof cropRecommendations]?.unsuitable.map((crop) => (
                    <Badge key={crop} className="bg-red-100 text-red-800 mr-2 mb-2">
                      {crop}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SoilMonitor;