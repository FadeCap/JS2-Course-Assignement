function logout() {
  localStorage.removeItem("data");
  window.location.href = '../index.html';
}

document.getElementById("logoutButton").addEventListener("click", function () {
  logout();
});
