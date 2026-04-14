/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from "react";
import {
  Plus,
  Trash2,
  Clock,
  CheckCircle2,
  Circle,
  Calendar as CalendarIcon,
  Settings,
  LayoutDashboard,
  Sparkles,
  ChevronRight,
  Moon,
  Sun,
  Coffee,
  BookOpen,
  Briefcase,
  Home,
  Tv,
  Dumbbell,
  Train,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
  format,
  parse,
  isWithinInterval,
  addMinutes,
  startOfDay,
  endOfDay,
  isAfter,
  isBefore,
} from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { RoutineItem, ActivityCategory, DayOfWeek } from "./types";
import { exportToICS } from "./utils/exportCalendar";
import Analytics from "./Analytics";

const CATEGORY_ICONS: Record<ActivityCategory, React.ReactNode> = {
  exercise: <Dumbbell className="w-4 h-4" />,
  study: <BookOpen className="w-4 h-4" />,
  work: <Briefcase className="w-4 h-4" />,
  chores: <Home className="w-4 h-4" />,
  entertainment: <Tv className="w-4 h-4" />,
  sleep: <Moon className="w-4 h-4" />,
  commute: <Train className="w-4 h-4" />,
  other: <Coffee className="w-4 h-4" />,
};

const CATEGORY_COLORS: Record<ActivityCategory, string> = {
  exercise: "bg-orange-100 text-orange-700 border-orange-200",
  study: "bg-blue-100 text-blue-700 border-blue-200",
  work: "bg-slate-100 text-slate-700 border-slate-200",
  chores: "bg-green-100 text-green-700 border-green-200",
  entertainment: "bg-purple-100 text-purple-700 border-purple-200",
  sleep: "bg-indigo-100 text-indigo-700 border-indigo-200",
  commute: "bg-amber-100 text-amber-700 border-amber-200",
  other: "bg-gray-100 text-gray-700 border-gray-200",
};

