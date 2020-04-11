// const autoCompletingConfig = {

// };


// root, renderOption: destructered from config object
const createAutoComplete = ({ root, renderOption, onOptionSelect, inputValue, fetchData }) => {
    // root instead of querySelector a root element
root.innerHTML = `
    <label><b>Search</b></label>
    <input class="input" />
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results"></div>
        </div>
    </div>
`;

const input = root.querySelector('input');
const dropdown = root.querySelector('.dropdown');
const resultsWrapper = root.querySelector('.results');

// const onInput = debounce(event => {
//     fetchData(event.target.value);
// });
const onInput = async event => {
    const items = await fetchData(event.target.value);

    if (!items.length) {
        dropdown.classList.remove('is-active');
        return;
    }

    resultsWrapper.innerHTML = '';
    dropdown.classList.add('is-active');
    for (let item of items) {
        const option = document.createElement('a');
        
        option.classList.add('dropdown-item');
        option.innerHTML = renderOption(item);

        //once option selected
        option.addEventListener('click', () => { 
            dropdown.classList.remove('is-active');  //close drop down menu
            input.value = inputValue(item);  //change value inside input to title of selected item 
            // Make a follow up request
            onOptionSelect(item);
        });

        resultsWrapper.appendChild(option);
    }
};
input.addEventListener('input',  debounce(onInput, 500));  // triggered anytime the user enters text inside input


// global listener to watch for any click on entire document
// root conatins search related elems // event.target: the elem that's clicked on
document.addEventListener('click', event => {
    if (!root.contains(event.target)) {
      dropdown.classList.remove('is-active');
    }
  });
};