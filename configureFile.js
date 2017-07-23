const  inquirer = require('inquirer')
const fs = require('fs')
var questions = function (channels, callback) {

    inquirer.prompt(
        {
            type: 'input',
            name: 'channels',
            message: 'Enter a channel:'
        }).then(function (reply) {
        channels.push(reply.channels);

        inquirer.prompt({
            type: 'confirm',
            name: 'confirmed',
            message: 'Do you want to enter another channel?',
            default: false
        }).then(reply => {
            if (reply.confirmed) {
                questions(channels, ()=> {
                    callback(channels);
                });
            } else {
                callback(channels);
            }
        })
    })
}
const initQuestions = callback => {
    inquirer.prompt(
        {
            type: 'input',
            name: 'port',
            message: 'Enter a server port:'
        }).then((reply) => {
        questions([], channels => {
            const obj = reply
            obj.channels = channels
            const content = JSON.stringify(obj);
            fs.writeFile('resonance.json', content, () => {
                console.log('Config file wrote successfull!'.bgGreen.blue);
                if (callback) {
                    callback()
                }
            })

        });
    })
}

const init = (options, callback) => {
    fs.stat(process.cwd()+'/resonance.json',(err, status)=>{
        if(err){
            initQuestions(callback)
        }
        else
        {
            console.log('Config file exists already!'.bgGreen.blue);
        }
    })
}

module.exports = init
