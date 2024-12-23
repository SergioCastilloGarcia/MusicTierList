const clientId = '04037d09848a48238f49afbb260b9d5e'; // Reemplaza con tu Client ID
const clientSecret = 'f30776a4d04a4c8dbd9dd637a2856d43'; // Reemplaza con tu Client Secret
const redirectUri = "https://sergiocastillogarcia.github.io/MusicTierList/"


// URL de autorización
const authEndpoint = 'https://accounts.spotify.com/authorize';
const scopes = [
    'streaming',
    'user-read-email',
    'user-read-private',
    'user-modify-playback-state',
];

// Función para obtener un token de acceso
async function getAccessToken() {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    });
    const data = await response.json();
    return data.access_token;
}
function login() {
    const url = `${authEndpoint}?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`;
    window.location = url;
}