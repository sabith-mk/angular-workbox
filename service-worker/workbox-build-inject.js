const { injectManifest } = require("workbox-build");
const workboxConfig = require("./workbox-config");

console.log(`Workbox configuration: `, workboxConfig);

injectManifest(workboxConfig).then(({ count, size }) => {
    console.log(`Generated ${workboxConfig.swDest}, which will precache ${count} files (${size} bytes)`);
});