document.getElementById('email-form-custom).addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Grab form data
    const firstName = document.getElementById('firstName').value;
    const lastName  = document.getElementById('lastName').value;
    const email     = document.getElementById('email').value;
    const message   = document.getElementById('message').value;
    
    // Construct query parameters
    const params = new URLSearchParams({ firstName, lastName, email, message }).toString();
    
    // Base URL for your Google Apps Script
    const baseURL = "https://script.google.com/macros/s/AKfycbzvUU8XDDZ5cQve6GBDPiV0o1OVv_-QrFjHknlU2tNWGI8KgyWlCsc_d4E0-GKC2Ep1/exec";
    const urlWithParams = `${baseURL}?${params}`;
    
    // Fetch elements for success/error messages
    const successDiv = document.querySelector('.success-message');
    const errorDiv   = document.querySelector('.error-message');
    const form       = document.getElementById('email-form');
    
    // Optionally hide both messages before trying
    successDiv.style.display = 'none';
    errorDiv.style.display   = 'none';
    
    // Send GET request
    fetch(urlWithParams, { method: 'GET' })
      .then(response => {
        // Check for HTTP errors (4xx, 5xx)
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.text(); // or response.json() if you expect JSON
      })
      .then(data => {
        // On success, show the success message and hide the form
        successDiv.style.display = 'block';
        form.style.display       = 'none'; // <--- This line hides the form
        console.log("Submission succeeded:", data);
      })
      .catch(error => {
        // On error, show the error message and keep the form visible
        errorDiv.style.display = 'block';
        console.error("Submission failed:", error);
      });
  });