document.getElementById('donation-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const amount = document.getElementById('amount').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const responseMessage = document.getElementById('response-message');

    if (amount && name && email) {
        responseMessage.textContent = `Thank you, ${name}, for your donation of $${amount}! We've sent a confirmation to ${email}.`;
        responseMessage.style.color = 'green';


        document.getElementById('donation-form').reset();

        setTimeout(() => {
            window.location.href = './job.html';  
        }, 2000);  
    } else {
        responseMessage.textContent = 'Please fill in all fields.';
        responseMessage.style.color = 'red';
    }
});





const headerContent = `
<div class="line">
  <header>
          <img class="logo" src="./assests/images/1.png">
          <nav class="navbar">
              <ul>
                  <li><a class="Home" href="/home.html">HOME</a></li>
                  <li><a class="about" href="/about.html">About</a></li>
                  <li><a class="vis" href="/visit.html">Visit</a></li>
                  <li><a class="job" href="/job.html">Job Application</a></li>
                  <li><a class="con" href="/cont.html">Contact</a></li>
              </ul>
          </nav>
          <nav class="login">
              <li><a class="login-btn" href="/login.html">LOGIN</a></li>
          </nav>      
      </header>  
      </div>
`;

const footerContent =`<footer>
      <div class="footer-content">
          <div class="quick-links">
              <h4>Quick Links</h4>
              <ul>
                <li><a class="Home" href="/home.html">HOME</a></li>
                <li><a class="about" href="../about/about.html">About</a></li>
                <li><a class="vis" href="../visit/visit.html">Visit</a></li>
                <li><a class="job" href="../job/job.html">Application</a></li>
                <li><a class="con" href="./index.html">Contact</a></li>
              </ul>
          </div>
          <div class="footer-logo">
              <img src="./assests/images/1.png" alt="Vamb Farm Sanctuary Footer Logo">
          </div>
          <div class="social-icons">
              <h4>Follow Us</h4>
              <a href="#"><i class="fab fa-facebook-f"></i></a>
              <a href="#"><i class="fab fa-twitter"></i></a>
              <a href="#"><i class="fab fa-instagram"></i></a>
              <a href="#"><i class="fab fa-linkedin-in"></i></a>
          </div>
      </div>
      <div class="footer-bottom">
          <p>&copy; 2024 Vamb Farm Sanctuary. All rights reserved.</p>
      </div>
  </footer>`

document.getElementById('header').innerHTML = headerContent;
document.getElementById('footer').innerHTML = footerContent;