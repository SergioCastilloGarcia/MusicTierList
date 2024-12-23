
let player;
let accessToken;
let currentTrackUri;

// Al cargar la página
$(document).ready(function () {
    accessToken = getAccessTokenFromUrl();
    if (accessToken) {
        $('#spotify-login').hide();
        $('#player-controls').show();
        console.log('Usuario autenticado.');
    }

    // Hacer clic en una canción para seleccionarla
    $(document).on('click', '.song-card', function () {
        currentTrackUri = `spotify:track:${$(this).data('song-id')}`;
    });
});
// Obtener el token de acceso de la URL
function getAccessTokenFromUrl() {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    return params.get('access_token');
}

// Inicializar el SDK de Spotify
window.onSpotifyWebPlaybackSDKReady = () => {
    player = new Spotify.Player({
        name: 'Web Playback SDK',
        getOAuthToken: cb => { cb(accessToken); },
        volume: 0.5
    });

    // Nivel de robustez
    player._options.useMediaKeys = true;
    player._options.robustness = 'SW_SECURE_CRYPTO';

    player.addListener('ready', ({ device_id }) => {
        console.log('El dispositivo está listo:', device_id);
        transferPlaybackHere(device_id);
    });

    player.addListener('not_ready', ({ device_id }) => {
        console.log('El dispositivo no está listo:', device_id);
    });

    player.connect();
};

// Transferir la reproducción al reproductor web
function transferPlaybackHere(deviceId) {
    fetch('https://api.spotify.com/v1/me/player', {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            device_ids: [deviceId],
            play: false,
        }),
    });
}
function playSong() {
    if (currentTrackUri) {
        fetch(`https://api.spotify.com/v1/me/player/play`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ uris: [currentTrackUri] }),
        });
    } else {
    }
}
function pauseSong() {
    fetch(`https://api.spotify.com/v1/me/player/pause`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
    });
}
