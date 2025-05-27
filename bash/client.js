cat > client.js <<EOF
const buyButton = document.getElementById("buy-button");

buyButton.addEventListener("click", async () => {
  const response = await fetch("https://loylypussit-backend.up.railway.app/create-checkout-session", {
      method: "POST",
          headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                    items: [{ id: "loylypussi", name: "Koivulehtipussi", price: 990, quantity: 1 }]
                        })
                          });

                            const session = await response.json();
                              window.location = session.url;
                              });
                              EOF