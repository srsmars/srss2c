import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const combinedSlug = (name: string, maxLen = 80): string => {
  const base = name
  if (!base) return 'untitled'
  let s = base
    .normalize('NFKD')
    .replace(/\p{M}+/gu, '') // remove diacritics
    .toLowerCase()
    .replace(/\s+/g, '') // remove spaces
    .replace(/[^a-z0-9]/g, '') // keep only alphanumerics
  if (!s) s = 'untitled'
  if (s.length > maxLen) s = s.slice(0, maxLen)
  return s
}
