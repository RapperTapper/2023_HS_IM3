// Import the Supabase client from the setup file
import { supa } from "../../00_setup/supabase.js";

// Define a function to generate a signed URL for a given file path
async function getSignedUrl(filePath) {
    // Request a signed URL from Supabase that's valid for 300 seconds (5 minutes)
    const { data, error } = await supa.storage.from('photos').createSignedUrl(filePath, 300);

    // If there's an error generating the signed URL, log it and return null
    if (error) {
        console.error('Error generating signed URL:', error);
        return null;
    }

    // Return the generated signed URL
    return data.signedURL;
}

// Define a function to fetch photos from the Photos table and display them
async function fetchAndDisplayPhotos() {
    // Fetch the URLs and captions of photos from the Photos table
    const { data, error } = await supa.from("Photos").select("url, caption");

    // If there's an error fetching the photos, log it
    if (error) {
        console.error("Error fetching photos:", error);
        return;
    }

    // Get the container element to display the photos
    const photosContainer = document.getElementById('photosContainer');

    // Loop through each photo's URL and caption
    for (const photo of data) {
        // Get the signed URL for the current photo
        const signedUrl = await getSignedUrl(photo.url);
        
        // If a signed URL is successfully generated, display the photo and its caption
        if (signedUrl) {
            // Create an image element for the photo
            const imgElement = document.createElement('img');
            
            // Set the source of the image element to the signed URL
            imgElement.src = signedUrl;
            
            // Set an alt text for the image
            imgElement.alt = "Uploaded photo";
            
            // Set the width of the image (you can adjust this as needed)
            imgElement.width = 200;
            
            // Append the image element to the photos container
            photosContainer.appendChild(imgElement);

            // Create a paragraph element for the caption
            const captionElement = document.createElement('p');
            
            // Set the text of the paragraph to the photo's caption
            captionElement.textContent = photo.caption;
            
            // Append the caption element to the photos container
            photosContainer.appendChild(captionElement);
        }
    }
}

// Call the fetchAndDisplayPhotos function when the script loads
fetchAndDisplayPhotos();
