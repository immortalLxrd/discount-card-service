import { App } from './app';
import { Container } from './container';

const container: Container = Container.getInstance();
const app: App = container.resolve('app');

app.init();
