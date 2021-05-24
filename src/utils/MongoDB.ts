const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect("mongodb+srv://admin:8x&fY@KE+Ghqm5+@cluster0.2vegv.mongodb.net/requests?retryWrites=true&w=majority");

let schema = new Schema({
    request: String,
    params: {}
});

const mRequest = mongoose.model('request', schema);

export { mRequest };