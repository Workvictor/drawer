import * as serviceWorker from 'main/serviceWorker';
import { main } from 'main/main';

main(document.getElementById('root')!);

serviceWorker.register();
