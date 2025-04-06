
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data
const accuracyData = [
  { name: 'Jan', accuracy: 88 },
  { name: 'Feb', accuracy: 89 },
  { name: 'Mar', accuracy: 92 },
  { name: 'Apr', accuracy: 95 },
  { name: 'May', accuracy: 97 },
];

const dailyPerformanceData = [
  { time: '5 PM', performance: 120 },
  { time: '12 PM', performance: 90 },
  { time: '8 PM', performance: 70 },
  { time: '9 PM', performance: 50 },
  { time: '2 PM', performance: 30 },
  { time: '3 PM', performance: 20 },
];

const Analytics = () => {
  const [showAlerts, setShowAlerts] = useState(false);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <div className="flex items-center gap-2">
          <Button className="bg-blue-600 hover:bg-blue-700">Alerts</Button>
          <Button variant="outline" size="sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-more-horizontal">
              <circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>
            </svg>
          </Button>
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Key Metrics Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-sm font-medium">Total Items Processed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-600">↑ 5% this week</span>
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-sm font-medium">Plastic</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">60%</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span>N/A</span>
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-sm font-medium">Sorting Accuracy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">98%</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-600">↑ 2% this month</span>
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">99.9%</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-gray-500">Stable</span>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Performance Trends</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="overflow-hidden">
            <CardHeader className="pb-0">
              <div className="flex justify-between">
                <div>
                  <CardTitle className="text-base font-medium">Classification Accuracy</CardTitle>
                  <div className="mt-1">
                    <span className="text-3xl font-bold">98%</span>
                    <span className="text-sm text-green-600 ml-2">↑ 2%</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={accuracyData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 0,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis domain={[80, 100]} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="accuracy" 
                      stroke="#0078c6" 
                      strokeWidth={2}
                      activeDot={{ r: 8 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-0">
              <div className="flex justify-between">
                <div>
                  <CardTitle className="text-base font-medium">Performance Fluctuations</CardTitle>
                  <div className="mt-1">
                    <span className="text-3xl font-bold">Daily Performance</span>
                    <span className="text-sm text-gray-500 ml-2">Variable</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={dailyPerformanceData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 0,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="performance" fill="#0078c6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
