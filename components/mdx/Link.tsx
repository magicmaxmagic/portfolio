import Link from "next/link";
import type { ReactNode } from "react";

interface MDXLinkProps {
  href?: string;
  children: ReactNode;
}

export default function MDXLink({ href = "#", children }: MDXLinkProps) {
  const isExternal = href.startsWith("http");

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
        {children}
        <span className="ml-1 inline-block">↗</span>
      </a>
    );
  }

  return (
    <Link href={href} className="text-blue-600 hover:underline">
      {children}
    </Link>
  );
}
