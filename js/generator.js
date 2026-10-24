// 1. Live Update Logic
function updateCard() {
    const name = document.getElementById('nameInput').value.trim();
    const designation = document.getElementById('designationInput').value.trim();
    const org = document.getElementById('orgInput').value.trim();
    const mobile = document.getElementById('mobileInput').value.trim();
    const email = document.getElementById('emailInput').value.trim();
    const website = document.getElementById('websiteInput').value.trim();
    const dob = document.getElementById('dobInput').value.trim();
    const blood = document.getElementById('bloodInput').value.trim();
    const location = document.getElementById('locationInput').value.trim();
    const skills = document.getElementById('skillsInput').value.trim();

    // Main Fields
    document.getElementById('cardName').textContent = name || "Your Name";
    document.getElementById('cardDesignation').textContent = designation || "Designation";
    toggleField('cardOrg', 'cardOrg', org);
    document.getElementById('cardOrg').textContent = org;

    // Contact Fields
    toggleFieldWithIcon('cardMobile', 'mobileText', mobile);
    toggleFieldWithIcon('cardEmail', 'emailText', email);
    toggleFieldWithIcon('cardWebsite', 'websiteText', website);

    // Extra Details
    toggleFieldWithIcon('cardDob', 'dobText', dob);
    toggleFieldWithIcon('cardBlood', 'bloodText', blood);
    toggleFieldWithIcon('cardLocation', 'locationText', location);
    toggleFieldWithIcon('cardSkills', 'skillsText', skills);
}

function toggleField(wrapperId, textId, value) {
    const wrapper = document.getElementById(wrapperId);
    if (value) {
        wrapper.classList.remove('hidden');
        document.getElementById(textId).textContent = value;
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

// 2. Photo Upload
document.getElementById('fileInput').addEventListener('change', function(e) { handlePhoto(e.target.files[0]); });
document.getElementById('cameraInput').addEventListener('change', function(e) { handlePhoto(e.target.files[0]); });
function handlePhoto(file) {
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) { document.getElementById('cardPhoto').src = e.target.result; };
        reader.readAsDataURL(file);
    }
}

// 3. Theme Logic
function setTheme(themeName) {
    const frontCard = document.getElementById('frontCard');
    frontCard.className = frontCard.className.replace(/theme-\w+/g, '');
    frontCard.classList.add(`theme-${themeName}`);
    
    document.querySelectorAll('.theme-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.theme-btn[data-theme="${themeName}"]`).classList.add('active');
}

// 4. Color Logic
function setColor(colorName) {
    const frontCard = document.getElementById('frontCard');
    frontCard.className = frontCard.className.replace(/color-\w+/g, '');
    frontCard.classList.add(`color-${colorName}`);
    
    document.querySelectorAll('.color-swatch').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.color-swatch[data-color="${colorName}"]`).classList.add('active');
}

// 5. Download Logic
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

// 6. Contact Popup
function openContactPopup(e) { e.preventDefault(); document.getElementById('contactModal').classList.remove('hidden'); }
function closeContactPopup() { document.getElementById('contactModal').classList.add('hidden'); }
window.addEventListener('click', function(e) { const modal = document.getElementById('contactModal'); if (e.target === modal) closeContactPopup(); });
