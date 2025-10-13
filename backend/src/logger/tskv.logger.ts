import { LoggerService, Injectable } from '@nestjs/common';

@Injectable()
export class TskvLogger implements LoggerService {
  private escapeValue(value: any): string {
    if (value === null || value === undefined) return '';
    return value.toString().replace(/\t/g, ' ').replace(/\n/g, ' ');
  }

  private formatMessage(level: string, message: any, ...optionalParams: any[]): string {
    const timestamp = new Date().toISOString();
    const entries = [
      `timestamp=${this.escapeValue(timestamp)}`,
      `level=${this.escapeValue(level)}`,
      `message=${this.escapeValue(message)}`
    ];

    if (optionalParams.length > 0) {
      optionalParams.forEach((param, index) => {
        entries.push(`param${index}=${this.escapeValue(param)}`);
      });
    }

    return entries.join('\t') + '\n';
  }

  log(message: any, ...optionalParams: any[]) {
    process.stdout.write(this.formatMessage('log', message, ...optionalParams));
  }

  error(message: any, ...optionalParams: any[]) {
    process.stderr.write(this.formatMessage('error', message, ...optionalParams));
  }

  warn(message: any, ...optionalParams: any[]) {
    process.stdout.write(this.formatMessage('warn', message, ...optionalParams));
  }

  debug(message: any, ...optionalParams: any[]) {
    process.stdout.write(this.formatMessage('debug', message, ...optionalParams));
  }

  verbose(message: any, ...optionalParams: any[]) {
    process.stdout.write(this.formatMessage('verbose', message, ...optionalParams));
  }
}