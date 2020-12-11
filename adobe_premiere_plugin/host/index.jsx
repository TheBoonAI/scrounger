function importFile(filePath) {
  app.project.importFiles(
    [filePath],
    true, // suppress warnings
    app.project.getInsertionBin(),
    false // import as numbered stills
  );
}
