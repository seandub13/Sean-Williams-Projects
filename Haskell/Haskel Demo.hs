import Data.List
import System.IO
import Data.Char
import Data.Map (fromListWith, toList)
import System.Environment

  
--Question 1
--Example to run = is_square 4
--Example to run = is_square 5

is_square  :: Int -> Bool
is_square x =  x `elem` sqrList x
sqrList :: (Num a, Enum a, Ord a) => a -> [a]
sqrList x = [n * n | n <- [1..x], n * n <= x]

--Question 2
--Example to run = freq_letter_pc "assignment"   
freq :: String -> [(Char, Int)]
freq x = [ (y,c) | y <- ['a'..'z'], let c = (length.filter (==y)) x, c>0 ]

countLetter :: String -> Int
countLetter x  = sum $ map snd (freq x)

freq_letter_pc :: String -> [(Char, Float)]
freq_letter_pc x = [ (char, fromIntegral(count) / fromIntegral(countLetter x)) | y <- freq (map toLower x), let (char,count) = y]

--Question 3
--Example to run A = get_city_above 5000000
--Example to run B = get_city "Spain"
--Example to run C = num_city 
type City_id = Int
type City_name = String
type City_population = Int
type Country_id = Int
type Country_name = String
type Cities=[(City_id,City_name,City_population,Country_id)]
type Country=[(Country_id,Country_name)]

cities :: Cities
country :: Country
cities =[(1,"Paris",7000000,1),(2,"London",8000000,2),(1,"Rome",3000000,3),(1,"Edinburgh",500000,2),(1,"Florence",50000,3),(1,"Venice",200000,3), (1,"Lyon",1000000,1),(1,"Milan",3000000,3),(1,"Madrid",6000000,4),(1,"Barcelona",5000000,4)]
country = [(1,"France"),(2,"UK"), (3,"Italy"), (4,"Spain")] 

get_city_above :: City_population -> [City_name]
get_city_above population = [ c | (i,c,p,x) <- cities, p>=population]

get_country :: [Country_id] -> [City_name]
get_country countryId = [ c | (i,c,p,id) <- cities, id `elem` countryId]

get_city :: Country_name -> [City_name]
get_city name = get_country([ i | (i,c) <- country, c == name])

get_country_name :: [Country_name]
get_country_name = map snd country

get4th :: (a, b, c, d) -> d
get4th (_,_,_,a) = a

get_country_id :: [Country_id]
get_country_id = map get4th cities

frequency :: (Ord a) => [a] -> [(a, Int)]
frequency xs = toList (fromListWith (+) [(x, 1) | x <- xs])

get_country_id2 :: [(Country_id, Int)]
get_country_id2 = frequency(get_country_id)

get_country_id2_num :: [Int]
get_country_id2_num = map snd get_country_id2

num_city :: [(Country_name, Int)]
num_city = zip get_country_name get_country_id2_num

--Question 4
--Example to run = eucl_dist [5,6,8] [3,4,5]
list_minus  :: [Float] -> [Float] -> [Float]
list_minus  a b = square(map (\(p, q) -> p - q) $ zip a b)

square :: [Float] -> [Float] 
square a  = map (^2) a

sumList :: [Float] -> Float 
sumList a = sum a

under :: [Float] -> [Float] -> [Float]
under a b = list_minus a b

total :: [Float] -> [Float] -> Float
total a b = sum(under a b)

eucl_dist :: [Float] -> [Float] -> Float
eucl_dist a b = sqrt (total a b)

--Question 5
--Example to run = get_lang "test.txt"
type Letter = String
type Position = Int
type AlphabetX=[(Letter,Position)]
alphabet :: AlphabetX
alphabet = [("a",0),("b",1), ("c",2), ("d",3), ("e",4), ("f",5), ("g",6), ("h",7), ("i",8), ("j",9), ("k",10), ("l",11), ("m",12), ("n",13), ("o",14), ("p",15), ("q",16), ("r",17), ("s",18), ("t",19), ("u",20),("v",21), ("w",22), ("x",23), ("y",24), ("z",25)] 

