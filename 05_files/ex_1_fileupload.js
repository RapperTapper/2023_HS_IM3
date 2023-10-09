import { supa } from "../../00_setup/supabase.js";

document.addEventListener('DOMContentLoaded', (event) => {
    const uploadButton = document.getElementById('uploadButton');
    uploadButton.addEventListener('click', uploadPhoto);
});

async function uploadPhoto() {
    const fileInput = document.getElementById('photoInput');
    const captionInput = document.getElementById('captionInput');
    
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const filePath = `uploads/${file.name}`;
        const { error: uploadError } = await supa.storage.from('photos').upload(filePath, file);
        
        if (uploadError) {
            console.error('Error uploading file:', uploadError);
            return;
        }
        
        const { data, error } = await supa.from('Photos').insert([
            {
                url: filePath,
                caption: captionInput.value
            }
        ]);
        
        if (error) {
            console.error('Error saving to Photos table:', error);
        } else {
            console.log('Uploaded and saved successfully:', data);
            alert('Photo uploaded successfully!');
        }

    } else {
        console.log('No file selected.');
    }
}
