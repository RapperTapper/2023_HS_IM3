import { supa } from "../../00_setup/supabase.js";

// Function to generate a signed URL for a given file path
async function getSignedUrl(filePath) {
    const { data, error } = await supa.storage.from('photos').createSignedUrl(filePath, 300);
    if (error) {
        console.error('Error generating signed URL:', error);
        return null;
    }
    return data.signedURL;
}

// Function to fetch photos from the Photos table and display them
async function fetchAndDisplayPhotos() {
    const { data, error } = await supa.from("Photos").select("url, caption");
    if (error) {
        console.error("Error fetching photos:", error);
        return;
    }

    const photosContainer = document.getElementById('photosContainer');
    for (const photo of data) {
        const signedUrl = await getSignedUrl(photo.url);
        if (signedUrl) {
            const imgElement = document.createElement('img');
            imgElement.src = signedUrl;
            imgElement.alt = photo.caption || "Uploaded photo";
            imgElement.width = 200;
            imgElement.style.cursor = "pointer";
            imgElement.addEventListener('click', () => handlePhotoClick(photo.url));
            photosContainer.appendChild(imgElement);
        }
    }
}

// Function to handle the photo click event for deletion
async function handlePhotoClick(photoUrl) {
    const userConfirmed = confirm("Are you sure you want to delete this photo?");
    if (userConfirmed) {
        const { error: deleteError } = await supa.storage.from('photos').remove([photoUrl]);
        if (deleteError) {
            console.error('Error deleting file from storage:', deleteError);
            return;
        }

        const { error: tableDeleteError } = await supa.from('Photos').delete().eq('url', photoUrl);
        if (tableDeleteError) {
            console.error('Error deleting metadata from Photos table:', tableDeleteError);
            return;
        }

        alert('Photo deleted successfully!');
        document.getElementById('photosContainer').innerHTML = '';
        fetchAndDisplayPhotos();
    }
}

fetchAndDisplayPhotos();
