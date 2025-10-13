import { JsonLogger } from '../json.logger';

describe('JsonLogger', () => {
  let logger: JsonLogger;
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    logger = new JsonLogger();
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('should format log as JSON', () => {
    const testMessage = 'Test JSON message';
    
    logger.log(testMessage);

    const logCall = consoleSpy.mock.calls[0][0];
    const parsedLog = JSON.parse(logCall);

    expect(parsedLog).toHaveProperty('timestamp');
    expect(parsedLog).toHaveProperty('level', 'log');
    expect(parsedLog).toHaveProperty('message', testMessage);
    expect(new Date(parsedLog.timestamp)).toBeInstanceOf(Date);
  });

  it('should include params in JSON log', () => {
    const testMessage = 'Test with params';
    const testParams = ['param1', 123];
    
    logger.log(testMessage, ...testParams);

    const logCall = consoleSpy.mock.calls[0][0];
    const parsedLog = JSON.parse(logCall);

    expect(parsedLog.params).toEqual(testParams);
  });
});