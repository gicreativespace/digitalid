// 1. Live Update Logic
function updateCard() {
    const name = document.getElementById('nameInput').value.trim();
    const designation = document.getElementById('designationInput').value.trim();
    const org = document.getElementById('orgInput').value.trim();
    const mobile = document.getElementById('mobileInput').value.trim();
    const email = document.getElementById('emailInput').value.trim();
    const website = document.getElementById('websiteInput').value.trim();

    // Update Front Card
    document.getElementById('cardName').textContent = name || "Your Name";
    document.getElementById('cardDesignation').textContent = designation || "Designation";
    document.getElementById('cardOrg').textContent = org || "Organization";

    // Update Back Card
    document.getElementById('backName').textContent = name || "Your Name";
    document.getElementById('backDesignation').textContent = designation || "Designation";

    // Handle Contact Fields (Front)
    toggleField('cardMobile', 'mobileText', mobile);
    toggleField('cardEmail', 'emailText', email);
    toggleField('cardWebsite', 'websiteText', website);

    // Handle Contact Fields (Back)
    toggleField('backMobile', 'backMobileText', mobile);
    toggleField('backEmail', 'backEmailText', email);
    toggleField('backWebsite', 'backWebsiteText', website);
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

// 2. Photo Upload
document.getElementById('fileInput').addEventListener('change', function(e) { handlePhoto(e.target.files[0]); });
document.getElementById('cameraInput').addEventListener('change', function(e) { handlePhoto(e.target.files[0]); });

function handlePhoto(file) {
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('cardPhoto').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

// 3. Theme Logic
function setTheme(themeName) {
    const frontCard = document.getElementById('frontCard');
    const backCard = document.getElementById('backCard');
    
    // Remove old themes
    frontCard.className = frontCard.className.replace(/theme-\w+/g, '');
    backCard.className = backCard.className.replace(/theme-\w+/g, '');
    
    // Add new
    frontCard.classList.add(`theme-${themeName}`);
    backCard.classList.add(`theme-${themeName}`);
    
    document.querySelectorAll('.theme-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.theme-btn[data-theme="${themeName}"]`).classList.add('active');
}

// 4. Layout Logic (Modern Front & Back)
function setLayout(layoutName) {
    const frontCard = document.getElementById('frontCard');
    const backCard = document.getElementById('backCard');
    
    frontCard.className = frontCard.className.replace(/layout-\w+/g, '');
    
    if (layoutName === 'layout-modern') {
        frontCard.classList.add('layout-modern');
        backCard.classList.remove('hidden');
        backCard.classList.add('layout-modern-back');
    } else {
        frontCard.classList.add('layout-classic');
        backCard.classList.add('hidden');
        backCard.classList.remove('layout-modern-back');
    }
    
    document.querySelectorAll('.layout-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.layout-btn[data-layout="${layoutName}"]`).classList.add('active');
}

// 5. Download Logic (Captures Both Cards)
document.getElementById('downloadBtn').addEventListener('click', async function() {
    const wrapper = document.getElementById('downloadWrapper');
    const format = document.getElementById('formatSelect').value;
    
    const originalText = this.textContent;
    this.textContent = "Generating... Please wait";
    this.disabled = true;

    try {
        // Hide elements not needed in download (e.g., external padding if any)
        const canvas = await html2canvas(wrapper, {
            scale: 2,
            useCORS: true,
            backgroundColor: getComputedStyle(document.body).backgroundColor // Match page bg
        });

        const link = document.createElement('a');
        link.download = `DigitalID_${format}.png`;
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
function openContactPopup(e) {
    e.preventDefault();
    document.getElementById('contactModal').classList.remove('hidden');
}
function closeContactPopup() {
    document.getElementById('contactModal').classList.add('hidden');
}
window.addEventListener('click', function(e) {
    const modal = document.getElementById('contactModal');
    if (e.target === modal) closeContactPopup();
});
