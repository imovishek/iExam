const { httpStatuses } = require("../constants");
const { spawnSync, spawn } = require("child_process");
const fs = require("fs");

// GET CREDENTIAL

exports.simpleRun = async (req, res) => {
  const { body } = req;
  try {
    if (body.lang !== "cpp") throw new Error("Language is not supported!");
    const fileBaseName = "file" + Math.random().toString(16).slice(-9);
    const fileName = fileBaseName + ".cpp";

    console.log(fileName);
    const url = "./server/compiler/files/";
    fs.writeFile(url+fileName, body.code, () => {
        console.log('success!');
        const runCpp = spawn(
          `g++ -std=c++11 ${url}${fileName} -o ${url}${fileBaseName} && timeout 4s ./${url}${fileBaseName}`,
          {
            shell: true,
          }
        );
        runCpp.stdout.on("data", (data) => {
          console.log(`Output:\n${data}`);
          res.status(httpStatuses.OK).send({ msg: "ok", output: data.toString() });
        });
        runCpp.stderr.on("data", (data) => {
          console.log(`ERROR:\n${data}`);
          res.status(httpStatuses.OK).send({ msg: "error", output: data.toString() });
        });
        runCpp.on('close', (code) => {
          console.log(`child process exited with code ${code}`);
          if (fileName)
            spawn(`rm ${url}${fileName}`, { shell: true });
            spawn(`rm ${url}${fileBaseName}`, { shell: true });
          if (code)
            res.status(httpStatuses.OK).send({ msg: "error", output: "CE/TLE" });
        });
    });
    
  } catch (err) {
    console.log(err);
    res
      .status(httpStatuses.INTERNAL_SERVER_ERROR)
      .send({ error: true, message: err.message });
  }
};
