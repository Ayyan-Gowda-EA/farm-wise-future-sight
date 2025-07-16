import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Calendar, 
  TrendingUp, 
  Wheat,
  DollarSign,
  BarChart3,
  Filter
} from "lucide-react";

const History = () => {
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedCrop, setSelectedCrop] = useState("All");

  const years = ["2024", "2023", "2022", "2021"];
  const crops = ["All", "Rice", "Wheat", "Corn", "Tomatoes", "Potatoes"];

  const seasonHistory = [
    {
      season: "Winter 2024",
      crop: "Wheat",
      variety: "Durum",
      area: "3.5 acres",
      plantingDate: "2024-01-10",
      harvestDate: "2024-04-15",
      yield: "2.8 tons/acre",
      totalYield: "9.8 tons",
      income: "₹98,000",
      expenses: "₹42,000",
      profit: "₹56,000",
      status: "Completed",
      weather: "Favorable",
      issues: ["Minor pest attack in week 8"],
      notes: "Excellent harvest due to proper irrigation management"
    },
    {
      season: "Monsoon 2024", 
      crop: "Rice",
      variety: "Basmati",
      area: "4.2 acres",
      plantingDate: "2024-06-15",
      harvestDate: "2024-10-20",
      yield: "3.2 tons/acre",
      totalYield: "13.4 tons",
      income: "₹1,34,000",
      expenses: "₹58,000",
      profit: "₹76,000",
      status: "Completed",
      weather: "Good rainfall",
      issues: [],
      notes: "Best rice harvest in 3 years"
    },
    {
      season: "Summer 2024",
      crop: "Corn",
      variety: "Sweet Corn",
      area: "2.8 acres",
      plantingDate: "2024-03-01",
      harvestDate: "2024-06-10",
      yield: "4.5 tons/acre",
      totalYield: "12.6 tons",
      income: "₹1,26,000",
      expenses: "₹48,000",
      profit: "₹78,000",
      status: "Completed",
      weather: "Hot and dry",
      issues: ["Required extra irrigation"],
      notes: "High market prices compensated for irrigation costs"
    },
    {
      season: "Winter 2023",
      crop: "Wheat",
      variety: "Hard Red",
      area: "3.0 acres",
      plantingDate: "2023-12-15",
      harvestDate: "2023-04-10",
      yield: "2.5 tons/acre",
      totalYield: "7.5 tons",
      income: "₹75,000",
      expenses: "₹38,000",
      profit: "₹37,000",
      status: "Completed",
      weather: "Below average rainfall",
      issues: ["Drought stress", "Lower than expected yield"],
      notes: "Implemented drip irrigation for next season"
    }
  ];

  const yearlyStats = {
    "2024": {
      totalIncome: "₹3,58,000",
      totalExpenses: "₹1,48,000",
      totalProfit: "₹2,10,000",
      totalArea: "10.5 acres",
      totalYield: "35.8 tons",
      avgYield: "3.4 tons/acre",
      profitMargin: "58.7%"
    },
    "2023": {
      totalIncome: "₹2,85,000", 
      totalExpenses: "₹1,25,000",
      totalProfit: "₹1,60,000",
      totalArea: "9.2 acres",
      totalYield: "28.5 tons",
      avgYield: "3.1 tons/acre",
      profitMargin: "56.1%"
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Planned": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredHistory = selectedCrop === "All" 
    ? seasonHistory 
    : seasonHistory.filter(season => season.crop === selectedCrop);

  const currentYearStats = yearlyStats[selectedYear as keyof typeof yearlyStats];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Farming History</h1>
        <p className="text-lg text-muted-foreground">
          Track your farming seasons, yields, and financial performance
        </p>
      </div>

      {/* Filters */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Year:</label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Crop:</label>
              <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {crops.map((crop) => (
                    <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Yearly Summary */}
      {currentYearStats && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              {selectedYear} Summary
            </CardTitle>
            <CardDescription>Overall performance for the selected year</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <DollarSign className="h-8 w-8 mx-auto mb-2 text-green-500" />
                <div className="text-2xl font-bold text-green-600">{currentYearStats.totalIncome}</div>
                <div className="text-sm text-muted-foreground">Total Income</div>
              </div>
              
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-red-600">{currentYearStats.totalExpenses}</div>
                <div className="text-sm text-muted-foreground">Total Expenses</div>
              </div>
              
              <div className="text-center p-4 border rounded-lg">
                <TrendingUp className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                <div className="text-2xl font-bold text-blue-600">{currentYearStats.totalProfit}</div>
                <div className="text-sm text-muted-foreground">Net Profit</div>
              </div>
              
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold">{currentYearStats.totalArea}</div>
                <div className="text-sm text-muted-foreground">Total Area</div>
              </div>
              
              <div className="text-center p-4 border rounded-lg">
                <Wheat className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                <div className="text-2xl font-bold">{currentYearStats.totalYield}</div>
                <div className="text-sm text-muted-foreground">Total Yield</div>
              </div>
              
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold">{currentYearStats.avgYield}</div>
                <div className="text-sm text-muted-foreground">Avg Yield</div>
              </div>
              
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-green-600">{currentYearStats.profitMargin}</div>
                <div className="text-sm text-muted-foreground">Profit Margin</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Season History */}
      <div className="space-y-6">
        {filteredHistory.map((season, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  {season.season} - {season.crop} ({season.variety})
                </CardTitle>
                <Badge className={getStatusColor(season.status)}>
                  {season.status}
                </Badge>
              </div>
              <CardDescription>
                {season.area} • Planted: {season.plantingDate} • Harvested: {season.harvestDate}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Yield & Production */}
                <div>
                  <h4 className="font-semibold mb-3">Yield & Production</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Yield per acre:</span>
                      <span className="font-medium">{season.yield}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total yield:</span>
                      <span className="font-medium">{season.totalYield}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Weather:</span>
                      <span className="font-medium">{season.weather}</span>
                    </div>
                  </div>
                </div>

                {/* Financial Performance */}
                <div>
                  <h4 className="font-semibold mb-3">Financial Performance</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Income:</span>
                      <span className="font-medium text-green-600">{season.income}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Expenses:</span>
                      <span className="font-medium text-red-600">{season.expenses}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Net Profit:</span>
                      <span className="font-medium text-blue-600">{season.profit}</span>
                    </div>
                  </div>
                </div>

                {/* Issues & Notes */}
                <div>
                  <h4 className="font-semibold mb-3">Issues & Notes</h4>
                  <div className="space-y-3">
                    {season.issues.length > 0 && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Issues:</p>
                        {season.issues.map((issue, issueIndex) => (
                          <Badge key={issueIndex} variant="destructive" className="mr-1 mb-1 text-xs">
                            {issue}
                          </Badge>
                        ))}
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Notes:</p>
                      <p className="text-sm">{season.notes}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredHistory.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No History Found</h3>
            <p className="text-muted-foreground">
              No farming history found for the selected filters.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default History;