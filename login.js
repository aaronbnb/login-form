var focusedElementBeforeModal;
var username;
var password;

var modal = document.getElementById('modal-overlay');
var btn = document.getElementById("submit-credentials");
var span = document.getElementById("close");

// When the user clicks on the button, open the modal
btn.onclick = () => {
    username = document.getElementById('username').value;
    password = document.getElementById('password').value;
    resetFields();

    var focusableElementsString = 'p, a[href], input:not([disabled])';
    var focusableElements = modal.querySelectorAll(focusableElementsString);
    focusableElements = Array.prototype.slice.call(focusableElements);

    var firstTab = focusableElements[0];
    var lastTab = focusableElements[focusableElements.length - 1];

    modal.addEventListener('keydown', trapTabKey);
    focusedElementBeforeModal = document.activeElement;
    modal.style.display = "block";
    processLoginResponse(username, password);

    firstTab.focus();

    //close modal if click on overlay
    window.onclick = function(e) {
        e.preventDefault();
        if (e.target === modal) {
          modal.style.display = "none";
          focusedElementBeforeModal.focus();
        }
    };

    function trapTabKey(e) {
    if (e.keyCode === 9) {

      if (e.shiftKey) {
        if (document.activeElement === firstTab) {

          e.preventDefault();
          lastTab.focus();
        } else {
          firstTab.focus();
        }

      } else {
        if (document.activeElement === lastTab) {
          e.preventDefault();
          firstTab.focus();
        }
      }
    }

    if (e.keyCode === 27) {
      modal.style.display = "none";
      focusedElementBeforeModal.focus();
    }
  }

};

//close modal
span.onclick = function(e) {
  e.preventDefault();
  modal.style.display = "none";
  focusedElementBeforeModal.focus();
};

function processLoginResponse(name, pw) {
  var response;
  if (name.length === 0 || pw.length === 0) {
    response = "Login failed, you can't leave username or password blank.";

  } else if (name.length < 6 && pw.length < 6) {
    response = `You're logged in, ${name}. Although, most sites usually` +
      " require at least a 7 character username/password. Plus, " +
      "there's no backend...";
  } else {
    response = `You're logged in, ${name}. There's no` +
    " backend though so your credentials won't persist.";
  }

  document.getElementById('processed-response').innerHTML = response;
}

function resetFields() {
  document.getElementById('username').value = '';
  document.getElementById('password').value = '';
}
