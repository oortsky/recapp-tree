import packageJson from "../../../package.json";

interface AppVersionProps {
  className?: string;
}

export function AppVersion({ className }: AppVersionProps) {
  return <span className={className}>v{packageJson.version}</span>;
}
