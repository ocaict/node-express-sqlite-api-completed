import livereload from "livereload";
import connectLiveReload from "connect-livereload";
// Create a LiveReload middleware
function liveReload(folderPath) {
  const liveReloadServer = livereload.createServer();
  liveReloadServer.watch(folderPath);
  return connectLiveReload();
}

export default liveReload;
