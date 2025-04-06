
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

const Settings = () => {
  const [saving, setSaving] = useState(false);
  
  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
    }, 1000);
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
      
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid grid-cols-4 w-full max-w-lg mb-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="conveyor">Conveyor</TabsTrigger>
          <TabsTrigger value="camera">Camera</TabsTrigger>
          <TabsTrigger value="ai">AI Model</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage basic system settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="system-name">System Name</Label>
                  <Input id="system-name" defaultValue="Sortify AI Waste Sorting" />
                </div>
                <div>
                  <Label htmlFor="installation-location">Installation Location</Label>
                  <Input id="installation-location" defaultValue="Main Facility - North Wing" />
                </div>
                <div>
                  <Label htmlFor="installation-date">Installation Date</Label>
                  <Input id="installation-date" type="date" defaultValue="2023-01-15" />
                </div>
                <div>
                  <Label htmlFor="maintenance-schedule">Maintenance Schedule</Label>
                  <Select defaultValue="monthly">
                    <SelectTrigger>
                      <SelectValue placeholder="Select schedule" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Frequency</SelectLabel>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="biweekly">Bi-Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="error-alerts">Error Alerts</Label>
                  <Switch id="error-alerts" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="maintenance-alerts">Maintenance Alerts</Label>
                  <Switch id="maintenance-alerts" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="performance-alerts">Performance Alerts</Label>
                  <Switch id="performance-alerts" defaultChecked />
                </div>
              </div>
              <div>
                <Label htmlFor="contact-email">Contact Email</Label>
                <Input id="contact-email" type="email" defaultValue="admin@sortify.com" />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="conveyor">
          <Card>
            <CardHeader>
              <CardTitle>Conveyor Settings</CardTitle>
              <CardDescription>Configure conveyor belt operation parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="default-speed">Default Speed (mm/s)</Label>
                  <Input id="default-speed" type="number" defaultValue="200" />
                </div>
                <div>
                  <Label htmlFor="min-speed">Minimum Speed (mm/s)</Label>
                  <Input id="min-speed" type="number" defaultValue="50" />
                </div>
                <div>
                  <Label htmlFor="max-speed">Maximum Speed (mm/s)</Label>
                  <Input id="max-speed" type="number" defaultValue="400" />
                </div>
                <div>
                  <Label htmlFor="acceleration">Acceleration Rate (mm/s²)</Label>
                  <Input id="acceleration" type="number" defaultValue="20" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-adjust">Auto Speed Adjustment</Label>
                  <Switch id="auto-adjust" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="emergency-stop">Enable Emergency Stop</Label>
                  <Switch id="emergency-stop" defaultChecked />
                </div>
              </div>
              <div>
                <Label htmlFor="belt-width">Belt Width (mm)</Label>
                <Input id="belt-width" type="number" defaultValue="600" />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="camera">
          <Card>
            <CardHeader>
              <CardTitle>Camera Settings</CardTitle>
              <CardDescription>Configure camera and visual processing parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="camera-resolution">Default Resolution</Label>
                  <Select defaultValue="720p">
                    <SelectTrigger>
                      <SelectValue placeholder="Select resolution" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Quality</SelectLabel>
                        <SelectItem value="144p">144p</SelectItem>
                        <SelectItem value="240p">240p</SelectItem>
                        <SelectItem value="360p">360p</SelectItem>
                        <SelectItem value="480p">480p</SelectItem>
                        <SelectItem value="720p">720p</SelectItem>
                        <SelectItem value="1080p">1080p</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="frame-rate">Frame Rate (FPS)</Label>
                  <Input id="frame-rate" type="number" defaultValue="30" />
                </div>
                <div>
                  <Label htmlFor="camera-height">Camera Height (cm)</Label>
                  <Input id="camera-height" type="number" defaultValue="100" />
                </div>
                <div>
                  <Label htmlFor="camera-angle">Camera Angle (degrees)</Label>
                  <Input id="camera-angle" type="number" defaultValue="45" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-focus">Auto Focus</Label>
                  <Switch id="auto-focus" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-exposure">Auto Exposure</Label>
                  <Switch id="auto-exposure" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="save-images">Save Detected Images</Label>
                  <Switch id="save-images" defaultChecked />
                </div>
              </div>
              <div>
                <Label htmlFor="image-storage">Image Storage Path</Label>
                <Input id="image-storage" defaultValue="/var/sortify/images/" />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="ai">
          <Card>
            <CardHeader>
              <CardTitle>AI Model Settings</CardTitle>
              <CardDescription>Configure AI detection and classification parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="model-version">AI Model Version</Label>
                  <Select defaultValue="v2.3.0">
                    <SelectTrigger>
                      <SelectValue placeholder="Select version" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Version</SelectLabel>
                        <SelectItem value="v1.5.0">v1.5.0</SelectItem>
                        <SelectItem value="v2.0.0">v2.0.0</SelectItem>
                        <SelectItem value="v2.3.0">v2.3.0 (Latest)</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="confidence-threshold">Confidence Threshold</Label>
                  <Input id="confidence-threshold" type="number" min="0" max="1" step="0.01" defaultValue="0.75" />
                </div>
                <div>
                  <Label htmlFor="processing-mode">Processing Mode</Label>
                  <Select defaultValue="balanced">
                    <SelectTrigger>
                      <SelectValue placeholder="Select mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Mode</SelectLabel>
                        <SelectItem value="speed">Speed Optimized</SelectItem>
                        <SelectItem value="balanced">Balanced</SelectItem>
                        <SelectItem value="accuracy">Accuracy Optimized</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="hardware-accel">Hardware Acceleration</Label>
                  <Select defaultValue="gpu">
                    <SelectTrigger>
                      <SelectValue placeholder="Select hardware" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Hardware</SelectLabel>
                        <SelectItem value="cpu">CPU Only</SelectItem>
                        <SelectItem value="gpu">GPU</SelectItem>
                        <SelectItem value="tpu">TPU</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-update">Automatic Model Updates</Label>
                  <Switch id="auto-update" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="feedback-learning">Feedback Learning</Label>
                  <Switch id="feedback-learning" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="debug-mode">Debug Mode</Label>
                  <Switch id="debug-mode" />
                </div>
              </div>
              <div>
                <Label htmlFor="api-key">AI Model API Key</Label>
                <Input id="api-key" type="password" defaultValue="sk_1234567890abcdef" />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
