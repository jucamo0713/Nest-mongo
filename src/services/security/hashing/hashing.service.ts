import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
@Injectable()
export class HashingService {
  async hash(stringToHash:string):Promise<string>{
    const saltOrRounds = await bcrypt.genSalt();
    return bcrypt.hash(stringToHash, saltOrRounds);
  }
  async compareHash(stringToCompare:string,hash:string):Promise<boolean>{
    return bcrypt.compare(stringToCompare,hash);
  }
}
