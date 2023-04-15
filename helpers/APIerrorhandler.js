class APIerrorhandler extends Error{

    // message=""
    // status=500
    constructor(status,massage){
        super()
        this.message = massage
        this.status = status
    }
}
export default APIerrorhandler