$(function(){

	function randomString() {
	    var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
	    var str = '';
	    var i = 0;

	    for (i = 0; i < 10; i++) {
	        str += chars[Math.floor(Math.random() * chars.length)];
	    }
	    return str;
	}

	function Column(name) {
		var self = this; //dla funkcji zagnieżdżonych
		
		this.id = randomString(); // generowanie id
		this.name = name; 
		this.$element = createColumn(); // tworzony elem jQuery

		function createColumn() {  // tworzenie kolumny / składowe
			var $column = $('<div>').addClass('column'); // dodajemy klase column do diva 
			var $columnTitle = $('<h2>').addClass('column-title').text(self.name);  // kolmna dostaje test z właściwosci name
			var $columnCardList = $('<ul>').addClass('column-card-list');  // lista na kartki, ktora jest w kolumnie / tworzymy ul z klasą
			var $columnDelete = $('<button>').addClass('btn-delete').text('x');  // przycisk skasowania listy
			var $columnAddCard = $('<button>').addClass('add-card').text('Add card');  // dodawnia karty
	// zdarzenia 

			$columnDelete.click(function() {  //kasowanie kolumny po kliknieciu 
				self.removeColumn();  // funkcja znajduje sie w funkcji - dojscie przez self
			});

			$columnAddCard.click(function() {
				self.addCard(new Card(prompt("Your card name:"))); //uzytkownik dodaje nazwę 
			});

	// elementy kolumny - dodajemy tytul, przyciski, listę		
			$column.append($columnTitle)
					.append($columnDelete)
					.append($columnAddCard)
					.append($columnCardList);
			return $column;		
		}
	}
	// dodanie metod - dodanie klasy i funkcji
		Column.prototype = {
			addCard: function(card) {   // addCard Przyjmuje jako parametr kartę, którą chcemy dodać do kolumny. Dodajemy ją wybierając element kolumny (stąd this.$element). 
				this.$element.children('ul').append(card.$element);
			},
			removeColumn: function() {
				this.$element.remove();
			}
		};
	
	function Card(description) {
		var self = this;

		this.id = randomString();
		this.description = description;
		this.$element = createCard();

		function createCard () {
			var $card = $('<li>').addClass('card');
			var $cardDescription = $('<p>').addClass('card-description').text(self.description);
			var $cardDelete = $('<button>').addClass('btn-delete').text('x');

			$cardDelete.click(function(){
				self.removeCard();
			});

			$card
				.append($cardDelete)
				.append($cardDescription);
				return $card;	
		}
	}
	Card.prototype = {
		removeCard: function() {
			this.$element.remove();
		}
	}

	var board = {
		name: 'Kanban',
		addColumn: function(column) {  // Metoda ta ma za zadanie stworzyć kolumnę dzięki przypięciu jej elementu do elementu tablicy
			this.$element.append(column.$element);
			initSortable();
		},
		$element: $('#board .column-container')	
	}; 

	$('.create-column')
	  	.click(function(){
			var name = prompt('Choose name of your column');
			var column = new Column(name);
		    board.addColumn(column);
  		});

	function initSortable() {
	    $('.column-card-list')
	    	.sortable({
	      		connectWith: '.column-card-list',  // connectWith to atrybut, dzięki któremu możemy wybrać listę w której będzie działać sortowanie.
	      		placeholder: 'card-placeholder' //  trzyma nazwę klasy, która pojawia się po najechaniu na puste pole w które chcemy upuścić przenoszony element.
	    })
	    .disableSelection();
}	

// TWORZENIE KOLUMN
var todoColumn = new Column('To do');
var doingColumn = new Column('Doing');
var doneColumn = new Column('Done');

// DODAWANIE KOLUMN DO TABLICY
board.addColumn(todoColumn);
board.addColumn(doingColumn);
board.addColumn(doneColumn);

// TWORZENIE NOWYCH EGZEMPLARZY KART
var card1 = new Card('New task');
var card2 = new Card('Create kanban table');

// DODAWANIE KART DO KOLUMN
todoColumn.addCard(card1);
doingColumn.addCard(card2);

	
});	


