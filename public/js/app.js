console.log("hey eman im here !!!!!!!");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#msg-1");
const messageTwo = document.querySelector("#msg-2");

weatherForm.addEventListener("submit", e => {
  e.preventDefault();

  const location = search.value;

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  fetch("http://localhost:3000/weather?address=" + location).then(res => {
    res.json().then(data => {
      if (data.error) {
        messageOne.textContent = data.error;
        // console.log(data.error);
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
        console.log(data);
      }
    });
  });
});
