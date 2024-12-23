// Función para buscar canciones por artista
async function getSongsByArtist(artistName) {
    const token = await getAccessToken();
    const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(artistName)}&type=artist`, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });
    const data = await response.json();
    const artist = data.artists.items[0]; // Tomamos el primer resultado
    if (!artist) {
        alert('Artista no encontrado');
        return;
    }

    const artistId = artist.id;
    const tracksResponse = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });
    const tracksData = await tracksResponse.json();

    // Mostrar canciones en el pool
    const pool = $('#song-pool .d-flex');
    pool.empty();
    tracksData.tracks.forEach(track => {
        const songCard = $(`
            <div class="song-card" data-song-id="${track.id}" draggable="true">
                <img src="${track.album.images[0]?.url || 'https://via.placeholder.com/100'}" alt="${track.name}">
                <p>${track.name}</p>
            </div>
        `);
        pool.append(songCard);
    });

    // Volver a habilitar el arrastre
    $('.song-card').on('dragstart', function (e) {
        e.originalEvent.dataTransfer.setData('text/plain', $(this).data('song-id'));
    });
}


function searchArtist() {

    const artistName = $('#artist-name').val();
    if (artistName) {
        getSongsByArtist(artistName);
    }
}