$(document).ready(function() {
    $('button[data-url]').on('click', function(event) {
      event.preventDefault();
  
      var url = $(this).data('url');
  
      $.ajax({
        url: url,
        method: 'GET',
        success: function(data) {
          $('main').html(data);
        },
        error: function() {
          alert('Error al cargar la página.');
        }
      });
    });
  });