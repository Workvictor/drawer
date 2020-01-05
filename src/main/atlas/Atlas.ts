import { AtlasElement } from 'main/atlas/AtlasElement';

type FrameDataKey = 'buttonHover' | 'buttonNormal' | 'buttonPressed';

export class Atlas {
  static defaultPath = 'res/img';
  constructor() {}

  private _atlasImage = new Image();

  private _atlasData: { [key: string]: AtlasElement } = {
    buttonHover: new AtlasElement('buttonHover', 0, 0, 292, 98),
    buttonNormal: new AtlasElement('buttonNormal', 292, 0, 292, 98),
    buttonPressed: new AtlasElement('buttonPressed', 584, 0, 292, 98)
  };

  get elements() {
    return this._atlasData;
  }

  getElement = (name: FrameDataKey) => {
    return this._atlasData[name];
  };

  private _loadAtlasImage = (atlasName: string) => {
    return new Promise<HTMLImageElement>(resolve => {
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'arraybuffer';
      xhr.open('GET', `./${Atlas.defaultPath}/${atlasName}.png`, true);
      xhr.onloadend = () => {
        this._atlasImage.src = window.URL.createObjectURL(
          new Blob([xhr.response], { type: 'image/png' })
        );
        this._atlasImage.id = atlasName;
        this._atlasImage.onload = () => {
          for (const key in this._atlasData) {
            this._atlasData[key].dataSource = this._atlasImage;
          }
          resolve(this._atlasImage);
        };
      };
      xhr.onprogress = (e: ProgressEvent) => {};
      xhr.send();
    });
  };

  load = (atlasName: string) => {
    return Promise.all([this._loadAtlasImage(atlasName)]);
  };
}
