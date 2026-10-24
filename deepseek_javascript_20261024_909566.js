// 1. Role Logic
function updateRoleFields() {
    const role = document.getElementById('roleSelect').value;
    const roleFieldGroup = document.getElementById('roleFieldGroup');
    const roleFieldLabel = document.getElementById('roleFieldLabel');
    const roleInput = document.getElementById('roleInput');
    const websiteGroup = document.getElementById('websiteGroup');
    
    if (role === 'personal') {
        roleFieldGroup.style.display = 'none';
        websiteGroup.style.display = 'none';
        roleInput.value = '';
    } else {
        roleFieldGroup.style.display = 'block';
        websiteGroup.style.display = 'block';
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
    const mobile = document.getElementById('mobileInput').value.trim();
    const email = document.getElementById('emailInput').value.trim();
    const website = document.getElementById('websiteInput').value.trim();
    const location = document.getElementById('locationInput').value.trim();
    const dob = document.getElementById('dobInput').value.trim();
    const blood = document.getElementById('bloodInput').value.trim();
    const skills = document.getElementById('skillsInput').value.trim();

    // Classic Card Updates
    document.getElementById('cardName').textContent = name || "Your Name";
    document.getElementById('cardDesignation').textContent = designation || "Designation";
    toggleField('cardRole', 'cardRole', roleText);
    document.getElementById('cardRole').textContent = roleText;
    
    toggleFieldWithIcon('cardMobile', 'mobileText', mobile);
    toggleFieldWithIcon('cardEmail', 'emailText', email);
    toggleFieldWithIcon('cardWebsite', 'websiteText', website);

    toggleFieldWithIcon('cardLocation', 'locationText', location);
    toggleFieldWithIcon('cardSkills', 'skillsText', skills);
    toggleFieldWithIcon('cardDob', 'dobText', dob);
    toggleFieldWithIcon('cardBlood', 'bloodText', blood);

    // Modern Front Updates
    document.getElementById('modernName').textContent = name || "Your Name";
    document.getElementById('modernDesignation').textContent = designation || "Designation";
    toggleField('modernRole', 'modernRole', roleText);
    document.getElementById('modernRole').textContent = roleText;

    // Modern Back Updates
    toggleFieldWithIcon('bMobile', 'bMobileText', mobile);
    toggleFieldWithIcon('bEmail', 'bEmailText', email);
    toggleFieldWithIcon('bWebsite', 'bWebsiteText', website);
    toggleFieldWithIcon('bLocation', 'bLocationText', location);
    toggleFieldWithIcon('bSkills', 'bSkillsText', skills);
    toggleFieldWithIcon('bDob', 'bDobText', dob);
    toggleFieldWithIcon('bBlood', 'bBloodText', blood);
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

// 3. Photo Upload
document.getElementById('fileInput').addEventListener('change', function(e) { handlePhoto(e.target.files[0]); });
document.getElementById('cameraInput').addEventListener('change', function(e) { handlePhoto(e.target.files[0]); });
function handlePhoto(file) {
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) { 
            document.getElementById('cardPhoto').src = e.target.result; 
            document.getElementById('modernPhoto').src = e.target.result; 
        };
        reader.readAsDataURL(file);
    }
}

// 4. Layout Logic (Swap between Classic & Modern)
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
        // Temporarily hide non-card elements if needed (none here, but good practice)
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

// Initial Run
updateRoleFields();