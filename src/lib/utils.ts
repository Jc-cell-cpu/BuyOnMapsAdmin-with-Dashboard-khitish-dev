import { Activity } from "@/components/ProfileBox/admin";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(date);
}

export function generateDummyActivities(count: number): Activity[] {
  const activityTypes = [
    "approval",
    "moderation",
    "settings",
    "security",
  ] as const;

  const activities: Array<{
    description: string;
    type: (typeof activityTypes)[number];
  }> = [
    { description: "Approved a listing", type: "approval" },
    { description: "Banned a user", type: "moderation" },
    { description: "Removed a flagged product", type: "moderation" },
    { description: "Updated system settings", type: "settings" },
    { description: "Modified user permissions", type: "security" },
    { description: "Created new category", type: "settings" },
    { description: "Reviewed reported content", type: "moderation" },
    { description: "Updated platform policies", type: "settings" },
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    date: new Date(
      Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000,
    ),
    ...activities[Math.floor(Math.random() * activities.length)],
  }));
}
