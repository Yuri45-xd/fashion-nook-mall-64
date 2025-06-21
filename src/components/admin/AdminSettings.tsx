
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Settings, Save, Database, Bell, Shield, Palette } from "lucide-react";

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    siteName: "Fashion Store",
    siteDescription: "Premium fashion for everyone",
    currency: "INR",
    taxRate: 18,
    emailNotifications: true,
    smsNotifications: false,
    lowStockAlert: 10,
    autoBackup: true,
    maintenanceMode: false,
    allowGuestCheckout: true,
    requireEmailVerification: false,
    maxOrdersPerDay: 1000
  });

  const handleSave = () => {
    // In real app, save to Supabase
    toast.success("Settings saved successfully!");
  };

  const handleReset = () => {
    // Reset to default values
    toast.info("Settings reset to default values");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Admin Settings</h1>
        <p className="text-gray-600">Configure your store settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              General Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="siteName">Site Name</Label>
              <Input
                id="siteName"
                value={settings.siteName}
                onChange={(e) => setSettings({...settings, siteName: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="siteDescription">Site Description</Label>
              <Input
                id="siteDescription"
                value={settings.siteDescription}
                onChange={(e) => setSettings({...settings, siteDescription: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="currency">Currency</Label>
              <select
                id="currency"
                value={settings.currency}
                onChange={(e) => setSettings({...settings, currency: e.target.value})}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="INR">INR (₹)</option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
              </select>
            </div>
            
            <div>
              <Label htmlFor="taxRate">Tax Rate (%)</Label>
              <Input
                id="taxRate"
                type="number"
                value={settings.taxRate}
                onChange={(e) => setSettings({...settings, taxRate: Number(e.target.value)})}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="emailNotifications">Email Notifications</Label>
              <Switch
                id="emailNotifications"
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => setSettings({...settings, emailNotifications: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="smsNotifications">SMS Notifications</Label>
              <Switch
                id="smsNotifications"
                checked={settings.smsNotifications}
                onCheckedChange={(checked) => setSettings({...settings, smsNotifications: checked})}
              />
            </div>
            
            <div>
              <Label htmlFor="lowStockAlert">Low Stock Alert Threshold</Label>
              <Input
                id="lowStockAlert"
                type="number"
                value={settings.lowStockAlert}
                onChange={(e) => setSettings({...settings, lowStockAlert: Number(e.target.value)})}
              />
            </div>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              System Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="autoBackup">Auto Backup</Label>
              <Switch
                id="autoBackup"
                checked={settings.autoBackup}
                onCheckedChange={(checked) => setSettings({...settings, autoBackup: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
              <Switch
                id="maintenanceMode"
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) => setSettings({...settings, maintenanceMode: checked})}
              />
            </div>
            
            <div>
              <Label htmlFor="maxOrdersPerDay">Max Orders Per Day</Label>
              <Input
                id="maxOrdersPerDay"
                type="number"
                value={settings.maxOrdersPerDay}
                onChange={(e) => setSettings({...settings, maxOrdersPerDay: Number(e.target.value)})}
              />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Security Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="allowGuestCheckout">Allow Guest Checkout</Label>
              <Switch
                id="allowGuestCheckout"
                checked={settings.allowGuestCheckout}
                onCheckedChange={(checked) => setSettings({...settings, allowGuestCheckout: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="requireEmailVerification">Require Email Verification</Label>
              <Switch
                id="requireEmailVerification"
                checked={settings.requireEmailVerification}
                onCheckedChange={(checked) => setSettings({...settings, requireEmailVerification: checked})}
              />
            </div>
            
            <Button variant="outline" className="w-full">
              Change Admin Password
            </Button>
            
            <Button variant="outline" className="w-full">
              Two-Factor Authentication
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4">
        <Button onClick={handleSave} className="flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save Settings
        </Button>
        <Button variant="outline" onClick={handleReset}>
          Reset to Default
        </Button>
      </div>
    </div>
  );
};

export default AdminSettings;
