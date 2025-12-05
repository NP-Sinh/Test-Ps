const mongoose = require('mongoose');

const PictureSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    mainImage: {
      type: String,
      required: true,
    },

    subImages: [
      {
        type: String,
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Picture", PictureSchema);
