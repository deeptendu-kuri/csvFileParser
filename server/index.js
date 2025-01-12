const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const csv = require("csv-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/api", (req, res) => {
  res.send("API is running");
});

// File upload configurations
const fileFilter = (req, file, cb) => {
  if (path.extname(file.originalname) === ".csv") {
    cb(null, true);
  } else {
    cb(new Error("Only .csv files are allowed"), false);
  }
};

const uploadDir = path.join(__dirname, "data");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    const timestamp = `valid_${year}-${month}-${day}_${hours}_${minutes}_${seconds}`;

    cb(null, `${timestamp}.csv`);
  },
});

const upload = multer({ storage, fileFilter });

// Upload file API
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded or invalid file type" });
  }

  // Log the uploaded filename in 'log.txt'
  const logFilePath = path.join(__dirname, "log.txt");
  const filename = req.file.filename;

  fs.appendFile(logFilePath, filename + "\n", (err) => {
    if (err) {
      console.error("Error writing to log file:", err);
      return res.status(500).json({ message: "Error logging the filename" });
    }

    // After successfully uploading, update the JSON file with file data
    updateFileData();
  });

  res.status(200).json({
    message: "File uploaded successfully",
    file: filename,
  });
});

// Update JSON file with lastUpdated, databaseCount, and totalFiles
const updateFileData = () => {
  const logFilePath = path.join(__dirname, "log.txt");

  // Read filenames from log.txt
  fs.readFile(logFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading log file:", err);
      return;
    }

    // Split the log file content by new lines to get all filenames
    const filenames = data.trim().split("\n");

    // Count the number of files (databaseCount and totalFiles)
    const totalCount = filenames.length;

    // Get current date and time for lastUpdated field
    const lastUpdated = new Date().toLocaleTimeString();

    // Create the JSON object with the required data
    const fileData = {
      lastUpdated,
      databaseCount: totalCount,
      totalFiles: totalCount,
    };

    // Write the data to config.json
    const jsonFilePath = path.join(__dirname, "config.json");
    fs.writeFile(jsonFilePath, JSON.stringify(fileData, null, 2), (err) => {
      if (err) {
        console.error("Error writing to JSON file:", err);
      } else {
        console.log("config.json updated successfully");
      }
    });
  });
};

// Get the file data (lastUpdated, databaseCount, totalFiles)
app.get("/fileData", (req, res) => {
  const jsonFilePath = path.join(__dirname, "config.json");

  // Read the JSON file
  fs.readFile(jsonFilePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading file data" });
    }
    res.status(200).json(JSON.parse(data));
  });
});

app.get("/files", async (req, res) => {
    const logFilePath = path.join(__dirname, "log.txt");
    const configFilePath = path.join(__dirname, "config.json");
  
    try {
      const data = fs.readFileSync(logFilePath, "utf8").trim();
      const filenames = data ? data.split("\n").slice(-30) : [];
  
      if (filenames.length === 0) {
        return res.status(200).json({ message: "No files uploaded yet", files: [] });
      }
  
      const filePromises = filenames.map((filename) => {
        return new Promise((resolve, reject) => {
          const filePath = path.join(uploadDir, filename);
  
          if (!fs.existsSync(filePath)) {
            return resolve({ filename, rowCount: 0, downloadUrl: null });
          }
  
          let rowCount = 0;
          fs.createReadStream(filePath)
            .pipe(csv())
            .on("data", () => rowCount++)
            .on("end", () => {
              resolve({
                filename,
                rowCount,
                downloadUrl: `${req.protocol}://${req.get("host")}/download/${filename}`,
              });
            })
            .on("error", (err) => reject(err));
        });
      });
  
      const filesData = await Promise.all(filePromises);
  
      const configData = fs.existsSync(configFilePath)
        ? JSON.parse(fs.readFileSync(configFilePath, "utf8"))
        : { lastUpdated: null, databaseCount: 0, totalFiles: 0 };
  
      res.status(200).json({
        ...configData,
        currentDateTime: new Date().toLocaleString(),
        files: filesData,
      });
    } catch (err) {
      console.error("Error processing files:", err);
      res.status(500).json({ message: "Error processing files", error: err.message });
    }
  });
  

app.get("/download/:filename", (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(uploadDir, filename);

  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: "File not found" });
  }

  // Send the file as a response
  res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(500).send("Error downloading the file");
    }
  });
});

