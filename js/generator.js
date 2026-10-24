let cropper = null; // Global variable for cropper

// 1. Role Logic (Section Wise)
function updateRoleFields() {
    const role = document.getElementById('roleSelect').value;
    const container = document.getElementById('roleFieldsContainer');
    const field1Group = document.getElementById('roleField1Group');
    const field1Label = document.getElementById('roleField1Label');
    const field1Input = document.getElementById('roleField1Input');
    const field2Group = document.getElementById('roleField2Group');
    const field2Label = document.getElementById('roleField2Label');
    const field2Input = document.getElementById('roleField2Input');

    if (role === 'personal') {
        container.classList.add('hidden');
        field1Input.value = '';
        field2Input.value = '';
    } else {
        container.classList.remove('hidden');
        if (role === 'professional') {
            field1Label.textContent = 'Designation (Job Title)';
            field1Input.placeholder = 'Software Engineer';
            field2Label.textContent = 'Company Name';
            field2Input.placeholder = 'Tech Corp';
        } else if (role === 'student') {
            field1Label.textContent = 'Class / Grade';
            field1Input.placeholder = 'B.Tech 3rd Year';
            field2Label.textContent = 'School / College';
            field2Input.placeholder = 'ABC University';
        } else if (role === 'business') {
            field1Label.textContent = 'Your Role';
            field1Input.placeholder = 'Founder / CEO';
            field2Label.textContent = 'Business Name';
            field2Input.placeholder = 'My Startup';
        }
    }
    updateCard();
}

// 2. Live Update Logic
function updateCard() {
    // Values
    const name = document.getElementById('nameInput').value.trim();
    const dob = document.getElementById('dobInput').value.trim();
    const blood = document.getElementById('bloodInput').value.trim();
    const role1 = document.getElementById('roleField1Input').value.trim();
    const role2 = document.getElementById('roleField2Input').value.trim();
    const location = document.getElementById('locationInput').value.trim();
    const address = document.getElementById('addressInput').value.trim();
    const showAddress = document.getElementById('showAddress').checked;
    const mobile = document.getElementById('mobileInput').value.trim();
    const email = document.getElementById('emailInput').value.trim();
    const website = document.getElementById('websiteInput').value.trim();

    // Classic Card
    document.getElementById('cardName').textContent = name || "Your Name";
    toggleFieldWithIcon('cardDob', 'dobText', dob);
    toggleFieldWithIcon('cardBlood', 'bloodText', blood);
    
    toggleField('cardRole1', 'cardRole1', role1);
    document.getElementById('cardRole1').textContent = role1;
    toggleField('cardRole2', 'cardRole2', role2);
    document.getElementById('cardRole2').textContent = role2;

    toggleFieldWithIcon('cardLocation', 'locationText', location);
    toggleFieldWithIcon('cardAddress', 'addressText', showAddress ? address : '');
    
    toggleFieldWithIcon('cardMobile', 'mobileText', mobile);
    toggleFieldWithIcon('cardEmail', 'emailText', email);
    toggleFieldWithIcon('cardWebsite', 'websiteText', website);

    // Modern Front
    document.getElementById('modernName').textContent = name || "Your Name";
    toggleField('modernRole1', 'modernRole1', role1);
    document.getElementById('modernRole1').textContent = role1;
    toggleField('modernRole2', 'modernRole2', role2);
    document.getElementById('modernRole2').textContent = role2;

    // Modern Back
    toggleFieldWithIcon('bDob', 'bDobText', dob);
    toggleFieldWithIcon('bBlood', 'bBloodText', blood);
    toggleFieldWithIcon('bLocation', 'bLocationText', location);
    toggleFieldWithIcon('bAddress', 'bAddressText', showAddress ? address : '');
    toggleFieldWithIcon('bMobile', 'bMobileText', mobile);
    toggleFieldWithIcon('bEmail', 'bEmailText', email);
    toggleFieldWithIcon('bWebsite', 'bWebsiteText', website);
}

function toggleField(wrapperId, textId, value) {
    const wrapper = document.getElementById(wrapperId);
    if (value) {
        wrapper.classList.remove('hidden');
    } else {
        wrapper.classList.add('hidden');
    }
}

