'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { MalformedInputError } = require('../packages/contracts/src/errors');

class FixtureLoader {
  constructor(options = {}) {
    this.rootDir = options.rootDir || process.cwd();
    this.fixturesPath = options.fixturesPath || path.resolve(this.rootDir, 'fixtures/runtime/fixtures.json');
  }

  /**
   * Loads all fixtures and attaches a deterministic content hash.
   * @returns {Array<object>} list of fixtures with hashes
   */
  loadAll() {
    if (!fs.existsSync(this.fixturesPath)) {
      throw new MalformedInputError(`Fixtures definition file not found at: ${this.fixturesPath}`);
    }

    const raw = fs.readFileSync(this.fixturesPath, 'utf8');
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (e) {
      throw new MalformedInputError(`Corrupt fixtures JSON: ${e.message}`);
    }

    if (!Array.isArray(parsed.fixtures)) {
      throw new MalformedInputError('Fixtures manifest must contain a "fixtures" array');
    }

    return parsed.fixtures.map(f => {
      const serialized = JSON.stringify(f);
      const hash = crypto.createHash('sha256').update(serialized).digest('hex');
      return {
        ...f,
        hash,
        discoveredAt: new Date().toISOString()
      };
    });
  }

  /**
   * Retrieves a fixture by ID (e.g. 'C-001').
   * @param {string} id 
   * @returns {object|null}
   */
  getById(id) {
    const all = this.loadAll();
    return all.find(f => f.id === id) || null;
  }
}

module.exports = {
  FixtureLoader
};
