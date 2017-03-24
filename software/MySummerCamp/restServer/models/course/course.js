/**
 * Created by purushotham on 22/3/17.
 */
var mongoose=require('mongoose');
require('mongoose-double')(mongoose)
var SchemaTypes = mongoose.Schema.Types;
var Schema = mongoose.Schema;
var courseSchema=new Schema({
        name : {
            type : String,
            trim : true
        },
        description :{
            type : String,
            trim : true
        },
        duration : {
            type : String,
            trim : true
        },
        noOfDays : {
            type : Number,
            trim : true

        },
        coach : {
            type : String,
            trim : true

        },
        fee : {
            type : SchemaTypes.Double,
            trim : true
        },
        courseSlot :[{
            type : SchemaTypes.ObjectId,
            ref: "courseSlot",
            trim :true
        }]

    },
    {collection : "course"}
);
var courseModel=mongoose.model('course',courseSchema);
module.exports=courseModel;

