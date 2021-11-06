const deepslate = require("DeepSlate/DeepSlate.js");

// simple avore implementation using deepslate

/// implement parser
function RunAvoreAST(code) {
    let buf = "";
    let bname;
    let bargs = [];
    let state = 0;
    for (let i = 0; i < code.length ; i ++) {
        if (code[i] == '[' && state == 0) {
            bname = buf;
            buf = "";
            state = 9;
        } else if (code[i] == ']') {
            break;  
        } else if (code[i] == ',' && state == 9) {
            bargs.push(buf);
            buf = "";
        } else if (code[i] == '"' && state == 9) {
           state = 102030123  
        } else if (code[i] == '"' && state == 102030123) {
           state = 9  
        } else {
            buf = buf + code[i]
        }
    }

    if (buf.length > 0) {
        bargs.push(buf);
        buf = "";
    }

    return {
        "funcname_fords": bname,
        "funcarguments": bargs
    }
}

function avoreMsg(args) {
    console.log(args[0])
}

function os_system(args) {
    console.log("System " + args[0])
}

var modules = {
    "av": {
        "msg": avoreMsg,
        "os": {
            "system": os_system
        }
    }
}

function runAvoreCode(code) {
    let ast = RunAvoreAST(code);

    let obj = deepslate.traverse(modules, ast.funcname_fords) || null;

    if (obj != null) {
        obj(ast.funcarguments);
    }
}
