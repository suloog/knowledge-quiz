// The app as it is drawn: the host elements (what reaches the native views) with their props.
import { type JsonElement } from 'test-renderer';

export type HostNode = { type: string; props: Record<string, unknown> };

export const hostNodes = (tree: JsonElement | null): HostNode[] => {
  if (!tree) return [];
  const children = tree.children.filter(
    (child): child is JsonElement => typeof child !== 'string',
  );
  return [
    { type: tree.type, props: tree.props },
    ...children.flatMap(hostNodes),
  ];
};

// Every colour a node is given, wherever in its props or style: any key ending in colo(u)r.
export const coloursOf = (node: HostNode) => {
  const found: { element: string; key: string; value: unknown }[] = [];
  const visit = (value: unknown, key: string) => {
    if (Array.isArray(value)) value.forEach(item => visit(item, key));
    else if (value && typeof value === 'object')
      Object.entries(value).forEach(([k, v]) => visit(v, k));
    else if (/colou?r$/i.test(key) && value !== undefined && value !== null)
      found.push({ element: node.type, key, value });
  };
  visit(node.props, '');
  return found;
};
