$(document).ready(function() {
    $('#tabletest').DataTable( {
      "processing": true,
      "serverSide": true,
      "ajax": {
        "url": "localhost:3000/rates/getAll",
        "dataSrc": "rates"
      },
      "columns": [
        { "data" : "value" },
        { "data" : "creation_date" },
        { "data" : "user_id" },
      ]
    });
  });