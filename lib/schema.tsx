import { ReactNode } from "react";

interface ProjectSchema {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  author: {
    "@type": string;
    name: string;
    url: string;
  };
  inLanguage: string;
}

interface PersonSchema {
  "@context": string;
  "@type": string;
  name: string;
  url: string;
  image: string;
  sameAs: string[];
  jobTitle: string;
  knows: Array<{
    "@type": string;
    name: string;
  }>;
}

export function ProjectSchema({ 
  title, 
  summary, 
  slug, 
  date 
}: { 
  title: string; 
  summary: string; 
  slug: string; 
  date: string;
}): ReactNode {
  const schema: ProjectSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    name: title,
    description: summary,
    url: `${process.env.SITE_URL}/projects/${slug}`,
    datePublished: date,
    author: {
      "@type": "Person",
      name: "Maxence Le Gendre",
      url: `${process.env.SITE_URL}`,
    },
    inLanguage: "en-US",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function PersonSchema(): ReactNode {
  const schema: PersonSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Maxence Le Gendre",
    url: process.env.SITE_URL || "https://maxencelegendre.com",
    image: `${process.env.SITE_URL}/avatar.jpg`,
    sameAs: [
      "https://github.com/magicmaxmagic",
      "https://linkedin.com/in/maxence-le-gendre",
    ],
    jobTitle: "Applied Data Scientist & ML Engineer",
    knows: [
      { "@type": "Thing", name: "Machine Learning" },
      { "@type": "Thing", name: "Data Science" },
      { "@type": "Thing", name: "MLOps" },
      { "@type": "Thing", name: "Python" },
      { "@type": "Thing", name: "Attribution Modeling" },
      { "@type": "Thing", name: "NLP" },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchema({ items }: { items: Array<{ name: string; url: string }> }): ReactNode {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
