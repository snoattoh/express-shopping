const fs = require("fs");
const process = require("process");
const util = require('util');

/** Textual markov chain generator */
// Really struggled with this, in retrospect it wasn't so difficult but I had to reference the solution a lot.
// Also getting used to Javascript again was weird.

class FlatFileDB {
    
    /**Reference flat file as an object */
    constructor(path) {
        this.path = path;
        this.items = [];
        this.startDB();

    }
  
    /** 
     * When the class is initilized we call the flat file to construct it.
    */
  
    startDB() {
        const readFile = util.promisify(fs.readFile)
        readFile(this.path, "utf8").then((data) => {
            data = JSON.parse(data);
            this.items = data.array;
        }).catch((err) => {
            console.error(`Error: cannot read file: ${this.path}: ${err}`);
            process.exit(1);
        })
    };

    /**  we'll update the items with the function, so both the Object and the Flatfile stay up to date. */
    updateFile(item, method){
        const writeFile = util.promisify(fs.writeFile)
        const write = {"array": this.items }
         writeFile(this.path, JSON.stringify(write)).then((data) =>{
            //  console.log(data);
            //  if(method == "added") return {"added": item}
            //  if(method == "updated") return {"updated": item}
            //  if(method == "deleted") return {message: "deleted"}
            //  return {"added": item}
            // I wanted to return the appropriate resposne but it wasn't working :(
       }).catch((err) => {
          console.error(`Error: cannot read file: ${this.path}: ${err}`);
          process.exit(1);
      })
    }
  
    addItem(item) {
        this.items.push(item);
        return this.updateFile(item, "added");
    };

    patchItem(itemName, item) {
        this.items[this.items.findIndex(index => index.name === itemName)] = item;
        console.log(this.items);
        return this.updateFile(item, "updated");
    };

    deleteItem(itemName) {
        this.items.splice(this.items.findIndex(index => index.name === itemName), 1);
        return this.updateFile("", "deleted");

    };
  }
  module.exports = {
    FlatFileDB
};
