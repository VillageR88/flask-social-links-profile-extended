"use strict";
var _a;
const fetchUrl = "https://frontendmentorusers.villager88pl.workers.dev";
(_a = document === null || document === void 0 ? void 0 : document.getElementById("selectedOptionVillageR88")) === null || _a === void 0 ? void 0 : _a.setAttribute("selected", "selected");
document === null || document === void 0 ? void 0 : document.getElementById("userSelection");
function handleSubmit(e) {
    const userList = document.getElementById('userList');
    e.preventDefault();
    const targetWithChildNodes = e.target;
    const username = targetWithChildNodes.childNodes[1];
    handleFetch(username.value);
    if (userList) {
        userList.innerHTML = '';
    }
}
function onInput() {
    const userInput = document.getElementById('userInput');
    const userList = document.getElementById('userList');
    if (!userInput || !userList)
        return;
    const value = userInput.value.toLowerCase();
    userList.innerHTML = '';
    for (const user of data.filter(user => user.toLowerCase().startsWith(value))) {
        const option = document.createElement('option');
        option.value = user;
        userList.appendChild(option);
    }
}
;
function handleFetch(name) {
    fetch(`${fetchUrl}/?id=${name}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((data) => {
        var _a, _b, _c, _d;
        const user = data.data;
        const usernameElement = document.getElementById("username");
        if (usernameElement) {
            usernameElement.innerText = user.displayName;
        }
        (_a = document.getElementById("avatar")) === null || _a === void 0 ? void 0 : _a.setAttribute("src", user.avatar);
        (_b = document.getElementById("avatar")) === null || _b === void 0 ? void 0 : _b.setAttribute("alt", name);
        const bioElement = document.getElementById("bio");
        if (bioElement) {
            bioElement.innerText = user.bio;
        }
        if (((_c = document.getElementById("bio")) === null || _c === void 0 ? void 0 : _c.innerText) === "undefined") {
            const bioElement = document.getElementById("bio");
            if (bioElement) {
                bioElement.style.display = "none";
            }
        }
        else {
            const bioElement = document.getElementById("bio");
            if (bioElement) {
                bioElement.style.display = "block";
            }
        }
        const locationElement = document.getElementById("location");
        if (locationElement) {
            locationElement.innerText = user.location;
        }
        if (((_d = document.getElementById("location")) === null || _d === void 0 ? void 0 : _d.innerText) === "undefined") {
            const locationElement = document.getElementById("location");
            if (locationElement) {
                locationElement.style.display = "none";
            }
        }
        else {
            const locationElement = document.getElementById("location");
            if (locationElement) {
                locationElement.style.display = "block";
            }
        }
        const linksElement = document.getElementById("links");
        if (linksElement) {
            linksElement.innerHTML = Object.entries(user.links)
                .map((link) => `<li><a href="${link[1]}">${link[0]}</a></li>`)
                .join("");
        }
    });
}
;
