package com.carpassionnetwork.exception;

public class FolderNotCreatedException extends RuntimeException {
  public FolderNotCreatedException() {
    super("There was a problem creating the folder!");
  }
}
