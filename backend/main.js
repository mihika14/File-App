const mongoose = require("mongoose");
const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const cors = require("cors");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(
    "mongodb+srv://mihikasaxena13:7LNNuFRhXGYOuk90@cluster0.x7jyjpa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });

require("./models/file");
const FileData = mongoose.model("files");

app.use(express.json());
app.get("/files", async (req, res) => {
  try {
    const files = await FileData.find();
    res.json(files);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching files.");
  }
});
// Define route to handle file uploads
app.post("/upload", upload.array("files"), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).send("No files uploaded.");
    }

    console.log("Files: ", req.files);

    const filesData = req.files.map(file => ({
      filename: file.originalname,
      path: file.path,
      size: file.size,
      dateAdded: Date.now(),
      contentType: file.mimetype,
    }));

    // Save each file data to the database
    await FileData.insertMany(filesData);

    res.send("Files successfully uploaded.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error uploading files.");
  }
});

app.get('/download/:filename', async (req, res) => {
    const { filename } = req.params;
  
    try {
      console.log('Attempting to find file:', filename);
      const file = await FileData.findOne({ filename });
  
      if (!file) {
        console.log('File not found:', filename);
        return res.status(404).json({ message: "File not found" });
      }
  
      console.log('File found:', filename);
      console.log('Content type:', file.mimeType); // Add this line for debugging
  
      const fileData = file.data;
  
    //   res.setHeader("Content-disposition", `attachment; filename=${filename}`);
    //   res.setHeader("Content-type", file.contentType);
  
      console.log('Sending file:', filename);
      res.send(fileData);
    } catch (error) {
      console.error("Error downloading file:", error);
      res.status(500).json({ message: "Internal server error" });
    }
});

app.listen(PORT, () => {
  console.log(`Server started on port : ${PORT}`);
});
