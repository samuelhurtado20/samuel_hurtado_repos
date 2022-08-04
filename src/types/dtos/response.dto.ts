export default interface IResponseDTO {
    success: boolean;
    message: string;
    result: any
    constructor(success: boolean, message: string, result: any) : { success: boolean, message: string, result: any };
  }

  export default class ResponseDTO implements IResponseDTO {  
    public success;
    public message;
    public result;
    constructor(success: boolean, message: string, result: any) {
      this.success = success;
      this.message = message;
      this.result = result;
    }
  }