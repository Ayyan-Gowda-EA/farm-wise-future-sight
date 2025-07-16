import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Bug, 
  Search,
  AlertTriangle,
  Eye,
  Leaf,
  Shield,
  Activity
} from "lucide-react";

const Diseases = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCrop, setSelectedCrop] = useState("All");
  const [selectedSeverity, setSelectedSeverity] = useState("All");

  const crops = ["All", "Rice", "Wheat", "Corn", "Tomatoes", "Potatoes"];
  const severityLevels = ["All", "Low", "Medium", "High", "Critical"];

  const diseases = [
    {
      id: 1,
      name: "Leaf Blast",
      crop: "Rice",
      type: "Fungal",
      severity: "High",
      symptoms: [
        "Diamond-shaped lesions on leaves",
        "Gray-white centers with dark borders",
        "Yellowing and wilting of leaves",
        "Reduced grain filling"
      ],
      causes: [
        "High humidity (>90%)",
        "Temperature 25-28°C",
        "Excessive nitrogen fertilization",
        "Poor air circulation"
      ],
      treatment: [
        "Apply fungicide (Tricyclazole)",
        "Reduce nitrogen application",
        "Improve field drainage",
        "Use resistant varieties"
      ],
      prevention: [
        "Seed treatment before planting",
        "Balanced fertilization",
        "Proper spacing between plants",
        "Regular field monitoring"
      ],
      organicTreatment: [
        "Neem oil spray",
        "Copper sulfate solution",
        "Bio-fungicide application",
        "Crop rotation"
      ],
      affectedStage: "Vegetative to Reproductive",
      economicImpact: "Can cause 50-90% yield loss"
    },
    {
      id: 2,
      name: "Stripe Rust",
      crop: "Wheat",
      type: "Fungal", 
      severity: "Medium",
      symptoms: [
        "Yellow stripes on leaves",
        "Powdery yellow spores",
        "Premature leaf drying",
        "Reduced kernel weight"
      ],
      causes: [
        "Cool temperatures (10-15°C)",
        "High humidity",
        "Wind dispersal of spores",
        "Susceptible varieties"
      ],
      treatment: [
        "Fungicide application (Propiconazole)",
        "Remove infected plant debris",
        "Apply at early infection stage",
        "Follow up treatments if needed"
      ],
      prevention: [
        "Use resistant wheat varieties",
        "Proper crop rotation",
        "Avoid over-irrigation",
        "Monitor weather conditions"
      ],
      organicTreatment: [
        "Sulfur-based fungicides",
        "Baking soda spray",
        "Milk solution application",
        "Beneficial microorganism inoculation"
      ],
      affectedStage: "Tillering to Heading",
      economicImpact: "Can reduce yield by 20-40%"
    },
    {
      id: 3,
      name: "Corn Smut",
      crop: "Corn",
      type: "Fungal",
      severity: "Medium",
      symptoms: [
        "Large galls on ears, stalks, and leaves",
        "Silver-white to black galls",
        "Distorted plant growth",
        "Reduced ear formation"
      ],
      causes: [
        "Wound entry points",
        "High nitrogen levels",
        "Warm, humid conditions",
        "Mechanical injury"
      ],
      treatment: [
        "Remove and destroy infected galls",
        "Apply fungicide if caught early",
        "Reduce nitrogen fertilization",
        "Improve field sanitation"
      ],
      prevention: [
        "Avoid mechanical injury",
        "Balanced fertilization",
        "Use certified disease-free seeds",
        "Crop rotation with non-host crops"
      ],
      organicTreatment: [
        "Manual removal of galls",
        "Compost tea applications",
        "Beneficial bacteria inoculation",
        "Cultural control methods"
      ],
      affectedStage: "All growth stages",
      economicImpact: "Minor to moderate yield impact"
    },
    {
      id: 4,
      name: "Late Blight",
      crop: "Tomatoes",
      type: "Oomycete",
      severity: "Critical",
      symptoms: [
        "Dark water-soaked lesions on leaves",
        "White fuzzy growth on leaf undersides",
        "Brown spots on stems and fruits",
        "Rapid plant collapse"
      ],
      causes: [
        "Cool, wet weather",
        "High humidity (>80%)",
        "Temperature 15-20°C",
        "Poor air circulation"
      ],
      treatment: [
        "Immediate fungicide application",
        "Remove infected plants",
        "Improve air circulation",
        "Avoid overhead irrigation"
      ],
      prevention: [
        "Use resistant varieties",
        "Proper plant spacing",
        "Avoid wet foliage",
        "Regular field inspection"
      ],
      organicTreatment: [
        "Copper-based fungicides",
        "Baking soda spray",
        "Neem oil application",
        "Crop rotation"
      ],
      affectedStage: "All stages, especially mature plants",
      economicImpact: "Can destroy entire crop in days"
    },
    {
      id: 5,
      name: "Black Scurf",
      crop: "Potatoes",
      type: "Fungal",
      severity: "Low",
      symptoms: [
        "Black sclerotia on tuber surface",
        "Raised dark spots on skin",
        "Stem cankers at soil line",
        "Reduced plant vigor"
      ],
      causes: [
        "Infected seed tubers",
        "Cool, wet soil conditions",
        "Poor soil drainage",
        "Extended storage in humid conditions"
      ],
      treatment: [
        "Fungicide seed treatment",
        "Improve soil drainage",
        "Harvest in dry conditions",
        "Proper storage management"
      ],
      prevention: [
        "Use certified seed potatoes",
        "Soil fumigation if severe",
        "Crop rotation",
        "Avoid planting in wet soils"
      ],
      organicTreatment: [
        "Hot water seed treatment",
        "Biological control agents",
        "Organic soil amendments",
        "Solar sterilization"
      ],
      affectedStage: "Tuber formation to harvest",
      economicImpact: "Mainly cosmetic, affects marketability"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical": return "bg-red-100 text-red-800";
      case "High": return "bg-orange-100 text-orange-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Fungal": return "bg-purple-100 text-purple-800";
      case "Bacterial": return "bg-blue-100 text-blue-800";
      case "Viral": return "bg-pink-100 text-pink-800";
      case "Oomycete": return "bg-indigo-100 text-indigo-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredDiseases = diseases.filter((disease) => {
    const matchesSearch = disease.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         disease.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         disease.symptoms.some(symptom => symptom.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCrop = selectedCrop === "All" || disease.crop === selectedCrop;
    const matchesSeverity = selectedSeverity === "All" || disease.severity === selectedSeverity;
    
    return matchesSearch && matchesCrop && matchesSeverity;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Crop Disease Management</h1>
        <p className="text-lg text-muted-foreground">
          Identify, treat, and prevent crop diseases with comprehensive management guides
        </p>
      </div>

      {/* Search and Filters */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search Diseases
          </CardTitle>
          <CardDescription>Find diseases by name, crop, or symptoms</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Input
                placeholder="Search diseases or symptoms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            
            <div>
              <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by crop" />
                </SelectTrigger>
                <SelectContent>
                  {crops.map((crop) => (
                    <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by severity" />
                </SelectTrigger>
                <SelectContent>
                  {severityLevels.map((level) => (
                    <SelectItem key={level} value={level}>{level}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Disease Cards */}
      <div className="space-y-6">
        {filteredDiseases.map((disease) => (
          <Card key={disease.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Bug className="h-5 w-5" />
                  {disease.name}
                </CardTitle>
                <div className="flex gap-2">
                  <Badge className={getSeverityColor(disease.severity)}>
                    {disease.severity}
                  </Badge>
                  <Badge className={getTypeColor(disease.type)}>
                    {disease.type}
                  </Badge>
                </div>
              </div>
              <CardDescription>
                Affects: {disease.crop} • Stage: {disease.affectedStage}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Symptoms */}
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      Symptoms
                    </h4>
                    <ul className="space-y-1">
                      {disease.symptoms.map((symptom, index) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <span className="text-red-500 mt-1">•</span>
                          <span>{symptom}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Causes */}
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      Causes & Conditions
                    </h4>
                    <ul className="space-y-1">
                      {disease.causes.map((cause, index) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <span className="text-orange-500 mt-1">•</span>
                          <span>{cause}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Economic Impact */}
                  <div className="p-3 bg-muted rounded-lg">
                    <h4 className="font-semibold mb-1 text-sm">Economic Impact</h4>
                    <p className="text-sm text-muted-foreground">{disease.economicImpact}</p>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Treatment */}
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Activity className="h-4 w-4" />
                      Chemical Treatment
                    </h4>
                    <ul className="space-y-1">
                      {disease.treatment.map((treatment, index) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <span className="text-blue-500 mt-1">•</span>
                          <span>{treatment}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Organic Treatment */}
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Leaf className="h-4 w-4" />
                      Organic Treatment
                    </h4>
                    <ul className="space-y-1">
                      {disease.organicTreatment.map((treatment, index) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <span className="text-green-500 mt-1">•</span>
                          <span>{treatment}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Prevention */}
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Prevention
                    </h4>
                    <ul className="space-y-1">
                      {disease.prevention.map((prevention, index) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <span className="text-purple-500 mt-1">•</span>
                          <span>{prevention}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDiseases.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Bug className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">No Diseases Found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or filters to find more diseases.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Diseases;