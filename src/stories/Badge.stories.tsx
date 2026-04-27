import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '@/components/ui/badge';

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline', 'ghost', 'link'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'monday',
    className: 'capitalize',
  },
};

export const ActivityCategories: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge className="bg-orange-100 text-orange-700 border-orange-200 text-[10px] uppercase tracking-wider px-1.5 py-0 border">exercise</Badge>
      <Badge className="bg-blue-100 text-blue-700 border-blue-200 text-[10px] uppercase tracking-wider px-1.5 py-0 border">study</Badge>
      <Badge className="bg-slate-100 text-slate-700 border-slate-200 text-[10px] uppercase tracking-wider px-1.5 py-0 border">work</Badge>
      <Badge className="bg-green-100 text-green-700 border-green-200 text-[10px] uppercase tracking-wider px-1.5 py-0 border">chores</Badge>
      <Badge className="bg-purple-100 text-purple-700 border-purple-200 text-[10px] uppercase tracking-wider px-1.5 py-0 border">entertainment</Badge>
      <Badge className="bg-indigo-100 text-indigo-700 border-indigo-200 text-[10px] uppercase tracking-wider px-1.5 py-0 border">sleep</Badge>
      <Badge className="bg-amber-100 text-amber-700 border-amber-200 text-[10px] uppercase tracking-wider px-1.5 py-0 border">commute</Badge>
      <Badge className="bg-gray-100 text-gray-700 border-gray-200 text-[10px] uppercase tracking-wider px-1.5 py-0 border">other</Badge>
    </div>
  ),
};

export const DayBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
        <Badge key={day} variant={i < 3 ? 'default' : 'outline'} className="cursor-pointer capitalize">
          {day}
        </Badge>
      ))}
    </div>
  ),
};
