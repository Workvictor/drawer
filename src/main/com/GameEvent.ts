import { Observer, Subscriber  } from "main/utils/Observer";


const emitters = {
  sceneChange: new Observer<SceneChange>(),
  sceneChange2: new Observer<SceneChange2>()
};

export class GameEvents {
  subscribe = (on: Emitter) => emitters[on].subscribe;
}

type Emitter = keyof typeof emitters; 

interface SceneChange {
  type: 'sceneChange',
  payload: {
    sceneIndex: number;
  }
}

interface SceneChange2 {
  type: 'sceneChange2',
  payload: {
    sceneIndex: number;
  }
}