// Basic Home Page Logic
console.log("QC Analytics Hub: Home Page Loaded");

document.addEventListener("DOMContentLoaded", () => {
    // Add any specific home page interactive logic here in the future
    // Currently, CSS animations handle the visuals.
    
    // Example: Add a click ripple effect to the CTA button
    const btn = document.querySelector('.cta-button');
    if(btn) {
        btn.addEventListener('click', function(e) {
            let x = e.clientX - e.target.offsetLeft;
            let y = e.clientY - e.target.offsetTop;
            
            let ripples = document.createElement('span');
            ripples.style.left = x + 'px';
            ripples.style.top = y + 'px';
            this.appendChild(ripples);
            
            setTimeout(() => {
                ripples.remove()
            }, 1000);
        });
    }
});
