function authenticate() {
    return gapi.auth2.getAuthInstance()
        .signIn({ scope: "https://www.googleapis.com/auth/youtube.force-ssl" })
        .then(function () { console.log("Sign-in successful"); },
            function (err) { console.error("Error signing in", err); });
}
function loadClient() {
    gapi.client.setApiKey("AIzaSyC5Kui5dhXoKHNB5y6Sfe81_lRVO3yHEo4");
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function () { console.log("GAPI client loaded for API"); },
            function (err) { console.error("Error loading GAPI client for API", err); });

}



$(document).ready(function () {

    var user = localStorage.getItem('user')
    console.log(user);

    $('#myVoice').append(" Welcomes " + user + " to the stage")

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
    gapi.auth2.init({ client_id: "178351258387-pktbqm45kptom00o5a1t0fdrbgnpvk48.apps.googleusercontent.com" });
});

// Make sure the client is loaded and sign-in is complete before calling this method.
// <script src = " https;// ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js">
const lyrics = function (song, artist) {
    console.log('lyricsCalled');
    var settings = {
        //"async": true,
        //"crossDomain": true,
        "url": "https://api.lyrics.ovh/v1/" + artist + "/" + song,
        "method": "GET",
        //"headers": {
        //"x-rapidapi-host": "mourits-lyrics.p.rapidapi.com",
        //"x-rapidapi-key": "cbaeb3d20bmshd897cd760f791c0p1e1ff7jsn571a482fd99c"
        //}
    }
    $.ajax(settings).then(function (response) {
        console.log(response);

        const pastS = $('<p>')
        pastS.addClass('these')
        pastS.text(response.lyrics)
        $('#lyrics').append(pastS)
        // const date = $("<p>").appendTo('#lyrics');
        // date.text(response.lyrics);
    });
}

///https://wordpresscheat.com/fixing-cloudflare-error-522/#:~:text=A%20522%20error%20occurs%20because%20CloudFlare%20could%20not,established.%20This%20problem%20may%20happen%20for%20various%20reasons%3A


function currentWeather(city) {
    //city = $('#search').val().trim();
    const apiKey = "b687fc26097a14c0143460afc3ff610a";
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + "tucson" + "&appid=" + apiKey + "&units=imperial",
        method: 'GET',
    }).then(function (response) {
        // RD =  I now, take the RESPONSE, and place it in a variable called results...
        const results = response;
        //RD =  I ned to find out whether or not I was able to capture the values above, and I do that by logging the information in the console.  It should show up as an object in the consule. 
        //console.log(results);
        // ---- Fixed---- there was a period before api on the URL  Unstuck by JJ & MIKE----FIXED-----this generated a 401, a 404 and now a "net::ERR_NAME_NOT_RESOLVED" so apperantly it take a couple of hours for the API key to be used.

        //--------------------------------------------------------------------------------


        // RD = Project require that I make things appear, that I am going to have to post this somehow to the html.about-me-header
        // pre RD =  prior to that, I am going to have to clear it off the board to replace.  Google fu the how to make the style and display have an empty container after the second onclick target the second click functionality??? if there is such a thing........I think ......
        //WHEN I view current weather conditions for that city THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index


        //---------------------------------------------------------------------------------   

        //  Here is where I empty the bucket thru jQuery, capturing Id cW and emptying.
        $('#currentWeather').empty()

        // here I create the buckets for the information:

        //RD =  I create a variable that uses jQuery to create bucket for text and images to be placed in once I capture them from the object response from the api  
        const cityName = $('<h3>').appendTo('#currentWeather');
        //RD =  I create a variable that uses jQuery to create bucket for text and images to be placed in once I capture them from the object response from the api  
        const date = $("<p>").appendTo('#currentWeather');
        //RD =  I create a variable that uses jQuery to create bucket for text and images to be placed in once I capture them from the object response from the api  
        const icon = $('<img>').appendTo('#currentWeather');
        //RD =  I create a variable that uses jQuery to create bucket for text and images to be placed in once I capture them from the object response from the api  
        const temp = $('<p>').appendTo('#currentWeather');
        //RD =  I create a variable that uses jQuery to create bucket for text and images to be placed in once I capture them from the object response from the api  
        const humidity = $('<p>').appendTo('#currentWeather');
        //RD =  I create a variable that uses jQuery to create bucket for text and images to be placed in once I capture them from the object response from the api  
        const windSpeed = $('<p>').appendTo('#currentWeather');
        //RD =  I create a variable that uses jQuery to create bucket for text and images to be placed in once I capture them from the object response from the api  
        // Here I need to capture the infromation from the response object, and place the lotion in the basket...lol it does it whenever its told...lol  for whomever is grading here is your mid-day levity....You're welcome.  object to text.....?


        //const pastSch = $("<button>").appendTo('#searchHistory');
        const pastS = $('<button>')
        pastS.addClass('thePast')
        pastS.text(response.name)
        $('#searchHistory').append(pastS)
        //-------------------------------------------------------------------------------------------------------

        // RD  =I must search the response, to find where the attributes exhist in the object in the console, from there I need to capture the new variable, from above and add text to the buckets, in the form of key and value pairs given by the object.  

        //.text()  VThe.text () method cannot be used on form inputs or scripts. To set or get the text value of input or textarea elements, use the.val () method. To get the value of a script element, use the.html () method. As of jQuery 1.4, the.text () method returns the value of text

        //The .attr() method gets the attribute value for only the first element in the matched set. To get the value for each element individually, use a looping construct such as jQuery's .each() or .map() method.Using jQuery's .attr() method to get the value of an element's attribute has two main benefits:

        // Convenience: It can be called directly on a jQuery object and chained to other jQuery methods.
        // Cross-browser consistency: The values of some attributes are reported inconsistently across browsers, and even across versions of a single browser. The .attr() method reduces such inconsistencies.

        //------------------------------------------------------------------------------------------------------------------

        // RD =  I take the variable I add .text function, to change to text, the icon is a specific URL.
        $(cityName).text(results.name);
        // RD =  I take the variable I add .text function, to change to text, the icon is a specific URL.
        $(date).text("Today's Weather:");
        // RD =  I take the variable I add .text function, to change to text, the icon is a specific URL.URL is http://openweathermap.org/img/wn/10d@2x.png
        $(icon).attr('src', "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png");
        // RD =  I take the variable I add .text function, to change to text, the icon is a specific URL.°	\xB0	&#176;	&deg;	%B0	%C2%B0	degree sign
        $(temp).text("Temp:  " + results.main.temp + "°F");
        // RD =  I take the variable I add .text function, to change to text, the icon is a specific URL.
        $(humidity).text("Humidity:  " + results.main.humidity);
        // RD =  I take the variable I add .text function, to change to text, the icon is a specific URL.
        $(windSpeed).text("WindSpeed:  " + results.wind.speed);
        // RD =  I take the variable I add .text function, to change to text, the icon is a specific URL.
        //console.log(response.coord.lat);
        //console.log(response.coord.lon);
        uvForcast(response.coord.lat, response.coord.lon)
        // here i create a button, that will collect the response.name add it on a button and place it in the Search history
        // $(pastSch).text(response.name);
    })
    //return            // (results)
}
currentWeather();
