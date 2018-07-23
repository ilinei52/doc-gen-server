define({ "api": [
  {
    "type": "post",
    "url": "/doc/convert",
    "title": "Convert document",
    "name": "Convert",
    "group": "Doc",
    "version": "0.0.1",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "file_guid",
            "description": "<p>Template guid</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>Data</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "../../doc/convert"
      }
    ],
    "filename": "routes/api.js",
    "groupTitle": "Doc"
  },
  {
    "type": "get",
    "url": "/template/fill",
    "title": "Fill template {get}",
    "name": "Fill_template__get_",
    "group": "Template",
    "version": "0.0.1",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "uuid",
            "description": "<p>Template uuid</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>Data</p>"
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "Error 400:",
          "content": "HTTP/1.1 400 Not found\n{\n  \"error\": {\n    \"message\": \"Bad request! mime-type:   is not supported!\",\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 404:",
          "content": "HTTP/1.1 404 Not found\n{\n  \"error\": {\n    \"message\": \"File not found!\",\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 500:",
          "content": "HTTP/1.1 500 Internal server error\n{\n  \"error\": {\n    \"message\": \"Internal server error!\",\n  }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "../../template/fill"
      }
    ],
    "filename": "routes/api.js",
    "groupTitle": "Template"
  },
  {
    "type": "post",
    "url": "/template/fill",
    "title": "Fill template {post}",
    "name": "Fill_template__post_",
    "group": "Template",
    "version": "0.0.1",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "uuid",
            "description": "<p>Template uuid</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>Data</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "../../template/fill"
      }
    ],
    "filename": "routes/api.js",
    "groupTitle": "Template"
  },
  {
    "type": "post",
    "url": "/template/upload",
    "title": "Upload template",
    "name": "Upload",
    "group": "Template",
    "version": "0.0.1",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "permanent",
            "description": "<p>File storage type [false - temporary | true - permanent]</p>"
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "Error 400:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": {\n    \"message\": \"No files were uploaded!\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error 500:",
          "content": "HTTP/1.1 500 Internal server error\n{\n  \"error\": {\n    \"message\": \"Internal server error!\",\n    \"error\":{}\n  }\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "Form: http://localhost:3000/api-helper/template/upload\nor\nCurl: curl -F \"permanent=false\" -F \"fileX=@\\Path\\to\\file\\file.txt\" http://localhost:3000/template/upload",
        "type": "curl"
      }
    ],
    "filename": "routes/api.js",
    "groupTitle": "Template"
  }
] });
