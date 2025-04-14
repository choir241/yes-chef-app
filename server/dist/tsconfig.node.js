// server/tsconfig.node.json
var compilerOptions = {
  composite: true,
  module: "ESNext",
  moduleResolution: "Node",
  allowSyntheticDefaultImports: true
};
var include = ["vite.config.ts"];
var tsconfig_node_default = {
  compilerOptions,
  include
};
export {
  compilerOptions,
  tsconfig_node_default as default,
  include
};
