/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people) 
{

  //getting the list of all people
  var people = data;


  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  switch(searchType)
  {
    case 'yes':
	    // TODO: search by name
	    searchByName(people);
	    break;
    case 'no':
    // TODO: search by traits
	    searchByTrait(people);
	    break;
    default:
	    app(people); // restart app
	    break;
  }
}

//function that will automatically show the entire list of people

function listofallpeople()
{
  var people = data;

      // Create the list element:
      var list = document.createElement('ul');
      
          for(var i = 0; i < people.length; i++) 
          {
              // Create the list item:
              var item = document.createElement('li');
      
              // Set its contents:
              //item.appendChild(document.createTextNode(people[i]));
              item.appendChild(document.createTextNode(i));
              item.appendChild(document.createTextNode("    "));
              item.appendChild(document.createTextNode(people[i].firstName));
              item.appendChild(document.createTextNode("    "));
              item.appendChild(document.createTextNode(people[i].lastName));
      
              // Add it to the list:
              list.appendChild(item);
          }
      
          // Finally, return the constructed list:
          //return list;

          //alright list is ready. put it in the div.
          //$("#target").append("<ul id='list'></ul>");
          //document.getElementById('foo').appendChild(makeUL(options[0]));
          document.getElementById('allpeopledisplay').appendChild(list);
}

//function that shows people details
//showpeopledetails
function showpeopledetails(person)
{
  document.getElementById('showpeopledetails').appendChild(document.createTextNode("Information about Person :"));
  document.getElementById('showpeopledetails').appendChild(document.createTextNode( person.firstName + " " + person.lastName ));
  document.getElementById('showpeopledetails').appendChild(document.createTextNode(person.gender));
  document.getElementById('showpeopledetails').appendChild(document.createTextNode(person.dob));
  document.getElementById('showpeopledetails').appendChild(document.createTextNode(person.height));
  document.getElementById('showpeopledetails').appendChild(document.createTextNode(person.weight));
}

//show family of person
function showpersonfamily(person)
{
  document.getElementById('showpeopledetails').appendChild(document.createTextNode("Family of Person :"));
  //get parents
  var parentlist = person.parents;
  if(parentlist.length > 0)
  {
    document.getElementById('showpeopledetails').appendChild(document.createTextNode("First Parent"+parentlist[0]));
    document.getElementById('showpeopledetails').appendChild(document.createTextNode("Second Parent"+parentlist[1]));
    
  }
  else
  {
    document.getElementById('showpeopledetails').appendChild(document.createTextNode("This person has no parents"));
  }

  //get spouse
  var spouselist = person.currentSpouse;
  if(spouselist == null)
  {
    document.getElementById('showpeopledetails').appendChild(document.createTextNode("This person has no spouse"));
  }
  else
  {
    document.getElementById('showpeopledetails').appendChild(document.createTextNode("Spouse is " + spouselist));
  }

}

