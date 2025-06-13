import React, { forwardRef, useImperativeHandle, useState } from "react";
import axios from "axios";
import { Button, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { callExpressServerEndpointSync } from "../utils";

const FileUploadButton = forwardRef(({ setProgress }, ref) => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  /**
   * Handle file change event
   * @param {*} event
   */
  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };

  /**
   * Handle file upload
   * @returns {Promise<string>}
   */
  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      return {
        fileNames: [],
        success: true,
      };
    }

    try {
      const fileNames = Array.from(selectedFiles).map((file) => file.name);

      const response = await callExpressServerEndpointSync(
        "POST",
        "azureBlobService/generateSASUrl",
        {
          fileNames,
        },
      );

      const { blobs: sasUrls, envType: environment } = response.data;

      const totalSize = Array.from(selectedFiles).reduce(
        (acc, file) => acc + file.size,
        0
      );
      let current = 0;
      const uploadedBytesPerFile = {};

      const uploadPromises = Array.from(selectedFiles).map(
        async (file, index) => {
          const { blobUrl, blobName } = sasUrls[file.name];

          uploadedBytesPerFile[index] = 0;

          await axios.put(blobUrl, file, {
            headers: {
              "Content-Type": file.type,
              "x-ms-blob-type": "BlockBlob",
            },
            onUploadProgress: (progressEvent) => {
              const loaded = progressEvent.loaded;

              // Calculate delta since last event
              const prevLoaded = uploadedBytesPerFile[index] || 0;
              const delta = loaded - prevLoaded;
              uploadedBytesPerFile[index] = loaded;

              current += delta;
              const progress = Math.round((current / totalSize) * 100);
              setProgress(progress);
            },
          });

          return blobName;
        }
      );

      const blobNames = await Promise.all(uploadPromises);

      return {
        fileNames: blobNames,
        environment,
        success: true,
      };
    } catch (error) {
      console.error("Error uploading files:", error);
      return {
        success: false,
      };
    }
  };

  useImperativeHandle(ref, () => ({
    handleUpload,
    // progress,
  }));

  return (
    <>
      <Button
        component="label"
        color="secondary"
        role={undefined}
        sx={{ marginBottom: 1 }}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        Add Attachments
        <input
          type="file"
          onChange={handleFileChange}
          multiple
          style={{ display: "none" }}
        />
      </Button>
      <Typography sx={{ marginBottom: 1 }}>
        {selectedFiles.length > 0
          ? `Selected files: ${selectedFiles.length}`
          : "No files selected"}
      </Typography>
    </>
  );
});

export default FileUploadButton;
