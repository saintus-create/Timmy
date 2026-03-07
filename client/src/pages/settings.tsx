import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Settings className="w-8 h-8 text-green-400" />
          <h1 className="text-3xl font-bold text-white">Settings</h1>
        </div>

        <Card className="bg-slate-800 border-slate-700 p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Preferences</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Theme</span>
              <select className="bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white text-sm" data-testid="select-theme">
                <option>Dark</option>
                <option>Light</option>
                <option>Auto</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Notifications</span>
              <input type="checkbox" defaultChecked className="w-4 h-4" data-testid="checkbox-notifications" />
            </div>
          </div>
        </Card>

        <Card className="bg-slate-800 border-slate-700 p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Account</h2>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start" data-testid="button-change-password">
              Change Password
            </Button>
            <Button variant="outline" className="w-full justify-start" data-testid="button-clear-history">
              Clear Chat History
            </Button>
            <Button variant="destructive" className="w-full justify-start" data-testid="button-logout">
              Logout
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
