export class Terminal {
    constructor () {

    }

    process (command) {
        // (test terminal TEMPORARY)
        this.command = command

        let resp = this.response(command)
        return resp
    };

    response (res) {
        // (test terminal TEMPORARY)
        this.res = res

        let respPack = {
            error: "future",
            system: "future",
            termi: res
        }
        return respPack
    };
};