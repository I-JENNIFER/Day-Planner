import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { format, subDays } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RoutineItem } from './types';

interface AnalyticsProps {
  routine: RoutineItem[];
}

export default function Analytics({ routine }: AnalyticsProps) {
  const weeklyData = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const date = subDays(new Date(), 6 - i);
      const dateStr = format(date, 'yyyy-MM-dd');
      const dayName = format(date, 'eeee').toLowerCase();
      const isToday = i === 6;
      const scheduledActivities = routine.filter(item => item.days.includes(dayName as any));
      const saved = localStorage.getItem('dayflow_completed_v2');
      const allCompleted = saved ? JSON.parse(saved) : { date: '', ids: [] };
      let completedCount = 0;
      if (isToday) {
        completedCount = allCompleted.date === dateStr
          ? scheduledActivities.filter(item => allCompleted.ids.includes(item.id)).length
          : 0;
      } else {
        const history = localStorage.getItem(`dayflow_history_${dateStr}`);
        if (history) {
          const ids: string[] = JSON.parse(history);
          completedCount = scheduledActivities.filter(item => ids.includes(item.id)).length;
        }
      }
      const total = scheduledActivities.length;
      const percentage = total > 0 ? Math.round((completedCount / total) * 100) : 0;
      return { day: format(date, 'EEE'), date: dateStr, percentage, completed: completedCount, total, isToday };
    });
  }, [routine]);

  const average = useMemo(() => {
    const days = weeklyData.filter(d => d.total > 0);
    if (days.length === 0) return 0;
    return Math.round(days.reduce((sum, d) => sum + d.percentage, 0) / days.length);
  }, [weeklyData]);

  const bestDay = useMemo(() => {
    return weeklyData.reduce((best, d) => d.percentage > best.percentage ? d : best, weeklyData[0]);
  }, [weeklyData]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3 text-sm">
          <p className="font-semibold text-slate-800">{label}</p>
          <p className="text-orange-500 font-bold">{data.percentage}% completed</p>
          <p className="text-slate-500">{data.completed} of {data.total} activities</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <Card className="border-none shadow-sm">
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-light text-orange-500">{average}%</p>
            <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider">7-Day Average</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-light text-orange-500">{weeklyData.find(d => d.isToday)?.percentage ?? 0}%</p>
            <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider">Today</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-light text-orange-500">{bestDay.percentage}%</p>
            <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider">Best Day</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle className="text-base">Weekly Completion Rate</CardTitle>
          <CardDescription>Your activity completion over the past 7 days</CardDescription>
        </CardHeader>
        <CardContent>
  <div style={{ width: '100%', height: '300px' }}>
  <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8f9fa' }} />
              <Bar dataKey="percentage" radius={[6, 6, 0, 0]} maxBarSize={48}>
                {weeklyData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.isToday ? '#f97316' : entry.percentage >= 70 ? '#fb923c' : entry.percentage >= 40 ? '#fdba74' : '#fed7aa'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
           </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle className="text-base">Daily Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {weeklyData.map((day) => (
              <div key={day.date} className="flex items-center gap-4">
                <span className={`text-sm w-8 font-medium ${day.isToday ? 'text-orange-500' : 'text-slate-500'}`}>
                  {day.day}
                </span>
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${day.percentage}%`, backgroundColor: day.isToday ? '#f97316' : '#fdba74' }}
                  />
                </div>
                <span className="text-sm text-slate-500 w-16 text-right">
                  {day.completed}/{day.total} done
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}