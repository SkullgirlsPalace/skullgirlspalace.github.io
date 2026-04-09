// =====================================================
// GLOBAL TEST SETUP
// Environment configuration for all tests
// =====================================================

// Mock localStorage for tests
const localStorageMock = {
  store: {},
  getItem: function(key) {
    return this.store[key] || null;
  },
  setItem: function(key, value) {
    this.store[key] = String(value);
  },
  removeItem: function(key) {
    delete this.store[key];
  },
  clear: function() {
    this.store = {};
  }
};

global.localStorage = localStorageMock;

// Mock window.location.hash
let hashValue = '';
Object.defineProperty(window, 'location', {
  value: {
    hash: hashValue,
    get hash() { return hashValue; },
    set hash(val) { hashValue = val; },
    href: 'http://localhost/',
    pathname: '/',
    search: '',
  },
  writable: true,
});

// Mock scrollTo
global.window.scrollTo = () => {};

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor(callback) {
    this.callback = callback;
  }
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Reset mocks between tests
beforeEach(() => {
  localStorageMock.clear();
  hashValue = '';
});
