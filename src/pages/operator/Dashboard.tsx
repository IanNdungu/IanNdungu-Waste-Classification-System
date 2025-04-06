
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, Pause, Play, RefreshCw } from "lucide-react";
import { SystemSettings, SortingResult } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

// Mock data for the detected items
const mockDetectedItems: SortingResult[] = [
  { id: '72', timestamp: new Date('2023-10-31'), itemType: 'plastic', confidence: 0.98, imageUrl: 'item1.jpg' },
  { id: '71', timestamp: new Date('2023-10-31'), itemType: 'plastic', confidence: 0.96, imageUrl: 'item2.jpg' },
  { id: '70', timestamp: new Date('2023-10-31'), itemType: 'plastic', confidence: 0.95, imageUrl: 'item3.jpg' },
  { id: '69', timestamp: new Date('2023-10-31'), itemType: 'plastic', confidence: 0.93, imageUrl: 'item4.jpg' },
  { id: '68', timestamp: new Date('2023-10-31'), itemType: 'plastic', confidence: 0.91, imageUrl: 'item5.jpg' },
  { id: '67', timestamp: new Date('2023-10-31'), itemType: 'non-plastic', confidence: 0.97, imageUrl: 'item6.jpg' },
  { id: '66', timestamp: new Date('2023-10-31'), itemType: 'plastic', confidence: 0.92, imageUrl: 'item7.jpg' },
  { id: '65', timestamp: new Date('2023-10-31'), itemType: 'non-plastic', confidence: 0.94, imageUrl: 'item8.jpg' },
  { id: '64', timestamp: new Date('2023-10-31'), itemType: 'plastic', confidence: 0.90, imageUrl: 'item9.jpg' },
];

// Mock system settings
const initialSettings: SystemSettings = {
  beltSpeed: 50,
  cameraQuality: '240p',
  cameraZoom: 1,
};

