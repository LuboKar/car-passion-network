package com.carpassionnetwork.exception;

public class FileNotUploadedException extends RuntimeException {
  public FileNotUploadedException() {
    super("Failed to upload file!");
  }
}
