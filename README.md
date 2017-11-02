# Login Form

[Login Form live][login] **Please take a moment to explore the form**

[login]: https://aaronbnb.github.io/login-form

This login form is built with the traditional front-end languages--HTML5, CSS3, and JavaScript.

## Accessibility Features

This login page has several important accessibility features to aid users relying on screen readers or possessing a motor disability and thus, no pointer interface. This page supports a logical tab order, which matches the DOM order. The site also ensures that images aren't necessary for navigation, which supports the visually impaired or those with slower Internet and unable to load images.

### Skip to Content Link
```html
  <a href="#login-form-description" class="skip-link">Skip to main content</a>

  <legend id="login-form-description" tabindex="-1">Login</legend>
```

For users that use tab to navigate through a webpage, it can be annoying to have to tab through an entire navigation menu. For this login page, it's not a big deal, but for a site like Github, with about 15 items in the menu, it can be quickly tiring. A skip link is a hidden link--in this case positioned offscreen, that listens for a tab keydown. If link in focus, then the skip link moves onscreen and provides a shortcut to main content. Now Chrome, Firefox, and later versions of IE allow you have some magic that allows you to simply put your desired HTML element as the href, but in older browsers, you will need some JavaScript.

Also, note the tabindex="-1". For HTML elements that are not naturally added to the tab order, you apply a negative tab order and then programmatically focus the element using JavaScript.

### Hidden Text to Explain Navigation

Throughout the HTML, it's best to provide guidance to screen reader users on navigation. For the average user, clicking the wrong link or opening a new tab is a short inconvenience but for a screen reader user, a simple wrong turn can takes minutes to return to previous focus.

```html
<li class="header-item"><a href="https://github.com/aaronbnb/login-form" target="blank"><i class="fa fa-code" aria-hidden="true"></i><span>Project Repo</span><span class="hidden">opens in new window</span></a></li>
<li class="header-item"><a href="https://github.com/aaronbnb" target="blank"><i class="fa fa-github" aria-hidden="true"></i><span>GitHub</span><span class="hidden">opens in new window</span></a></li>
```

For screen reader users, it can be disorienting to click an external link, opening a new page. I add some hidden text after displayed link title, instructing users that a new window will be opened.

### Modals and Trapping Tab Key

Focus determines where keyboard events go in the page. For those relying on the keyboard, focus is the primary means of navigating a webpage. Modals can be a tricky issue as they should not be included in tab order unless they're open. And if a modal is open, we want to restrict the user from maneuvering to elsewhere on the page until the modal is closed.

```javascript
var focusableElementsString = 'p, a[href], input:not([disabled])';
var focusableElements = modal.querySelectorAll(focusableElementsString);
focusableElements = Array.prototype.slice.call(focusableElements);

var firstTab = focusableElements[0];
var lastTab = focusableElements[focusableElements.length - 1];

modal.addEventListener('keydown', trapTabKey);
console.log("dsfssf");
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
  console.log(e);
  if (e.shiftKey) {
    if (document.activeElement === firstTab) {
      console.log("jello");
      e.preventDefault();
      lastTab.focus();
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

```

Here we select all of the focusable elements in the modal and allow the user to tab through them in a loop, trapping them in the modal and thus, preventing them from accessing content outside the modal. We also add a listener for the ESC key to allow user to simply exit the modal. This is an easy feature that should be implemented for all pop-ups.
