"use client";

import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useRouter } from "next/navigation";

interface SearchItem {
  id: string;
  title: string;
  description: string;
  href: string;
  type: "project" | "article" | "page";
}

const PAGES: SearchItem[] = [
  {
    id: "home",
    title: "Home",
    description: "Back to homepage",
    href: "/",
    type: "page",
  },
  {
    id: "projects",
    title: "Projects",
    description: "All project case studies",
    href: "/projects",
    type: "page",
  },
  {
    id: "stats",
    title: "Statistics",
    description: "Key metrics and impact",
    href: "/stats",
    type: "page",
  },
  {
    id: "timeline",
    title: "Timeline",
    description: "My ML journey & career progression",
    href: "/timeline",
    type: "page",
  },
  {
    id: "github",
    title: "GitHub",
    description: "My open-source projects",
    href: "/github",
    type: "page",
  },
  {
    id: "about",
    title: "About",
    description: "About me",
    href: "/about",
    type: "page",
  },
  {
    id: "stack",
    title: "Tech Stack",
    description: "Tools I use",
    href: "/stack",
    type: "page",
  },
  {
    id: "contact",
    title: "Contact",
    description: "Get in touch",
    href: "/contact",
    type: "page",
  },
  // Static project samples
  {
    id: "project-attribution",
    title: "Marketing Attribution",
    description: "Markov chain model for $50M GMV",
    href: "/projects/ubisoft-attribution",
    type: "project",
  },
  {
    id: "project-ner",
    title: "Medical NER",
    description: "95% precision entity recognition",
    href: "/projects/medical-ner",
    type: "project",
  },
  {
    id: "project-clustering",
    title: "Text Clustering",
    description: "Organize 1M+ documents semantically",
    href: "/projects/text-clustering",
    type: "project",
  },
  {
    id: "project-prevent",
    title: "Prevent SaaS",
    description: "AI-powered fraud prevention",
    href: "/projects/prevent-saas",
    type: "project",
  },
];

export function SearchCommand() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // Keyboard shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(open => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search projects, articles, pages..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          
          <CommandGroup heading="Pages">
            {PAGES.filter(i => i.type === "page").map(page => (
              <CommandItem
                key={page.id}
                value={page.id}
                onSelect={() => handleSelect(page.href)}
              >
                <div className="flex flex-col gap-1">
                  <span>{page.title}</span>
                  <span className="text-xs opacity-60">{page.description}</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>

          {PAGES.filter(i => i.type === "project").length > 0 && (
            <CommandGroup heading="Projects">
              {PAGES
                .filter(i => i.type === "project")
                .map(item => (
                  <CommandItem
                    key={item.id}
                    value={item.id}
                    onSelect={() => handleSelect(item.href)}
                  >
                    <div className="flex flex-col gap-1">
                      <span>{item.title}</span>
                      <span className="text-xs opacity-60">
                        {item.description}
                      </span>
                    </div>
                  </CommandItem>
                ))}
            </CommandGroup>
          )}

          {PAGES.filter(i => i.type === "article").length > 0 && (
            <CommandGroup heading="Articles">
              {PAGES
                .filter(i => i.type === "article")
                .map(item => (
                  <CommandItem
                    key={item.id}
                    value={item.id}
                    onSelect={() => handleSelect(item.href)}
                  >
                    <div className="flex flex-col gap-1">
                      <span>{item.title}</span>
                      <span className="text-xs opacity-60">
                        {item.description}
                      </span>
                    </div>
                  </CommandItem>
                ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>

      {/* Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-8 right-8 px-4 py-2 bg-[color:var(--accent-blue)] text-white rounded-lg shadow-lg hover:opacity-90 transition-opacity text-sm"
      >
        <kbd className="font-mono">⌘K</kbd>
      </button>
    </>
  );
}