// Menu function to call once you find who you are lo oking for
function mainMenu(person, people)
{

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  var displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption)
  {
    case "info":
    // TODO: get person's info
      //document.getElementById('allpeopledisplay').appendChild(list);

      //first clear all the items previousl printed
      document.getElementById('showpeopledetails').innerHTML = "";

      showpeopledetails(person); 

    break;
    case "family":
    // TODO: get person's family

    document.getElementById('showpeopledetails').innerHTML = "";
      showpersonfamily(person);
    break;
    case "descendants":
    // TODO: get person's descendants
    getDescendants(person, people);
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

function searchByName(people)
{
  var firstName = promptFor("What is the person's first name?", chars);
  var lastName = promptFor("What is the person's last name?", chars);
  var person = null;
  // TODO: find the person using the name they entered

  for(var i = 0; i < people.length; ++i) 
  {
    if( firstName.toLowerCase() == people[i].firstName.toLowerCase() && lastName.toLowerCase() == people[i].lastName.toLowerCase() ) 
    {
  		person = people[i];
  		break;
  	}
  }
  mainMenu(person, people);
}



function searchByTrait(people)
{

  var traitToSearch = promptFor("What is the trait you want to search for - age or no or height or gender or weight?", chars);

  switch(traitToSearch)
  {
    case 'age':
    var getAges = filterByAge(people);
    if(getAges.length > 0)
    {
      alert("we found " + getAges.length + "people with the age you entered");
    }
    else
    {
      alert("we did not find anyone with that age");
    }
    break;
    case 'no':
      searchByPreference(people);
  case 'height':
    var getHeight = filterByHeight(people);
    if(getHeight.length > 0)
    {
      alert("we found " + getHeight.length + "people with the height you entered");
    }
    else
    {
      alert("we did not find anyone with that height");
    }
    break;
  case 'gender':
    var getGender = filterByGender(people);
    if(getGender.length > 0)
    {
      alert("we found " + getGender.length + "people with the gender you entered");
    }
    else
    {
      alert("we did not find anyone with that gender");
    }    
    break;
  case 'weight':
     var getWeight = filterByWeight(people);  
     if(getWeight.length > 0)
     {
       alert("we found " + getWeight.length + "people with the weight you entered");
     }
     else
     {
       alert("we did not find anyone with that height");
     }
    break;
  default:
    app(people);
  }

  //filterByAge(people)

  function filterByAge(people)
  {
    //var traitToSearch = promptFor("What is the trait you want to search for - age or no or height or gender or weight?", chars);
    var ageSearch = promptFor("Enter the age",chars);

    //ages.filter(checkAdult);
    //using the filter function
    var peopleAgeCollection = people.filter(checkAge);

      //check age and return the person
      function checkAge(person)
      {
        var age = ageGet(person.dob);
        if(age == ageSearch)
        {
          return person;
        }
      }//end of function checkAge

      return peopleAgeCollection;
  }



  //function that will return the age based on the individuals date of birth
  function ageGet(dateString)
  {
    return new Date().getFullYear() - new Date(dateString).getFullYear()
  }

  //filterByHeight(people)

  function filterByHeight(people)
  {
    //var traitToSearch = promptFor("What is the trait you want to search for - age or no or height or gender or weight?", chars);
    var heightSearch = promptFor("Enter the height",chars);

    //ages.filter(checkAdult);
    //using the filter function
    var peopleHeightCollection = people.filter(checkHeight);

      //check age and return the person
      function checkHeight(person)
      {
        var Height = person.height;
        if(Height == heightSearch)
        {
          return person;
        }
      }//end of function checkAge

      return peopleHeightCollection;
  }
  //filterByGender(people)

  function filterByGender(people)
  {
    //var traitToSearch = promptFor("What is the trait you want to search for - age or no or height or gender or weight?", chars);
    var genderSearch = promptFor("Enter the gender",chars);

    //ages.filter(checkAdult);
    //using the filter function
    var peopleGenderCollection = people.filter(checkGender);

      //check age and return the person
      function checkGender(person)
      {
        var Gender = person.gender;
        if(Gender == genderSearch)
        {
          return person;
        }
      }//end of function checkAge

      return peopleGenderCollection;
  }
  //filterByWeight

  function filterByWeight(people)
  {
    //var traitToSearch = promptFor("What is the trait you want to search for - age or no or height or gender or weight?", chars);
    var weightSearch = promptFor("Enter the weight",chars);

    //ages.filter(checkAdult);
    //using the filter function
    var peopleWeightCollection = people.filter(checkWeight);

      //check age and return the person
      function checkWeight(person)
      {
        var Weight = person.weight;
        if(Weight == weightSearch)
        {
          return person;
        }
      }//end of function checkAge

      return peopleWeightCollection;
  }
  /*
  existing code stuff
  case 'age':
        var getAges = filterByAge(people);
        break;
 -    case 'no':
 -      searchByPreference(people);
 +    case 'height':
 +      var getHeight = filterByHeight(people);
 +      break;
 +    case 'gender':
 +      var getGender = filterByGender(people);
 +      break;
 +    case 'weight':
 +      var getWeight = filterByWeight(people);  
        break;
      default:
        app(people);


 function filterByEyeColor(people){
        var userInput = prompt("Do you know person's eyecolor?"); 
    if(userInput == "yes"){
 -    var height = prompt("what is the person's eyecolor?");
 +    var eyeColor = prompt("what is the person's eyecolor?");
     
      var filteredPeople = people.filter(function(element){
 -      var elementeyecolor = element.eyecolor;
 -      if(elementEyeColor === eyecolor){
 +      var elementEyeColor = element.eyeColor;
 +      if(elementEyeColor === eyeColor){
          return true;
        }
      });
      
      
code for filter by age:  function filterByAge(people){
 -  var userInput = prompt("Do you know person's age?");
 +  var userInput = prompt("Do you know person's age?"); 
    if(userInput == "yes"){
      var age = prompt("what is the person's age?");
 -    var filteredPeople = people.filter(element){
 -      if(element.dob === age){
 +   
 +    var filteredPeople = people.filter(function(element){
 +      var elementAge = getPersonAge(element);
 +      if(elementAge === age){
          return true;
  */
}

// alerts a list of people
function displayPeople(people)
{
  alert(people.map(function(person)
  {
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person)
{
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  var personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  // TODO: finish getting the rest of the information to display
  alert(personInfo);
}

function getDescendants(person, people) 
{
	var elders = [person.id];
	var descendants = [];
	console.log(people.length);
  for(var i = 0; i < people.length; ++i) 
  {
		console.log(people[i].id);
    if(person.id == people[i].id) 
    {
			console.log("We continued");
			continue;
		}

    for(var j = 0; j < people[i].parents.length; ++j) 
    {
			console.log(people[i].parents[j]);
      if(elders.indexOf(people[i].parents[j]) >= 0) 
      {
				elders.push(people[i].parents[j]);
				descendants.push(people[i]);
				break;
			}
		}
		
	}//end of people loop
  for(var i = 0; i < descendants.length; ++i) 
  {
		displayPerson(descendants[i]);
  }//end of descendants loop
  
  if(descendants.length == 0)
  {
    alert("this person has no descendants");
  }
	mainMenu(person, people)
}//end of getDescendants

// function that prompts and validates user input
function promptFor(question, valid)
{
  do
  {
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input)
{
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input)
{
  return true; // default validation only
}


/*

https://www.w3schools.com/jsref/jsref_map.asp

https://www.w3schools.com/jsref/jsref_filter.asp

*/