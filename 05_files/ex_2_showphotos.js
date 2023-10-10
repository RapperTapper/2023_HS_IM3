import { supa } from "../../00_setup/supabase.js";

//Vorgehen
//1. Alle Photos aus der DB holen
//2. Für jedes Photo die URL holen
//3. Für jedes Photo eine IMG-Tag erstellen und in das HTML einfügen
//4. Für jedes Photo eine Caption erstellen und in das HTML einfügen

//Hilfsfunktion, um die URL für ein Photo zu holen
async function getSignedUrl(filePath) {
    const { data, error } = await supa.storage.from('photos').createSignedUrl(filePath, 300);
    if (error) {
        console.error('Error generating signed URL:', error);
        return null;
    }
    return data.signedURL;
}
//Hilfsfunktion, um die Photos zu holen und anzuzeigen
async function fetchAndDisplayPhotos() {
    const { data, error } = await supa.from("Photos").select("url, caption");
    if (error) {
        console.error("Error fetching photos:", error);
        return;
    }
    const photosContainer = document.getElementById('photosContainer');
    
    //Für jedes Photo die URL holen und ein IMG-Tag erstellen
    for (const photo of data) {
        const signedUrl = await getSignedUrl(photo.url);
        if (signedUrl) {
            const imgElement = document.createElement('img');
            imgElement.src = signedUrl;
            imgElement.alt = "Uploaded photo";
            imgElement.width = 200;
            photosContainer.appendChild(imgElement);
            const captionElement = document.createElement('p');
            captionElement.textContent = photo.caption;
            photosContainer.appendChild(captionElement);
        }
    }
}

fetchAndDisplayPhotos();