get_letter :: Letter -> [Position]
get_letter word = [ n | (l,n) <- alphabet, l==word]

splitWord :: String -> [String]
splitWord word = map (\c -> [c]) word

lowerString :: [Char] -> [String]
lowerString str = splitWord([ toLower loweredString | loweredString <- str])

get_word_total :: [Char] -> [[Position]]
get_word_total x = map get_letter (lowerString x)

remove_empty_spaces :: [Char] -> [Position]
remove_empty_spaces x = concat(filter (not . null) (get_word_total x))

eng_freq :: [Float]
eng_freq = [8.12,1.49,2.71,4.32,12.02,2.30,2.03,5.92,7.31,0.10,0.69,3.98,2.61,6.95,7.68,1.82,0.11,6.02,6.28,9.10,2.88,1.11,2.09,0.17,2.11,0.07]

pt_freq :: [Float]
pt_freq = [12.21, 1.01, 3.35, 4.21, 13.19, 1.07, 1.08, 1.22, 5.49, 0.30, 0.13, 3.00, 5.07, 5.02, 10.22, 3.01, 1.10, 6.73, 7.35, 5.07, 4.46, 1.72, 0.05, 0.28, 0.04, 0.45]

search :: [Int] -> [a] -> [a]
search x xs = [xs!!y | y <- x]

text_total :: [Char] -> [Position]
text_total x = remove_empty_spaces x

search_eng :: [Char] -> Float
search_eng x = sum(search (text_total x) eng_freq)

search_pt :: [Char] -> Float
search_pt x = sum(search (text_total x) pt_freq)

lang_calc :: String -> String
lang_calc x 
    | ((search_eng x) > (search_pt x)) = "The text is in English"
    | ((search_eng x) < (search_pt x)) = "The text is in Portuguese"
    | otherwise = "Test returned equal results"

get_lang :: FilePath -> IO ()
get_lang x = do
    theInput <- readFile x
    putStrLn (lang_calc theInput)

--Question 6
--Example to run = c_decrypt 2 "test.txt" 
main = do  
   [filename,index] <- getArgs
   contents <- readFile filename  
   writeFile (filename++".chp") (encode (read index :: Int) contents)

let2int :: Char -> Int
let2int c = ord c - ord 'a'

int2let :: Int -> Char
int2let n = chr(ord 'a' + n)

shift :: Int -> Char -> Char
shift n c
 | isLower c = int2let ((let2int c + n) `mod` 26)
 | otherwise = c
 
encode :: Int -> String -> String
encode n s = [shift n c | c <- s]

decrypt :: Int -> String -> String
decrypt n s = [shift_rev n c | c <- s]

shift_rev :: Int -> Char -> Char
shift_rev n c
 | isLower c = int2let ((let2int c - n) `mod` 26)
 | otherwise = c

c_decrypt :: Int -> FilePath -> IO ()
c_decrypt n s = do
    theInput <- readFile s
    putStrLn (decrypt n theInput)

--Question 7
--Note: takes awhile to create the dictionary but it works
--Example to run A = create_dictionary
--Example to run B = guess_index "test2.txt"
create_dictionary :: IO [Char]
create_dictionary = do
    dorian <- readFile "dorian.txt"
    let dorian_words = words dorian
    pride <- readFile "pride.txt"
    let pride_words = words pride
    ulysses <- readFile "ulysses.txt"
    let ulysses_words = words ulysses
    let total_words = concat[dorian_words,pride_words,ulysses_words]
    let lowerWords = map lowerStringDict total_words
    let dictionary = remove_Dup lowerWords
    dictionaryFile <- openFile "dict.txt" WriteMode
    hPrint dictionaryFile dictionary
    hClose dictionaryFile
    return "Dictionary created"

remove_Dup :: (Eq a) => [a] -> [a]
remove_Dup list = remDups list []
remDups :: (Eq a) => [a] -> [a] -> [a]
remDups [] _ = []
remDups (x:xs) list2
    | (x `elem` list2) = remDups xs list2
    | otherwise = x : remDups xs (x:list2)

