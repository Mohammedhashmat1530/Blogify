const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'ddrkfuwsz', 
    api_key: '819237177783719', 
    api_secret: '2zX1LO4urHJ7GwcQFvCdOpp0mbo' // Click 'View Credentials' below to copy your API secret
});

const uploadImage = async (localPath) => {

    try {
        const uploadResult = await cloudinary.uploader.upload(
            localPath, {
                resource_type:'auto'
            }
        )

        return uploadResult
    } catch (error) {
        console.log(error);
        return null;
    }
    
    
  
}

module.exports = { uploadImage };

