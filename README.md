# Server document generation

Designed to work with different types of documents.
   - filling out documents by templates
   - converting of different types of documents

## Documentation
Location: localhost:3000/docs/api

Rebuild documentation:
```sh
 $ gulp refDoc
```

## File storage
If the template is temporary then the files are saved in the temporary folder of the system. The storage time is set by the system. If the template or document is permanent, then the local file storage is used (folder: ./.localFS) . 

## Tests
```sh
$ npm run tests
```

## Development plan :
- [ ] Cleaning temporary template
- [ ] Conversion .docx to .pdf
- [ ] Filling xlsx templates
- [ ] Create tests