lowerStringDict :: [Char] -> [Char]
lowerStringDict str = [ toLower loweredString | loweredString <- str]

numAppear :: Ord a => a -> [a] -> Integer
numAppear _ [] = 0
numAppear x list = sum $ map (\a -> 1) $ filter (== x) list

guess_index :: FilePath -> IO ()
guess_index  x = do
    file <- readFile x
    dict <- readFile "dict.txt"
    let dict_words =  words dict
    let noPunc =  map removePunc dict_words
    let sentance = decryptTotal file
    let all_words = map words sentance
    let puncWords = noPunc
    let replaceComma = map newLine noPunc
    let dictString = head replaceComma
    let dictStringList = words dictString
    let matcher = map (\y -> matches (getElm y all_words) dictStringList ) [1..26]
    let cipherCode = (head $ filter ((== maximum matcher) . (matcher !!)) [0..])+1
    let code = decrypt cipherCode file
    let decryptCode = 26 - cipherCode
    putStrLn $ "The code was encrypted with the number :"
    putStrLn ( show cipherCode)
    putStrLn $ "The answer was : "
    putStrLn ( show code)

getElm :: Int -> [a] -> a
getElm x xs = last (take x xs)

matches :: Eq a => [a] -> [a] -> Int
matches x y = length (intersect x y)


removePunc :: String -> String
removePunc xs = [x | x <- xs, not (x `elem` ".?!-:;\"")]

replace :: Eq a => a -> a -> [a] -> [a]
replace a b = map $ \c -> if c == a then b else c


newLine :: [Char] -> [Char]
newLine xs = [if x `elem` "," then ' ' else toLower x | x<-xs]

decryptTotal :: String -> [String]
decryptTotal y = map (\x -> decrypt x y ) [1..26]

--Question 8
--Example to run = get_area_circle 
get_area_circle :: IO ()
get_area_circle = do
    putStrLn "Select Radius, Diameters or Circumference: "
    answer <- getLine
    let option = answer
    putStrLn $ "Enter " ++ answer
    number <- getLine
    let numberFloat = read number :: Float
    let calc = calculate_circle option numberFloat
    if calc == -1 then putStr "Error, please enter correct option\n" else putStrLn ( show calc)

calculate_circle :: Floating a => [Char] -> a -> a
calculate_circle x n
    | (x == "Radius")  = pi * n ^ 2 /4
    | (x == "radius")  = pi * n ^ 2 /4
    | (x == "Diameters")  = pi * (n/2) ^ 2 /4
    | (x == "diameters")  = pi * (n/2) ^ 2 /4
    | (x == "Circumference")  = 2 * pi * n /4
    | (x == "circumference")  = 2 * pi * n /4
    | otherwise = -1


--Question 9
--Example to run A = math_series sample_series 3
--Example to run B = math_series question_9  5
math_series :: (a ->  b) -> a -> b
math_series a b =  a b

sample_series :: (Fractional p, Integral t) => t -> p
sample_series 0 = 0
sample_series n = 1 / (2^(n-1) ) + sample_series (n - 1)

question_9 :: (Eq p, Floating p) => p -> p
question_9 0 = 0
question_9 n = (((-1)**((n)+1))*(4 / ((2*(n))-1))) + question_9 (n-1)



--Question 10
--Not working, I could not under stand the question or what it was asking me to do
integral _ _ _ 0 = 0
integral fun x1 x2 n  = ((x2-x1)/n)  -- + integral (n-1)

f x = x/2

qsort :: Ord a => [a] -> [a]
qsort []     = []
qsort (x:xs) = qsort list1 ++ [x] ++ qsort list2
    where
        list1  = filter (< x) xs
        list2 = filter (>= x) xs

first_n_evens :: (Num a, Enum a) => Int -> [a]
first_n_evens n = take n [2,4..]

mistery :: (Ord a) => [a] -> Bool
mistery [] = True
mistery [x] = True
mistery (x:y:xs) = x <= y && mistery (y:xs) 