import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Resizer from 'react-image-file-resizer';

export const uploadImageAndGetURL = async (image, recipeId) => {
  // Create a root reference
  const storage = getStorage();
  let dbURL = null;

  // Create a reference to 'recipeImages/recipeId'
  const storageRef = ref(storage, `recipesImages/${recipeId}`);

  // const response = await fetch(URL.createObjectURL(image));
  try {
    const response = await fetch(image);
    // Convert image to blob before upload to database
    const blob = await response.blob();
    dbURL = uploadBytes(storageRef, blob).then(async (snapshot) => {
      const url = await getDownloadURL(storageRef);
      return url;
    });
  } catch (e) {
    console.log(e);
  }
  return dbURL;
};

export const resizeImage = (image) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      image,
      400, // New width in pixels
      400, // New height in pixels
      'PNG', // Output format
      40, // Output quality (0 to 100)
      0, // Rotation in degrees (0 to 360)
      (uri) => {
        resolve(uri);
      },
      'blob' // Output type
    );
  });
