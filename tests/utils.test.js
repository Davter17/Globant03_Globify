import { describe, it, expect, vi } from 'vitest';
import {
  formatDuration,
  truncateText,
  debounce,
  getImageUrl,
  sanitizeHTML,
  isTokenExpired,
} from '../src/scripts/utils.js';

describe('formatDuration', () => {
  it('formats 0 ms as 0:00', () => {
    expect(formatDuration(0)).toBe('0:00');
  });

  it('formats seconds correctly', () => {
    expect(formatDuration(5000)).toBe('0:05');
    expect(formatDuration(30000)).toBe('0:30');
  });

  it('formats minutes and seconds', () => {
    expect(formatDuration(65000)).toBe('1:05');
    expect(formatDuration(212000)).toBe('3:32');
  });

  it('pads seconds with zero', () => {
    expect(formatDuration(60000)).toBe('1:00');
    expect(formatDuration(120000)).toBe('2:00');
  });
});

describe('truncateText', () => {
  it('returns short text unchanged', () => {
    expect(truncateText('hello', 10)).toBe('hello');
  });

  it('truncates long text with ellipsis', () => {
    expect(truncateText('a'.repeat(60), 50)).toBe('a'.repeat(50) + '...');
  });

  it('uses default max length of 50', () => {
    expect(truncateText('a'.repeat(51))).toBe('a'.repeat(50) + '...');
  });

  it('returns exact text at max length', () => {
    expect(truncateText('a'.repeat(50), 50)).toBe('a'.repeat(50));
  });
});

describe('debounce', () => {
  it('delays function execution', async () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced();
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);

    vi.useRealTimers();
  });

  it('resets timer on subsequent calls', async () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced();
    vi.advanceTimersByTime(50);
    debounced();
    vi.advanceTimersByTime(50);
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(50);
    expect(fn).toHaveBeenCalledTimes(1);

    vi.useRealTimers();
  });
});

describe('getImageUrl', () => {
  it('returns SVG placeholder when images array is empty', () => {
    const result = getImageUrl([]);
    expect(result).toContain('data:image/svg+xml');
  });

  it('returns SVG placeholder when images is null', () => {
    const result = getImageUrl(null);
    expect(result).toContain('data:image/svg+xml');
  });

  it('returns single image url directly', () => {
    const images = [{ url: 'https://example.com/img.jpg', width: 300, height: 300 }];
    expect(getImageUrl(images)).toBe('https://example.com/img.jpg');
  });

  it('prefers 640px image when available', () => {
    const images = [
      { url: 'https://example.com/small.jpg', width: 64, height: 64 },
      { url: 'https://example.com/medium.jpg', width: 640, height: 640 },
      { url: 'https://example.com/large.jpg', width: 300, height: 300 },
    ];
    expect(getImageUrl(images)).toBe('https://example.com/medium.jpg');
  });
});

describe('sanitizeHTML', () => {
  it('escapes HTML tags', () => {
    expect(sanitizeHTML('<script>alert("xss")</script>')).not.toContain('<script>');
  });

  it('escapes angle brackets', () => {
    const result = sanitizeHTML('<b>bold</b>');
    expect(result).not.toContain('<b>');
  });

  it('preserves plain text', () => {
    expect(sanitizeHTML('hello world')).toBe('hello world');
  });
});

describe('isTokenExpired', () => {
  it('returns true when no expiry time provided', () => {
    expect(isTokenExpired(null)).toBe(true);
    expect(isTokenExpired(undefined)).toBe(true);
  });

  it('returns true when expiry is in the past', () => {
    expect(isTokenExpired(Date.now() - 10000)).toBe(true);
  });

  it('returns false when expiry is in the future', () => {
    expect(isTokenExpired(Date.now() + 100000)).toBe(false);
  });
});
