flight(london,dublin,aerlingus,500,45,150).
flight(rome,london,ba,1500,150,400).
flight(rome,paris,airfrance,1200,120,500). 
flight(paris,dublin,airfrance,600,60,200).
flight(berlin,moscow,lufthansa,3000,300,900).
flight(paris,amsterdam,airfrance,400,30,100).
flight(berlin,dublin,lufthansa,1200,120,900).
flight(london,newyork,ba,5000,700,1100).
flight(dublin,newyork,aerlingus,4500,360,800).
flight(dublin,cork,ryanair,300,50,50).
flight(dublin,rome,ryanair,2000,150,70).
flight(dublin,chicago,aerlingus,5500,480,890).
flight(amsterdam,hongkong,klm,7000,660,750).
flight(london,hongkong,ba,7500,700,1000).
flight(dublin,amsterdam,ryanair,1000,90,60).
flight(moscow,newyork,aerflot,9000,720,1000).
flight(moscow,hongkong,aerflot,5500,420,500).
flight(newyork,chicago,aa,3000,240,430).
flight(dublin,london,aerlingus,500,45,150).
flight(london,rome,ba,1500,150,400).
flight(paris,rome,airfrance,1200,120,500). 
flight(dublin,paris,airfrance,600,60,200).
flight(moscow,berlin,lufthansa,3000,300,900).
flight(amsterdam,paris,airfrance,400,30,100).
flight(dublin,berlin,lufthansa,1200,120,900).
flight(newyork,london,ba,5000,700,1100).
flight(newyork,dublin,aerlingus,4500,360,800).
flight(cork,dublin,ryanair,300,50,50).
flight(rome,dublin,ryanair,2000,150,70).
flight(chicago,dublin,aerlingus,5500,480,890).
flight(hongkong,amsterdam,klm,7000,660,750).
flight(hongkong,london,ba,7500,700,1000).
flight(amsterdam,dublin,ryanair,1000,90,60).
flight(newyork,moscow,aerflot,9000,720,1000).
flight(hongkong,moscow,aerflot,5500,420,500).
flight(chicago,newyork,aa,3000,240,430).

country(dublin,ireland).
country(cork,ireland).
country(london,uk).
country(rome,italy).
country(moscow,russia).
country(hongkong,china).
country(amsterdam,holland).
country(berlin,germany).
country(paris,france).
country(newyork,usa).
country(chicago,usa).

%!This  lists the airports of a country by the user entering the country name in X, then we use a findall Z to get all the cities that are listed with that country
list_airport(X, L) :-
    findall(Z, country(Z, X), L).

%! Trip takes in two cities and finds all the routes that start with the first city and end with the second city
trip(X,Y,L):-
	trip(X,Y,L,[X]).
%! Used for direct flights
trip(X,Y,[X,Y],L):- 
	\+member(Y,L),
	flight(X, Y, _, _, _, _).
%! Used for non direct flights, uses recursion and checks if the W (which is the new endpoint airport) is in the list of visited airports, if its not it continues with the loop
trip(X,Y,[X|Xs],L):- 
	flight(X, W, _, _, _, _),
	\+ member(W,L) ,
	trip(W,Y,Xs,[W|L]).
	
%! Same as trip but I used a findall to get all the results and put them in T
all_trip(X,Y,T):- findall([L], trip(X,Y,L), T).
	
%! 	
trip_dist(X,Y,[L,D]):-
	trip_dist(X,Y,[L,D],[X]).

trip_dist(X,Y,[[X,Y],D],L):- 
	\+member(Y,L),
	flight(X, Y, _, D, _, _).
	
trip_dist(X,Y,[[X|Xs],D],L):- 
	flight(X, W, _, D1, _, _),
	\+ member(W,L) ,
	trip_dist(W,Y,[Xs,D2],[W|L]),
	D is D1+D2.	

%! Same as trip_dist but instead of getting the distance we are getting the cost
trip_cost(X,Y,[L,C]):-
	trip_cost(X,Y,[L,C],[X]).

trip_cost(X,Y,[[X,Y],C],L):- 
	\+member(Y,L),
	flight(X, Y, _, _, _, C).
	
trip_cost(X,Y,[[X|Xs],C],L):- 
	flight(X, W, _, _, _, C1),
	\+ member(W,L) ,
	trip_cost(W,Y,[Xs,C2],[W|L]),
	C is C1+C2.

%! Similiar to trip_dist and cost but we are now counting the number of steps in the recursion and using that as the number of flights you have to change, if it is a direct flight the number of changes is 0
trip_change(X,Y,[L,C]):-
	trip_change(X,Y,[L,C],[X]).

