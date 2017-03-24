/**
 * Created by purushotham on 22/3/17.
 */
var mongoose = require('mongoose');
var SchemaTypes = mongoose.Schema.Types;
var Schema = mongoose.Schema;
var studentSchema=new Schema({
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        course:{
            type: String,
            ref:'course'

        }
    },
    {collection : "students"}
);
var studentModel=mongoose.model("students",studentSchema);
module.exports=studentModel;