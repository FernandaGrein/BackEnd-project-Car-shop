class INvalidIdError extends Error {
  public status: number;
  
  constructor(message: string) {
    super(message);
    this.status = 422;
  }
}
export default INvalidIdError;