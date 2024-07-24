
document
  ?.getElementById("selectedOptionVillageR88")
  ?.setAttribute("selected", "selected");

document
  ?.getElementById("userSelection")
  ?.addEventListener("change", function () {
    const selectedUser = this.value;
    fetch(`/api/?id=${selectedUser}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const user = data.data;
        document.getElementById("username").innerText = user.displayName;
        document.getElementById("avatar").src = user.avatar;
        document.getElementById("avatar").alt = user.selectedUser;
        document.getElementById("bio").innerText = user.bio;
        if (document.getElementById("bio").innerText === "undefined") {
          document.getElementById("bio").style.display = "none";
        } else {
          document.getElementById("bio").style.display = "block";
        }
        document.getElementById("location").innerText = user.location;
        if (document.getElementById("location").innerText === "undefined") {
          document.getElementById("location").style.display = "none";
        } else {
          document.getElementById("location").style.display = "block";
        }
        document.getElementById("links").innerHTML = Object.entries(user.links)
          .map((link) => `<li><a href="${link[1]}">${link[0]}</a></li>`)
          .join("");
      });
  });
