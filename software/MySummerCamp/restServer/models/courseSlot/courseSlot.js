/**
 * Created by purushotham on 22/3/17.
 */
var mongoose = require('mongoose');
var SchemaTypes = mongoose.Schema.Types;
var Schema = mongoose.Schema;
var courseSlotSchema=new Schema({
        timeSlot: {
            type: String,
            trim: true
        },
        noOfStudents:{
            type: Number,
            trim: true
        },
        availableSlots: {
            type: Number,
            trim: true
        }
    },
    {collection : "courseSlot"}
);
var courseSlotModel =mongoose.model("courseSlot",courseSlotSchema);
module.exports=courseSlotModel;