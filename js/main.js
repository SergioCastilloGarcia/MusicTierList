$(document).ready(function () {
    // Hacer que las canciones sean arrastrables
    $('.song-card').on('dragstart', function (e) {
        e.originalEvent.dataTransfer.setData('text/plain', $(this).data('song-id'));
    });

    // Hacer que los contenedores acepten drops
    $('.tier-container').on('dragover', function (e) {
        e.preventDefault();
    });

    $('.tier-container').on('drop', function (e) {
        e.preventDefault();
        const songId = e.originalEvent.dataTransfer.getData('text/plain');
        const songCard = $(`.song-card[data-song-id="${songId}"]`);
        $(this).append(songCard);
    });
});