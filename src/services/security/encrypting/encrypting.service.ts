import { Injectable } from '@nestjs/common';
import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';


@Injectable()
export class EncryptingService {
  private readonly iv = randomBytes(16);
  private readonly password = process.env.ENCRYPT_PASSWORD;

  async encrypt(data: string): Promise<any> {

    const key = (await promisify(scrypt)(this.password, 'salt', 32)) as Buffer;
    const cipher = createCipheriv('aes-256-ctr', key, this.iv);

    const encryptedText = Buffer.concat([
      cipher.update(data),
      cipher.final(),
    ]);
    return encryptedText;
  }

  async decrypt(data: any): Promise<string> {
    const key = (await promisify(scrypt)(this.password, 'salt', 32)) as Buffer;
    const decipher = createDecipheriv('aes-256-ctr', key, this.iv);
    const decryptedText = Buffer.concat([
      decipher.update(data),
      decipher.final(),
    ]);
    return decryptedText.toLocaleString();
  }
}
