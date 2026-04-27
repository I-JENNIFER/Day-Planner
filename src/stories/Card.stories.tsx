import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Circle, Clock, Dumbbell, Briefcase, Moon } from 'lucide-react';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content body.</p>
      </CardContent>
    </Card>
  ),
};

export const CurrentActivityCard: Story = {
  render: () => (
    <Card className="max-w-lg border-none shadow-xl bg-slate-900 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 p-8 opacity-10">
        <Clock className="w-32 h-32" />
      </div>
      <CardHeader>
        <CardDescription className="text-slate-400">Current Activity</CardDescription>
        <CardTitle className="text-3xl font-light">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-white/10 rounded-lg">
              <Briefcase className="w-4 h-4" />
            </span>
            Work at Office
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-sm text-slate-400">Next Up</p>
              <p className="font-medium">18:30 - Commute Home</p>
            </div>
            <div className="text-right">
              <p className="text-4xl font-light tracking-tighter">62%</p>
              <p className="text-xs text-slate-400 uppercase tracking-widest">Daily Progress</p>
            </div>
          </div>
          <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-orange-500" style={{ width: '62%' }} />
          </div>
        </div>
      </CardContent>
    </Card>
  ),
};

export const ActivityCard: Story = {
  render: () => (
    <Card className="max-w-lg group transition-all hover:shadow-md border-none shadow-sm bg-white">
      <CardContent className="p-4 flex items-center gap-4">
        <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 shrink-0 text-slate-400">
          <Circle className="w-6 h-6" />
        </Button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Badge className="bg-orange-100 text-orange-700 border-orange-200 text-[10px] uppercase tracking-wider px-1.5 py-0 border">
              exercise
            </Badge>
            <span className="text-xs font-mono text-slate-500">06:00 - 07:00</span>
          </div>
          <h3 className="font-medium truncate">Morning Exercise</h3>
        </div>
      </CardContent>
    </Card>
  ),
};

export const CompletedActivityCard: Story = {
  render: () => (
    <Card className="max-w-lg group transition-all hover:shadow-md border-none shadow-sm bg-slate-50 opacity-60">
      <CardContent className="p-4 flex items-center gap-4">
        <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 shrink-0 text-green-600">
          <CheckCircle2 className="w-6 h-6" />
        </Button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Badge className="bg-indigo-100 text-indigo-700 border-indigo-200 text-[10px] uppercase tracking-wider px-1.5 py-0 border">
              sleep
            </Badge>
            <span className="text-xs font-mono text-slate-500">22:15 - 06:00</span>
          </div>
          <h3 className="font-medium truncate line-through text-slate-500">Sleep</h3>
        </div>
      </CardContent>
    </Card>
  ),
};

export const StatCard: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4 max-w-lg">
      <Card className="border-none shadow-sm">
        <CardContent className="pt-6 text-center">
          <p className="text-3xl font-light text-orange-500">72%</p>
          <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider">7-Day Average</p>
        </CardContent>
      </Card>
      <Card className="border-none shadow-sm">
        <CardContent className="pt-6 text-center">
          <p className="text-3xl font-light text-orange-500">85%</p>
          <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider">Today</p>
        </CardContent>
      </Card>
      <Card className="border-none shadow-sm">
        <CardContent className="pt-6 text-center">
          <p className="text-3xl font-light text-orange-500">100%</p>
          <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider">Best Day</p>
        </CardContent>
      </Card>
    </div>
  ),
};
