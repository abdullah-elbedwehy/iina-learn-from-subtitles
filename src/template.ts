export type TemplateVars = Record<string, string>;

const PLACEHOLDER = /\{\{(\w+)\}\}/g;

export function substitute(template: string, vars: TemplateVars): string {
  return template.replace(PLACEHOLDER, (match, key: string) => {
    return Object.prototype.hasOwnProperty.call(vars, key) ? vars[key] : match;
  });
}

export function extractVariableNames(template: string): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  let m: RegExpExecArray | null;
  PLACEHOLDER.lastIndex = 0;
  while ((m = PLACEHOLDER.exec(template)) !== null) {
    if (!seen.has(m[1])) {
      seen.add(m[1]);
      out.push(m[1]);
    }
  }
  return out;
}
