document.addEventListener("DOMContentLoaded", function(){
  const contactForm = document.getElementById("contact-form");

  contactForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const messageBox = document.getElementById("form-message");

    if(name && email){

      const formData = {name, email};
      try{
        const response = await
        fetch("https://localhost:3000/send-email", {
          method: POST,
          Headers: {
            "content-type":"application/json"
          },
          body: JSON.stringify(formData)
        });
        if(response.ok){
          messageBox.textContent = `Merci, ${name}! Nous allons vous contacter à ${email} bientôt.`;
          messageBox.style.color = "green";
          contactForm.reset();
        }else{
          throw new Error("Erreur lors de l'envoi.");
        }
      }catch(error){
        messageBox.textContent = "Erreur d'envoi, Réessayez plus tard.";
        messageBox.style.color = "red";
      }

    setTimeout(()=>{
      messageBox.textContent = "";
    },5000);
    }else{
      messageBox.textContent = "Veuillez remplir tous les champs.";
      messageBox.style.color = "red";
    }
  });
});
