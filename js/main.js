function checkExpense(){
	var nameToAdd = document.getElementById('addPeopleNames');
	var addExpense = document.getElementById('addExpense');
	var total = document.getElementById('total');
	var result = document.getElementById('results');
	var totalMemebers = 0;
	var totalAmount = 0;
	var nameAmount = [];
	var perhead = 0;
	var divide = document.getElementById('divide');
	var excel = document.getElementById('excel');

	document.getElementById('addPeople').addEventListener('click', function(){
		var nameArr = nameToAdd.value.split(',');
		if(nameToAdd.value == ''){
			nameArr = [];
		}
		nameToAdd.value = "";
		for(var i = 0 ; i < nameArr.length ; i++ ){
			pushPeople(nameArr[i]);
		}
	});


	divide.addEventListener('click', function(){
		result.innerHTML = "";
		perhead = Math.ceil(totalAmount/nameAmount.length);
		perhd = document.createElement('p');
		perhd.className = 'perHead';
		perhd.innerHTML = "Per Head Expense : " + perhead;
		result.appendChild(perhd);
		for(var i = 0; i < nameAmount.length ; i++){
			nameAmount[i].bal = perhead - nameAmount[i].total;
			var name = document.createElement('p');
			if(nameAmount[i].bal <= 0 ){
				name.className = 'green';
			}
			else{
				name.className = 'red';
			}
			name.innerHTML = nameAmount[i].name +' : '+ nameAmount[i].bal;
			result.appendChild(name);
		}
		excel.style.display = "block";
		document.getElementsByClassName('excel-label')[0].style.display = "block";
	});
	
	excel.addEventListener('click', function(){
		JSONToCSVConvertor(nameAmount, 'Split', true, totalAmount, perhead);
	});
	
	var pushPeople = function(namei){
		totalMemebers++;
			if(totalMemebers > 0){
				divide.style.display = 'block';
			}
			var addExpenseDiv = document.createElement('div');
			var name = namei;
			var man = document.createElement('p');
			var expTB = document.createElement('input');
			expTB.type = 'text';
			expTB.placeholder = "Add Expense seperated by comma (,)";
			var addIndividualExp = document.createElement('input');
			addIndividualExp.type = 'button';
			addIndividualExp.value = "  +  ";

			var subIndividualExp = document.createElement('input');
			subIndividualExp.type = 'button';
			subIndividualExp.value = "  -  ";

			man.innerHTML = name;
			var indInvestment = document.createElement('p');
			indInvestment.className = "indTotal";
			
			var trackArray = document.createElement('div');
			trackArray.className = "track-array";

			nameAmount.push({'name': name, 'amount': [], 'total': 0,'bal': 0});

			addIndividualExp.addEventListener('click', function(){
				if(expTB.value != null && expTB.value != ''){
					for(var i = 0; i < nameAmount.length ; i++){
						if(nameAmount[i].name == name) {
							var amtArr = expTB.value.split(',');
							for(var j = 0; j < amtArr.length ; j++){
								var amt = parseInt(amtArr[j]);
								if(amt != 0 && amt != NaN){
									nameAmount[i].amount.push(amt);
									nameAmount[i].total += amt;
									totalAmount += amt;
								}
							}
							expTB.value = "";
							indInvestment.innerHTML = nameAmount[i].total;
							trackArray.innerHTML = nameAmount[i].amount;
							total.innerHTML = "Total : " + totalAmount;
							break;
						}
					}
				}
			});

			

			subIndividualExp.addEventListener('click', function(){
				if(expTB.value != null && expTB.value != '' && expTB.value != undefined){
					for(var i = 0; i < nameAmount.length ; i++){
						if(nameAmount[i].name == name) {
							var amtArr = expTB.value.split(',');
							for(var j = 0 ; j < amtArr.length ; j++ ){
								var amt = parseInt(amtArr[j]);
								if(amt != 0 && amt != NaN){
									var removingIndex = nameAmount[i].amount.indexOf(amt);
									if(removingIndex >= 0){
										nameAmount[i].amount.splice(removingIndex, 1);
										nameAmount[i].total -= amt;
										totalAmount -= amt;
									}
								}
							}
							expTB.value = "";
							indInvestment.innerHTML = nameAmount[i].total;
							trackArray.innerHTML = nameAmount[i].amount;
							total.innerHTML = "Total : " + totalAmount;
							break;
						}
					}
				}
			});

			addExpenseDiv.appendChild(man);
			addExpenseDiv.appendChild(expTB);
			addExpenseDiv.appendChild(addIndividualExp);
			addExpenseDiv.appendChild(subIndividualExp);
			addExpenseDiv.appendChild(indInvestment);
			addExpenseDiv.appendChild(trackArray);
			addExpense.appendChild(addExpenseDiv);
			indInvestment.innerHTML = 0;
	}
}



function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel, totalAmount, perhead) {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    
    var CSV = '';    
    //Set Report title in first row or line
    
    CSV += ReportTitle + '\r\n\n';
	var maxAmtLen = 0;

    //This condition will generate the Label/Header
    if (ShowLabel) {
        var row = "";
        
        //This loop will extract the label from 1st index of on array
        for( var i = 0 ; i < arrData.length ; i++ ){
			row += arrData[i].name + ',';
			if(arrData[i].amount.length > maxAmtLen){
				maxAmtLen = arrData[i].amount.length;
			}
		}
        row = row.slice(0, -1);
        
        //append Label row with line break
        CSV += row + '\r\n';
    }
    
    for( var i = 0 ; i < maxAmtLen ; i++ ){
		row = "";
		for(var j = 0 ; j < arrData.length ; j++ ){
			if(arrData[j].amount.length > i){
				row += arrData[j].amount[i] + ",";
			}else{
				row += " ,";
			}
		}
		row = row.slice(0, -1);
		CSV += row + '\r\n';
	}
	row = '\r\n';
	for(var i = 0 ; i < arrData.length ; i++ ){
		row += arrData[i].total + ',';
	}
	row += ',,Total,' + totalAmount;
	CSV += row;
	row = '\r\n\n';
	for(var i = 0 ; i < arrData.length ; i++ ){
		row += arrData[i].bal + ',';
	}
	row += ',,Per Head,' + perhead;
	CSV += row;
    if (CSV == '') {        
        //alert("Invalid data");
        return;
    }   
    
    //Generate a file name
    var fileName = "MyReport_";
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName += ReportTitle.replace(/ /g,"_");   
    
    //Initialize file format you want csv or xls
    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
    
    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension    
    
    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");    
    link.href = uri;
    
    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";
    
    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}


/*



*/
