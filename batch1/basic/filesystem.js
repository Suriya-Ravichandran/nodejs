const fs = require("fs")
const path = require("path")

filepath=path.join(__dirname,"hello.txt")

console.log(filepath)

fs.writeFile(filepath,"this file created by node js", (err) => {
  if (err) return console.error('Create Error:', err);
  console.log('File created successfully!');
});

