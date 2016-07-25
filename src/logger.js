// Simply console wrapper or object with empty console methods...
const makeLogger = log => log ? console : {
  log: () => {},
  info: () => {},
  error: () => {},
  debug: () => {},
  warn: () => {},
};

export default makeLogger;
