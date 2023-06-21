export class FailureMiddleware {
  private type: string;
  constructor(type: string) {
    this.type = type;
  }

  error() {
    return Error(
      JSON.stringify({
        type: this.type,
      })
    );
  }
}
