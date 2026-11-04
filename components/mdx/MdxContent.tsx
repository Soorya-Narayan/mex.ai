import React from "react";
import Link from "next/link";

interface MdxContentProps {
  content: string;
}

/**
 * Clean, zero-XSS markdown/MDX renderer that strips HTML comments (<!-- TODO -->)
 * and renders headings, paragraphs, blockquotes, lists, code blocks, and tables
 * without dangerouslySetInnerHTML.
 */
export function MdxContent({ content }: MdxContentProps) {
  // Strip HTML comments like <!-- TODO: ... -->
  const cleaned = content.replace(/<!--[\s\S]*?-->/g, "").trim();
  const lines = cleaned.split("\n");

  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === "") {
      i++;
      continue;
    }

    // Horizontal rule
    if (/^---+$/.test(line.trim())) {
      elements.push(<hr key={i} className="my-8 border-border/60" />);
      i++;
      continue;
    }

    // Code block
    if (line.trim().startsWith("```")) {
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      elements.push(
        <pre
          key={`code-${i}`}
          className="my-6 p-4 rounded-xl bg-card/80 border border-border/60 overflow-x-auto text-xs sm:text-sm font-mono text-brand-cyan"
        >
          <code>{codeLines.join("\n")}</code>
        </pre>
      );
      continue;
    }

    // Table
    if (line.trim().startsWith("|") && i + 1 < lines.length && lines[i + 1].includes("---")) {
      const headers = line
        .split("|")
        .map((c) => c.trim())
        .filter(Boolean);
      i += 2; // skip header and separator
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        rows.push(
          lines[i]
            .split("|")
            .map((c) => c.trim())
            .filter(Boolean)
        );
        i++;
      }
      elements.push(
        <div key={`table-${i}`} className="my-6 overflow-x-auto rounded-xl border border-border/60">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 bg-card/60">
                {headers.map((h, idx) => (
                  <th key={idx} className="text-left px-4 py-3 font-semibold text-foreground">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, rIdx) => (
                <tr
                  key={rIdx}
                  className={`border-b border-border/40 ${
                    rIdx % 2 === 0 ? "bg-background" : "bg-card/30"
                  }`}
                >
                  {r.map((cell, cIdx) => (
                    <td key={cIdx} className="px-4 py-3 text-muted-foreground">
                      {renderInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    // Headings
    if (line.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="text-xl font-bold text-foreground mt-8 mb-3">
          {renderInline(line.slice(4))}
        </h3>
      );
      i++;
      continue;
    }
    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="text-2xl font-bold text-foreground mt-10 mb-4">
          {renderInline(line.slice(3))}
        </h2>
      );
      i++;
      continue;
    }
    if (line.startsWith("# ")) {
      // Skip H1 inside article body if page already renders H1, render as H2
      elements.push(
        <h2 key={i} className="text-2xl sm:text-3xl font-bold text-foreground mt-8 mb-4">
          {renderInline(line.slice(2))}
        </h2>
      );
      i++;
      continue;
    }

    // Blockquote
    if (line.startsWith("> ")) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].startsWith(">")) {
        quoteLines.push(lines[i].replace(/^>\s?/, ""));
        i++;
      }
      elements.push(
        <blockquote
          key={`quote-${i}`}
          className="my-6 pl-4 border-l-2 border-brand-cyan bg-card/40 py-3 pr-4 rounded-r-xl text-sm text-muted-foreground italic"
        >
          {quoteLines.map((ql, qIdx) => (
            <p key={qIdx} className={qIdx > 0 ? "mt-2" : ""}>
              {renderInline(ql)}
            </p>
          ))}
        </blockquote>
      );
      continue;
    }

    // Ordered or unordered list
    if (/^(\d+\.|-|\*)\s/.test(line.trim())) {
      const isOrdered = /^\d+\.\s/.test(line.trim());
      const items: string[] = [];
      while (i < lines.length && /^(\d+\.|-|\*)\s/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^(\d+\.|-|\*)\s+/, ""));
        i++;
      }
      const ListTag = isOrdered ? "ol" : "ul";
      elements.push(
        <ListTag
          key={`list-${i}`}
          className={`my-4 space-y-2 pl-6 ${isOrdered ? "list-decimal" : "list-disc"} text-muted-foreground`}
        >
          {items.map((item, idx) => (
            <li key={idx} className="leading-relaxed">
              {renderInline(item)}
            </li>
          ))}
        </ListTag>
      );
      continue;
    }

    // Paragraph
    elements.push(
      <p key={i} className="my-4 text-base text-muted-foreground leading-relaxed">
        {renderInline(line)}
      </p>
    );
    i++;
  }

  return <div className="mdx-prose">{elements}</div>;
}

function renderInline(text: string): React.ReactNode {
  // Parse **bold**, *italic*, and [label](href)
  const tokenRegex = /(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g;
  const parts = text.split(tokenRegex);

  return parts.map((part, idx) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={idx} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <em key={idx} className="italic">
          {part.slice(1, -1)}
        </em>
      );
    }
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, label, href] = linkMatch;
      return (
        <Link
          key={idx}
          href={href}
          className="text-brand-cyan underline underline-offset-4 hover:opacity-80"
        >
          {label}
        </Link>
      );
    }
    return part;
  });
}

