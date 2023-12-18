export class SingleLock {

  public static key: any = {};

  public static enter(key: string): boolean {
    if (SingleLock.key[key] === true) {
      return true;
    }
    SingleLock.key[key] = true;
    return false;
  }

  public static out(key: string) {
    delete SingleLock.key[key];
  }
}
