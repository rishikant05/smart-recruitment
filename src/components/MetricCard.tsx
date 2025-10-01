import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  change: string;
  icon: LucideIcon;
  trend: "up" | "down";
}

export default function MetricCard({
  title,
  value,
  change,
  icon: Icon,
  trend,
}: MetricCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
            <Icon className="h-4 w-4" />
            {title}
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">
            {typeof value === "number" ? value.toLocaleString() : value}
          </div>
          <div
            className={`text-sm font-medium ${
              trend === "up" ? "text-green-600" : "text-red-600"
            }`}
          >
            {change}
          </div>
        </div>
      </div>
    </div>
  );
}