function toggleFieldWithIcon(wrapperId, textId, value) {
    const wrapper = document.getElementById(wrapperId);
    if (value) {
        wrapper.classList.remove('hidden');
        document.getElementById(textId).textContent = value;
    } else {
        wrapper.classList.add('hidden');
    }
}

// 3. Photo Upload & Crop Logic
document.getElementById('fileInput').addEventListener('change', function(e) { handlePhotoUpload(e.target.files[0]); });
document.getElementById('cameraInput').addEventListener('change', function(e) { handlePhotoUpload(e.target.files[0]); });

function handlePhotoUpload(file) {
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const cropModal = document.getElementById('cropModal');
            const cropImage = document.getElementById('cropImage');
            
            cropImage.src = e.target.result;
            cropModal.classList.remove('hidden');

            // Initialize Cropper
            if (cropper) cropper.destroy();
            cropper = new Cropper(cropImage, {
                aspectRatio: 1, // Square crop for circle
                viewMode: 1,
                dragMode: 'move',
                autoCropArea: 0.8,
                restore: false,
                guides: false,
                highlight: false,
                cropBoxMovable: false,
                cropBoxResizable: false,
                toggleDragModeOnDblclick: false,
            });
        };
        reader.readAsDataURL(file);
    }
}

// Crop Apply/Cancel
document.getElementById('applyCropBtn').addEventListener('click', function() {
    if (cropper) {
        const canvas = cropper.getCroppedCanvas({ width: 300, height: 300 });
        const croppedImageUrl = canvas.toDataURL('image/png');
        
        document.getElementById('cardPhoto').src = croppedImageUrl;
        document.getElementById('modernPhoto').src = croppedImageUrl;
        
        cropper.destroy();
        cropper = null;
        document.getElementById('cropModal').classList.add('hidden');
    }
});

document.getElementById('cancelCropBtn').addEventListener('click', function() {
    if (cropper) {
        cropper.destroy();
        cropper = null;
    }
    document.getElementById('cropModal').classList.add('hidden');
});

// 4. Layout Logic
function setLayout(layout) {
    const classicCard = document.getElementById('classicCard');
    const modernWrapper = document.getElementById('modernWrapper');
    
    if (layout === 'modern') {
        classicCard.classList.add('hidden');
        modernWrapper.classList.remove('hidden');
    } else {
        classicCard.classList.remove('hidden');
        modernWrapper.classList.add('hidden');
    }
    
    document.querySelectorAll('.layout-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.layout-btn[data-layout="layout-${layout}"]`).classList.add('active');
}

// 5. Theme Logic
function setTheme(themeName) {
    const cards = [document.getElementById('classicCard'), document.getElementById('modernFront'), document.getElementById('modernBack')];
    cards.forEach(card => {
        card.className = card.className.replace(/theme-\w+/g, '');
        card.classList.add(`theme-${themeName}`);
    });
    
    document.querySelectorAll('.theme-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.theme-btn[data-theme="${themeName}"]`).classList.add('active');
}

// 6. Color Logic
function setColor(colorName) {
    const cards = [document.getElementById('classicCard'), document.getElementById('modernFront'), document.getElementById('modernBack')];
    cards.forEach(card => {
        card.className = card.className.replace(/color-\w+/g, '');
        card.classList.add(`color-${colorName}`);
    });
    
    document.querySelectorAll('.color-swatch').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.color-swatch[data-color="${colorName}"]`).classList.add('active');
}

// 7. Download Logic
document.getElementById('downloadBtn').addEventListener('click', async function() {
    const wrapper = document.getElementById('downloadWrapper');
    const originalText = this.textContent;
    this.textContent = "Generating... Please wait";
    this.disabled = true;

    try {
        const canvas = await html2canvas(wrapper, {
            scale: 2,
            useCORS: true,
            backgroundColor: getComputedStyle(document.body).backgroundColor
        });
        const link = document.createElement('a');
        link.download = `DigitalID.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to generate image. Please try again.");
    } finally {
        this.textContent = originalText;
        this.disabled = false;
    }
});

// 8. Contact Popup
function openContactPopup(e) { e.preventDefault(); document.getElementById('contactModal').classList.remove('hidden'); }
function closeContactPopup() { document.getElementById('contactModal').classList.add('hidden'); }
window.addEventListener('click', function(e) { 
    const modal = document.getElementById('contactModal'); 
    if (e.target === modal) closeContactPopup(); 
});

// Initial Run
updateRoleFields();
