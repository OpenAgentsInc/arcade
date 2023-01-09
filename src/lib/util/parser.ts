export class Parser {
  pos: number
  str: string

  constructor(pos: number, str: string) {
    this.pos = pos
    this.str = str
  }

  done(): boolean {
    return this.pos >= this.str.length
  }
}

export function consumeUntil(
  p: Parser,
  match: (c: string) => boolean,
  endOk: boolean = false
): boolean {
  const sub = p.str.substring(p.pos, p.str.length)
  const start = p.pos

  for (const c of sub) {
    if (match(c)) {
      return true
    }
    p.pos += 1
  }

  if (endOk) {
    return true
  }

  p.pos = start
  return false
}

export function substring(s: string, start: number, end: number): string {
  return s.substring(start, end)
}

export function parseStr(p: Parser, s: string): boolean {
  if (p.pos + s.length > p.str.length) {
    return false
  }
  const sub = substring(p.str, p.pos, p.pos + s.length)
  if (sub === s) {
    p.pos += s.length
    return true
  }
  return false
}

export function peekChar(p: Parser, i: number): string | undefined {
  const offset = p.pos + i
  if (offset < 0 || offset > p.str.length) {
    return undefined
  }
  return p.str[offset]
}

export function parseChar(p: Parser, c: string): boolean {
  if (p.pos >= p.str.length) {
    return false
  }
  if (p.str[p.pos] === c) {
    p.pos += 1
    return true
  }
  return false
}

export function parseDigit(p: Parser): number | undefined {
  if (p.pos >= p.str.length) {
    return undefined
  }
  const c = p.str.charCodeAt(p.pos)
  const d = c - 48
  if (d >= 0 && d < 10) {
    p.pos += 1
    return d
  }
  return undefined
}

export function parseHexChar(p: Parser): string | undefined {
  if (p.pos >= p.str.length) {
    return undefined
  }
  const c = p.str.charCodeAt(p.pos)
  if ((c >= 48 && c <= 57) || (c >= 97 && c <= 102) || (c >= 65 && c <= 70)) {
    p.pos += 1
    return p.str[p.pos]
  }
  return undefined
}
