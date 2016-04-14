function checkExpense(){
	var nameToAdd = document.getElementById('addPeopleNames');
	var addExpense = document.getElementById('addExpense');
	var total = document.getElementById('total');
	var result = document.getElementById('results');
	var totalMemebers = 0;
	var totalAmount = 0;
	var nameAmount = [];
	document.getElementById('divide').display = 'none';

	document.getElementById('addPeople').addEventListener('click', function(){
		totalMemebers++;
		var divide = document.getElementById('divide');
		if(totalMemebers>0){
			divide.display = 'block';
		}
		var addExpenseDiv = document.createElement('div');
		var name = nameToAdd.value;
		nameToAdd.value = "";
		var man = document.createElement('p');
		var expTB = document.createElement('input');
		expTB.type = 'text';
		var addIndividualExp = document.createElement('input');
		addIndividualExp.type = 'button';
		addIndividualExp.value = "  +  ";

		var subIndividualExp = document.createElement('input');
		subIndividualExp.type = 'button';
		subIndividualExp.value = "  -  ";

		man.innerHTML = name;
		var indInvestment = document.createElement('p');
		indInvestment.addClass = "indTotal";

		nameAmount.push(Object.create({'name':name,'amount':0, 'bal':0}));

		addIndividualExp.addEventListener('click', function(){
			if(expTB.value != null || expTB.value!=NaN){
				for(var i = 0; i < nameAmount.length ; i++){
					if(nameAmount[i].name == name) {
						nameAmount[i].amount += parseInt(expTB.value);
						totalAmount += parseInt(expTB.value);
					expTB.value = "0";
					indInvestment.innerHTML = nameAmount[i].amount;
					total.innerHTML = "Total : " + totalAmount;
					}
				}
			}
		});

		

		subIndividualExp.addEventListener('click', function(){
			if(expTB.value != null || expTB.value!=NaN){
				for(var i = 0; i < nameAmount.length ; i++){
					if(nameAmount[i].name == name) {
						nameAmount[i].amount -= parseInt(expTB.value);
						totalAmount -= parseInt(expTB.value);
					expTB.value = "0";
					indInvestment.innerHTML = nameAmount[i].amount;
					total.innerHTML = "Total : " + totalAmount;
					}
				}
			}
		});

		addExpenseDiv.appendChild(man);
		addExpenseDiv.appendChild(expTB);
		addExpenseDiv.appendChild(addIndividualExp);
		addExpenseDiv.appendChild(subIndividualExp);
		addExpenseDiv.appendChild(indInvestment);
		addExpense.appendChild(addExpenseDiv);
		indInvestment.innerHTML = 0;
	});


	divide.addEventListener('click', function(){
		result.innerHTML = "";
		var perhead = Math.ceil(totalAmount/nameAmount.length);
		perhd = document.createElement('p');
		perhd.className = 'perHead';
		perhd.innerHTML = "Per Head Expense : " + perhead;
		result.appendChild(perhd);
		for(var i = 0; i < nameAmount.length ; i++){
			nameAmount[i].bal = perhead - nameAmount[i].amount;
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
	});
}
