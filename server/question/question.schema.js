const mongoose = require("mongoose");
const uniqid = require("uniqid");
const { ANSWER_TYPES } = require("../constants");
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
    evaluationCode: String,
    evaluationLang: {
      type: String,
      enum: {
        values: ["cpp", "py"],
        message: 'Invalid language'
      }
    },
    securityType: { type: String, default: "public", required: true },
    teacherAccess: [Schema.Types.ObjectId],
    department: {
      type: departmentSchema,
      required: true,
    },
    answerType: {
      type: String,
      enum: {
        values: Object.keys(ANSWER_TYPES)
      },
      default: 'plain-text',
    }
  },
  {
    timestamps: true,
    toObject: { getters: true, virtuals: true },
    toJSON: { getters: true, virtuals: true },
    strict: true,
  }
);

module.exports = questionSchema;
