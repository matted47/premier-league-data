// IMPORT ALL IMAGES AND CREATE HASH MAP 
const context = require.context('../assets/images/badges', false, /\.(svg)$/);
let badges={};
context.keys().forEach((filename)=>{
  const newFileName = filename.replace("./", "").replace(".svg", "");
  badges[newFileName] = context(filename);
});

export default badges;
