import { Subject } from "rxjs";
export class LoadDataService {
  private static instance: LoadDataService;
  private static loadStream = new Subject<object>();
  private static waitCounter = 0;

  constructor() {
    if (LoadDataService.instance) {
      return LoadDataService.instance;
    }
    LoadDataService.instance = this;
  }

  public notify(data?: object) {
    LoadDataService.loadStream.next(data);
  }

  public unsubscribe() {
    LoadDataService.loadStream.unsubscribe();
  }

  public getStream() {
    return LoadDataService.loadStream;
  }

  public loadStarted() {
    ++LoadDataService.waitCounter;
  }

  public loadFinished(data?: object) {
    if (
      LoadDataService.waitCounter > 0 &&
      LoadDataService.waitCounter-- === 1
    ) {
      this.notify(data);
    }
  }

  public isLoaded() {
    return LoadDataService.waitCounter === 0;
  }
}
