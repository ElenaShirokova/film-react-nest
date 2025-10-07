import { DevLogger } from '../dev.logger';

describe('DevLogger', () => {
  let logger: DevLogger;
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    logger = new DevLogger();
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('should log message with dev format', () => {
    const testMessage = 'Test dev message';
    
    logger.log(testMessage);

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining(testMessage)
    );
  });

  it('should log error with dev format', () => {
    const errorMessage = 'Test error';
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    
    logger.error(errorMessage);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining(errorMessage)
    );
    consoleErrorSpy.mockRestore();
  });
});