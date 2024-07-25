interface User {
  id: string;
  achievements: Achievement[];
  avatar: string;
  bio: string;
  displayName: string;
  hasActiveSubscription: boolean;
  learning: string;
  links: {
    linkedIn?: string;
    twitter?: string;
    gitHub: string;
  };
  location: string;
  mentorScore: {
    total: number;
    year: number;
    month: number;
    week: number;
  };
  mentor: boolean;
  name: string;
  username: string;
}

interface Achievement {
  badge: string;
  count: number;
}
const fetchUrl = "https://frontendmentorusers.villager88pl.workers.dev";

document
  ?.getElementById("selectedOptionVillageR88")
  ?.setAttribute("selected", "selected");

document
  ?.getElementById("userSelection")

function handleSubmit(e: SubmitEvent) {
  const userList = document.getElementById('userList');
  e.preventDefault();
  const targetWithChildNodes = e.target as HTMLElement;
  const username = targetWithChildNodes.childNodes[1] as HTMLInputElement;
  handleFetch(username.value);
  if (userList) {
    userList.innerHTML = '';
  }
}

function onInput() {
  const userInput = document.getElementById('userInput') as HTMLInputElement;
  const userList = document.getElementById('userList') as HTMLDataListElement;
  if (!userInput || !userList) return;
  const value = userInput.value.toLowerCase();
  userList.innerHTML = '';
  for (const user of data.filter(user => user.toLowerCase().startsWith(value))) {
    const option = document.createElement('option');
    option.value = user;
    userList.appendChild(option);
  }
};

function handleFetch(name: string) {
  fetch(`${fetchUrl}/?id=${name}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const user: User = data.data;
      const usernameElement = document.getElementById("username");
      if (usernameElement) {
        usernameElement.innerText = user.displayName;
      }
      document.getElementById("avatar")?.setAttribute("src", user.avatar);
      document.getElementById("avatar")?.setAttribute("alt", name);
      const bioElement = document.getElementById("bio");
      if (bioElement) {
        bioElement.innerText = user.bio;
      }
      if (document.getElementById("bio")?.innerText === "undefined") {
        const bioElement = document.getElementById("bio");
        if (bioElement) {
          bioElement.style.display = "none";
        }
      } else {
        const bioElement = document.getElementById("bio");
        if (bioElement) {
          bioElement.style.display = "block";
        }
      }
      const locationElement = document.getElementById("location");
      if (locationElement) {
        locationElement.innerText = user.location;
      }
      if (document.getElementById("location")?.innerText === "undefined") {
        const locationElement = document.getElementById("location");
        if (locationElement) {
          locationElement.style.display = "none";
        }
      } else {
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
};
