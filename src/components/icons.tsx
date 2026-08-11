import type { ReactNode, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

function Icon({ size = 20, className, children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function ArrowUpRight(props: IconProps) {
  return <Icon {...props}><path d="M7 17 17 7" /><path d="M7 7h10v10" /></Icon>;
}

export function ArrowRight(props: IconProps) {
  return <Icon {...props}><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></Icon>;
}

export function Check(props: IconProps) {
  return <Icon {...props}><path d="m5 12 4 4L19 6" /></Icon>;
}

export function CheckCircle2(props: IconProps) {
  return <Icon {...props}><circle cx="12" cy="12" r="9" /><path d="m8 12 2.5 2.5L16 9" /></Icon>;
}

export function ChevronDown(props: IconProps) {
  return <Icon {...props}><path d="m6 9 6 6 6-6" /></Icon>;
}

export function CircleAlert(props: IconProps) {
  return <Icon {...props}><circle cx="12" cy="12" r="9" /><path d="M12 8v4" /><path d="M12 16h.01" /></Icon>;
}

export function Clock3(props: IconProps) {
  return <Icon {...props}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Icon>;
}

export function Database(props: IconProps) {
  return <Icon {...props}><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v7c0 1.7 3.6 3 8 3s8-1.3 8-3V5" /><path d="M4 12v7c0 1.7 3.6 3 8 3s8-1.3 8-3v-7" /></Icon>;
}

export function Facebook(props: IconProps) {
  return <Icon {...props}><path d="M14 8h3V5h-3c-2.2 0-4 1.8-4 4v2H7v3h3v5h3v-5h3l1-3h-4V9c0-.6.4-1 1-1Z" /></Icon>;
}

export function Gamepad2(props: IconProps) {
  return <Icon {...props}><path d="M6 11h4" /><path d="M8 9v4" /><path d="M15 12h.01" /><path d="M18 10h.01" /><path d="M7.5 6h9c2.6 0 4.1 1.9 4.7 4.4l1 4.3c.5 2-1 3.7-3 3.7-1.1 0-1.8-.5-2.6-1.5l-1.1-1.4h-7l-1.1 1.4C6.6 17.9 5.9 18.4 4.8 18.4c-2 0-3.5-1.7-3-3.7l1-4.3C3.4 7.9 4.9 6 7.5 6Z" /></Icon>;
}

export function HardDrive(props: IconProps) {
  return <Icon {...props}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 14h18" /><path d="M7 10h.01M11 10h.01" /><path d="M16 17h.01" /></Icon>;
}

export function Instagram(props: IconProps) {
  return <Icon {...props}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></Icon>;
}

export function Laptop(props: IconProps) {
  return <Icon {...props}><rect x="5" y="4" width="14" height="11" rx="1.5" /><path d="M3 19h18" /><path d="m7 19 1-4h8l1 4" /></Icon>;
}

export function Mail(props: IconProps) {
  return <Icon {...props}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></Icon>;
}

export function MapPin(props: IconProps) {
  return <Icon {...props}><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></Icon>;
}

export function Menu(props: IconProps) {
  return <Icon {...props}><path d="M4 6h16M4 12h16M4 18h16" /></Icon>;
}

export function Monitor(props: IconProps) {
  return <Icon {...props}><rect x="3" y="4" width="18" height="13" rx="2" /><path d="M8 21h8M12 17v4" /></Icon>;
}

export function PackageCheck(props: IconProps) {
  return <Icon {...props}><path d="m16.5 9.4 1.8 1.8 3.2-3.2" /><path d="M21 12.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h8" /><path d="m3 7 9 5 4.5-2.5" /></Icon>;
}

export function Phone(props: IconProps) {
  return <Icon {...props}><path d="M8 3H5a2 2 0 0 0-2 2c0 8.8 7.2 16 16 16a2 2 0 0 0 2-2v-3l-4-1-2 2a13 13 0 0 1-6-6l2-2-1-4Z" /></Icon>;
}

export function Quote(props: IconProps) {
  return <Icon {...props}><path d="M9 11H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2v-5a6 6 0 0 0-6-6" /><path d="M21 11h-4a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2v-5a6 6 0 0 0-6-6" /></Icon>;
}

export function Search(props: IconProps) {
  return <Icon {...props}><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4.5 4.5" /></Icon>;
}

export function Send(props: IconProps) {
  return <Icon {...props}><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></Icon>;
}

export function ShieldCheck(props: IconProps) {
  return <Icon {...props}><path d="M12 3 20 6v5c0 5.2-3.4 8.6-8 10-4.6-1.4-8-4.8-8-10V6l8-3Z" /><path d="m8.5 12 2.2 2.2 4.8-5" /></Icon>;
}

export function Smartphone(props: IconProps) {
  return <Icon {...props}><rect x="7" y="2.5" width="10" height="19" rx="2" /><path d="M10 5h4M11.5 18.5h1" /></Icon>;
}

export function Star(props: IconProps) {
  return <Icon {...props}><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z" /></Icon>;
}

export function TikTok(props: IconProps) {
  return <Icon {...props}><path d="M15 4c.7 2.1 2.1 3.5 4 4v3c-1.5-.1-2.8-.6-4-1.4V15a5 5 0 1 1-3-4.6v3.1a2 2 0 1 0 1 1.8V4h2Z" /></Icon>;
}

export function Truck(props: IconProps) {
  return <Icon {...props}><path d="M3 6h11v10H3z" /><path d="M14 10h4l3 3v3h-7z" /><circle cx="7" cy="18" r="2" /><circle cx="18" cy="18" r="2" /></Icon>;
}

export function Wrench(props: IconProps) {
  return <Icon {...props}><path d="M14.7 6.3a4.4 4.4 0 0 0-5.9-2.1l2.4 2.4-2.8 2.8L6 7a4.4 4.4 0 0 0 5.9 5.9L18 19l2-2-6.1-6.1a4.4 4.4 0 0 0 .8-4.6Z" /></Icon>;
}

export function X(props: IconProps) {
  return <Icon {...props}><path d="m6 6 12 12M18 6 6 18" /></Icon>;
}
