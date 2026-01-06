// src/env.d.ts
/// <reference types="vite/client" />

interface ImportMeta {
  readonly env: ImportMetaEnv
  readonly glob: <T = any>(
    pattern: string,
    options?: { eager?: boolean }
  ) => Record<string, T>
}