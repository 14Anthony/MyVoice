function authenticate() {
    return gapi.auth2.getAuthInstance()
        .signIn({ scope: "https://www.googleapis.com/auth/youtube.force-ssl" })
        .then(function () { console.log("Sign-in successful"); },
            function (err) { console.error("Error signing in", err); });
}
function loadClient() {
    gapi.client.setApiKey("AIzaSyDwJom_9JfWZAdPNUFhPADPggjC-wm8nZM");
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function () { console.log("GAPI client loaded for API"); },
            function (err) { console.error("Error loading GAPI client for API", err); });

}

$(document).ready(function () {

    $('#searchArea').on('submit', function (event) {
        console.log("click");
        event.preventDefault();

        let song = $('#search').val();
        let artist = $('#artist').val();

        console.log(song, "I hear your song");
        console.log(artist, 'I hear the artist');

        execute(song, artist);
        lyrics(song, artist);
        // artWork(artist);

        $("#songTitle").val("");
        $('#artistName').val("");

        const songS = $('<h3>').appendTo('#songTitle');
        songS.text('Song Title: ' + song);

        const artistS = $('<h3>').appendTo('#artistName');
        artistS.text('Artist Name: ' + artist);




        $('#search').val('');
        $('#artist').val('');

    });
})


function execute(song, artist) {
    return gapi.client.youtube.search.list({
        "part": [
            "snippet"
        ],
        "q": [song, artist],
        "type": "video",
        "videoEmbeddable": "true",
        "maxResults": 1
    })
        .then(function (response) {
            // Handle the results here (response.result has the parsed body).
            console.log("Response", response);

            const iframe = $('#existing-iframe-example')
            iframe.attr('src', "https://www.youtube.com/embed/" + response.result.items[0].id.videoId + "?enablejsapi=1");
        },
            function (err) { console.error("Execute error", err); });

}
gapi.load("client:auth2", function () {
    gapi.auth2.init({ client_id: "376453662398-6s0fgfi87hhpu9k1jol4mqm7s2c9b8a1.apps.googleusercontent.com" });
});

// Make sure the client is loaded and sign-in is complete before calling this method.
// <script src = " https;// ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js">
const lyrics = function (song, artist) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://sridurgayadav-chart-lyrics-v1.p.rapidapi.com/apiv1.asmx/SearchLyricDirect?artist=" + artist + "&song=" + song,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "sridurgayadav-chart-lyrics-v1.p.rapidapi.com",
            "x-rapidapi-key": "1a30d91b2bmsh674aa11a828914dp11904ajsn789605f36de1"
        }
    }
    $.ajax(settings).done(function (response) {
        console.log(response);
    })
}