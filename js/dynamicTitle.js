function typeWriter(element, text, i, fnCallback) {
  if (i < text.length) {
    document.getElementById(element).textContent = text.substring(0, i + 1);

    setTimeout(function () {
      typeWriter(element, text, i + 1, fnCallback);
    }, 100);
  } else if (typeof fnCallback == "function") {
    setTimeout(fnCallback, 700);
  }
}

function deleteWriter(element, text, i, fnCallback) {
  if (i >= 0) {
    document.getElementById(element).textContent = text.substring(0, i);

    setTimeout(function () {
      deleteWriter(element, text, i - 1, fnCallback);
    }, 50);
  } else if (typeof fnCallback == "function") {
    setTimeout(fnCallback, 700);
  }
}

function StartTextAnimation() {
  var text = "Hi, friend!";
  typeWriter("dynamic-title", text, 0, function () {
    deleteWriter("dynamic-title", text, text.length, StartTextAnimation);
  });
}

document.addEventListener("DOMContentLoaded", function (event) {
  StartTextAnimation();
});
