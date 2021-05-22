const mongoose = require("mongoose");
const uniqid = require("uniqid");
const { Schema } = mongoose;
const departmentSchema = require("../department/department.schema");

const questionSchema = new Schema(
  {
    title: { type: String, required: true },
    marks: { type: Number, required: true },
    authorID: { type: Schema.Types.ObjectId, required: true, ref: "Teacher" },
    type: {
      type: String, // mcq, broad, codingQuestion, quiz, trueFalse
      required: true,
    },
    options: [
      {
        value: String,
        isAnswer: { type: Boolean, required: true },
      },
    ],
    matchingOptions: {
      leftSide: [
        {
          id: {
            type: String,
            default: uniqid("match"),
            required: true,
          },
          value: String,
          matchingID: String,
        },
      ],
      rightSide: [
        {
          id: {
            type: String,
            default: uniqid("match"),
            required: true,
          },
          value: String,
        },
      ],
    },
    body: String,
    defaultCode: String,
    securityType: { type: String, default: "public", required: true },
    teacherAccess: [Schema.Types.ObjectId],
    department: {
      type: departmentSchema,
      required: true,
    },
  },
  {
    timestamps: true,
    toObject: { getters: true, virtuals: true },
    toJSON: { getters: true, virtuals: true },
    strict: true,
  }
);

module.exports = questionSchema;
