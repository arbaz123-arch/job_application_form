// Save any value to LocalStorage
function saveToLocal(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Get saved value from LocalStorage
function getFromLocal(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

// Check empty input
function isEmpty(value) {
  return value.trim() === "";
}

// Email validation
function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}
