import { TskvLogger } from '../tskv.logger';

describe('TskvLogger', () => {
  let logger: TskvLogger;
  let stdoutSpy: jest.SpyInstance;
  let stderrSpy: jest.SpyInstance;

  beforeEach(() => {
    logger = new TskvLogger();
    stdoutSpy = jest.spyOn(process.stdout, 'write').mockImplementation();
    stderrSpy = jest.spyOn(process.stderr, 'write').mockImplementation();
  });

  afterEach(() => {
    stdoutSpy.mockRestore();
    stderrSpy.mockRestore();
  });

  it('should format log as TSKV with tabs', () => {
    const testMessage = 'Test TSKV message';
    
    logger.log(testMessage);

    const logCall = stdoutSpy.mock.calls[0][0] as string;
    
    expect(logCall).toMatch(/timestamp=/);
    expect(logCall).toMatch(/level=log/);
    expect(logCall).toMatch(/message=Test TSKV message/);
    expect(logCall.split('\t')).toHaveLength(4); // 3 fields + newline
    expect(logCall.endsWith('\n')).toBe(true);
  });

  it('should escape special characters in TSKV', () => {
    const testMessage = 'Test\tmessage\nwith special chars';
    
    logger.log(testMessage);

    const logCall = stdoutSpy.mock.calls[0][0] as string;
    
    expect(logCall).not.toContain('\t');
    expect(logCall).not.toContain('\n');
    expect(logCall).toContain('message=Test message with special chars');
  });

  it('should use stderr for errors', () => {
    const errorMessage = 'Test error';
    
    logger.error(errorMessage);

    expect(stderrSpy).toHaveBeenCalled();
    expect(stdoutSpy).not.toHaveBeenCalled();
  });
});