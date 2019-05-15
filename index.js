'use strict';

const searchURL = 'https://developer.nps.gov/api/v1/parks';
const apiKey = 'eTAcmGMleeum0CgDKn3c3imXUYokfztQsSAGb2kW';

const options = {
    headers: new Headers({
      "X-Api-Key": apiKey})
};

function displayResults(responseJson) {
    $('.resultsList').empty();
    for (let i = 0; i < responseJson.data.length; i++) {
        $('.resultsList').append(
            `<li><h3>${responseJson.data[i].fullName}</a></h3></li>
            <p>${responseJson.data[i].description}</a></p>
            <p>${responseJson.data[i].url}</a></p></li>`
        )
    };
    console.log(responseJson);
    //$('.searchResults').show();
}

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function getNationalParks() {
    const stateName = $('.stateName').val();
    const maxResults= $('.maxResults').val();
    const params = {
        api_key: apiKey,
        stateCode: stateName,
        limit: maxResults
    };
    const queryString = formatQueryParams(params);
    const url = searchURL + '?' + queryString;

    console.log('showing state: ' + stateName);
    fetch (url)
        .then(response => {
            if (response.ok) {
            return response.json();
            }
            throw new Error(response.statusText);
            })
        .then(responseJson => displayResults(responseJson))
        .catch(error => alert('Oops, something went wrong! Please try again.'));
}

function watchForm() {
    $('.js-form').submit(event => {
        event.preventDefault();
        getNationalParks();
        //$('.searchResults').hide();
        console.log('form is working!')
    });
}

$(watchForm);