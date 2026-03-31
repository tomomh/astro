// Portable Text Types for Sanity
export interface PortableTextBlock {
  _type: 'block';
  _key: string;
  style?: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'blockquote';
  listItem?: 'bullet' | 'number';
  level?: number;
  children: PortableTextSpan[];
  markDefs?: MarkDef[];
}

export interface PortableTextSpan {
  _type: 'span';
  _key: string;
  text: string;
  marks?: string[];
}

export interface MarkDef {
  _type: string;
  _key: string;
  href?: string;
  [key: string]: unknown;
}

export interface PortableTextImage {
  _type: 'image';
  _key: string;
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
  caption?: string;
}

export interface PortableTextCode {
  _type: 'code';
  _key: string;
  code: string;
  language?: string;
  filename?: string;
}

export type PortableTextContent = PortableTextBlock | PortableTextImage | PortableTextCode;

// Helper to escape HTML
export function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

// Render marks (bold, italic, links, etc.)
export function renderMarks(
  span: PortableTextSpan,
  markDefs: MarkDef[] = []
): string {
  let text = escapeHtml(span.text);

  if (!span.marks || span.marks.length === 0) {
    return text;
  }

  // Process marks in reverse order (innermost first)
  for (const mark of span.marks) {
    switch (mark) {
      case 'strong':
        text = `<strong>${text}</strong>`;
        break;
      case 'em':
        text = `<em>${text}</em>`;
        break;
      case 'code':
        text = `<code>${text}</code>`;
        break;
      case 'underline':
        text = `<u>${text}</u>`;
        break;
      case 'strike-through':
        text = `<s>${text}</s>`;
        break;
      default: {
        // Check if it's a custom mark (like a link)
        const markDef = markDefs.find((def) => def._key === mark);
        if (markDef) {
          if (markDef._type === 'link' && markDef.href) {
            const href = escapeHtml(markDef.href);
            const isExternal = href.startsWith('http');
            const attrs = isExternal
              ? `href="${href}" target="_blank" rel="noopener noreferrer"`
              : `href="${href}"`;
            text = `<a ${attrs}>${text}</a>`;
          }
        }
      }
    }
  }

  return text;
}

// Render a single block
export function renderBlock(block: PortableTextBlock): string {
  const children = block.children
    .map((child) => renderMarks(child, block.markDefs))
    .join('');

  // Handle list items
  if (block.listItem) {
    return `<li>${children}</li>`;
  }

  // Handle different styles
  switch (block.style) {
    case 'h1':
      return `<h1>${children}</h1>`;
    case 'h2':
      return `<h2>${children}</h2>`;
    case 'h3':
      return `<h3>${children}</h3>`;
    case 'h4':
      return `<h4>${children}</h4>`;
    case 'h5':
      return `<h5>${children}</h5>`;
    case 'h6':
      return `<h6>${children}</h6>`;
    case 'blockquote':
      return `<blockquote>${children}</blockquote>`;
    default:
      return `<p>${children}</p>`;
  }
}

// Group consecutive list items
interface ListGroup {
  type: 'list';
  listType: 'bullet' | 'number';
  items: PortableTextBlock[];
}

interface BlockGroup {
  type: 'block';
  block: PortableTextBlock;
}

type ContentGroup = ListGroup | BlockGroup;

export function groupBlocks(blocks: PortableTextBlock[]): ContentGroup[] {
  const groups: ContentGroup[] = [];
  let currentList: ListGroup | null = null;

  for (const block of blocks) {
    if (block.listItem) {
      if (currentList && currentList.listType === block.listItem) {
        currentList.items.push(block);
      } else {
        if (currentList) {
          groups.push(currentList);
        }
        currentList = {
          type: 'list',
          listType: block.listItem,
          items: [block],
        };
      }
    } else {
      if (currentList) {
        groups.push(currentList);
        currentList = null;
      }
      groups.push({ type: 'block', block });
    }
  }

  if (currentList) {
    groups.push(currentList);
  }

  return groups;
}
