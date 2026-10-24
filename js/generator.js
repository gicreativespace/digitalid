// 1. Live Update Logic
function updateCard() {
    // Get values
    const name = document.getElementById('nameInput').value.trim();
    const designation = document.getElementById('designationInput').value.trim();
    const org = document.getElementById('orgInput').value.trim();
    const mobile = document.getElementById('mobileInput').value.trim();
    const email = document.getElementById('emailInput').value.trim();
    const website = document.getElementById('websiteInput').value.trim();

    // Update Text
    document.getElementById('cardName').textContent = name || "Your Name";
    document.getElementById('cardDesignation').textContent = designation || "Designation";
    document.getElementById('cardOrg').textContent = org || "Organization";

    // Handle Contact Fields (Hide if empty)
    toggleField('cardMobile', 'mobileText', mobile);
    toggleField('cardEmail', 'emailText', email);
    toggleField('cardWebsite', 'websiteText', website);
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

// 2. Photo Upload Logic
document.getElementById('fileInput').addEventListener('change', function(e) {
    handlePhoto(e.target.files[0]);
});
document.getElementById('cameraInput').addEventListener('change', function(e) {
    handlePhoto(e.target.files[0]);
});

function handlePhoto(file) {
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('cardPhoto').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

// 3. Theme & Layout Logic
function setTheme(themeName) {
    const card = document.getElementById('cardPreview');
    // Remove existing theme classes
    card.className = card.className.replace(/theme-\w+/g, '');
    card.classList.add(`theme-${themeName}`);
    
    // Update active button UI
    document.querySelectorAll('.theme-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.theme-btn[data-theme="${themeName}"]`).classList.add('active');
}

function setLayout(layoutName) {
    const card = document.getElementById('cardPreview');
    card.className = card.className.replace(/layout-\w+/g, '');
    card.classList.add(layoutName);
    
    document.querySelectorAll('.layout-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.layout-btn[data-layout="${layoutName}"]`).classList.add('active');
}

// 4. Download Logic (Using HTML Canvas for High-Res)
document.getElementById('downloadBtn').addEventListener('click', async function() {
    const cardElement = document.getElementById('cardPreview');
    const format = document.getElementById('formatSelect').value;
    
    // Show loading state
    const originalText = this.textContent;
    this.textContent = "Generating... Please wait";
    this.disabled = true;

    try {
        // Use html2canvas library (Needs to be added in HTML)
        // For now, we assume html2canvas is loaded via CDN in index.html
        const canvas = await html2canvas(cardElement, {
            scale: 2, // High resolution
            useCORS: true,
            backgroundColor: null
        });

        // Create Download Link
        const link = document.createElement('a');
        link.download = `DigitalID_${format}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        
    } catch (error) {
        console.error("Error generating card:", error);
        alert("Failed to generate image. Please try again.");
    } finally {
        // Reset button
        this.textContent = originalText;
        this.disabled = false;
    }
});

// 5. Contact Popup Logic
function openContactPopup(e) {
    e.preventDefault();
    document.getElementById('contactModal').classList.remove('hidden');
}

function closeContactPopup() {
    document.getElementById('contactModal').classList.add('hidden');
}

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    const modal = document.getElementById('contactModal');
    if (e.target === modal) {
        closeContactPopup();
    }
});
