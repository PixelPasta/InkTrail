let info = {
    score: "",
    min_yr: "",
}
let originalText = document.getElementsByClassName('chosenScore')[0].innerHTML

function updateScore(selectedItem) {
   info.score = selectedItem
   document.getElementsByClassName('chosenScore')[0].innerHTML = selectedItem
}

function submit() {
    info.min_yr = document.getElementsByClassName('form-control')[0].value
    const d = new Date();
    let year = d.getFullYear();
   
    const yearRegex = /^\d{4}$/;
    if (document.getElementsByClassName('chosenScore')[0].innerHTML === originalText) {
        document.getElementsByClassName('alert-danger')[0].innerText = `Please choose a minimum score!`
        document.getElementsByClassName('error')[0].style.display = 'block'
        return $(document.getElementsByClassName('error')[0]).effect("bounce", "slow")
    }
    if (!yearRegex.test(info.min_yr)) {
        document.getElementsByClassName('alert-danger')[0].innerText = `Invalid Year Format! Year must be in the form of YYYY and between 1990 and ${year}.`
        document.getElementsByClassName('error')[0].style.display = 'block'
        return $(document.getElementsByClassName('error')[0]).effect("bounce", "slow")
    }
    if (parseInt(info.min_yr) < 1990) {
        document.getElementsByClassName('alert-danger')[0].innerText = `Invalid Year Format! Year must be in the form of YYYY and between 1990 and ${year}.`
        document.getElementsByClassName('error')[0].style.display = 'block'
        return $(document.getElementsByClassName('error')[0]).effect("bounce", "slow")
    }
    if (parseInt(info.min_yr) > 2025) {
        document.getElementsByClassName('alert-danger')[0].innerText = `Invalid Year Format! Year must be in the form of YYYY and between 1990 and ${year}.`
        document.getElementsByClassName('error')[0].style.display = 'block'
        return $(document.getElementsByClassName('error')[0]).effect("bounce", "slow")
    }
 
    window.location.replace(`/romance/?score=${info.score}&min_year=${info.min_yr}`);   
}
