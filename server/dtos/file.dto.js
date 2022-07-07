module.exports = class FileDto {
  id;
  fileName;
  mimetype;


  constructor(model) {
    this.id = model._id;
    this.fileName = model.fileName;
    this.mimetype = model.mimetype;
  }
}