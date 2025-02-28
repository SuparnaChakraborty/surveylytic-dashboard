
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useState } from "react";
import SurveyForm from "@/components/SurveyForm";
import SurveyResponses from "@/components/SurveyResponses";
import { useQuery } from "@tanstack/react-query";
import { fetchSurveyData, fetchSurveyResponses } from "@/lib/api";
import { ChartBarIcon, BarChart3, FileBarChart } from "lucide-react";
import Dashboard from "@/components/Dashboard";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  
  const { data: surveyData, isLoading: isLoadingSurveyData } = useQuery({
    queryKey: ['surveyData'],
    queryFn: fetchSurveyData,
  });
  
  const { data: surveyResponses, isLoading: isLoadingResponses } = useQuery({
    queryKey: ['surveyResponses'],
    queryFn: fetchSurveyResponses,
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight mb-2">Surveylytic Dashboard</h1>
        <p className="text-muted-foreground">Gather insights from your customers with interactive surveys.</p>
      </header>

      <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span>Dashboard</span>
          </TabsTrigger>
          <TabsTrigger value="survey-form" className="flex items-center gap-2">
            <FileBarChart className="h-4 w-4" />
            <span>Survey Form</span>
          </TabsTrigger>
          <TabsTrigger value="responses" className="flex items-center gap-2">
            <ChartBarIcon className="h-4 w-4" />
            <span>All Responses</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="space-y-6">
          <Dashboard 
            surveyData={surveyData} 
            isLoading={isLoadingSurveyData}
            surveyResponses={surveyResponses}
          />
        </TabsContent>
        
        <TabsContent value="survey-form">
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden border">
            <div className="p-6">
              <h2 className="text-xl font-medium mb-1">Cart Page Survey Preview</h2>
              <p className="text-muted-foreground text-sm mb-6">This is how the survey will appear to customers on your cart page.</p>
              <SurveyForm preview={true} />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="responses">
          <SurveyResponses responses={surveyResponses} isLoading={isLoadingResponses} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
