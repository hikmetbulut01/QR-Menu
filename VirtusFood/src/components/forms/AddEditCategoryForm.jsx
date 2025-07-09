const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.name.trim()) {
        const userDocRef = doc(db, USER_COLLECTION, USER_DOC_ID);
        const userSnap = await getDoc(userDocRef);
        let categories = userSnap.exists() ? (userSnap.data().categories || {}) : {};

        // Check if category already exists
        if (categories[formData.name]) {
            alert("Bu isimde bir kategori zaten mevcut!");
            return;
        }

        // Add new category
        categories[formData.name] = {};

        if (userSnap.exists()) {
            await updateDoc(userDocRef, { categories });
        } else {
            await setDoc(userDocRef, { categories });
        }
        onSave(formData);
    }
}; 