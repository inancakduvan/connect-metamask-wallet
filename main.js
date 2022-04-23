const connectButton = document.getElementById("connectButton");
const walletID = document.getElementById("walletID");
const reloadButton = document.getElementById("reloadButton");
const installAlert = document.getElementById("installAlert");

const startLoading = () => {
  connectButton.classList.add("loadingButton");
};

const stopLoading = () => {
  const timeout = setTimeout(() => {
    connectButton.classList.remove("loadingButton");
    clearTimeout(timeout);
  }, 300);
};

connectButton.addEventListener("click", () => {
  if (typeof window.ethereum !== "undefined") {
    startLoading();

    ethereum
      .request({ method: "eth_requestAccounts" })
      .then((accounts) => {
        const account = accounts[0];

        walletID.innerHTML = `Wallet connected: <span>${account}</span>`;

        stopLoading();
      })
      .catch((error) => {
        console.log(error, error.code);
        stopLoading();
      });
  } else {
    window.open("https://metamask.io/download/", "_blank");
    installAlert.classList.add("show");
  }
});

reloadButton.addEventListener("click", () => {
  window.location.reload();
});
