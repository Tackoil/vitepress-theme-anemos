function ensureLeadingSlash(path: string): string {
  if (!path) {
    return "/";
  }

  return path.startsWith("/") ? path : `/${path}`;
}

function normalizeBase(base: string): string {
  const normalizedBase = ensureLeadingSlash(base || "/");

  if (normalizedBase === "/") {
    return "/";
  }

  return normalizedBase.endsWith("/")
    ? normalizedBase.slice(0, -1)
    : normalizedBase;
}

export function normalizeInternalPath(path: string, base = "/"): string {
  const pathname = ensureLeadingSlash((path || "/").split(/[?#]/, 1)[0] || "/");
  const normalizedBase = normalizeBase(base);

  let normalizedPath = pathname;

  if (normalizedBase !== "/") {
    if (normalizedPath === normalizedBase) {
      normalizedPath = "/";
    } else if (normalizedPath.startsWith(`${normalizedBase}/`)) {
      normalizedPath = normalizedPath.slice(normalizedBase.length) || "/";
    }
  }

  if (normalizedPath.endsWith(".html")) {
    normalizedPath = normalizedPath.slice(0, -5) || "/";
  }

  if (normalizedPath !== "/" && normalizedPath.endsWith("/")) {
    normalizedPath = normalizedPath.slice(0, -1);
  }

  return normalizedPath || "/";
}

export function withBase(path: string, base = "/"): string {
  if (/^(?:[a-z]+:)?\/\//i.test(path) || path.startsWith("#")) {
    return path;
  }

  const normalizedBase = normalizeBase(base);
  const normalizedPath = normalizeInternalPath(path, base);

  if (normalizedPath === "/") {
    return normalizedBase === "/" ? "/" : `${normalizedBase}/`;
  }

  return normalizedBase === "/"
    ? normalizedPath
    : `${normalizedBase}${normalizedPath}`;
}
