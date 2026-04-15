/**
 * CacheManager Service
 * 
 * Centralized cache management for the AI Form Copilot widget.
 * Handles all caching operations with TTL support and memory management.
 */

export interface CacheEntry<T> {
  value: T;
  timestamp: number;
  ttl?: number;
}

export interface CacheConfig {
  defaultTTL?: number; // Default TTL in milliseconds
  maxSize?: number; // Maximum number of entries
  gcInterval?: number; // Garbage collection interval
}

export class CacheManager {
  private static instance: CacheManager;
  private caches: Map<string, Map<string, CacheEntry<unknown>>> = new Map();
  private config: Required<CacheConfig>;
  private gcTimer?: NodeJS.Timeout;
  
  private constructor(config: CacheConfig = {}) {
    this.config = {
      defaultTTL: config.defaultTTL || 5 * 60 * 1000, // 5 minutes
      maxSize: config.maxSize || 1000,
      gcInterval: config.gcInterval || 60 * 1000 // 1 minute
    };
    
    // Start garbage collection
    this.startGarbageCollection();
  }
  
  static getInstance(config?: CacheConfig): CacheManager {
    if (!CacheManager.instance) {
      CacheManager.instance = new CacheManager(config);
    }
    return CacheManager.instance;
  }
  
  /**
   * Get or create a cache namespace
   */
  private getCache(namespace: string): Map<string, CacheEntry<unknown>> {
    if (!this.caches.has(namespace)) {
      this.caches.set(namespace, new Map());
    }
    return this.caches.get(namespace)!;
  }
  
  /**
   * Set a value in cache
   */
  set<T>(namespace: string, key: string, value: T, ttl?: number): void {
    const cache = this.getCache(namespace);
    
    // Check size limit
    if (cache.size >= this.config.maxSize) {
      // Remove oldest entry
      const oldestKey = cache.keys().next().value;
      if (oldestKey) {
        cache.delete(oldestKey);
      }
    }
    
    cache.set(key, {
      value,
      timestamp: Date.now(),
      ttl: ttl || this.config.defaultTTL
    });
  }
  
  /**
   * Get a value from cache
   */
  get<T>(namespace: string, key: string): T | undefined {
    const cache = this.getCache(namespace);
    const entry = cache.get(key);
    
    if (!entry) {
      return undefined;
    }
    
    // Check if expired
    if (entry.ttl && Date.now() - entry.timestamp > entry.ttl) {
      cache.delete(key);
      return undefined;
    }
    
    return entry.value as T;
  }
  
  /**
   * Check if a key exists and is not expired
   */
  has(namespace: string, key: string): boolean {
    return this.get(namespace, key) !== undefined;
  }
  
  /**
   * Delete a specific key
   */
  delete(namespace: string, key: string): boolean {
    const cache = this.getCache(namespace);
    return cache.delete(key);
  }
  
  /**
   * Clear a specific namespace
   */
  clearNamespace(namespace: string): void {
    const cache = this.getCache(namespace);
    cache.clear();
  }
  
  /**
   * Clear all caches
   */
  clearAll(): void {
    this.caches.clear();
  }
  
  /**
   * Get cache statistics
   */
  getStats(): { namespace: string; size: number; }[] {
    const stats: { namespace: string; size: number; }[] = [];
    
    this.caches.forEach((cache, namespace) => {
      stats.push({
        namespace,
        size: cache.size
      });
    });
    
    return stats;
  }
  
  /**
   * Start garbage collection
   */
  private startGarbageCollection(): void {
    this.gcTimer = setInterval(() => {
      this.collectGarbage();
    }, this.config.gcInterval);
  }
  
  /**
   * Collect expired entries
   */
  private collectGarbage(): void {
    let totalRemoved = 0;
    
    this.caches.forEach((cache) => {
      const keysToRemove: string[] = [];
      
      cache.forEach((entry, key) => {
        if (entry.ttl && Date.now() - entry.timestamp > entry.ttl) {
          keysToRemove.push(key);
        }
      });
      
      keysToRemove.forEach(key => {
        cache.delete(key);
        totalRemoved++;
      });
    });
    
    if (totalRemoved > 0) {
      /* noop - required by linter */
    }
  }
  
  /**
   * Stop garbage collection (for cleanup)
   */
  destroy(): void {
    if (this.gcTimer) {
      clearInterval(this.gcTimer);
      this.gcTimer = undefined;
    }
    this.clearAll();
  }
}

// Cache namespaces constants
export const CACHE_NAMESPACES = {
  FORM_LANGUAGE: 'form_language',
  SAFE_BADGES: 'safe_badges',
  FIELD_STATUS: 'field_status',
  ACTIVE_FORM: 'active_form',
  FORM_SCAN: 'form_scan',
  TRANSLATIONS: 'translations',
  Z_INDEX: 'z_index'
} as const;

export type CacheNamespace = typeof CACHE_NAMESPACES[keyof typeof CACHE_NAMESPACES];