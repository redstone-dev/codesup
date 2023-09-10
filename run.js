// Change the output to previous output plus new line
function returnv(value) {

    document.getElementById("run").innerHTML = document.getElementById("run").innerHTML + "<br>" + value

}



// The code to the share button.

function share() {

    var url = window.location.href

    navigator.clipboard.writeText(url);

    document.getElementById("copy_message").innerHTML = "URL copied to clipboard!"

}




// The main running function of the file

function run() {

    // First, we setup everything by reading the parameters and separating the lines

    document.getElementById("run").innerHTML = ""

    let params = new URL(document.location).searchParams;

    let useBetaFeatures = params.get("beta")
    
    let code = params.get("code");

    let filename = params.get("name");

    document.getElementById("filename").innerHTML = "File: " + filename

    let line = code.split(';');

    var currentLine = ""

    var storage = ""

    var namedProcedures = {}

    // Now the loop to run the code in each line

    let count = 0;

    for (let i = 0; i < code.length; i++) {

        if (code.charAt(i) == ";") {

            count += 1;

        }

    }




    for (let i = 0; i < count; i++) {

        currentLine = line[i]
        
        let part = currentLine.split(useBetaFeatures ? ' ' : '=');



        // part[0] is the function. Here the program checks if it is print, storage.save, or anything else.

        // part[1] are the parameters. After checking the functio, it does something with the parameters.

        if (part[0] == "print") {

            returnv(part[1])
            
            continue;

        }



        if (part[0] == "storage.save") {

            storage = part[1]

            continue;

        }



        if (part[0] == "storage.printValue") {

            returnv(storage)

            continue;

        }



        if (part[0] == "if") {

            let parameters = part[1].split(':');

            // It checks if the first parameter is storage so it gets the stored value.

            if (parameters[0] == "storage") {
                if (storage == parameters[1]) {
                    returnv(parameters[2])
                } else {
                    returnv(parameters[3])
                }
            } else {

                if (parameters[0] == parameters[1]) {
                    returnv(parameters[2])
                } else {
                    returnv(parameters[3])
                }

            }

            continue;

        }



        if (part[0] == "storage.input") {

            storage = prompt(part[1])

            continue;

        }

        // Code for registering a named procedure, which is like a function except it cannot return a value
        // Syntax: newNamedProc myNamedProc,arg1,arg2,arg3;
        // and then later on you can call namedProcBody
        if (part[0] == "newNamedProc") {

            let args = part[1].split(",");
            
            namedProcedures[args[0]] = {
                name: args[0],
                requiredArguments: args.length > 1 ? args.slice(1, args.length + 1) : [],
            }

            
            
            continue;
            
        }

        return "Syntax Error: Unknown instruction: " + currentLine;
    
    }

    

}
