
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { DollarSign, Users, ShoppingCart, TrendingUp } from "lucide-react";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

interface DashboardProps {
  surveyData: any;
  isLoading: boolean;
  surveyResponses: any;
}

const StatCard = ({ title, value, description, icon, className }: { 
  title: string; 
  value: string | number; 
  description: string;
  icon: React.ReactNode;
  className?: string;
}) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <div className={`rounded-md p-2 ${className}`}>
        {icon}
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

const Dashboard = ({ surveyData, isLoading, surveyResponses }: DashboardProps) => {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="space-y-0 pb-2">
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-1/3 mb-2" />
              <Skeleton className="h-3 w-3/4" />
            </CardContent>
          </Card>
        ))}
        <div className="md:col-span-2 lg:col-span-4">
          <Card>
            <CardHeader>
              <Skeleton className="h-5 w-1/4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[300px] w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // In a real app, these would be calculated from actual data
  const mockData = {
    totalResponses: surveyResponses?.length || 153,
    completionRate: "78%",
    averageSatisfaction: "4.2",
    conversionImpact: "+12%"
  };

  // Mock data for charts - in a real app, this would be processed from surveyData
  const satisfactionData = [
    { name: 'Very Satisfied', value: 42 },
    { name: 'Satisfied', value: 28 },
    { name: 'Neutral', value: 15 },
    { name: 'Dissatisfied', value: 10 },
    { name: 'Very Dissatisfied', value: 5 },
  ];

  const weeklyResponseData = [
    { name: 'Mon', responses: 20 },
    { name: 'Tue', responses: 32 },
    { name: 'Wed', responses: 28 },
    { name: 'Thu', responses: 38 },
    { name: 'Fri', responses: 42 },
    { name: 'Sat', responses: 50 },
    { name: 'Sun', responses: 35 },
  ];

  const improvementAreaData = [
    { name: 'Product Quality', value: 35 },
    { name: 'Pricing', value: 25 },
    { name: 'Shipping', value: 18 },
    { name: 'Website UX', value: 15 },
    { name: 'Customer Service', value: 7 },
  ];

  const timeSeriesData = [
    { name: 'Week 1', responses: 50, satisfaction: 3.8 },
    { name: 'Week 2', responses: 65, satisfaction: 3.9 },
    { name: 'Week 3', responses: 58, satisfaction: 4.0 },
    { name: 'Week 4', responses: 85, satisfaction: 4.2 },
    { name: 'Week 5', responses: 78, satisfaction: 4.3 },
    { name: 'Week 6', responses: 92, satisfaction: 4.1 },
  ];

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Responses" 
          value={mockData.totalResponses}
          description={`${weeklyResponseData.reduce((acc, curr) => acc + curr.responses, 0)} responses this week`}
          icon={<Users className="h-4 w-4" />}
          className="bg-blue-100 text-blue-700"
        />
        <StatCard 
          title="Completion Rate" 
          value={mockData.completionRate}
          description="Of customers who started the survey"
          icon={<TrendingUp className="h-4 w-4" />}
          className="bg-green-100 text-green-700"
        />
        <StatCard 
          title="Average Satisfaction" 
          value={mockData.averageSatisfaction}
          description="Out of 5 stars"
          icon={<ShoppingCart className="h-4 w-4" />}
          className="bg-yellow-100 text-yellow-700"
        />
        <StatCard 
          title="Conversion Impact" 
          value={mockData.conversionImpact}
          description="Increase in checkout rate"
          icon={<DollarSign className="h-4 w-4" />}
          className="bg-purple-100 text-purple-700"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 mt-4">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Customer Satisfaction</CardTitle>
            <CardDescription>
              Distribution of satisfaction ratings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={satisfactionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {satisfactionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Weekly Response Trend</CardTitle>
            <CardDescription>
              Survey completion by day this week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={weeklyResponseData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="responses" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 mt-4">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Areas for Improvement</CardTitle>
            <CardDescription>
              Based on customer feedback
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={improvementAreaData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 50,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip />
                  <Bar dataKey="value" fill="#00C49F" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Response & Satisfaction Trends</CardTitle>
            <CardDescription>
              6 week comparison
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={timeSeriesData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" domain={[1, 5]} />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="responses"
                    stroke="#0088FE"
                    activeDot={{ r: 8 }}
                  />
                  <Line yAxisId="right" type="monotone" dataKey="satisfaction" stroke="#FF8042" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Dashboard;
