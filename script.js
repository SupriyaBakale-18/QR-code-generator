let btn = document.querySelector(".button");
let qr_code_element = document.querySelector(".qr-code");

btn.addEventListener("click", () => {
    let user_input = document.querySelector("#input_text");
    if (user_input.value != "") {
        if (qr_code_element.childElementCount == 0) {
            generate(user_input);
        } else {
            qr_code_element.innerHTML = "";
            generate(user_input);
        }
    } else {
        console.log("not valid input");
        qr_code_element.style.display = "none"; // Corrected style assignment
    }
});

function generate(user_input) {
    qr_code_element.style.display = ""; // Corrected style assignment

    // Use template literals correctly
    let qrcode = new QRCode(qr_code_element, {
        text: user_input.value, // Corrected string interpolation
        width: 180, //128
        height: 180,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });

    let download = document.createElement("button");
    qr_code_element.appendChild(download);

    let download_link = document.createElement("a");
    download_link.setAttribute("download", "qr_code.png");
    download_link.innerHTML = "Download"; // Changed to a string instead of a variable

    download.appendChild(download_link);

    // Removed query selector because img is not part of qr_code_element
    // Added error handling
    let qr_code_img = qr_code_element.querySelector("img");
    let qr_code_canvas = qr_code_element.querySelector("canvas"); // Assumed it's within the qr_code_element

    // Check if qr_code_img exists
    if (qr_code_img && qr_code_img.getAttribute("src") == null) {
        setTimeout(() => {
            download_link.setAttribute("href", qr_code_canvas.toDataURL()); // Corrected string interpolation
        }, 300);
    } else if (qr_code_img) { // Ensure qr_code_img exists
        setTimeout(() => {
            download_link.setAttribute("href", qr_code_img.getAttribute("src")); // Corrected string interpolation
        }, 300);
    }
}

// This part will run only if `QRCode` is defined
generate({
    value: "https://codepen.io/coding_dev_" // Starting value, but the `generate` function takes an input directly
});