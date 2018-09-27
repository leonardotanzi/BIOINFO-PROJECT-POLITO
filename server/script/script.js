const exec = require('child_process').exec;
const fs = require('fs');
const readline = require('readline');

const sscanf = require('scanf').sscanf;


const startScript  = async (options) => {

   /* console.log(options);
    options.map ((key,value) => {
        console.log("map");
    });*/

    let fileName = 'GSM337570-tbl-1.txt';
    let cmd = './script/./isomir_sea -ift ./script/' + fileName + ' -ifm ./script/db/mature.fa  -v 1 -sc hsa'

    child = exec(cmd,(error, stdout, stderr)  =>  {

        if (error !== null) {
            console.log('exec error: ' + error);
            return;
        }
        //filename 
        let dir = './script/' + fileName.slice(0,-4);
        processData(dir);
    });
}

const processData = async (dir) => {

    await getAlligmentInfo(dir);

    //delete the folder generated by  in order to be able to launch it again
    //deleteFolderRecursive(dir);
}

const getAlligmentInfo = async (dir) => {

    let fileInterface = readline.createInterface({
        input: fs.createReadStream(dir + '/align.log')
    });

    let lines = [];
    fileInterface.on('line', (line) => {
        lines.push(line);
        console.log(line);
    });

    fileInterface.on('close' , () => {
        //here i have to take the infomations about the alignment
        //[file interface.lenght , file interface.lenght --1]
        
    });

  
}

const deleteFolderRecursive = (path) => {

    if( fs.existsSync(path) ) {
      fs.readdirSync(path).forEach(function(file,index){
        var curPath = path + "/" + file;
        if(fs.lstatSync(curPath).isDirectory()) { // recurse
          deleteFolderRecursive(curPath);
        } else { // delete file
          fs.unlinkSync(curPath);
        }
      });
      fs.rmdirSync(path);
    }
  }


module.exports = {startScript}