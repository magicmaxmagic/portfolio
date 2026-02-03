import CodeBlock from "./CodeBlock";
import Callout from "./Callout";
import MDXLink from "./Link";
import {
  ProjectMetrics,
  ProjectHeader,
  TechStackDisplay,
  Learnings,
} from "@/components/project/ProjectMetrics";
import {
  ProjectImage,
  ImageGrid,
  ArchitectureDiagramPlaceholder,
  DataVisualizationPlaceholder,
} from "./ProjectImages";

export const mdxComponents: any = {
  ProjectMetrics,
  ProjectHeader,
  TechStackDisplay,
  Learnings,
  ProjectImage,
  ImageGrid,
  ArchitectureDiagramPlaceholder,
  DataVisualizationPlaceholder,
  h1: ({ children }: any) => (
    <h1 className="text-5xl font-bold mt-12 mb-4">{children}</h1>
  ),
  h2: ({ children }: any) => (
    <h2 className="text-4xl font-bold mt-10 mb-3">{children}</h2>
  ),
  h3: ({ children }: any) => (
    <h3 className="text-3xl font-semibold mt-8 mb-2">{children}</h3>
  ),
  h4: ({ children }: any) => (
    <h4 className="text-xl font-semibold mt-6 mb-2">{children}</h4>
  ),
  p: ({ children }: any) => (
    <p className="text-base leading-7 mb-4">{children}</p>
  ),
  a: MDXLink,
  pre: ({ children }: any) => (
    <div className="mb-4">{children}</div>
  ),
  code: CodeBlock,
  blockquote: ({ children }: any) => (
    <Callout>{children}</Callout>
  ),
  ul: ({ children }: any) => (
    <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>
  ),
  ol: ({ children }: any) => (
    <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>
  ),
  li: ({ children }: any) => (
    <li className="text-base leading-7">{children}</li>
  ),
  table: ({ children }: any) => (
    <table className="border-collapse w-full mb-4">{children}</table>
  ),
  th: ({ children }: any) => (
    <th className="border border-slate-300 px-4 py-2 text-left bg-slate-100 font-semibold">
      {children}
    </th>
  ),
  td: ({ children }: any) => (
    <td className="border border-slate-300 px-4 py-2">{children}</td>
  ),
  Callout,
};
