function showInfo(domain) {
    const infoText = document.getElementById("infoText");
    const infoBox = document.getElementById("infoBox");

    const domainDetails = {
        education: "We collaborate with colleges, NSS units, and students to solve real-world problems through volunteering and innovation.",
        health: "We support NGOs working in healthcare, awareness programs, mental health, and rural health initiatives.",
        technology: "Students and professionals build tech solutions like apps, websites, data tools, and automation for NGOs.",
        environment: "Projects focused on sustainability, waste management, climate awareness, and green innovation.",
        social: "Community-driven initiatives for social justice, inclusion, women empowerment, and rural development."
    };

    infoText.innerText = domainDetails[domain];
    infoBox.style.display = "block";
}

function closeInfo() {
    document.getElementById("infoBox").style.display = "none";
}