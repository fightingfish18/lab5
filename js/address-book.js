//William Smyth May
//2013-10-28
//Lab 5
//This is the JavaScript file to display the address book.

/* address-book.js
    this is where you will add your JavaScript to complete Lab 5
*/


/* sortObjArray()
    sorts an array of objects by a given property name
    the property values are compared using standard 
    operators, so this will work for string, numeric,
    boolean, or date values

    objArray        array of objects to sort
    propName        property name to sort by

    returns undefined (array is sorted in place)
*/
function sortObjArray(objArray, propName) {
    if (!objArray.sort)
        throw new Error('The objArray parameter does not seem to be an array (no sort method)');

    //sort the array supplying a custom compare function
    objArray.sort(function(a,b) {
        
        //note: this compares only one property of the objects
        //see the optional step where you can add support for 
        //a secondary sort key (i.e., sort by another property)
        //if the first property values are equal
        if (a[propName] < b[propName])
            return -1;
        else if (a[propName] === b[propName])
            return 0;
        else
            return 1;
    });
} //sortObjArray()

//Function to render the address book onto the page.
//accepts an array of people objects as a parameter.
function render(entries) {
	var temp = $(".template");
	var book = $(".address-book");
	book.empty(); //resets the content area to avoid superflous entries.
	for (var i = 0; i < entries.length; i++) { //loops over array to display people
		var item = temp.clone();
		var first = entries[i].first;
		var last = entries[i].last;
		item.find("span.last").html(last);
		item.find("span.first").html(first);
		item.find("p.title").html(entries[i].title);
		item.find("span.dept").html(entries[i].dept);
		item.find("img.pic").attr("src", entries[i].pic);
		item.find("img.pic").attr("alt", "Picture of ".concat(first).concat(" ").concat(last));
		item.removeClass("template");
		book.append(item);
	}
}

//Re-renders the content area when a different sort criteria is selected.
$(".sort-ui .btn").click(function() {
	var sortBtn = $(this);
	var data = sortBtn.attr('data-sortby');
	sortObjArray(Employees.entries, data);
	render(Employees.entries);
	sortBtn.siblings().removeClass("active");
	sortBtn.addClass("active");
});

//Page load function.
//Sorts the array by last name, then renders.
$(function() {
	sortObjArray(Employees.entries, "last");
	render(Employees.entries);
});
	

