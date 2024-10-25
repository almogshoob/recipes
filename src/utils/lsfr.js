class LSFR {
  constructor(seed) {
    if (!Number.isInteger(seed) || seed <= 0) {
      throw new Error("Seed must be a positive integer");
    }
    this.seed = seed;
    this.state = seed; // Initialize the state with the seed
  }

  // XOR-tap bits to produce the next state
  next() {
    const tap = (this.state >> 0) ^ (this.state >> 2) ^ (this.state >> 3) ^ (this.state >> 5); // example taps
    this.state = (this.state >> 1) | ((tap & 1) << 15); // Shift and add new bit on the left

    // Convert to float between 0 and 1
    return this.state / 0xFFFF;
  }
}

export default LSFR;