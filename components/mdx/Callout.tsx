import type { ReactNode } from "react";

interface CalloutProps {
  type?: "info" | "warning" | "tip";
  children: ReactNode;
}

export default function Callout({
  type = "info",
  children,
}: CalloutProps) {
  const styles = {
    info: "bg-blue-50 border-l-4 border-blue-300 text-blue-800",
    warning: "bg-yellow-50 border-l-4 border-yellow-300 text-yellow-800",
    tip: "bg-green-50 border-l-4 border-green-300 text-green-800",
  };

  return (
    <div className={`p-4 my-4 rounded ${styles[type]}`}>
      <div className="text-sm">{children}</div>
    </div>
  );
}
