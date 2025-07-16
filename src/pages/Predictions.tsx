import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  TrendingUp, 
  Calculator,
  DollarSign,
  BarChart3,
  Target,
  AlertCircle
} from "lucide-react";

const Predictions = () => {
  const { toast } = useToast();
  const [predictionForm, setPredictionForm] = useState({
    crop: "",
    variety: "",
    area: "",
    soilType: "",
    season: "",
    investmentLevel: ""
  });

  const [predictions, setPredictions] = useState<any>(null);

  const crops = [
    "Rice", "Wheat", "Corn", "Tomatoes", "Potatoes", "Soybeans", 
    "Barley", "Sugarcane", "Cotton", "Cabbage", "Carrots", "Onions"
  ];

  const soilTypes = ["Clay", "Sandy", "Loamy", "Silty", "Peaty", "Chalky"];
  const seasons = ["Winter", "Summer", "Monsoon", "Post-Monsoon"];
  const investmentLevels = ["Low", "Medium", "High", "Premium"];

  const predictionData = {
    "Rice": {
      "Loamy": {
        yield: { min: 3.2, max: 4.5, avg: 3.8 },
        price: { min: 8500, max: 12000, avg: 10000 },
        expenses: { Low: 25000, Medium: 35000, High: 45000, Premium: 60000 },
        risks: ["Weather dependency", "Market price fluctuation"],
        recommendations: ["Use certified seeds", "Proper water management", "Timely harvesting"]
      },
      "Clay": {
        yield: { min: 3.5, max: 4.8, avg: 4.1 },
        price: { min: 8500, max: 12000, avg: 10000 },
        expenses: { Low: 28000, Medium: 38000, High: 48000, Premium: 65000 },
        risks: ["Drainage issues", "Disease susceptibility"],
        recommendations: ["Improve drainage", "Disease monitoring", "Soil amendments"]
      }
    },
    "Wheat": {
      "Loamy": {
        yield: { min: 2.8, max: 3.5, avg: 3.1 },
        price: { min: 18000, max: 22000, avg: 20000 },
        expenses: { Low: 20000, Medium: 28000, High: 38000, Premium: 50000 },
        risks: ["Pest attacks", "Temperature fluctuations"],
        recommendations: ["Pest management", "Temperature monitoring", "Quality seeds"]
      }
    },
    "Corn": {
      "Sandy": {
        yield: { min: 4.2, max: 5.5, avg: 4.8 },
        price: { min: 15000, max: 18000, avg: 16500 },
        expenses: { Low: 22000, Medium: 32000, High: 42000, Premium: 55000 },
        risks: ["Water stress", "Nutrient deficiency"],
        recommendations: ["Irrigation planning", "Fertilizer management", "Hybrid varieties"]
      }
    }
  };

  const calculatePredictions = () => {
    if (!predictionForm.crop || !predictionForm.area || !predictionForm.soilType || !predictionForm.investmentLevel) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const cropData = predictionData[predictionForm.crop as keyof typeof predictionData];
    if (!cropData) {
      toast({
        title: "Error", 
        description: "Prediction data not available for selected crop",
        variant: "destructive"
      });
      return;
    }

    const soilData = cropData[predictionForm.soilType as keyof typeof cropData] as any;
    if (!soilData) {
      toast({
        title: "Error",
        description: "Prediction data not available for selected soil type",
        variant: "destructive"
      });
      return;
    }

    const area = parseFloat(predictionForm.area);
    const expenses = soilData.expenses[predictionForm.investmentLevel as keyof typeof soilData.expenses];
    const totalExpenses = expenses * area;
    
    // Calculate yield based on investment level
    const baseYield = soilData.yield.avg;
    const yieldMultiplier = {
      Low: 0.8,
      Medium: 0.95,
      High: 1.1,
      Premium: 1.25
    };
    
    const expectedYield = baseYield * yieldMultiplier[predictionForm.investmentLevel as keyof typeof yieldMultiplier] * area;
    const totalIncome = expectedYield * soilData.price.avg;
    const netProfit = totalIncome - totalExpenses;
    const profitMargin = (netProfit / totalIncome) * 100;
    
    const result = {
      crop: predictionForm.crop,
      variety: predictionForm.variety || "Standard",
      area: area,
      soilType: predictionForm.soilType,
      season: predictionForm.season || "Current",
      investmentLevel: predictionForm.investmentLevel,
      expectedYield: expectedYield.toFixed(1),
      yieldPerAcre: (expectedYield / area).toFixed(1),
      totalIncome: totalIncome.toFixed(0),
      totalExpenses: totalExpenses.toFixed(0),
      netProfit: netProfit.toFixed(0),
      profitMargin: profitMargin.toFixed(1),
      risks: soilData.risks,
      recommendations: soilData.recommendations,
      confidence: predictionForm.investmentLevel === "Premium" ? "High" : 
                  predictionForm.investmentLevel === "High" ? "Medium-High" :
                  predictionForm.investmentLevel === "Medium" ? "Medium" : "Low-Medium"
    };

    setPredictions(result);
    
    toast({
      title: "Predictions Generated",
      description: "Income predictions calculated successfully",
    });
  };

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case "High": return "bg-green-100 text-green-800";
      case "Medium-High": return "bg-blue-100 text-blue-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low-Medium": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getProfitColor = (profit: number) => {
    if (profit > 50000) return "text-green-600";
    if (profit > 20000) return "text-blue-600";
    if (profit > 0) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Income Predictions</h1>
        <p className="text-lg text-muted-foreground">
          Predict your farming income based on crops, soil, and investment levels
        </p>
      </div>

      {/* Prediction Form */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Income Prediction Calculator
          </CardTitle>
          <CardDescription>Enter your farming parameters to get income predictions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div>
              <Label htmlFor="crop">Crop Type *</Label>
              <Select value={predictionForm.crop} onValueChange={(value) => setPredictionForm({...predictionForm, crop: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select crop" />
                </SelectTrigger>
                <SelectContent>
                  {crops.map((crop) => (
                    <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="variety">Variety</Label>
              <Input
                id="variety"
                value={predictionForm.variety}
                onChange={(e) => setPredictionForm({...predictionForm, variety: e.target.value})}
                placeholder="e.g., Basmati"
              />
            </div>
            
            <div>
              <Label htmlFor="area">Area (acres) *</Label>
              <Input
                id="area"
                type="number"
                step="0.1"
                value={predictionForm.area}
                onChange={(e) => setPredictionForm({...predictionForm, area: e.target.value})}
                placeholder="2.5"
              />
            </div>
            
            <div>
              <Label htmlFor="soilType">Soil Type *</Label>
              <Select value={predictionForm.soilType} onValueChange={(value) => setPredictionForm({...predictionForm, soilType: value})}>
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
            
            <div>
              <Label htmlFor="season">Season</Label>
              <Select value={predictionForm.season} onValueChange={(value) => setPredictionForm({...predictionForm, season: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select season" />
                </SelectTrigger>
                <SelectContent>
                  {seasons.map((season) => (
                    <SelectItem key={season} value={season}>{season}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="investment">Investment Level *</Label>
              <Select value={predictionForm.investmentLevel} onValueChange={(value) => setPredictionForm({...predictionForm, investmentLevel: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select investment" />
                </SelectTrigger>
                <SelectContent>
                  {investmentLevels.map((level) => (
                    <SelectItem key={level} value={level}>{level}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button onClick={calculatePredictions} className="w-full">
            <Target className="h-4 w-4 mr-2" />
            Calculate Income Predictions
          </Button>
        </CardContent>
      </Card>

      {/* Prediction Results */}
      {predictions && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Expected Income</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">₹{parseInt(predictions.totalIncome).toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  For {predictions.area} acres
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">₹{parseInt(predictions.totalExpenses).toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  {predictions.investmentLevel} investment level
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${getProfitColor(parseInt(predictions.netProfit))}`}>
                  ₹{parseInt(predictions.netProfit).toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  {predictions.profitMargin}% profit margin
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Expected Yield</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{predictions.expectedYield} tons</div>
                <p className="text-xs text-muted-foreground">
                  {predictions.yieldPerAcre} tons/acre
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Prediction Details
                </CardTitle>
                <CardDescription>
                  Confidence Level: 
                  <Badge className={`ml-2 ${getConfidenceColor(predictions.confidence)}`}>
                    {predictions.confidence}
                  </Badge>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Crop Information</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Crop:</span>
                          <span>{predictions.crop}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Variety:</span>
                          <span>{predictions.variety}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Area:</span>
                          <span>{predictions.area} acres</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Soil:</span>
                          <span>{predictions.soilType}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Investment Analysis</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Level:</span>
                          <span>{predictions.investmentLevel}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Cost/acre:</span>
                          <span>₹{(parseInt(predictions.totalExpenses) / predictions.area).toFixed(0)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">ROI:</span>
                          <span className={getProfitColor(parseInt(predictions.netProfit))}>
                            {((parseInt(predictions.netProfit) / parseInt(predictions.totalExpenses)) * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Risks & Recommendations
                </CardTitle>
                <CardDescription>Important considerations for your farming plan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2 text-red-600">Potential Risks</h4>
                    <ul className="space-y-1">
                      {predictions.risks.map((risk: string, index: number) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <span className="text-red-500 mt-1">•</span>
                          <span>{risk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2 text-green-600">Recommendations</h4>
                    <ul className="space-y-1">
                      {predictions.recommendations.map((rec: string, index: number) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <span className="text-green-500 mt-1">•</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {!predictions && (
        <Card>
          <CardContent className="text-center py-12">
            <Calculator className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">Generate Income Predictions</h3>
            <p className="text-muted-foreground">
              Fill out the form above to get detailed income predictions for your farming plans.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Predictions;