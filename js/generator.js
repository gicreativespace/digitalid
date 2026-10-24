let cropper = null;

// 1. Auto-Save: Load Saved Data on Page Load
document.addEventListener('DOMContentLoaded', () => {
    loadFormData();
});

function saveFormData() {
    const data = {
        name: document.getElementById('nameInput').value,
        dob: document.getElementById('dobInput').value,
        blood: document.getElementById('bloodInput').value,
        role: document.getElementById('roleSelect').value,
        role1: document.getElementById('roleField1Input').value,
        role2: document.getElementById('roleField2Input').value,
        location: document.getElementById('locationInput').value,
        address: document.getElementById('addressInput').value,
        showAddress: document.getElementById('showAddress').checked,
        mobile: document.getElementById('mobileInput').value,
        email: document.getElementById('emailInput').value,
        website: document.getElementById('websiteInput').value,
        photo: document.getElementById('cardPhoto').src
    };
    localStorage.setItem('digitalIdDraft', JSON.stringify(data));
}

function loadFormData() {
    const savedData = localStorage.getItem('digitalIdDraft');
    if (savedData) {
        const data = JSON.parse(savedData);
        document.getElementById('nameInput').value = data.name || '';
        document.getElementById('dobInput').value = data.dob || '';
        document.getElementById('bloodInput').value = data.blood || '';
        document.getElementById('roleSelect').value = data.role || 'personal';
        document.getElementById('roleField1Input').value = data.role1 || '';
        document.getElementById('roleField2Input').value = data.role2 || '';
        document.getElementById('locationInput').value = data.location || '';
        document.getElementById('addressInput').value = data.address || '';
        document.getElementById('showAddress').checked = data.showAddress || false;
        document.getElementById('mobileInput').value = data.mobile || '';
        document.getElementById('emailInput').value = data.email || '';
        document.getElementById('websiteInput').value = data.website || '';
        
        if (data.photo && data.photo !== 'https://ui-avatars.com/api/?name=User&background=1F3D2B&color=C8A96A&size=150') {
            document.getElementById('cardPhoto').src = data.photo;
            document.getElementById('modernPhoto').src = data.photo;
        }
        
        updateRoleFields(); // Trigger role field labels
        updateCard(); // Update preview
    }
}

// 2. Role Logic (Section Wise)
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

// 3. Live Update Logic
function updateCard() {
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

    // Auto-Save Data
    saveFormData();
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

// 4. Photo Upload & Crop
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

            if (cropper) cropper.destroy();
            cropper = new Cropper(cropImage, {
                aspectRatio: 1,
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

document.getElementById('applyCropBtn').addEventListener('click', function() {
    if (cropper) {
        const canvas = cropper.getCroppedCanvas({ width: 300, height: 300 });
        const croppedImageUrl = canvas.toDataURL('image/png');
        
        document.getElementById('cardPhoto').src = croppedImageUrl;
        document.getElementById('modernPhoto').src = croppedImageUrl;
        
        cropper.destroy();
        cropper = null;
        document.getElementById('cropModal').classList.add('hidden');
        saveFormData(); // Save photo in draft
    }
});

document.getElementById('cancelCropBtn').addEventListener('click', function() {
    if (cropper) {
        cropper.destroy();
        cropper = null;
    }
    document.getElementById('cropModal').classList.add('hidden');
});

// 5. Layout Logic
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

// 6. Theme Logic
function setTheme(themeName) {
    const cards = [document.getElementById('classicCard'), document.getElementById('modernFront'), document.getElementById('modernBack')];
    cards.forEach(card => {
        card.className = card.className.replace(/theme-\w+/g, '');
        card.classList.add(`theme-${themeName}`);
    });
    
    document.querySelectorAll('.theme-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.theme-btn[data-theme="${themeName}"]`).classList.add('active');
}

// 7. Color Logic
function setColor(colorName) {
    const cards = [document.getElementById('classicCard'), document.getElementById('modernFront'), document.getElementById('modernBack')];
    cards.forEach(card => {
        card.className = card.className.replace(/color-\w+/g, '');
        card.classList.add(`color-${colorName}`);
    });
    
    document.querySelectorAll('.color-swatch').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.color-swatch[data-color="${colorName}"]`).classList.add('active');
}

// 8. Download Logic
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

// 9. Share Logic
function shareWhatsApp(e) {
    e.preventDefault();
    const siteLink = window.location.href.split('generator.html')[0] + 'index.html';
    const text = encodeURIComponent(`Check out my Digital ID! Create yours for free at: ${siteLink}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
}

function shareEmail(e) {
    e.preventDefault();
    const siteLink = window.location.href.split('generator.html')[0] + 'index.html';
    const subject = encodeURIComponent('Check out my Digital ID');
    const body = encodeURIComponent(`Hi,\n\nI just created my Digital ID. You can create yours for free here: ${siteLink}\n\nRegards.`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
}

// 10. Clear Form Logic
document.getElementById('clearFormBtn').addEventListener('click', () => {
    if (confirm("Are you sure you want to clear all data? This cannot be undone.")) {
        localStorage.removeItem('digitalIdDraft');
        document.querySelectorAll('input[type="text"], input[type="email"]').forEach(input => input.value = '');
        document.getElementById('showAddress').checked = false;
        document.getElementById('cardPhoto').src = 'https://ui-avatars.com/api/?name=User&background=1F3D2B&color=C8A96A&size=150';
        document.getElementById('modernPhoto').src = 'https://ui-avatars.com/api/?name=User&background=1F3D2B&color=C8A96A&size=150';
        updateCard();
        alert("Data cleared successfully.");
    }
});

// 11. Contact Popup
function openContactPopup(e) { e.preventDefault(); document.getElementById('contactModal').classList.remove('hidden'); }
function closeContactPopup() { document.getElementById('contactModal').classList.add('hidden'); }
window.addEventListener('click', function(e) { 
    const modal = document.getElementById('contactModal'); 
    if (e.target === modal) closeContactPopup(); 
});

// Initial Run (If not loaded from storage)
if (!localStorage.getItem('digitalIdDraft')) {
    updateRoleFields();
}
