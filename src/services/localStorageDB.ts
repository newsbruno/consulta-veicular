/*
  Simple LocalStorage wrapper to act like a tiny key-value/collection store.
*/

export type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

export class LocalStorageDB {
  private namespace: string;

  constructor(namespace: string) {
    this.namespace = namespace;
  }

  private k(key: string) {
    return `${this.namespace}:${key}`;
  }

  get<T = unknown>(key: string, fallback: T | null = null): T | null {
    try {
      const raw = window.localStorage.getItem(this.k(key));
      if (raw === null) return fallback;
      return JSON.parse(raw) as T;
    } catch {
      return fallback;
    }
  }

  set<T = unknown>(key: string, value: T): void {
    window.localStorage.setItem(this.k(key), JSON.stringify(value));
  }

  remove(key: string): void {
    window.localStorage.removeItem(this.k(key));
  }

  // Collection helpers
  loadCollection<T = unknown>(name: string): T[] {
    return this.get<T[]>(`collection:${name}`, []) || [];
  }

  saveCollection<T = unknown>(name: string, data: T[]): void {
    this.set(`collection:${name}`, data);
  }

  clearAll(): void {
    // Remove all keys for this namespace
    const prefix = `${this.namespace}:`;
    const toRemove: string[] = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      if (key && key.startsWith(prefix)) toRemove.push(key);
    }
    toRemove.forEach((k) => window.localStorage.removeItem(k));
  }
}