const OperatorDashboard = () => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [settings, setSettings] = useState<SystemSettings>(initialSettings);
  const [detectedItems, setDetectedItems] = useState<SortingResult[]>(mockDetectedItems);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'plastic' | 'non-plastic'>('all');
  
  const { toast } = useToast();
  const { userName } = useAuth();
  
  useEffect(() => {
    // Filter items based on the selected filter
    const filterItems = () => {
      if (selectedFilter === 'all') {
        return mockDetectedItems;
      }
      return mockDetectedItems.filter(item => item.itemType === selectedFilter);
    };
    
    setDetectedItems(filterItems());
  }, [selectedFilter]);
  
  const handleToggleRunning = () => {
    setIsRunning(!isRunning);
    toast({
      title: isRunning ? "System Paused" : "System Started",
      description: isRunning ? "The conveyor belt has been paused" : "The conveyor belt is now running",
    });
  };
  
  const handleReportIssue = (itemId: string) => {
    toast({
      title: "Issue Reported",
      description: `Issue with item #${itemId} has been reported and will be reviewed.`,
    });
  };
  
  const handleBeltSpeedChange = (value: number[]) => {
    setSettings({ ...settings, beltSpeed: value[0] });
  };
  
  const handleRestart = () => {
    toast({
      title: "System Restarting",
      description: "The system is restarting, please wait...",
    });
    
    // Simulate restart
    setIsRunning(false);
    setTimeout(() => {
      setIsRunning(true);
      toast({
        title: "System Restarted",
        description: "The system has been successfully restarted",
      });
    }, 3000);
  };
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString();
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold">Camera 01 - Belt 1</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
          >
            <AlertTriangle size={16} className="mr-2" />
            Report Issue
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 flex flex-col">
          <div className="bg-black rounded-lg overflow-hidden relative">
            <img 
              src="/lovable-uploads/a3c4cce1-b360-4c55-a4a6-cdcdcab3bacc.png" 
              alt="Live Camera Feed" 
              className="w-full"
            />
            <div className="absolute top-2 left-2">
              <Badge variant="destructive" className="px-2 py-1">
                Live
              </Badge>
            </div>
          </div>
          
          <div className="flex justify-center gap-2 mt-4">
            <Button 
              variant="outline" 
              size="lg" 
              className="w-24 h-12"
              onClick={handleToggleRunning}
            >
              {isRunning ? (
                <>
                  <Pause size={18} className="mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play size={18} className="mr-2" />
                  Start
                </>
              )}
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="w-24 h-12"
              onClick={handleRestart}
            >
              <RefreshCw size={18} className="mr-2" />
              Restart
            </Button>
          </div>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Belt Speed</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-gray-500 mb-2">Speed</p>
                  <div className="space-y-2">
                    <div className="bg-gray-100 rounded p-2 flex items-center justify-center">
                      <span>{settings.beltSpeed}%</span>
                    </div>
                    <Slider 
                      value={[settings.beltSpeed]} 
                      min={0} 
                      max={100} 
                      step={10}
                      onValueChange={handleBeltSpeedChange}
                      className="w-full"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="w-full">20%</Button>
                  <Button variant="outline" size="sm" className="w-full bg-blue-600 text-white hover:bg-blue-700">50%</Button>
                  <Button variant="outline" size="sm" className="w-full">70%</Button>
                  <Button variant="outline" size="sm" className="w-full">100%</Button>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Camera Settings</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-2">Quality</p>
                  <div className="grid grid-cols-3 gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className={`w-full ${settings.cameraQuality === '144p' ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}`}
                      onClick={() => setSettings({ ...settings, cameraQuality: '144p' })}
                    >
                      144p
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className={`w-full ${settings.cameraQuality === '240p' ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}`}
                      onClick={() => setSettings({ ...settings, cameraQuality: '240p' })}
                    >
                      240p
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className={`w-full ${settings.cameraQuality === '480p' ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}`}
                      onClick={() => setSettings({ ...settings, cameraQuality: '480p' })}
                    >
                      480p
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className={`w-full ${settings.cameraQuality === '720p' ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}`}
                      onClick={() => setSettings({ ...settings, cameraQuality: '720p' })}
                    >
                      720p
                    </Button>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-2">Distance</p>
                  <div className="flex items-center justify-between">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setSettings({ ...settings, cameraZoom: Math.max(settings.cameraZoom - 0.1, 0.5) })}
                    >
                      Zoom in
                    </Button>
                    <div className="text-center text-sm font-medium">
                      {settings.cameraZoom.toFixed(1)}x
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSettings({ ...settings, cameraZoom: Math.min(settings.cameraZoom + 0.1, 2) })}
                    >
                      Zoom out
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium">Detected Items</CardTitle>
              <div className="flex gap-2 mt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={`${selectedFilter === 'all' ? 'bg-blue-100 border-blue-300 text-blue-700' : ''}`}
                  onClick={() => setSelectedFilter('all')}
                >
                  All
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={`${selectedFilter === 'plastic' ? 'bg-blue-100 border-blue-300 text-blue-700' : ''}`}
                  onClick={() => setSelectedFilter('plastic')}
                >
                  Plastic
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={`${selectedFilter === 'non-plastic' ? 'bg-blue-100 border-blue-300 text-blue-700' : ''}`}
                  onClick={() => setSelectedFilter('non-plastic')}
                >
                  Non-Plastic
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {detectedItems.map(item => (
                  <div key={item.id} className="p-3 border rounded-md">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">Item {item.id}</h4>
                        <p className={`text-sm ${item.itemType === 'plastic' ? 'text-blue-600' : 'text-green-600'}`}>
                          {item.itemType === 'plastic' ? 'Plastic' : 'Non-Plastic'}
                        </p>
                        <p className="text-xs text-gray-500">{formatDate(item.timestamp)}</p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-xs"
                        onClick={() => handleReportIssue(item.id)}
                      >
                        Report
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OperatorDashboard;
