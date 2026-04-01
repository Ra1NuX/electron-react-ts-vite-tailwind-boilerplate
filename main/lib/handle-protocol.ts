import { net, protocol } from "electron";

import { pathToFileURL } from "url";
import { join } from "path";

const PROTOCOL = "app";

const handleProtocol = () => {
  protocol.handle(PROTOCOL, (request) => {
    const url = new URL(request.url);
    let filePath = url.pathname;
    if (filePath === "/" || filePath === "") {
      filePath = "/index.html";
    }
    const fullPath = join(__dirname, "renderer", filePath);
    return net.fetch(pathToFileURL(fullPath).toString());
  });
};

export const registerProtocol = () => {
  protocol.registerSchemesAsPrivileged([
    {
      scheme: PROTOCOL,
      privileges: {
        standard: true,
        secure: true,
        supportFetchAPI: true,
      },
    },
  ]);
};

export default handleProtocol;
