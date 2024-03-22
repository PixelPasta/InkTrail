function getOffset(el) {
    console.log(el)
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY
    };
  }

  const sleep = ms => new Promise(r => setTimeout(r, ms));


document.addEventListener('DOMContentLoaded',async function() {
 



   for (let i = 1; i <= 5; i++) {
    const mangaElement = document.querySelector(`.manga${i}`);
    
    mangaElement.addEventListener('mouseenter', function() {
      gsap.to(this, { scale: 1.1, duration: 0.3 }); // Increase size on hover
    });

    mangaElement.addEventListener('mouseleave', function() {
      gsap.to(this, { scale: 1, duration: 0.3 }); // Return to original size on mouse leave
    });
  }

  // Trigger GSAP animation on hover



});