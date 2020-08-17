// IDs of each DIV, which will have the type images added to it.
const ids = ['weak4x','weak2x','neutral','resist2x','resist4x','immune'];

// Name of every Pokemon type
const types = ['Bug','Dark','Dragon',
			   'Electric','Fairy','Fighting',
			   'Fire','Flying','Ghost',
			   'Grass','Ground','Ice',
			   'Normal','Poison','Psychic',
			   'Rock','Steel','Water'];
		
// Abilities which grant immunities / resistances		
const abilities = {
	'Fire' : {
		'dryskin' : 1,
		'thickfat' : 1,
		'heatproof' : 1,
		'fashfire' : 3
	},
	'Water' : {
		'dryskin' : 3,
		'stormdrain' : 3,
		'waterabsorb' : 3
	},
	'Ground' : {
		'levitate' : 3
	},
	'Electric' : {
		'lightningrod' : 3,
		'voltabsorb' : 3
	},
	'Grass' : {
		'sapsipper' : 3
	},
	'Ice' : {
		'thickfat' : 1
	}
};

// Adds weaknesses, resistances, etc. to the main form
function populatefields()
{
	// Clear the existing fields' content
	document.getElementById('weak4x').innerHTML = '';
	document.getElementById('weak2x').innerHTML = '';
	document.getElementById('neutral').innerHTML = '';
	document.getElementById('resist2x').innerHTML = '';
	document.getElementById('resist4x').innerHTML = '';
	document.getElementById('immune').innerHTML = '';
	
	// Iterate over each type
	for(type of types)
	{
		// -2 = 4x, -1 = 2x, 0 = 1, 1 = .5, 2 = .25, 3 = 0
		let temp = 0;
		
		// Iterate over each of our pokemon's types
		for(otyp of document.active.types)
		{
			// Switch on damage taken for primary type
			switch(typechart[otyp].damageTaken[type])
			{
				// Neutral
				case 0: 
					// Don't do anything
				break;
				// Weak
				case 1: 
					// -1 is single weakness
					temp--;
				break;
				// Resist
				case 2: 
					// +1 is single resist
					temp++;
				break;
				// Immune
				case 3: 
					temp = 3;
				break;
			}
			
			// If we are immune to this type, just keep going - type 2 does not matter
			if (temp == 3) continue;
		}
		
		/*
		// Iterate over our abilities
		for(key of document.active.abilities)
		{
			// Dereference ability
			let ability = document.active.abilities[key];
			
			
		}
		*/
		
		// Add the value for the type to combos
		switch(temp)
		{
			// 4x Weak
			case -2: 
				document.getElementById('weak4x').innerHTML += '<img src="img/sm/' + type + '.png" alt="' + type + '"></img>';
			break;
			// 2x Weak
			case -1:
				document.getElementById('weak2x').innerHTML += '<img src="img/sm/' + type + '.png" alt="' + type + '"></img>';
			break;
			// Neutral
			case 0: 
				document.getElementById('neutral').innerHTML += '<img src="img/sm/' + type + '.png" alt="' + type + '"></img>';
			break;
			// 2x Resist
			case 1: 
				document.getElementById('resist2x').innerHTML += '<img src="img/sm/' + type + '.png" alt="' + type + '"></img>';
			break;
			// 4x Resist
			case 2: 
				document.getElementById('resist4x').innerHTML += '<img src="img/sm/' + type + '.png" alt="' + type + '"></img>';
			break;
			// Immune
			case 3:
				document.getElementById('immune').innerHTML += '<img src="img/sm/' + type + '.png" alt="' + type + '"></img>';
			break;
		}
	}
}

// Searches for the pokemon written in the search bar,
// does nothing if multiple or zero items are returned. 
// If one and ONLY one item is returned, load it into the 
// tool. If manual is true, look for exact matches rather 
// than pokemon which include the text.
function searchspecies(manual)
{
	// Array of entries which match the search term
	matches = [];
	
	// Get the search term we are using
	term = document.getElementById('search').value;
	
	// Iterate over the pokedex
	for(key of Object.keys(pokedex))
	{
		// Dereference the key
		let dex = pokedex[key];
		
		// If the search button was clicked
		if(manual)
		{
			// If the search term exactly equals the pokemon's name (case insensitive)
			if(dex.name.toLowerCase() == term.toLowerCase())
			{
				// Add the matched name to the list
				matches.push(dex);
			}

		}
		// Search button was not clicked
		else
		{
			// If the term contains the pokemon's name (case insensitive)
			if(dex.name.toLowerCase().includes(term.toLowerCase()))
			{
				// Add the matched name to the list
				matches.push(dex);
			}
		}
	}

	// If there is exactly one match
	if(matches.length == 1)
	{
		// Load the pokemon into the tool
		document.active = matches.pop();
		
		// Run the weakness calculator
		populatefields();
	}
}

console.log('index.js loaded!');