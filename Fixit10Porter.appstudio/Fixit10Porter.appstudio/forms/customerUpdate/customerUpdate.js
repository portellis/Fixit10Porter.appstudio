customerUpdate.onshow=function(){
    // get the data to populate the dropdown with names from database
    let query = "SELECT name FROM customer"
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=jpe13412&pass=" + pw + "&database=jpe13412&query=" + query)

    if (req.status == 200) { //transit worked.
            results = JSON.parse(req.responseText)
            // names now in results array - load names into the dropdown
            selToChange.clear()
            for (i = 0; i <= results.length - 1; i++)
                selToChange.addItem(results[i])
    } else {
        // transit error
        NSB.MsgBox(`Error: ${req.status}`);
    }  

}

btnUpdate.onclick=function(){
    let newName = inptUpdate.value
    let oldName = selToChange.value
    
    let found = false
    for (i = 0; i <= results.length - 1; i++) {
        // console.log(`FOUND IS false and name is ${results[i]}`)
        if (oldName == results[i]) {
            found = true
            break
        }
     }   
    if (found == false) 
       NSB.MsgBox("That customer name is not in the database.")
    else if (found == true) {
        query = "UPDATE customer SET name =" + '"' + newName + '"' + " WHERE name = " + '"' + oldName + '"'
        //alert(query)
        req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=jpe13412&pass=" + pw + "&database=jpe13412&query=" + query)

        if (req.status == 200) { //transit worked.
            if (req.responseText == 500) {   // means the update succeeded
                NSB.MsgBox(`You have successfully changed the customer name!`)
                // reset controls to original state
                inptUpdate.value = ""
                selToChange.value = ""
            } else
                NSB.MsgBox(`There was a problem changing the customer name.`)
        } else 
            // transit error
            NSB.MsgBox(`Error: ${req.status}`);
    } // found is true 
}
