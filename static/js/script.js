document.addEventListener('DOMContentLoaded', () => {

    const sidenav = document.querySelector('.sidenav');
    M.Sidenav.init(sidenav, {});

    var select = document.querySelectorAll('select');
    const selectInstance = M.FormSelect.init(select, {
        dropdownOptions: {
            constrainWidth: false,
        }
    });

    
    const selectFormat = document.querySelector('#format');

    const format = document.querySelector('.format');
    format.value = selectFormat.value;
    
    selectFormat.addEventListener('change', () => {
        format.value = selectFormat.value;
    })
})