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
        "url": "https://mourits-lyrics.p.rapidapi.com/?artist=" + artist + "&song=" + song,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "mourits-lyrics.p.rapidapi.com",
            "x-rapidapi-key": "cbaeb3d20bmshd897cd760f791c0p1e1ff7jsn571a482fd99c"
        }
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
}

///https://wordpresscheat.com/fixing-cloudflare-error-522/#:~:text=A%20522%20error%20occurs%20because%20CloudFlare%20could%20not,established.%20This%20problem%20may%20happen%20for%20various%20reasons%3A