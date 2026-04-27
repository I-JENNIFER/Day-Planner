import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Settings, Calendar } from 'lucide-react';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline', 'secondary', 'ghost', 'destructive', 'link'],
    },
    size: {
      control: 'select',
      options: ['default', 'xs', 'sm', 'lg', 'icon', 'icon-xs', 'icon-sm', 'icon-lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Delete',
  },
};

export const AddActivity: Story = {
  args: {
    className: 'bg-orange-500 hover:bg-orange-600 text-white',
    children: (
      <>
        <Plus className="w-4 h-4 mr-2" /> Add Activity
      </>
    ),
  },
};

export const ExportCalendar: Story = {
  args: {
    variant: 'outline',
    size: 'sm',
    className: 'text-orange-500 border-orange-200 hover:bg-orange-50',
    children: (
      <>
        <Calendar className="w-4 h-4 mr-2" /> Export to Calendar
      </>
    ),
  },
};

export const IconButton: Story = {
  args: {
    variant: 'ghost',
    size: 'icon',
    className: 'rounded-full',
    children: <Settings className="w-5 h-5" />,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Button>Default</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};
