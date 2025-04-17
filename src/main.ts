import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  push,
  onChildAdded
} from "firebase/database";

console.log(import.meta.env.VITE_apiKey)
const firebaseConfig = {
  apiKey: "AIzaSyCDoaljsnVOCSkPWLxz70zouJHJZGAbBmI",
  authDomain: "laba-8ec6c.firebaseapp.com",
  databaseURL: "https://laba-8ec6c-default-rtdb.firebaseio.com",
  projectId: "laba-8ec6c",
  storageBucket: "laba-8ec6c.firebasestorage.app",
  messagingSenderId: "394946777798",
  appId: "1:394946777798:web:d465e25b77c710b1ecfdc7"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const messagesRef = ref(db, "messages");

let username = "";

const messagesContainer = document.getElementById("messages")!;
const input = document.getElementById("messageInput") as HTMLInputElement;
const button = document.getElementById("sendButton")!;
const usernameModal = document.getElementById("usernameModal")!;
const usernameInput = document.getElementById("usernameInput") as HTMLInputElement;
const usernameForm = document.getElementById("usernameModalContent") as HTMLFormElement;

usernameForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = usernameInput.value.trim();
  if (name !== "") {
    username = name;
    usernameModal.style.display = "none";
  }
});

function sendMessage() {
  const text = input.value.trim();
  if (text === "" || username === "") return;
  push(messagesRef, {
    text,
    username,
    timestamp: Date.now(),
  });
  input.value = "";
}

button.addEventListener("click", sendMessage);

onChildAdded(messagesRef, (data) => {
  const msg = data.val();
  const msgEl = document.createElement("div");
  msgEl.className = "message";
  const datetime = new Date(msg.timestamp);
  const time = datetime.toLocaleTimeString();
  const date = datetime.toLocaleDateString();
  msgEl.innerHTML = `<div class="time">${date} ${time}</div><div class="user">${msg.username || "Аноним"}</div><div>${msg.text}</div>`;
  messagesContainer.appendChild(msgEl);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
});