trip_change(X,Y,[[X,Y],C],L):- 
	\+member(Y,L),
	flight(X, Y, _, _, _, _),
	C is 0.
	
trip_change(X,Y,[[X|Xs],C],L):- 
	flight(X, W, _, _, _, _),
	\+ member(W,L) ,
	trip_change(W,Y,[Xs,C2],[W|L]),
	C is 1+C2.	

%! noairline is the first step the find the all_trip_noairline, it is similiar to the previous trips but we are passing in an airline we want to avioud. We then compare the airline to A1( which is the airline of the flight) and check if they are not equal.
noairline(X,Y,L,A):-
	noairline(X,Y,L,A,[X]).

noairline(X,Y,[X,Y], A,L):- 
	\+member(Y,L),
	flight(X, Y, A1, _, _, _),
	A \=A1.
	
noairline(X,Y,[X|Xs],A,L):- 
	flight(X, W, A1, _, _, _),
	\+ member(W,L) ,
	A \=A1,
	noairline(W,Y,Xs,A,[W|L]).

%! all_trip_noairline uses the findall of noairline to return all the results in one
all_trip_noairline(X,Y,T, A):- findall([L], noairline(X,Y,L,A), T).

%! trip_to_nation works in two parts, first we get the list of all the cities(H) in the county (Y). We then use go_trip which calls trip but uses the head of the cities where you would enter in the city you are arriving at. 
%! After trip we start go_trip again but this time passing in the tail of the lsit of cities.	
trip_to_nation(X,Y,L)  :-
	list_airport(Y,H),
	go_trip(X,H,L).
go_trip(X,[H|T],L):-
	trip(X,H,L);
	go_trip(X,T,L).

%! Uses findall on trip_to_nation to put them all in one list
all_trip_to_nation(X,Y,T):- findall([L], trip_to_nation(X,Y,L), T).

%!The list of lists of blocks is entered into print_status(B), B is then passed to print_list. Print_list then calls print_list2 which now uses the first list of blocks, and prints the head recursively.
%!When the list in the first set of blocks is empty, it goes back to print_list passing in the original tail.
print_status([]).
print_status(B):-
	print_list(B).
	
print_list([H|T]) :-  write("|"),	print_list2(H,T),  print_list(T).
print_list2([P|W],T) :- write(P), write("|"), print_list2(W,T).
print_list2([],T) :- nl, print_list(T).

%! High takes in the blocks (B) and the block you want to get the height off (X). Get list is called using these two. Get list passes (X) and the head of (B) to on which through recursion counts the steps until a value in the head matches X.
%!If it does not match then get_list is called again but this time we are using the tail of B, creating the recursion. When X matches head in on, then it prints L which is the height of the block.
 high(B,X,L):-
	get_list(B,X).
 get_list([H|T],X):- 
	on(X,H,L), writeln(L);  
	get_list(T,X).
 
 on(Item,[Item|Rest],0).
 on(Item,[DisregardHead|Tail],L):-

          on(Item,Tail,N),
		  L is N +1.

%!all_same_height is similiar to high but instead I used get_list2 and on2. When the height entered matches the height of L in on, then the block is printed back
all_same_height(B,X,L):-
	get_list2(B,X).
 get_list2([H|T],X):- 
	on2(X,H,L), write(L);  
	get_list2(T,X). 
	

 on2(0,[Item|Rest],Item).
 on2(L,[DisregardHead|Tail],Item):-
          on2(N,Tail,Item),
		  L is N +1.
		  


%! In same_height we put in the list of blocks and two blocks (X) and (Y). We then use get_list3 with X which is similiar to get_list but instead of writing the height, it returns it as return1. 
%!We do this again but this time with Y and we get return2. We then compare Return1 and Return2 and if they are equal we get true and if they are not we get false
same_height(B,X,Y):-
	get_list3(B,X,Return1),
	get_list3(B,Y,Return2),
	Return1 == Return2.
get_list3([H|T],X,Return):- 
	on3(X,H,L),
	Return = L;
	get_list3(T,X,Return).
	
on3(Item,[Item|Rest],0).
 on3(Item,[DisregardHead|Tail],L):-

          on3(Item,Tail,N),
		  L is N +1.
		  

gen_list(0, [0]).
gen_list(X, [X|T]) :-
    X >= 0,
    X1 is X-1,
    gen_list(X1, T).
	
	

 
 
 
mistery([],[]).
mistery([X],[X]).
mistery([X,X|Xs],Zs) :- mistery([X|Xs],Zs).
mistery([X,Y|Ys],[X|Zs]) :- X \= Y, mistery([Y|Ys],Zs). 