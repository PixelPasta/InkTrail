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
    let tl = gsap.timeline()
    tl.from(".Heading", 
    { opacity: 0, 
        y: 100, 
        duration: 1,
    ease: "bounce.out" });
await sleep(2000)
    document.getElementsByClassName("loading")[0].style.display = 'none'
   document.getElementsByClassName('MainManga')[0].style.display = 'block'
   document.getElementsByClassName('desc')[0].style.display = 'block'
  document.getElementsByClassName("CoverImage")[0].style.display = 'block'
});