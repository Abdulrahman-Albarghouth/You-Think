const successResponse = (messages = '', data = [], extras = {}) => {
    var response = {
        success: true,
        messages,
        data 
    }
    response = {...response, ...extras}
    return response
}

const errorResponse = (messages = '', data = []) => {
    var response = {
        success: false,
        messages, 
        data
    }
    return response
}

module.exports = {
    successResponse,
    errorResponse
}