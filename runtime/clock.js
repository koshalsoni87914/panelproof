'use strict';

/**
 * Deterministic clock interface for reproducible runs.
 */
class Clock {
  now() {
    return new Date();
  }

  toISOString() {
    return this.now().toISOString();
  }
}

class FixedClock extends Clock {
  constructor(fixedIsoString = '2026-11-17T18:00:00.000Z') {
    super();
    this._fixedDate = new Date(fixedIsoString);
  }

  now() {
    return new Date(this._fixedDate.getTime());
  }
}

class SequentialClock extends Clock {
  constructor(startIsoString = '2026-11-17T18:00:00.000Z', stepMs = 1000) {
    super();
    this._currentMs = new Date(startIsoString).getTime();
    this._stepMs = stepMs;
  }

  now() {
    const d = new Date(this._currentMs);
    this._currentMs += this._stepMs;
    return d;
  }
}

module.exports = {
  Clock,
  FixedClock,
  SequentialClock
};
