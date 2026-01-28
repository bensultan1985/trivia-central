import type * as React from "react";

export type IconProps = React.SVGProps<SVGSVGElement>;

export function IconHome(props: IconProps) {
  const { className = "h-6 w-6", ...rest } = props;
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      {...rest}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 11.5L12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-8.5z"
      />
    </svg>
  );
}

export function IconTarget(props: IconProps) {
  const { className = "h-6 w-6", ...rest } = props;
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      {...rest}
    >
      <circle cx="12" cy="12" r="9" strokeWidth={2} />
      <circle cx="12" cy="12" r="5" fill="white" strokeWidth={2} />
    </svg>
  );
}

export function IconBolt(props: IconProps) {
  const { className = "h-6 w-6", ...rest } = props;
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      {...rest}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 2L4 14h7l-1 8 10-14h-7l0-6z"
      />
    </svg>
  );
}

export function IconCheck(props: IconProps) {
  const { className = "h-6 w-6", ...rest } = props;
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      {...rest}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20 6L9 17l-5-5"
      />
    </svg>
  );
}

export function IconX(props: IconProps) {
  const { className = "h-6 w-6", ...rest } = props;
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      {...rest}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

export function IconGrid(props: IconProps) {
  const { className = "h-6 w-6", ...rest } = props;
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      {...rest}
    >
      <rect x="4" y="4" width="6" height="6" rx="1" strokeWidth={2} />
      <rect x="14" y="4" width="6" height="6" rx="1" strokeWidth={2} />
      <rect x="4" y="14" width="6" height="6" rx="1" strokeWidth={2} />
      <rect x="14" y="14" width="6" height="6" rx="1" strokeWidth={2} />
    </svg>
  );
}

export function IconBook(props: IconProps) {
  const { className = "h-6 w-6", ...rest } = props;
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      {...rest}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 4h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 8h6"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6"
      />
    </svg>
  );
}

export function IconAnalytics(props: IconProps) {
  const { className = "h-6 w-6", ...rest } = props;
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      {...rest}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 21V10m6 11V3m6 18v-7m4 7H2"
      />
    </svg>
  );
}

export function IconDashboard(props: IconProps) {
  const { className = "h-6 w-6", ...rest } = props;
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      {...rest}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 14a8 8 0 0 1 16 0"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 14h10"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 14l4-4"
      />
    </svg>
  );
}

export function IconGameBuilder(props: IconProps) {
  const { className = "h-6 w-6", ...rest } = props;
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      {...rest}
    >
      <rect x="4" y="6" width="10" height="10" rx="2" strokeWidth={2} />
      <rect x="10" y="10" width="10" height="10" rx="2" strokeWidth={2} />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 10h4M9 8v4"
      />
    </svg>
  );
}

export function IconHostGame(props: IconProps) {
  const { className = "h-6 w-6", ...rest } = props;
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      {...rest}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12a3 3 0 0 1 6 0v3a3 3 0 0 1-6 0v-3z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 12v1a7 7 0 0 0 14 0v-1"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 20v-2"
      />
    </svg>
  );
}

export function IconStrategyGuides(props: IconProps) {
  const { className = "h-6 w-6", ...rest } = props;
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      {...rest}
    >
      {/* Big O (bottom-left) */}
      <circle cx="7" cy="17" r="4.6" strokeWidth={2} />

      {/* Big X (top-right) */}
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M14 4l7 7m0-7l-7 7"
      />
    </svg>
  );
}

export function IconStrategyGuidesAlt(props: IconProps) {
  const { className = "h-6 w-6", ...rest } = props;
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      {...rest}
    >
      {/* X (destination) */}
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 5l4 4m0-4l-4 4"
      />
      {/* Simple semicircle route */}
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 400C60.5 -10 -13.5 20 7.6 10.4"
      />
      {/* Arrow head pointing toward the X (not overlapping it) */}
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10.6 8.4l-1.8.9m1.8-.9l-.6 2.0"
      />
    </svg>
  );
}

export function IconStudyGuides(props: IconProps) {
  const { className = "h-6 w-6", ...rest } = props;
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      {...rest}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 6.25v13m0-13C10.83 5.48 9.25 5 7.5 5S4.17 5.48 3 6.25v13C4.17 18.48 5.75 18 7.5 18s3.33.48 4.5 1.25m0-13C13.17 5.48 14.75 5 16.5 5c1.75 0 3.33.48 4.5 1.25v13c-1.17-.77-2.75-1.25-4.5-1.25s-3.33.48-4.5 1.25"
      />
    </svg>
  );
}

export function IconMegaphone(props: IconProps) {
  const { className = "h-6 w-6", ...rest } = props;
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      {...rest}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M11 5.882V19.24a1.76 1.76 0 0 1-3.417.592l-2.147-6.15M18 13a3 3 0 1 0 0-6M5.436 13.683A4.001 4.001 0 0 1 1.512 6.82l1.914-5.7A2 2 0 0 1 5.317.255h9.131a2 2 0 0 1 1.892 1.365l1.914 5.7a4.001 4.001 0 0 1-3.925 6.863"
      />
    </svg>
  );
}
