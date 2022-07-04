export class errorHandler {
    type: string;
    info: string;
    retcode: number;
  
    constructor(type: string, info: string) {
      this.type = type;
      this.info = info;
      this.retcode = 422;
    }
  
    setReturnCode(ret: number): void {
      this.retcode = ret;
    } 
  
    getReturnCode(): number { return this.retcode };
    getType(): string { return this.type };
    getInfo(): string { return this.info };
  }