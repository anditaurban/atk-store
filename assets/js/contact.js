document.getElementById("contactForm").addEventListener("submit", async function(e) {
    e.preventDefault(); // mencegah reload page

    // Ambil value dari form
    const full_name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if(!full_name || !email || !message){
        alert("Semua field wajib diisi!");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ full_name, email, message })
        });

        const result = await response.json();

        if(result.success){
            alert(result.message);
            // reset form
            document.getElementById("contactForm").reset();
        } else {
            alert(result.error || "Terjadi kesalahan, coba lagi.");
        }

    } catch (err) {
        console.error(err);
        alert("Gagal mengirim pesan, server tidak merespon.");
    }
});
