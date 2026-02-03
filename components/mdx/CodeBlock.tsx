interface CodeBlockProps {
  children: string;
  className?: string;
}

export default function CodeBlock({ children }: CodeBlockProps) {
  return (
    <pre className="bg-slate-800 text-slate-50 p-4 rounded-lg overflow-x-auto mb-4 text-sm">
      <code>{children}</code>
    </pre>
  );
}
