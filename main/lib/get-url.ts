import isDev from "@core/lib/is-dev";

const domain = isDev ? `http://localhost:5173` : "app://example.com/";

const getURL = (pathname: string) => new URL(pathname, domain).toString();

export default getURL;
