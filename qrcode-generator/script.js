function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tab-button");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

function generateQRCode(type) {
    var qrcodeContainer = document.getElementById("qrcode");
    qrcodeContainer.innerHTML = ""; // Clear the previous QR code

    var data;
    switch (type) {
        case 'website':
            data = document.getElementById("websiteUrl").value;
            break;
        case 'vcard':
            var firstName = document.getElementById("vcardFirstName").value;
            var lastName = document.getElementById("vcardLastName").value;
            var phone = document.getElementById("vcardPhone").value;
            var email = document.getElementById("vcardEmail").value;
            var company = document.getElementById("vcardCompany").value;
            var jobTitle = document.getElementById("vcardJobTitle").value;
            var companyPhone = document.getElementById("vcardCompanyPhone").value;
            var fax = document.getElementById("vcardFax").value;
            var companyEmail = document.getElementById("vcardCompanyEmail").value;
            var companyWebsite = document.getElementById("vcardCompanyWebsite").value;
            var street = document.getElementById("vcardStreet").value;
            var city = document.getElementById("vcardCity").value;
            var state = document.getElementById("vcardState").value;
            var country = document.getElementById("vcardCountry").value;
            var zip = document.getElementById("vcardZip").value;
            var postalCode = document.getElementById("vcardPostalCode").value;

            data = `BEGIN:VCARD\nVERSION:3.0\nFN:${firstName} ${lastName}\nTEL:${phone}\nEMAIL:${email}\nORG:${company}\nTITLE:${jobTitle}\nTEL;TYPE=WORK,VOICE:${companyPhone}\nTEL;TYPE=FAX:${fax}\nEMAIL;TYPE=INTERNET:${companyEmail}\nURL:${companyWebsite}\nADR;TYPE=WORK:;;${street};${city};${state};${country};${zip};${postalCode}\nEND:VCARD`;
            break;
        case 'text':
            data = document.getElementById("textContent").value;
            break;
        case 'email':
            var emailAddress = document.getElementById("emailAddress").value;
            var emailSubject = document.getElementById("emailSubject").value;
            var emailBody = document.getElementById("emailBody").value;
            data = `mailto:${emailAddress}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
            break;
        case 'facebook':
            data = document.getElementById("facebookLink").value;
            break;
        case 'wifi':
            var wifiName = document.getElementById("wifiName").value;
            var wifiPassword = document.getElementById("wifiPassword").value;
            var wifiEncryption = document.getElementById("wifiEncryption").value;
            data = `WIFI:S:${wifiName};T:${wifiEncryption};P:${wifiPassword};;`;
            break;
        case 'phone':
            data = `tel:${document.getElementById("phoneNumber").value}`;
            break;
        case 'sms':
            var smsPhoneNumber = document.getElementById("smsPhoneNumber").value;
            var smsMessage = document.getElementById("smsMessage").value;
            data = `SMSTO:${smsPhoneNumber}:${smsMessage}`;
            break;
    }

    // Tạo mã QR với kích thước hiển thị 300x300
    var qrcode = new QRCode(qrcodeContainer, {
        text: data,
        width: 300,
        height: 300,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });

    // Tạo một canvas mới với kích thước 1200x1200 và padding nền trắng
    var canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 1200;
    var context = canvas.getContext("2d");

    // Điền nền trắng cho canvas
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Vẽ mã QR lên canvas với kích thước 900x900 ở giữa
    var qrCanvas = qrcodeContainer.querySelector("canvas");
    context.drawImage(qrCanvas, 150, 150, 900, 900);

    // Nếu có logo, vẽ logo lên mã QR
    var logoImage = document.getElementById("logoImage");
    if (logoImage.src) {
        var logoSize = 250; // Tăng kích thước của logo
        var logoX = (canvas.width - logoSize) / 2;
        var logoY = (canvas.height - logoSize) / 2;
        context.drawImage(logoImage, logoX, logoY, logoSize, logoSize);
    }

    // Hiển thị mã QR với logo
    qrcodeContainer.innerHTML = ""; // Clear the previous QR code
    qrcodeContainer.appendChild(canvas);
}

function downloadQRCode(format) {
    var paddedCanvas = document.querySelector("#qrcode canvas");
    if (!paddedCanvas) return alert("Please generate a QR code first");

    var downloadLink = document.createElement("a");
    if (format === 'png') {
        downloadLink.href = paddedCanvas.toDataURL("image/png");
        downloadLink.download = "qrcode.png";
    } else if (format === 'svg') {
        // Convert canvas to SVG
        var svg = new XMLSerializer().serializeToString(paddedCanvas);
        var svgBlob = new Blob([svg], {type: "image/svg+xml;charset=utf-8"});
        var url = URL.createObjectURL(svgBlob);
        downloadLink.href = url;
        downloadLink.download = "qrcode.svg";
    } else if (format === 'html') {
        var embedCode = `<img src="${paddedCanvas.toDataURL('image/png')}" alt="QR Code">`;
        var blob = new Blob([embedCode], { type: 'text/html' });
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = "qrcode.html";
    }
    downloadLink.click();
}

function handleLogoUpload(event) {
    var file = event.target.files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function(e) {
            var logoImage = document.getElementById("logoImage");
            logoImage.src = e.target.result;
            logoImage.style.display = "block";
            document.getElementById("removeLogoButton").style.display = "inline-block";
        };
        reader.readAsDataURL(file);
    }
}

function removeLogo() {
    var logoImage = document.getElementById("logoImage");
    logoImage.src = "";
    logoImage.style.display = "none";
    document.getElementById("removeLogoButton").style.display = "none";
    document.getElementById("logoInput").value = ""; // Clear the file input
}

// Initialize first tab and add event listeners
document.addEventListener("DOMContentLoaded", function() {
    document.querySelector(".tab-button").click();
    document.getElementById("logoInput").addEventListener("change", handleLogoUpload);
    document.getElementById("removeLogoButton").addEventListener("click", removeLogo);
});