const DAYS: DayOfWeek[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const OFFICE_DAYS: DayOfWeek[] = ["monday", "tuesday", "thursday"];
const REMOTE_DAYS: DayOfWeek[] = ["wednesday", "friday"];
const WEEKEND_DAYS: DayOfWeek[] = ["saturday", "sunday"];

const DEFAULT_ROUTINE: RoutineItem[] = [
  // Office Days
  {
    id: "o1",
    title: "Morning Exercise",
    startTime: "06:00",
    endTime: "07:00",
    category: "exercise",
    days: OFFICE_DAYS,
  },
  {
    id: "o2",
    title: "Morning Routine & Study",
    startTime: "07:00",
    endTime: "08:15",
    category: "study",
    days: OFFICE_DAYS,
  },
  {
    id: "o3",
    title: "Commute to Office",
    startTime: "08:15",
    endTime: "09:15",
    category: "commute",
    days: OFFICE_DAYS,
  },
  {
    id: "o4",
    title: "Work at Office",
    startTime: "09:15",
    endTime: "18:30",
    category: "work",
    days: OFFICE_DAYS,
  },
  {
    id: "o5",
    title: "Commute Home",
    startTime: "18:30",
    endTime: "20:15",
    category: "commute",
    days: OFFICE_DAYS,
  },
  {
    id: "o6",
    title: "Home Chores",
    startTime: "20:15",
    endTime: "21:15",
    category: "chores",
    days: OFFICE_DAYS,
  },
  {
    id: "o7",
    title: "Entertainment / Relax",
    startTime: "21:15",
    endTime: "22:15",
    category: "entertainment",
    days: OFFICE_DAYS,
  },
  {
    id: "o8",
    title: "Sleep",
    startTime: "22:15",
    endTime: "06:00",
    category: "sleep",
    days: OFFICE_DAYS,
  },

  // Remote Days
  {
    id: "r1",
    title: "Morning Exercise",
    startTime: "07:00",
    endTime: "08:00",
    category: "exercise",
    days: REMOTE_DAYS,
  },
  {
    id: "r2",
    title: "Study / Personal Growth",
    startTime: "08:00",
    endTime: "10:00",
    category: "study",
    days: REMOTE_DAYS,
  },
  {
    id: "r3",
    title: "Remote Work",
    startTime: "10:00",
    endTime: "18:30",
    category: "work",
    days: REMOTE_DAYS,
  },
  {
    id: "r4",
    title: "Home Chores",
    startTime: "18:30",
    endTime: "19:30",
    category: "chores",
    days: REMOTE_DAYS,
  },
  {
    id: "r5",
    title: "Entertainment / Study",
    startTime: "19:30",
    endTime: "22:00",
    category: "entertainment",
    days: REMOTE_DAYS,
  },
  {
    id: "r6",
    title: "Sleep",
    startTime: "22:00",
    endTime: "07:00",
    category: "sleep",
    days: REMOTE_DAYS,
  },

  // Weekend
  {
    id: "w1",
    title: "Healthy Habits & Exercise",
    startTime: "08:00",
    endTime: "09:30",
    category: "exercise",
    days: WEEKEND_DAYS,
  },
  {
    id: "w2",
    title: "Sightseeing / Relaxation",
    startTime: "10:00",
    endTime: "17:00",
    category: "entertainment",
    days: WEEKEND_DAYS,
  },
  {
    id: "w3",
    title: "Chores / Meal Prep",
    startTime: "17:00",
    endTime: "19:00",
    category: "chores",
    days: WEEKEND_DAYS,
  },
  {
    id: "w4",
    title: "Entertainment",
    startTime: "19:00",
    endTime: "23:00",
    category: "entertainment",
    days: WEEKEND_DAYS,
  },
  {
    id: "w5",
    title: "Sleep",
    startTime: "23:00",
    endTime: "08:00",
    category: "sleep",
    days: WEEKEND_DAYS,
  },
];

export default function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [routine, setRoutine] = useState<RoutineItem[]>(() => {
    const saved = localStorage.getItem("dayflow_routine_v2");
    return saved ? JSON.parse(saved) : DEFAULT_ROUTINE;
  });
  const [completedIds, setCompletedIds] = useState<string[]>(() => {
    const saved = localStorage.getItem("dayflow_completed_v2");
    const data = saved ? JSON.parse(saved) : { date: "", ids: [] };
    if (data.date !== format(new Date(), "yyyy-MM-dd")) return [];
    return data.ids;
  });

  const [isAddingActivity, setIsAddingActivity] = useState(false);
  const [newActivity, setNewActivity] = useState<Partial<RoutineItem>>({
    title: "",
    startTime: "08:00",
    endTime: "09:00",
    category: "other",
    days: ["monday"],
  });

  const [plannerDay, setPlannerDay] = useState<DayOfWeek>(
    format(new Date(), "eeee").toLowerCase() as DayOfWeek,
  );

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem("dayflow_routine_v2", JSON.stringify(routine));
  }, [routine]);

