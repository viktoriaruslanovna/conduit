class Storage {
  constructor(key, fallback = null) {
    this.key = key;
    this.fallback = fallback;
  }

  get() {
    return JSON.parse(localStorage.getItem(this.key) ?? this.fallback);
  }

  set(value) {
    return localStorage.setItem(this.key, JSON.stringify(value));
  }

  clear() {
    return localStorage.clear(this.key);
  }
}

export { Storage };
