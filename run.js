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

    let code = params.get("code");

    let filename = params.get("name");

    document.getElementById("filename").innerHTML = "File: " + filename

    let line = code.split(';');

    var currentLine = ""

    var storage = ""



    // Now the loop to run the code in each line

    let count = 0;

    for (let i = 0; i < code.length; i++) {

        if (code.charAt(i) == ";") {

            count += 1;

        }

    }




    for (let i = 0; i < count; i++) {

        currentLine = line[i]

        let part = currentLine.split('=');



        // part[0] is the function. Here the program checks if it is print, storage.save, or anything else.

        // part[1] are the parameters. After checking the functio, it does something with the parameters.

        if (part[0] == "print") {

            returnv(part[1])

        }



        if (part[0] == "storage.save") {

            storage = part[1]

        }



        if (part[0] == "storage.get") {

            returnv(storage)

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

        }



        if (part[0] == "storage.input") {

            storage = prompt(part[1])

        }




    }

            }
