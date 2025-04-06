
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { SortingStats } from "@/types";

// Mock data for the logs
const logData = [
  { date: '2023-10-01', time: '08:00', total: 150, plastic: 100, nonPlastic: 50, accuracy: '98%' },
  { date: '2023-10-01', time: '09:00', total: 180, plastic: 120, nonPlastic: 60, accuracy: '97%' },
  { date: '2023-10-01', time: '10:00', total: 170, plastic: 110, nonPlastic: 60, accuracy: '93%' },
  { date: '2023-10-01', time: '11:00', total: 160, plastic: 105, nonPlastic: 55, accuracy: '92%' },
  { date: '2023-10-01', time: '12:00', total: 190, plastic: 115, nonPlastic: 75, accuracy: '95%' },
  { date: '2023-10-01', time: '13:00', total: 200, plastic: 125, nonPlastic: 75, accuracy: '96%' },
  { date: '2023-10-01', time: '14:00', total: 210, plastic: 130, nonPlastic: 80, accuracy: '97%' },
  { date: '2023-10-01', time: '15:00', total: 220, plastic: 135, nonPlastic: 85, accuracy: '98%' },
  { date: '2023-10-01', time: '16:00', total: 230, plastic: 140, nonPlastic: 90, accuracy: '99%' },
];

// Mock stats data
const mockStats: SortingStats = {
  totalItems: 1200,
  plasticItems: 800,
  nonPlasticItems: 400,
  accuracy: 95,
  trend: 2
};

const Logs = () => {
  const [stats, setStats] = useState<SortingStats>(mockStats);
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-4">Logs & Reports</h1>
      </div>
      
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-sm font-medium">Total Items Sorted</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalItems}</div>
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
              <div className="text-3xl font-bold">{stats.plasticItems}</div>
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
              <div className="text-3xl font-bold">{stats.nonPlasticItems}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-red-600">↓ 3%</span>
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-sm font-medium">AI Model Accuracy</CardTitle>
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
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="text-xs">
                  Date & Time
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </Button>
                <Button variant="ghost" size="sm" className="text-xs">
                  Total Items Processed
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </Button>
                <Button variant="ghost" size="sm" className="text-xs">
                  Plastic Count
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </Button>
                <Button variant="ghost" size="sm" className="text-xs">
                  Non-Plastic Count
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </Button>
                <Button variant="ghost" size="sm" className="text-xs">
                  Accuracy
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date & Time</TableHead>
                    <TableHead className="text-right">Total Items Processed</TableHead>
                    <TableHead className="text-right">Plastic Count</TableHead>
                    <TableHead className="text-right">Non-Plastic Count</TableHead>
                    <TableHead className="text-right">Accuracy</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logData.map((log, index) => (
                    <TableRow key={index}>
                      <TableCell>{log.date} {log.time}</TableCell>
                      <TableCell className="text-right">{log.total}</TableCell>
                      <TableCell className="text-right">{log.plastic}</TableCell>
                      <TableCell className="text-right">{log.nonPlastic}</TableCell>
                      <TableCell className="text-right">
                        <Badge variant="outline" className={parseInt(log.accuracy) >= 95 ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                          {log.accuracy}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="mt-4 flex justify-center">
              <Button variant="outline" className="bg-blue-600 text-white hover:bg-blue-700">Access Past Reports</Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Export & Reporting</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Export Options</h3>
              <div className="bg-gray-100 rounded-md p-3">
                <div className="text-sm">CSV, PDF, Excel</div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">Generate Custom Reports</h3>
              <div className="bg-gray-100 rounded-md p-3">
                <div className="text-sm">Specific machine</div>
              </div>
            </div>
            <div className="pt-2">
              <Button className="bg-blue-600 hover:bg-blue-700">Download Report</Button>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Email Schedule</h3>
              <div className="bg-gray-100 rounded-md p-3">
                <div className="text-sm">Daily, Weekly</div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">View Historical Reports</h3>
              <div className="bg-gray-100 rounded-md p-3">
                <div className="text-sm">Access past reports</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logs;
