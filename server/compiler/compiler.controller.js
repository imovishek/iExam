const { httpStatuses, TEACHER } = require("../constants");
const { spawnSync, spawn } = require("child_process");
const fs = require("fs");

const url = "./server/compiler/files/";
// GET CREDENTIAL

exports.simpleRun = async (req, res) => {
  const { body } = req;
  const { lang, code, params } = body;
  try {
    if (lang !== "cpp" && lang !== 'py') throw new Error("Language is not supported!");
    const fileBaseName = "file" + Math.random().toString(16).slice(-9);
    const fileName = fileBaseName + "." + lang;

    fs.writeFile(url+fileName, code, () => {
        const cppRunCommand = `g++ -std=c++11 ${url}${fileName} -o ${url}${fileBaseName} && timeout 4s ./${url}${fileBaseName}`;
        const pythonRunCommand = `python3 ${url}${fileName}`;
        let runCommand = "";
        switch (lang) {
          case "cpp":
            runCommand = cppRunCommand;
            break;
          case "py":
            runCommand = pythonRunCommand;
            break;
          default:
            break;
        }
        (params || []).forEach(param => {
          runCommand += ` "${param}"`;
        });
        try {
          const runCode = spawn(
            runCommand,
            {
              shell: true,
            }
          );
          let sent = 0;
          runCode.stdout.on("data", (data) => {
            console.log(`Output:\n${data}`);
            deleteFiles([fileBaseName, fileName]);
            if (sent) return;
            res.status(httpStatuses.OK).send({ msg: "ok", output: data.toString() });
            sent = 1;
          });
          runCode.stderr.on("data", (data) => {
            console.log(`ERROR:\n${data}`);
            deleteFiles([fileBaseName, fileName]);
            if (sent) return;
            res.status(httpStatuses.OK).send({ msg: "error", output: data.toString() });
            sent = 1;
          });
          runCode.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
            deleteFiles([fileBaseName, fileName]);
            if (code) {
              if (sent) return;
              res.status(httpStatuses.OK).send({ msg: "error", output: "CE/TLE" });
              sent = 1;
            }
          });
        } catch (e) {
          throw new Error('Compilation Error');
        }
        
    });
    
  } catch (err) {
    console.log(err);
    res
      .status(httpStatuses.INTERNAL_SERVER_ERROR)
      .send({ error: true, message: err.message });
  }
};
const deleteFiles = (files) => files.forEach(fileName => {
  spawn(`rm ${url}${fileName}`, { shell: true })
});

exports.runEvaluation = async (req, res) => {
  const { body } = req;
  const { lang, code, answer, marks } = body;

  if (req.user.userType !== TEACHER) throw new Error('Not authorized, teachers only!');
  try {
    if (lang !== "cpp" && lang !== 'py') throw new Error("Language is not supported!");
    const fileBaseName = "file" + Math.random().toString(16).slice(-9);
    const fileName = fileBaseName + "." + lang;

    const url = "./server/compiler/files/";
    fs.writeFile(url+fileName, code, () => {
        const cppRunCommand = `g++ -std=c++11 ${url}${fileName} -o ${url}${fileBaseName} && timeout 4s ./${url}${fileBaseName} "${answer}" "${marks}"`;
        const pythonRunCommand = `python3 ${url}${fileName} "${answer}" "${marks}"`;
        let runCommand = "";
        switch (lang) {
          case "cpp":
            runCommand = cppRunCommand;
            break;
          case "py":
            runCommand = pythonRunCommand;
            break;
          default:
            break;
        }
        try {
          const runCode = spawn(
            runCommand,
            {
              shell: true,
            }
          );
          let sent = 0;
          runCode.stdout.on("data", (data) => {
            console.log(`Output:\n${data}`);
            deleteFiles([fileBaseName, fileName]);
            if (sent) return;
            res.status(httpStatuses.OK).send({ msg: "ok", output: data.toString() });
            sent = 1;
          });
          runCode.stderr.on("data", (data) => {
            console.log(`ERROR:\n${data}`);
            deleteFiles([fileBaseName, fileName]);
            if (sent) return;
            data = data.toString();
            data = data.replace(new RegExp(`./server/compiler/files/${fileBaseName}`, "g"), 'script')
            res.status(httpStatuses.OK).send({ msg: "error", output: data });
            sent = 1;
          });
          runCode.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
            deleteFiles([fileBaseName, fileName]);
            if (sent) return;
            if (code) {
              res.status(httpStatuses.OK).send({ msg: "error", output: "CE/TLE" });
              sent = 1;
            } else {
              res.status(httpStatuses.OK).send({ msg: "ok", output: "" });
              sent = 1;
            }
          });
        } catch (e) {
          throw new Error('Compilation Error');
        }
        
    });
    
  } catch (err) {
    console.log(err);
    res
      .status(httpStatuses.INTERNAL_SERVER_ERROR)
      .send({ error: true, message: err.message });
  }
};
