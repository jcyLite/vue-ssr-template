const jcyFs=require('jcy-fs');
const path=require('path');
jcyFs.copyDir(path.resolve(__dirname,"../dist"),path.resolve(__dirname,"../document/static/dist"))
