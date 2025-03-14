const SERVER_ADDRESS = 'https://striveschool-api.herokuapp.com/api/deezer/search?q=';

const eminemSection = document.querySelector('#eminemSection');

const getArtistTracks = async (artist) => {
    const endpoint = SERVER_ADDRESS + artist;
    const response = await fetch(endpoint)
    const tracks = await response.json()
    return {tracks: tracks.data, artist: artist}
};

const showArtistSection = (data) => {
    const mainSection = document.querySelector(`#${data}`);
    mainSection.classList.remove('d-none');
    mainSection.classList.add('d-block');
}

const populateArtistSection = (data, section) => {
    const trackSection = document.querySelector(`#${section}Section`);

    data.forEach(song => {
        const track = document.createElement('div');
        track.classList.add('d-flex', 'flex-column', 'gap-3', 'mb-3', 'p-3');

        const trackImg = document.createElement('img');
        trackImg.classList.add('mb-2');
        trackImg.src = song.album.cover;

        const trackTitle = document.createElement('p');
        trackTitle.classList.add('titleMain', 'mb-1');
        trackTitle.innerText = song.title;

        const trackArtist = document.createElement('p');
        trackArtist.classList.add('artist-name', 'mb-0');
        trackArtist.innerText = song.artist.name;

        track.append(trackImg, trackTitle, trackArtist);
        trackSection.appendChild(track);
    });
};

getArtistTracks('eminem')
    .then(results => {
        showArtistSection(results.artist)
        populateArtistSection(results.tracks, results.artist)
    })
    .catch(err => console.log('Ops, qualcosa è andato storto...'))

getArtistTracks('metallica')
.then(results => {
    showArtistSection(results.artist)
    populateArtistSection(results.tracks, results.artist)
})
.catch(err => console.log('Ops, qualcosa è andato storto...'))

getArtistTracks('queen')
.then(results => {
    showArtistSection(results.artist)
    populateArtistSection(results.tracks, results.artist)
})
.catch(err => console.log('Ops, qualcosa è andato storto...'))