useEffect(() => {
  const today = format(new Date(), 'yyyy-MM-dd');

  // Save today's progress as history too
  if (completedIds.length > 0) {
    localStorage.setItem(`dayflow_history_${today}`, JSON.stringify(completedIds));
  }

  localStorage.setItem('dayflow_completed_v2', JSON.stringify({
    date: today,
    ids: completedIds
  }));
}, [completedIds]);

  const currentDayName = format(currentTime, "eeee").toLowerCase() as DayOfWeek;

  const todaysRoutine = useMemo(() => {
    return routine
      .filter((item) => item.days.includes(currentDayName))
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  }, [routine, currentDayName]);

  const currentActivity = useMemo(() => {
    const nowStr = format(currentTime, "HH:mm");
    return todaysRoutine.find((item) => {
      if (item.startTime <= item.endTime) {
        return nowStr >= item.startTime && nowStr < item.endTime;
      } else {
        return nowStr >= item.startTime || nowStr < item.endTime;
      }
    });
  }, [todaysRoutine, currentTime]);

  const nextActivity = useMemo(() => {
    const nowStr = format(currentTime, "HH:mm");
    return todaysRoutine.find((item) => item.startTime > nowStr);
  }, [todaysRoutine, currentTime]);

  const toggleComplete = (id: string) => {
    setCompletedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const addActivity = () => {
    if (!newActivity.title) return;
    const item: RoutineItem = {
      id: Math.random().toString(36).substr(2, 9),
      title: newActivity.title as string,
      startTime: newActivity.startTime as string,
      endTime: newActivity.endTime as string,
      category: newActivity.category as ActivityCategory,
      days: newActivity.days as DayOfWeek[],
    };
    setRoutine((prev) => [...prev, item]);
    setIsAddingActivity(false);
    setNewActivity({
      title: "",
      startTime: "08:00",
      endTime: "09:00",
      category: "other",
      days: [plannerDay],
    });
  };

  const deleteActivity = (id: string) => {
    setRoutine((prev) => prev.filter((item) => item.id !== id));
  };

  const progress = useMemo(() => {
    if (todaysRoutine.length === 0) return 0;
    return (
      (completedIds.filter((id) => todaysRoutine.some((item) => item.id === id))
        .length /
        todaysRoutine.length) *
      100
    );
  }, [todaysRoutine, completedIds]);

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-slate-900 font-sans selection:bg-orange-100 pb-20 sm:pb-0">
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white shadow-lg shadow-orange-200">
              <Sparkles className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">DayFlow</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium capitalize">
                {format(currentTime, "EEEE, MMMM do")}
              </p>
              <p className="text-xs text-slate-500">
                {format(currentTime, "HH:mm")}
              </p>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Tabs defaultValue="dashboard" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 max-w-[500px] mx-auto bg-white border shadow-sm">
            <TabsTrigger
              value="dashboard"
              className="data-[state=active]:bg-slate-100"
            >
              <LayoutDashboard className="w-4 h-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger
              value="planner"
              className="data-[state=active]:bg-slate-100"
            >
              <CalendarIcon className="w-4 h-4 mr-2" />
              Planner
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-slate-100"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-8 outline-none">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-none shadow-xl bg-slate-900 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Clock className="w-32 h-32" />
                </div>
                <CardHeader>
                  <CardDescription className="text-slate-400">
                    Current Activity
                  </CardDescription>
                  <CardTitle className="text-3xl font-light">
                    {currentActivity ? (
                      <div className="flex items-center gap-3">
                        <span className="p-2 bg-white/10 rounded-lg">
                          {CATEGORY_ICONS[currentActivity.category]}
                        </span>
                        {currentActivity.title}
                      </div>
                    ) : (
                      "Free Time"
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-sm text-slate-400">Next Up</p>
                        <p className="font-medium">
                          {nextActivity
                            ? `${nextActivity.startTime} - ${nextActivity.title}`
                            : "Nothing scheduled"}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-4xl font-light tracking-tighter">
                          {Math.round(progress)}%
                        </p>
                        <p className="text-xs text-slate-400 uppercase tracking-widest">
                          Daily Progress
                        </p>
                      </div>
                    </div>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-orange-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1 }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-orange-500" />
                  Today's Schedule
                  <Badge variant="outline" className="ml-2 capitalize">
                    {currentDayName}
                  </Badge>
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-orange-500 border-orange-200 hover:bg-orange-50"
                  onClick={() => exportToICS(todaysRoutine)}
                >
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  Export to Calendar
                </Button>
              </div>

              <div className="grid gap-3">
                <AnimatePresence mode="popLayout">
                  {todaysRoutine.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card
                        className={cn(
                          "group transition-all hover:shadow-md border-none shadow-sm",
                          completedIds.includes(item.id)
                            ? "bg-slate-50 opacity-60"
                            : "bg-white",
                          currentActivity?.id === item.id &&
                            "ring-2 ring-orange-500 ring-offset-2",
                        )}
                      >
                        <CardContent className="p-4 flex items-center gap-4">
                          <Button
                            variant="ghost"
                            size="icon"
                            className={cn(
                              "rounded-full h-10 w-10 shrink-0",
                              completedIds.includes(item.id)
                                ? "text-green-600"
                                : "text-slate-400",
                            )}
                            onClick={() => toggleComplete(item.id)}
                          >
                            {completedIds.includes(item.id) ? (
                              <CheckCircle2 className="w-6 h-6" />
                            ) : (
                              <Circle className="w-6 h-6" />
                            )}
                          </Button>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge
                                className={cn(
                                  "text-[10px] uppercase tracking-wider px-1.5 py-0 border",
                                  CATEGORY_COLORS[item.category],
                                )}
                              >
                                {item.category}
                              </Badge>
                              <span className="text-xs font-mono text-slate-500">
                                {item.startTime} - {item.endTime}
                              </span>
                            </div>
                            <h3
                              className={cn(
                                "font-medium truncate",
                                completedIds.includes(item.id) &&
                                  "line-through text-slate-500",
                              )}
                            >
                              {item.title}
                            </h3>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="planner" className="space-y-6 outline-none">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold">Routine Planner</h2>
                <p className="text-slate-500 text-sm">
                  Customize your daily schedules.
                </p>
              </div>
              <Dialog
                open={isAddingActivity}
                onOpenChange={setIsAddingActivity}
              >
                <DialogTrigger asChild>
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                    <Plus className="w-4 h-4 mr-2" /> Add Activity
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add New Activity</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="title">Activity Title</Label>
                      <Input
                        id="title"
                        value={newActivity.title}
                        onChange={(e) =>
                          setNewActivity((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label>Start</Label>
                        <Input
                          type="time"
                          value={newActivity.startTime}
                          onChange={(e) =>
                            setNewActivity((prev) => ({
                              ...prev,
                              startTime: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>End</Label>
                        <Input
                          type="time"
                          value={newActivity.endTime}
                          onChange={(e) =>
                            setNewActivity((prev) => ({
                              ...prev,
                              endTime: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label>Days</Label>
                      <div className="flex flex-wrap gap-2">
                        {DAYS.map((day) => (
                          <Badge
                            key={day}
                            variant={
                              newActivity.days?.includes(day)
                                ? "default"
                                : "outline"
                            }
                            className="cursor-pointer capitalize"
                            onClick={() => {
                              const days = [...(newActivity.days || [])];
                              if (days.includes(day)) {
                                if (days.length > 1)
                                  days.splice(days.indexOf(day), 1);
                              } else {
                                days.push(day);
                              }
                              setNewActivity((prev) => ({ ...prev, days }));
                            }}
                          >
                            {day.slice(0, 3)}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label>Category</Label>
                      <div className="grid grid-cols-4 gap-2">
                        {(
                          Object.keys(CATEGORY_ICONS) as ActivityCategory[]
                        ).map((cat) => (
                          <Button
                            key={cat}
                            variant={
                              newActivity.category === cat
                                ? "default"
                                : "outline"
                            }
                            className={cn(
                              "h-10 px-0 flex flex-col gap-1 text-[10px] capitalize",
                              newActivity.category === cat && "bg-orange-500",
                            )}
                            onClick={() =>
                              setNewActivity((prev) => ({
                                ...prev,
                                category: cat,
                              }))
                            }
                          >
                            {CATEGORY_ICONS[cat]}
                            {cat}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={addActivity} className="bg-orange-500">
                      Save Activity
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
              {DAYS.map((day) => (
                <Button
                  key={day}
                  variant={plannerDay === day ? "default" : "outline"}
                  className="capitalize shrink-0"
                  onClick={() => setPlannerDay(day)}
                >
                  {day}
                </Button>
              ))}
            </div>

            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="capitalize">
                  {plannerDay} Routine
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px] pr-4">
                  <div className="space-y-3">
                    {routine
                      .filter((i) => i.days.includes(plannerDay))
                      .sort((a, b) => a.startTime.localeCompare(b.startTime))
                      .map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-3 rounded-lg border bg-white group"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={cn(
                                "p-1.5 rounded-md border",
                                CATEGORY_COLORS[item.category],
                              )}
                            >
                              {CATEGORY_ICONS[item.category]}
                            </div>
                            <div>
                              <p className="text-sm font-medium">
                                {item.title}
                              </p>
                              <p className="text-xs text-slate-500 font-mono">
                                {item.startTime} - {item.endTime}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 opacity-0 group-hover:opacity-100"
                            onClick={() => deleteActivity(item.id)}
                          >
                            <Trash2 className="w-4 h-4 text-slate-400 hover:text-red-500" />
                          </Button>
                        </div>
                      ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
            </TabsContent>
            <TabsContent value="analytics" className="space-y-6 outline-none">
            <div>
              <h2 className="text-2xl font-bold">Analytics</h2>
              <p className="text-slate-500 text-sm">Your completion rate over the past 7 days.</p>
            </div>
            <Analytics routine={routine} />
          </TabsContent>
          
        </Tabs>
      </main>
    </div>
  );
}
