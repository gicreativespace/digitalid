// 1. Role Logic
function updateRoleFields() {
    const role = document.getElementById('roleSelect').value;
    const roleFieldGroup = document.getElementById('roleFieldGroup');
    const roleFieldLabel = document.getElementById('roleFieldLabel');
    const roleInput = document.getElementById('roleInput');
    
    if (role === 'personal') {
        roleFieldGroup.style.display = 'none';
        roleInput.value = ''; // Clear value
    } else {
        roleFieldGroup.style.display = 'block';
        if (role === 'professional') roleFieldLabel.textContent = 'Company Name';
        if (role === 'student') roleFieldLabel.textContent = 'College/University';
        if (role === 'organization') roleFieldLabel.textContent = 'Organization Name';
    }
    updateCard();
}

// 2. Live Update Logic
function updateCard() {
    const name = document.getElementById('nameInput').value.trim();
    const designation = document.getElementById('designationInput').value.trim();
    const roleText = document.getElementById('roleInput').value.trim();
    const dob = document.getElementById('dobInput').value.trim();
    const blood = document.getElementById('bloodInput').value.trim();
    const location = document.getElementById('locationInput').value.trim();
    const address = document.getElementById('addressInput').value.trim();
    const showAddress = document.getElementById('showAddress').checked;
    const skills = document.getElementById('skillsInput').value.trim();
    const mobile = document.getElementById('mobileInput').value.trim();
    const email = document.getElementById('emailInput').value.trim();
    const website = document.getElementById('websiteInput').value.trim();

    // Front Card
    document.getElementById('cardName').textContent = name || "Your Name";
    document.getElementById('cardDesignation').textContent = designation || "Designation";
    toggleField('cardRole', 'cardRole', roleText); // Wrapper & Text same here
    document.getElementById('cardRole').textContent = roleText;

    // Contacts
    toggleFieldWithIcon('cardMobile', 'mobileText', mobile);
    toggleFieldWithIcon('cardEmail', 'emailText', email);
    toggleFieldWithIcon('cardWebsite', 'websiteText', website);

    // Extra Details (Classic)
    toggleFieldWithIcon('cardDob', 'dobText', dob);
    toggleFieldWithIcon('cardBlood', 'bloodText', blood);
    toggleFieldWithIcon('cardLocation', 'locationText', location);
    toggleFieldWithIcon('cardAddress', 'addressText', showAddress ? address : '');
    toggleFieldWithIcon('cardSkills', 'skillsText', skills);

    // Back Card
    toggleField('backDob', 'backDobText', dob);
    toggleField('backBlood', 'backBloodText', blood);
    toggleField('backLocation', 'backLocationText', location);
    toggleField('backAddress', 'backAddressText', showAddress ? address : '');
    toggleField('backSkills', 'backSkillsText', skills);
    toggleFieldWithIcon('backMobile', 'backMobileText', mobile);
    toggleFieldWithIcon('backEmail', 'backEmailText', email);
    toggleFieldWithIcon('backWebsite', 'backWebsiteText', website);
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

// 3. Photo Upload
document.getElementById('fileInput').addEventListener('change', function(e) { handlePhoto(e.target.files[0]); });
document.getElementById('cameraInput').addEventListener('change', function(e) { handlePhoto(e.target.files[0]); });
function handlePhoto(file) {
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) { document.getElementById('cardPhoto').src = e.target.result; };
        reader.readAsDataURL(file);
    }
}

// 4. Theme Logic
function setTheme(themeName) {
    const frontCard = document.getElementById('frontCard');
    const backCard = document.getElementById('backCard');
    frontCard.className = frontCard.className.replace(/theme-\w+/g, '');
    backCard.className = backCard.className.replace(/theme-\w+/g, '');
    frontCard.classList.add(`theme-${themeName}`);
    backCard.classList.add(`theme-${themeName}`);
    
    document.querySelectorAll('.theme-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.theme-btn[data-theme="${themeName}"]`).classList.add('active');
}

// 5. Color Logic
function setColor(colorName) {
    const frontCard = document.getElementById('frontCard');
    const backCard = document.getElementById('backCard');
    frontCard.className = frontCard.className.replace(/color-\w+/g, '');
    backCard.className = backCard.className.replace(/color-\w+/g, '');
    frontCard.classList.add(`color-${colorName}`);
    backCard.classList.add(`color-${colorName}`);
    
    document.querySelectorAll('.color-swatch').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.color-swatch[data-color="${colorName}"]`).classList.add('active');
}

// 6. Layout Logic
function setLayout(layout) {
    const frontCard = document.getElementById('frontCard');
    const backCard = document.getElementById('backCard');
    frontCard.className = frontCard.className.replace(/layout-\w+/g, '');
    
    if (layout === 'modern') {
        frontCard.classList.add('layout-modern');
        backCard.classList.remove('hidden');
        backCard.classList.add('layout-modern-back');
    } else {
        frontCard.classList.add('layout-classic');
        backCard.classList.add('hidden');
        backCard.classList.remove('layout-modern-back');
    }
    
    document.querySelectorAll('.layout-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.layout-btn[data-layout="${layout}"]`).classList.add('active');
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
window.addEventListener('click', function(e) { const modal = document.getElementById('contactModal'); if (e.target === modal) closeContactPopup(); });
