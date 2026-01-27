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
