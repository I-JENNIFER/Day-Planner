import React, { useState } from 'react';
import { Settings, Trash2, RotateCcw, AlertTriangle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface SettingsPanelProps {
  onResetProgress: () => void;
  onResetRoutine: () => void;
  onClearHistory: () => void;
}

export default function SettingsPanel({ onResetProgress, onResetRoutine, onClearHistory }: SettingsPanelProps) {
  const [open, setOpen] = useState(false);

  const handleResetProgress = () => {
    onResetProgress();
    setOpen(false);
  };

  const handleResetRoutine = () => {
    onResetRoutine();
    setOpen(false);
  };

  const handleClearHistory = () => {
    onClearHistory();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Settings className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-orange-500" />
            Settings
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">

          {/* Reset Progress */}
          <div className="flex items-center justify-between p-3 rounded-lg border bg-white">
            <div>
              <p className="text-sm font-medium">Reset Today's Progress</p>
              <p className="text-xs text-slate-500">Uncheck all completed activities for today</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="shrink-0 text-orange-500 border-orange-200 hover:bg-orange-50"
              onClick={handleResetProgress}
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              Reset
            </Button>
          </div>

          <Separator />

          {/* Reset Routine */}
          <div className="flex items-center justify-between p-3 rounded-lg border bg-white">
            <div>
              <p className="text-sm font-medium">Reset Routine to Default</p>
              <p className="text-xs text-slate-500 text-red-400">⚠️ This will delete all your custom activities</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="shrink-0 text-red-500 border-red-200 hover:bg-red-50"
              onClick={handleResetRoutine}
            >
              <AlertTriangle className="w-4 h-4 mr-1" />
              Reset
            </Button>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}