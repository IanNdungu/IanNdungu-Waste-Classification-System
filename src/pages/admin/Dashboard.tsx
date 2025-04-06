
import { BarChart3, AlertTriangle } from "lucide-react";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertNotification, SortingStats } from "@/types";

// Mock data
const sortingData = [
  { name: 'Jan', items: 100 },
  { name: 'Feb', items: 120 },
  { name: 'Mar', items: 180 },
  { name: 'Apr', items: 190 },
  { name: 'May', items: 230 },
  { name: 'Jun', items: 280 }
];

const mockAlerts: AlertNotification[] = [
  {
    id: '1',
    title: 'System failed in the middle of scanning',
    message: 'Camera 03 - Belt 3 encountered an error during scanning process.',
    timestamp: new Date('2023-07-11T08:00:00'),
    type: 'error',
    source: 'Camera 03 - Belt 3',
    read: false
  },
  {
    id: '2',
    title: 'Maintenance Completed',
    message: 'Camera 01 - Belt 1 maintenance has been completed successfully.',
    timestamp: new Date('2023-06-11T16:30:00'),
    type: 'success',
    source: 'Camera 01 - Belt 1',
    read: false
  },
  {
    id: '3',
    title: 'Operator - Jane Disables',
    message: 'Operator Jane has disabled the system for maintenance.',
    timestamp: new Date('2023-06-11T14:45:00'),
    type: 'info',
    source: 'Users',
    read: false
  }
];

const mockStats: SortingStats = {
  totalItems: 1234,
  plasticItems: 567,
  nonPlasticItems: 667,
  accuracy: 92,
  trend: 1
};

const Dashboard = () => {
  const [stats, setStats] = useState<SortingStats>(mockStats);
  const [alerts, setAlerts] = useState<AlertNotification[]>(mockAlerts);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulating API fetch
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">System Overview</h1>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
            Running
          </Badge>
          <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 bg-blue-50 hover:bg-blue-100">
            <AlertTriangle size={16} className="mr-2" />
            Alerts
          </Button>
          <Button variant="outline" size="sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-more-horizontal">
              <circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>
            </svg>
          </Button>
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-sm font-medium">Total Items Processed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalItems.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-600">↑ 5%</span>
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-sm font-medium">Plastic Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.plasticItems.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-600">↑ 2%</span>
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-sm font-medium">Non-Plastic Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.nonPlasticItems.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-600">↑ 3%</span>
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-sm font-medium">Sorting Accuracy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.accuracy}%</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-600">↑ 1%</span>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Sorting Performance</h2>
          <Button variant="ghost" size="sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-more-horizontal">
              <circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>
            </svg>
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Card title</CardTitle>
            <div className="text-3xl font-bold">12.4k</div>
            <div className="text-xs text-green-600">+10.7% last mo</div>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={sortingData}
                  margin={{
                    top: 5,
                    right: 10,
                    left: 10,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="items"
                    stroke="#0078c6"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Alerts & Notifications ({alerts.length})</h2>
        <div className="space-y-4">
          {alerts.map(alert => (
            <div key={alert.id} className="bg-white p-4 rounded-lg border">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-sm text-gray-500">
                    {alert.source}
                  </span>
                  <h3 className="font-medium">{alert.title}</h3>
                  <div className="flex text-xs text-gray-500 mt-1">
                    <span className="mr-4">Time {formatTime(alert.timestamp)}</span>
                    <span>Date {formatDate(alert.timestamp)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
