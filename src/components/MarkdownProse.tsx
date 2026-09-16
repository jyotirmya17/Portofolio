import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface MarkdownProseProps {
  content: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Robust, lightweight Markdown and Prose renderer that parses:
 * - Bold (**text** / __text__)
 * - Italic (*text* / _text_)
 * - Inline code (`code`)
 * - Math / parameters ($expr$)
 * - Links ([text](url))
 * - Fenced code / ASCII blocks (``` ... ```)
 * - Headings (###, ##, #)
 * - Blockquotes (> quote)
 * - Ordered lists (1. item)
 * - Unordered lists (- item, * item)
 * - Clean paragraph breaks with typographic rhythm
 */
export const MarkdownProse: React.FC<MarkdownProseProps> = ({ content, className, style }) => {
  if (!content) return null;

  // Split content into blocks by double newlines, preserving fenced code blocks
  const blocks = splitIntoBlocks(content);

  return (
    <div
      className={`markdown-prose ${className || ''}`}
      style={{
        color: 'var(--fg)',
        fontSize: '16.5px',
        lineHeight: '1.75',
        ...style,
      }}
    >
      {blocks.map((block, idx) => (
        <BlockRenderer key={idx} block={block} />
      ))}
    </div>
  );
};

interface Block {
  type: 'paragraph' | 'heading' | 'code' | 'blockquote' | 'ordered-list' | 'unordered-list';
  level?: number;
  lang?: string;
  content: string;
  items?: string[];
}

function splitIntoBlocks(raw: string): Block[] {
  const blocks: Block[] = [];
  const lines = raw.split('\n');
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Fenced code block
    if (line.trim().startsWith('```')) {
      const lang = line.trim().replace(/^```/, '').trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      blocks.push({
        type: 'code',
        lang: lang || 'text',
        content: codeLines.join('\n'),
      });
      continue;
    }

    // Blank line
    if (!line.trim()) {
      i++;
      continue;
    }

    // Headings: #, ##, ###, ####
    const headingMatch = line.match(/^(#{1,4})\s+(.+)$/);
    if (headingMatch) {
      blocks.push({
        type: 'heading',
        level: headingMatch[1].length,
        content: headingMatch[2].trim(),
      });
      i++;
      continue;
    }

    // Blockquote: > text
    if (line.trim().startsWith('>')) {
      const quoteLines: string[] = [];
      while (i < lines.length && (lines[i].trim().startsWith('>') || (lines[i].trim() && quoteLines.length > 0 && !lines[i].trim().match(/^(\d+\.|[-*#])/)))) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ''));
        i++;
      }
      blocks.push({
        type: 'blockquote',
        content: quoteLines.join(' '),
      });
      continue;
    }

    // Ordered list: 1. item
    const orderedMatch = line.match(/^(\d+)\.\s+(.+)$/);
    if (orderedMatch) {
      const items: string[] = [];
      while (i < lines.length) {
        const itemMatch = lines[i].match(/^(\d+)\.\s+(.+)$/);
        if (itemMatch) {
          items.push(itemMatch[2].trim());
          i++;
        } else if (lines[i].trim() && lines[i].startsWith('   ') && items.length > 0) {
          // Multiline list item continuation
          items[items.length - 1] += ' ' + lines[i].trim();
          i++;
        } else {
          break;
        }
      }
      blocks.push({
        type: 'ordered-list',
        content: '',
        items,
      });
      continue;
    }

    // Unordered list: - item, * item
    const unorderedMatch = line.match(/^[-*+]\s+(.+)$/);
    if (unorderedMatch) {
      const items: string[] = [];
      while (i < lines.length) {
        const itemMatch = lines[i].match(/^[-*+]\s+(.+)$/);
        if (itemMatch) {
          items.push(itemMatch[1].trim());
          i++;
        } else if (lines[i].trim() && lines[i].startsWith('   ') && items.length > 0) {
          items[items.length - 1] += ' ' + lines[i].trim();
          i++;
        } else {
          break;
        }
      }
      blocks.push({
        type: 'unordered-list',
        content: '',
        items,
      });
      continue;
    }

    // Regular paragraph (read until blank line or special block starter)
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].trim().startsWith('```') &&
      !lines[i].match(/^#{1,4}\s+/) &&
      !lines[i].trim().startsWith('>') &&
      !lines[i].match(/^(\d+\.|[-*+])\s+/)
    ) {
      paraLines.push(lines[i]);
      i++;
    }

    if (paraLines.length > 0) {
      blocks.push({
        type: 'paragraph',
        content: paraLines.join('\n'),
      });
    }
  }

  return blocks;
}

const BlockRenderer: React.FC<{ block: Block }> = ({ block }) => {
  const [copied, setCopied] = useState(false);

  switch (block.type) {
    case 'heading': {
      if (block.level === 1) {
        return (
          <h2
            style={{
              font: '700 24px/1.3 var(--f-sans)',
              color: 'var(--fg)',
              margin: '28px 0 14px',
              paddingBottom: '8px',
              borderBottom: '1px solid var(--line)',
            }}
          >
            {renderInline(block.content)}
          </h2>
        );
      }
      if (block.level === 2) {
        return (
          <h3
            style={{
              font: '600 21px/1.3 var(--f-sans)',
              color: 'var(--fg)',
              margin: '24px 0 12px',
              paddingBottom: '6px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
            }}
          >
            {renderInline(block.content)}
          </h3>
        );
      }
      return (
        <h4
          style={{
            font: '600 17.5px/1.35 var(--f-sans)',
            color: 'var(--lav)',
            margin: '20px 0 10px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          {renderInline(block.content)}
        </h4>
      );
    }

    case 'code': {
      const handleCopy = () => {
        navigator.clipboard.writeText(block.content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      };

      return (
        <div
          style={{
            margin: '20px 0',
            borderRadius: '12px',
            border: '1.5px solid var(--line)',
            background: '#0a0712',
            overflow: 'hidden',
            boxShadow: '0 6px 20px rgba(0,0,0,0.45)',
          }}
        >
          {block.lang && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '6px 14px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                background: 'rgba(255, 255, 255, 0.02)',
                fontSize: '11px',
                fontFamily: 'var(--f-mono)',
                color: 'var(--fg-soft)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              <span>{block.lang}</span>
              <button
                type="button"
                onClick={handleCopy}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--fg-soft)',
                  cursor: 'pointer',
                  fontSize: '11px',
                }}
                className="hover:text-white"
              >
                {copied ? <Check size={11} color="var(--mint)" /> : <Copy size={11} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          )}
          <pre
            style={{
              margin: 0,
              padding: '16px 18px',
              fontFamily: 'var(--f-mono)',
              fontSize: '13px',
              lineHeight: '1.6',
              color: '#d6c8e8',
              overflowX: 'auto',
            }}
          >
            <code>{block.content}</code>
          </pre>
        </div>
      );
    }

    case 'blockquote': {
      return (
        <blockquote
          style={{
            margin: '18px 0',
            padding: '12px 18px',
            borderLeft: '3px solid var(--lav)',
            background: 'rgba(180, 160, 202, 0.06)',
            borderRadius: '0 10px 10px 0',
            color: '#e4dcec',
            fontStyle: 'italic',
            lineHeight: '1.65',
          }}
        >
          {renderInline(block.content)}
        </blockquote>
      );
    }

    case 'ordered-list': {
      return (
        <ol
          style={{
            margin: '16px 0 20px',
            padding: 0,
            listStyle: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {block.items?.map((item, idx) => (
            <li
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                lineHeight: '1.65',
                color: 'var(--fg)',
              }}
            >
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '22px',
                  height: '22px',
                  borderRadius: '6px',
                  background: 'rgba(180, 160, 202, 0.15)',
                  border: '1px solid rgba(180, 160, 202, 0.3)',
                  color: 'var(--lav)',
                  fontSize: '12px',
                  fontWeight: 700,
                  fontFamily: 'var(--f-mono)',
                  marginTop: '2px',
                  flexShrink: 0,
                }}
              >
                {idx + 1}
              </span>
              <div style={{ flex: 1 }}>{renderInline(item)}</div>
            </li>
          ))}
        </ol>
      );
    }

    case 'unordered-list': {
      return (
        <ul
          style={{
            margin: '16px 0 20px',
            padding: 0,
            listStyle: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          {block.items?.map((item, idx) => (
            <li
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                lineHeight: '1.65',
                color: 'var(--fg)',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: 'var(--lav)',
                  marginTop: '10px',
                  flexShrink: 0,
                  boxShadow: '0 0 6px rgba(180, 160, 202, 0.6)',
                }}
              />
              <div style={{ flex: 1 }}>{renderInline(item)}</div>
            </li>
          ))}
        </ul>
      );
    }

    case 'paragraph':
    default: {
      return (
        <p
          style={{
            margin: '0 0 18px',
            lineHeight: '1.75',
            color: 'var(--fg)',
          }}
        >
          {renderInline(block.content)}
        </p>
      );
    }
  }
};

/**
 * Tokenize and render inline text formatting:
 * - Bold: **text** or __text__
 * - Italic: *text* or _text_
 * - Inline code: `text`
 * - Math notation: $text$
 * - Links: [text](url)
 */
export function renderInline(text: string): React.ReactNode {
  if (!text) return null;

  // Regex matching tokens: inline code, bold, italic, math, link
  // Group 1: `code`
  // Group 2: **bold**
  // Group 3: __bold__
  // Group 4: *italic*
  // Group 5: _italic_
  // Group 6: $math$
  // Group 7: [label](url)
  const regex = /(`[^`]+`)|(\*\*[^*]+?\*\*)|(__[^_]+?__)|(\*[^*]+?\*)|(_[^_]+?_)|(\$[^$]+?\$)|(\[[^\]]+\]\([^)]+\))/g;

  const elements: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    const matchIndex = match.index;

    // Push preceding plain text
    if (matchIndex > lastIndex) {
      elements.push(text.substring(lastIndex, matchIndex));
    }

    const rawToken = match[0];

    if (rawToken.startsWith('`') && rawToken.endsWith('`')) {
      // Inline Code
      const codeVal = rawToken.slice(1, -1);
      elements.push(
        <code
          key={`code-${matchIndex}`}
          style={{
            fontFamily: 'var(--f-mono)',
            fontSize: '0.88em',
            padding: '2px 6px',
            borderRadius: '5px',
            background: 'rgba(180, 160, 202, 0.12)',
            color: 'var(--lav)',
            border: '1px solid rgba(180, 160, 202, 0.22)',
            wordBreak: 'break-word',
          }}
        >
          {codeVal}
        </code>
      );
    } else if (
      (rawToken.startsWith('**') && rawToken.endsWith('**')) ||
      (rawToken.startsWith('__') && rawToken.endsWith('__'))
    ) {
      // Bold / Strong text
      const innerText = rawToken.slice(2, -2);
      elements.push(
        <strong
          key={`bold-${matchIndex}`}
          style={{
            fontWeight: 700,
            color: '#f6f0fb',
            letterSpacing: '-0.01em',
          }}
        >
          {renderInline(innerText)}
        </strong>
      );
    } else if (
      (rawToken.startsWith('*') && rawToken.endsWith('*')) ||
      (rawToken.startsWith('_') && rawToken.endsWith('_'))
    ) {
      // Italic / Em
      const innerText = rawToken.slice(1, -1);
      elements.push(
        <em
          key={`em-${matchIndex}`}
          style={{
            fontStyle: 'italic',
            color: '#e4dcec',
          }}
        >
          {renderInline(innerText)}
        </em>
      );
    } else if (rawToken.startsWith('$') && rawToken.endsWith('$')) {
      // Math / Parameter notation
      const mathVal = rawToken.slice(1, -1);
      elements.push(
        <span
          key={`math-${matchIndex}`}
          style={{
            fontFamily: 'var(--f-mono)',
            fontSize: '0.92em',
            fontStyle: 'italic',
            color: 'var(--mint)',
            background: 'rgba(128, 206, 178, 0.08)',
            padding: '1px 5px',
            borderRadius: '4px',
          }}
        >
          {mathVal}
        </span>
      );
    } else if (rawToken.startsWith('[')) {
      // Link [text](url)
      const linkMatch = rawToken.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        const [, label, url] = linkMatch;
        elements.push(
          <a
            key={`link-${matchIndex}`}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'var(--lav)',
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
              fontWeight: 600,
            }}
            className="hover:text-white"
          >
            {label}
          </a>
        );
      } else {
        elements.push(rawToken);
      }
    } else {
      elements.push(rawToken);
    }

    lastIndex = regex.lastIndex;
  }

  // Push any remaining text
  if (lastIndex < text.length) {
    elements.push(text.substring(lastIndex));
  }

  return elements.length === 1 ? elements[0] : <React.Fragment>{elements}</React.Fragment>;
}
