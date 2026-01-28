import Link from "next/link";
import type { IconProps } from "./icons";

interface FeatureCardProps {
  href: string;
  title: string;
  description: string;
  icon: React.ComponentType<IconProps>;
  colorClasses: string;
  iconSize?: string;
  fullWidth?: boolean;
}

export default function FeatureCard({
  href,
  title,
  description,
  icon: Icon,
  colorClasses,
  iconSize = "h-12 w-12",
  fullWidth = false,
}: FeatureCardProps) {
  return (
    <Link
      href={href}
      aria-label={title}
      className={`block ${fullWidth ? "col-span-full" : ""}`}
    >
      <div
        className={`rounded-lg shadow-lg p-6 text-white transition-all hover:scale-[1.02] hover:shadow-xl ${colorClasses}`}
      >
        <div className="flex items-center gap-4">
          <div className="shrink-0">
            <Icon className={iconSize} />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-sm opacity-90">{description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
