document.addEventListener("DOMContentLoaded", (e) => {
  const tabList = document.querySelector(".tab__list");
  const formGroup = document.querySelectorAll(".form");
  const note = document.querySelector(".results__note"); 
  const date = new Date(); 
// Event Linstener Tabs
  tabList.addEventListener("click", (e) => {
    if(e.target.classList.contains("tab-voucher")) {
      tabList.innerHTML = "<h2 class='page__heading--secondary'>Voucher</h2><div class='form__group js-reload'> <input type='submit' class='btn btn__form__reload js-btn--reload' id='reload'value='Reload'></div>";
      formGroup.forEach(function(group){
        if (group.classList.contains("form__voucher")) { 
          group.classList.remove("form--hidden"); // Show voucher fields
        }     
      })
      reloadPage();
    }

    if(e.target.classList.contains("tab-move")) {
      tabList.innerHTML = "<h2 class='page__heading--secondary'>Move</h2>        <div class='form__group js-reload'> <input type='submit' class='btn btn__form__reload js-btn--reload' id='reload'value='Reload'></div>";
      formGroup.forEach(function(group){
        if (group.classList.contains("form__move")) { 
          group.classList.remove("form--hidden"); // Show voucher input fields
        }
      })
      reloadPage();
    }

    if(e.target.classList.contains("tab-upgrade")) {
      tabList.innerHTML = "<h2 class='page__heading--secondary'>Upgrade</h2>        <div class='form__group js-reload'> <input type='submit' class='btn btn__form__reload js-btn--reload' id='reload'value='Reload'></div>";
      formGroup.forEach(function(group){
        if (group.classList.contains("form__upgrade")) { 
          group.classList.remove("form--hidden"); // Show voucher input fields
        }
      })
      reloadPage();
    }

    if(e.target.classList.contains("tab-prolong")) {
      tabList.innerHTML = "<h2 class='page__heading--secondary'>Prolong</h2><div class='form__group js-reload'> <input type='submit' class='btn btn__form__reload js-btn--reload' id='reload'value='Reload'></div>";
      formGroup.forEach(function(group){
        if (group.classList.contains("form__prolong")) { 
          group.classList.remove("form--hidden"); // Show voucher fields
        }
      })
      reloadPage();
    }
   
  }) // tabList.addEventListener

  // Patterns of input value with regex
   const patterns = {
  VoriginalProject: /^(http|https):\/\/tools\.webnode\.com\/project\/\?id=\d{8}$/,
  Vcurrency: /^[A-Z]{3}$/,
  VyearsPaid: /^1$|^2$|^5$|^10$/,
  VamountPaid: /^(\d+)(\.\d{2})?$/,
  VoriginalExpiration: /^(\d{4})-(\d{2})-(\d{2})$/,
  MoriginalProject: /^(http|https):\/\/tools\.webnode\.com\/project\/\?id=\d{8}$/,
  MoriginalType:/^Limited$|^Mini$|^Standard$|^Profi$/i,
  MdestinationProject: /^(http|https):\/\/tools\.webnode\.com\/project\/\?id=\d{8}$/,
  MdestinationType:/^Limited$|^Mini$|^Standard$|^Profi$/i,
  Mcurrency: /^[A-Z]{3}$/,
  MyearsPaid: /^1$|^2$|^5$|^10$/,
  MamountPaid: /^(\d+)(\.\d{2})?$/,
  MoriginalExpiration: /^(\d{4})-(\d{2})-(\d{2})$/,
  MdestinationPackagePrice: /^(\d+)(\.\d{2})?$/,
  MdestinationExpiration: /^(\d{4})-(\d{2})-(\d{2})$/,
  UProject: /^(http|https):\/\/tools\.webnode\.com\/project\/\?id=\d{8}$/,
  UoriginalType:/^Limited$|^Mini$|^Standard$|^Profi$/i,
  UfinalType:/^Limited$|^Mini$|^Standard$|^Profi$/i,
  Ucurrency: /^[A-Z]{3}$/,
  UyearsPaid: /^1$|^2$|^5$|^10$/,
  UamountPaid: /^(\d+)(\.\d{2})?$/,
  UoriginalExpiration: /^(\d{4})-(\d{2})-(\d{2})$/,
  UfinalPackagePrice: /^(\d+)(\.\d{2})?$/,
  PdestinationProject: /^(http|https):\/\/tools\.webnode\.com\/project\/\?id=\d{8}$/,
  PdestinationType: /^Limited$|^Mini$|^Standard$|^Profi$/i,
  PdaysProlong: /^\d{1,4}$/,
  PdestinationExpiration: /^(\d{4})-(\d{2})-(\d{2})$/
  }
  //Validation Function

  function validate(field, regex) {
    if(regex.test(field.value)) {
      field.style.outlineColor = "#93dba1";
    } else {
      field.style.outlineColor = "#f5cc76"
    }
  }
  // Validation of inputs Event Listener

  const inputs = document.querySelectorAll(".js-input");
      inputs.forEach((input) => {
      input.addEventListener("input", (e) => {
      validate(e.target, patterns[e.target.id]);
      });
    });

  var inputObject = {}; // empty object
  var inputClassLists = []; // emty ClassList DOMTokenList

  // Variables Results

  var daysRemainingElem = document.querySelector("#daysRemaining");
  var amountRemainingElem = document.querySelector("#amountRemaining");
  var newExpirationDateElem = document.querySelector("#newExpirationDate");

  //Check if ALL elements of an Array (classlists) contains a string (class)
  const checker = (arr, str) => arr.every(a => a.contains(str));

  const calculateVoucher = () => {
    // Populate object with inputs with value

    for(var i =0; i<inputs.length; i++) {
      if(inputs[i].value) {   //only if the input has a value
        inputObject[inputs[i].id] = inputs[i].value;   // populates object   
        inputClassLists[i] = inputs[i].parentElement.classList; 
      }       
    }; 
      // Computes the amountRemaining
    let daysRemaining = Math.ceil((new Date(inputObject.VoriginalExpiration).getTime() - new Date().getTime())/(24*60*60*1000)); 
      // Computes the amountRemaining
    let amountRemaining = (daysRemaining*inputObject.VamountPaid)/(inputObject.VyearsPaid*365);
      // Gives values to the result inputs
    amountRemainingElem.value = amountRemaining.toFixed(2);
    daysRemainingElem.value = daysRemaining;

    if(isFinite(amountRemaining) || amountRemaining < amountPaid) {      
      note.textContent =
      `Hello,
      Project: ${inputObject.VoriginalProject}
      The user wanted to delete the project.
      There were ${daysRemaining} days remaining.
      Could you please create a voucher for ${amountRemaining.toFixed(2)} ${inputObject.Vcurrency}.
      Thank you very much.`;   

     } 
      // Hide LOADER
    document.getElementById('loading').classList.add("hidden");   
    // Show Results  
    document.getElementById('results').classList.remove("hidden");
    let resultsVoucher= document.getElementsByClassName
    ('js-results-voucher');
    removeHidden(resultsVoucher);


  }; //function calculateVoucher

  // Event Calculate Voucher

  const formVoucher = document.querySelector(".form__voucher")
  formVoucher.addEventListener("submit", (e) => {
    e.preventDefault();
    // Show LOADER 
    document.getElementById('loading').classList.remove("hidden");

    setTimeout(calculateVoucher, 1500);
  });

  // Calculate Move --------------------

const calculateMove = () => {
  // Populate object with inputs with value

  for(var i =0; i<inputs.length; i++) {
    if(inputs[i].value) {   //only if the input has a value
      inputObject[inputs[i].id] = inputs[i].value;   // populates object   
      inputClassLists[i] = inputs[i].parentElement.classList; 
    }       
  }; 
  if(inputObject.CoriginalProject === inputObject.CdestinationProject){
    showError("URL's are the same")

  }
    // Computes the days Remaining
  let daysRemaining = Math.ceil((new Date(inputObject.CoriginalExpiration).getTime() - new Date().getTime())/(24*60*60*1000)); 
    // Computes the amountRemaining
  let amountRemaining = (daysRemaining*inputObject.CamountPaid)/(inputObject.CyearsPaid*365);

  // calculates days to prolong
  let toProlong = (amountRemaining*365)/inputObject.CdestinationPackagePrice; 

  // destination Package hasn't expiration date (newProject)
  if (!inputObject.CdestinationExpiration) {
   const newExpirationDate = date.newExp(toProlong);
   newExpirationDateElem.value = newExpirationDate;
  }

  // destination Package has expiration date
  if (inputObject.CdestinationExpiration) { 
    let daysToDestExpiry = Math.ceil((new Date(inputObject.CdestinationExpiration).getTime() - new Date().getTime())/(24*60*60*1000));
    let daysTotal = parseInt(toProlong) + parseInt(daysToDestExpiry);
    console.log(toProlong, daysToDestExpiry, daysTotal)
    let newExpirationDate = date.newExp(daysTotal);
    newExpirationDateElem.value = newExpirationDate;
  }
    // Gives values to the result inputs
  amountRemainingElem.value = amountRemaining.toFixed(2);
  daysRemainingElem.value = daysRemaining;
  

  if(isFinite(amountRemaining) || amountRemaining < amountPaid) {      
    note.textContent =
    `Hello, 
    user wants to move premium package ${inputObject.CoriginalType} to another type of project.

    Original project: ${inputObject.CoriginalProject}
    New project: ${inputObject.CdestinationProject}

    Please activate the ${inputObject.CdestinationType} package with the expiration date: ${newExpirationDateElem.value}
    Later on I will move the domain and mailboxes, put note into tools and cancel the pp on the original project. 

    Thank you
    `;   

   } 
   // hide LOADER



  document.getElementById('loading').classList.add("hidden");      // hide LOADER
  document.getElementById('results').classList.remove("hidden");
  let resultsMove= document.getElementsByClassName
  ('js-results-move');
  removeHidden(resultsMove);


};  //function calculateMove

// Event Calculate Move

const formMove = document.querySelector(".form__move")
formMove.addEventListener("submit", (e) => {
  e.preventDefault();
  // Show LOADER 
  document.getElementById('loading').classList.remove("hidden");
  setTimeout(calculateMove, 1500);
});


    ///////////////////
    //Calculate Upgrade --------------------

const calculateUpgrade = () => {
  // Populate object with inputs with value

  for(var i =0; i<inputs.length; i++) {
    if(inputs[i].value) {   //only if the input has a value
      inputObject[inputs[i].id] = inputs[i].value;   // populates object   
      inputClassLists[i] = inputs[i].parentElement.classList; 
    }       
  }; 
  
    // Computes the days Remaining
  let daysRemaining = Math.ceil((new Date(inputObject.UoriginalExpiration).getTime() - new Date().getTime())/(24*60*60*1000)); 
    // Computes the amountRemaining
  let amountRemaining = (daysRemaining*inputObject.UamountPaid)/(inputObject.UyearsPaid*365);

  // calculates days to prolong
  let toProlong = (amountRemaining*365)/inputObject.UfinalPackagePrice; 

  
   const newExpirationDate = date.newExp(toProlong);
   newExpirationDateElem.value = newExpirationDate;
  

  
    // Gives values to the result inputs
  amountRemainingElem.value = amountRemaining.toFixed(2);
  daysRemainingElem.value = daysRemaining;
  

  if(isFinite(amountRemaining) || amountRemaining < amountPaid) {      
    note.textContent =
    `Hello, 
    user wants to change the ${inputObject.UoriginalType}  premium package to a ${inputObject.UfinalType} premium package.

    Original project: ${inputObject.UProject}
    

    Please activate the ${inputObject.UfinalType} package with the expiration date: ${newExpirationDateElem.value}
    Later on I will put a note in the ticket and the project. 

    Thank you
    `;   

   } 
   // hide LOADER



  document.getElementById('loading').classList.add("hidden");      // hide LOADER
  document.getElementById('results').classList.remove("hidden");
  let resultsMove= document.getElementsByClassName
  ('js-results-upgrade');
  removeHidden(resultsMove);


};  //function calculateUpgrade

// Event Calculate Upgrade

const formUpgrade = document.querySelector(".form__upgrade");
formUpgrade.addEventListener("submit", (e) => {
  e.preventDefault();
  // Show LOADER 
  document.getElementById('loading').classList.remove("hidden");
  setTimeout(calculateUpgrade, 1500);
});

  // Calculate Prolong ----------------------------------

  const calculateProlong = () => {
    // Populate object with inputs with value
  
    for(var i =0; i<inputs.length; i++) {
      if(inputs[i].value) {   //only if the input has a value
        inputObject[inputs[i].id] = inputs[i].value;   // populates object  
        inputClassLists[i] = inputs[i].parentElement.classList; 
      }       
    }; 
        
    // calculates days to prolong
    let toProlong = parseInt(inputObject.PdaysProlong); 
  
    // destination Package hasn't expiration date (newProject)
    if (!inputObject.PdestinationExpiration) {
     const newExpirationDate = date.newExp(inputObject.PdaysProlong);
     newExpirationDateElem.value = newExpirationDate;
    }
  
    // destination Package has expiration date
    if (inputObject.PdestinationExpiration) { 
      let daysToDestExpiry = Math.ceil((new Date(inputObject.PdestinationExpiration).getTime() - new Date().getTime())/(24*60*60*1000));
      let daysTotal = toProlong + daysToDestExpiry;
      console.log(toProlong, daysToDestExpiry, daysTotal)
      let newExpirationDate = date.newExp(daysTotal);
      newExpirationDateElem.value = newExpirationDate;
    }   
         
      note.textContent =
      `Hello, 
        
      Project: ${inputObject.PdestinationProject}
  
      Please prolong the ${inputObject.PdestinationType} package with the expiration date: ${newExpirationDateElem.value}
      Later on I will  put note into tools. 
  
      Thank you
      `;   
  
     // hide LOADER
    document.getElementById('loading').classList.add("hidden");      
    // Show Results
    document.getElementById('results').classList.remove("hidden");
    let resultsprolong= document.getElementsByClassName
    ('js-results-prolong');
    removeHidden(resultsprolong);
  
  };  //function calculateProlong
  
  // Event Calculate Prolong
  
  const formProlong = document.querySelector(".form__prolong");
  formProlong.addEventListener("submit", (e) => {
    e.preventDefault();
    // Show LOADER 
    document.getElementById('loading').classList.remove("hidden");
    setTimeout(calculateProlong, 1500);
  });
  


  // function to remove class hidden from an HTMLcollection ()

  var removeHidden = (resCollection) => {
    for (i = 0; i < resCollection.length; i++){
      resCollection[i].classList.remove('hidden');
    }
  };

  // Copy To Clipboard Event function

  var btnCopy = document.querySelector(".js-btn--copy");

  btnCopy.addEventListener("click", function (e) {
    var el = document.createElement('textarea');  // Create a <textarea> element
    el.value = note.textContent;                                 // Set its value to the string that you want copied
    el.setAttribute('readonly', '');                // Make it readonly to be tamper-proof
    el.style.position = 'absolute';
    el.style.left = '-9999px';                      // Move outside the screen to make it invisible
    document.body.appendChild(el);                  // Append the <textarea> element to the HTML document
    const selected =
      document.getSelection().rangeCount > 0        // Check if there is any content selected previously
        ? document.getSelection().getRangeAt(0)     // Store selection if found
        : false;                                    // Mark as false to know no selection existed before
    el.select();                                    // Select the <textarea> content
    document.execCommand('copy');                   // Copy - only works as a result of a user action (e.g. click events)
    document.body.removeChild(el);                  // Remove the <textarea> element
    if (selected) {                                 // If a selection existed before copying
      document.getSelection().removeAllRanges();    // Unselect everything on the HTML document
      document.getSelection().addRange(selected);   // Restore the original selection
    }
  });


  // Reset Button
  formVoucher.addEventListener("click", function(e) {
    if(e.target.classList.contains("js-btn--reset")){
      e.preventDefault();
      formVoucher.reset();
      inputObject = {};
    }
  });
  formMove.addEventListener("click", function(e) {
    if(e.target.classList.contains("js-btn--reset")){
      e.preventDefault();
      formMove.reset();
      inputObject = {};
    }
  });  

formProlong.addEventListener("click", function(e) {
  if(e.target.classList.contains("js-btn--reset")){
    e.preventDefault();
    formProlong.reset();
    inputObject = {};
  }
});

// Reload

function reloadPage() {
  document.getElementById("reload").addEventListener("click", (e) => {
    e.preventDefault();
    location.reload();
  });
}



// Date prototype add days to date and get the new Espiry date
Date.prototype.newExp = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
}

  // Show error //
  function showError(error) {
    const errorDiv =document.createElement('div');
  
    // Get Elements
    const heading = document.querySelector('.page__title')
    ;
    const cont = document.querySelector(".page__content")
  
    //Add class
    errorDiv.className = "page__error";
  
    // Create textNode and append to div
    errorDiv.appendChild(document.createTextNode(error));
  
    // Insert error above heading
    cont.insertBefore(errorDiv, heading);
  
    // Clear Error after 3 secs
    setTimeout(clearError, 3000);
  }
  
  function clearError () {
    document.querySelector('.page__error').remove();
  }

}); // DOMContentLoaded

