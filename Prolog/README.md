Example of Prolog scripts I have written.
Below I have also put a working sample of the code used to demo the functionality.

1: My code lists the airports of a country by the user entering the country name in X, then we use a findall Z to get all the cities that are listed with that country. 
Demo - list_airport(ireland,L). 

2: Trip takes in two cities and finds all the routes that start with the first city and end with the second city. If it is a direct flight it uses the 2nd trip and if its not it uses the 3rd. For non-direct flights it uses recursion and checks if the W (which is the new endpoint airport) is in the list of visited airports if it’s not it continues with the loop. 
Demo - trip(rome,dublin,T).

3: All_trip is the same as trip, but I used a findall of trip to get all the results and put them in T. The output is now shown as a list.
Demo - all_trip(rome,dublin,T).

4: Trip_dist is like Trip, the big difference is that we not only take in the flight start and end point, but we also take the distance. When it is a non-direct route the distance is added up over each recursion step.
Demo - trip_dist(rome,dublin,W).

5: Same as trip_dist but instead of getting the distance we are getting the cost.
Demo - trip_cost(rome,dublin,W).

6: Like trip_dist and cost but we are now counting the number of steps in the recursion and using that as the number of flights you have to change, if it is a direct flight the number of changes is 0. 
Demo - trip_change(rome,dublin,W)

7: No airline has two parts for it to work. First, we have all_trip_noairline which uses a findall of noairline to put all the results in a list, like all_trip. Then we have the second part noairline. It is similar to the previous trips, but we are passing in an airline we want to avoid. We then compare the airline to A1(which is the airline of the flight) and check if they are not equal.
Demo - all_trip_noairline(chigago,newyork,T,aa).

8: I tried this many times but could not get it to work. My idea behind it was to use findall for each category and then sort them by the lowest number. But I believe I had trouble with the syntax, so I was not able to get it to work.

9: trip to nation works in two parts, first we get the list of all the cities(H) in the county (Y). We then use go_trip which calls trip but uses the head of the cities where you would enter in the city you are arriving at. After trip we start go_trip again but this time passing in the tail of the list of cities.
Demo - trip_to_nation(rome,ireland,T). 

10: all_trip_to_nation uses findall on trip_to_nation to put them all in one list
Demo - all_trip_to_nation(rome,ireland,T).

11: The list of lists of blocks is entered into print_status(B), B is then passed to print_list. Print_list then calls print_list2 which now uses the first list of blocks and prints the head recursively. When the list in the first set of blocks is empty, it goes back to print_list passing in the original tail.
Demo - print_status([[b,c,f],[a,d,g],[h,e]]).

12: High takes in the blocks (B) and the block you want to get the height off (X). Get list is called using these two. Get list passes (X) and the head of (B) to on which through recursion counts the steps until a value in the head matches X.  If it does not match then get_list is called again but this time we are using the tail of B, creating the recursion. When X matches head in on, then it prints L which is the height of the block. 
Demo - high([[b,c,f],[a,d,g],[h,e]],c,H).

13: all_same_height is similar to high but instead I used to get_list2 and on2. When the height entered matches the height of L in on, then the block is printed back.
Demo - all_same_height([[b,c,f],[a,d,g],[h,e]],0,L).

14: In same_height we put in the list of blocks and two blocks (X) and (Y). We then use get_list3 with X which is like get_list but instead of writing the height, it returns it as return1.  We do this again but this time with Y and we get return2. We then compare Return1 and Return2 and if they are equal, we get true and if they are not we get false.
Demo - same_height([[b,c,f],[a,d,g],[h,e]],b,h).
