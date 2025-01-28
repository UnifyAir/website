document.getElementById('email-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Stops the default page navigation

    // Grab the form data from the inputs
    const firstName = document.getElementById('firstName').value;
    const lastName  = document.getElementById('lastName').value;
    const email     = document.getElementById('email').value;
    const message   = document.getElementById('message').value;
    
    // Construct the query parameters
    const params = new URLSearchParams({
      firstName: firstName,
      lastName: lastName,
      email: email,
      message: message
    }).toString();
    
    // The base URL for the Google Script
    const baseURL = "https://script.google.com/macros/s/AKfycbzvUU8XDDZ5cQve6GBDPiV0o1OVv_-QrFjHknlU2tNWGI8KgyWlCsc_d4E0-GKC2Ep1/exec";

    // Append the query parameters
    const urlWithParams = `${baseURL}?${params}`;

    // Send the GET request
    fetch(urlWithParams, {
      method: 'GET'
    })
    .then(response => response.text())   // or response.json() if JSON is expected
    .then(data => {
      console.log('Success:', data);
      // You could update the UI or alert the user here
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });
