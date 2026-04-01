import electron from 'electron';

if (typeof electron === 'string') {
	throw new TypeError('Not running in an Electron environment!');
}

const { env } = process;
const isEnvSet = 'ELECTRON_IS_DEV' in env;
const getFromEnv = Number.parseInt(env.ELECTRON_IS_DEV||'0', 10) === 1;

const isDev = isEnvSet ? getFromEnv : !electron.app.isPackaged;

export default isDev;