function validateForm() {
    var name = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim();
    var phone = document.getElementById('phone').value.trim();
    var message = document.getElementById('message').value.trim();
    var errorMessages = [];

    // Validate Name
    if (!name.match(/^[a-zA-Z\s]*$/)) {
        errorMessages.push("Name must contain only alphabets and spaces.");
    } else if (name.length < 3 || name.length > 30) {
        errorMessages.push("Name must be between 3 and 30 characters long.");
    }

    // Validate Email
    if (!email.match(/^[\w-]+(\.[\w-]+)*@([a-zA-Z0-9-]+\.)+([a-zA-Z]{2,})+$/)) {
        errorMessages.push("Invalid email format.");
    } else if (email.includes("test.com")) {
        errorMessages.push("Email domain cannot be 'test.com'.");
    }

    // Validate Phone Number
    if (!phone.match(/^\d{10}$/)) {
        errorMessages.push("Phone number must be a 10-digit number.");
    }

    // Validate Message
    if (message.length < 5 || message.length > 200) {
        errorMessages.push("Message must be between 5 and 200 characters long.");
    }

    // Display Error Messages if any
    if (errorMessages.length > 0) {
        var errorMessage = errorMessages.join("\n");
        alert(errorMessage);
        return false; // Prevent form submission
    }

    // Form is valid, allow submission
    submitToWeb3Forms(name, email, phone, message);
    return true;
}

function submitToWeb3Forms(name, email, phone, message) {
    
    var data = {
        name: name,
        email: email,
        phone: phone,
        message: message
    };

    
    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            apikey: 'ea5bd710-2b19-4e6f-928d-62eef9863c01', 
            ...data
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Form submitted successfully!");
            document.querySelector('.contact-form').reset(); 
        } else {
            alert("Error submitting form. Please try again later.");
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        alert("Error submitting form. Please try again later.");
    });
}