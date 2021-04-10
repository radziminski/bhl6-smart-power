# Smart Power - Dokumentacja

## Zespół: Drineczki _( W. Łazarski, J. Radzimiński, J.Szumski, K. Kamieniarz )_

## 1. Analiza występujących procesów

Wcałymcyklugrzewczymwyróżniamydwagłówneprocesy:ogrzewaniewodyoraz
utrzymanie odpowiedniej temperatury. Są to dwa główne źródła, które generują
zapotrzebowanie na energię elektryczną. Dodatkowo mamy jeszcze pobór energii na
pozostałe urządzenia, jednak przyjmujemy, że jeston stały dla danych godzin operowania.

**Ogrzewanie wody:**
Zbiornik na wodę pozwala na nagromadzenie 150 litrów ciepłej wody.Średnie zużycie
dobowewodywynosi 180 litrów.Wtrakciecałegoprocesuzakładamy,żenaszzbiorniknie
traciciepławody,niepotrzebujemywięcenergiiabyutrzymaćjejtemperaturę.Zakładamy,
że w momencie włączenia nagrzewania nasz zbiornikwypełniony jest wodą.

**Utrzymanie temperatury w domu:**
Konsumpcjaenergiiprzezsystemogrzewaniawgłównejmierzezależnajestodtemperatury
panującej na zewnątrz. Determinuje ona tempo utraty ciepłaz domu oraz pobór mocy
wymagany na podniesienie temperatury o 1 stopień Celsjusza.
Dodatkowowdomu dostępnyjestrekuperator,który pozwalana wyrównywanieśredniej
temperatury między pokojami. System ogrzewania dąży do utrzymania temperatur
zdefiniowanych przez użytkownika.

Mamy dostępne następujące źródła energii elektrycznej:

- ogniwa fotowoltaiczne
- akumulator
- sieć elektryczną

## 2. Wybór i uzasadnienie podejścia

Zacznijmy od zdefiniowania sobie pewnego okresu czasowego T.

Następnie T dzielimy na równe okresy z których każdywynosi np. godzinę

W kolejnym kroku obliczamy wszystkie możliwe kombinacje pracy naszego systemu
zarządzania energią.

Gdzie mito tryb działania systemu

NastępniedlakażdegoodcinkaczasowegowTobliczamykosztwydanejenergiizsieciprzy
uwzględnionychparametrachwyjściowychzpoprzedniegoodcinkaczasowego(ilośćmocy


akumulatora, temperatura pomieszczenia) Dodatkowo wykorzystujemy OpenWeather API
aby prognozować pogodę i zachmurzenie na następnyodcinek czasowy.

Input: <br />
- temperatura pomieszczenia osiągnięta w poprzednimodcinku czasowym <br />
- wartość naładowania akumulatora osiągnięta w poprzednimodcinku czasowym <br />
- przewidywana temperatur dla nowo rozpatrywanego odcinkaczasowego <br />
(OpenWeather API)
- przewidywane zachmurzenia dla nowo rozpatrywanegoodcinka czasowego <br />
(OpenWeather API) <br />
Output:
- nowa temperatura pomieszczenia po odcinku czasowymprzy założeniu trybu _mi_ v
- nowa wartość mocy akumulatora przy założeniu trybu _mi_ <br />
- estymowana wartość kosztów energii dla danej iteracji <br />

Ostatecznie, sumujemy całkowity koszt energii elektrycznejz sieci dla całego ciągu trybów
działania

```
{m1 , m4 , m2 , m1 } → 5
{m2 , m1 , m2 , m4 } → 7
{m4 , m1 , m4 , m2 } → 6
{m1 , m1 , m3 , m3 } → 13
```

Jako tryb pracy systemu w następnym odcinku czasowymwybieramy pierwszy tryb z ciągu,
który zwrócił najmniejszy przewidywany koszt.

## 3. Sposób wykorzystania poszczególnych informacji i danych

Wszystkie dostępne informacje są wykorzystane w celu estymacji energii elektrycznej
którą użytkownik będzie zmuszony pobrać z sieci aby następnie wyliczyć koszty tego
poboru. Podane informacje tworzą nietrywialną funkcję, któranastępnieminimalizujemy
algorytmem opisanym wcześnie.

## 4. Wybór technologii, wymagania systemowe

Jako główną architekturą systemu zastosowaliśmy standardową architekturę webową
- klient-serwer. Klientem jest aplikacja webowa napisana w TypeScript przy użyciu
frameworkuReact.js.SerwerzostałnapisanywPythoniejakoformieRESTAPI,przyużyciu
frameworka Flask. Algorytmy użyte w funkcjach optymalizacyjnych również zostały
napisane w Pythonie jako oddzielne moduły wykorzystywane przez serwer. Całość
komunikacji odbywa się przy użyciu zapytań HTTP.
    Taka architektura pozwala na uruchomienie aplikacji na każdym urządzeniu
obsługującym przeglądarki internetowe. Dodatkowo, większość kalkulacji odbywasię na
oddzielnym serwerze(docelowo umieszczonym w chmurze) przez co mocobliczeniowa
danego urządzenia nie jest istotna. Serwer w chmurze pozwoliłby również na łatwe
przyłączanie kolejnych modułów / urządzeń do systemuw przyszłości.

## 5. Testowalność rozwiązania

Testy naszegosystemu polegałyby nastworzeniuscenariuszysymulacjisystemu i
monitorowaniarozwiązaniapodwzględemestymatykosztówwzględemludzkiegoustalania
trybówpracy.Oczywiścieszeregscenariuszytestowychpozwoliłbynamnamonitorowanie
systemu i jego zachowań w różnych sytuacjach.
Scenariusz to nic innego jak asynchroniczny szereg wywołań różnych zmian
dziejących sięzarównowdomuijegootoczeniu.Dziękilicznym,,mockowym”modułom
symulującymurządzeniadomowe(którestworzyliśmyjakoniezależnemodułyPythonowe),
system możnaprzetestowaćniezależnieodbrakującychwdanymmomencie(fizycznych)
urządzeń czy elementów.


## 6. Zrealizowanie sterowania zarządzaniem energią

Sterowanietrybemdziałania sterownikazarządzającegoenergiązaimplementowane
jest po stronie serwera przy użyciu algorytmu opisanegopowyżej.

## 7. Biblioteka obsługująca sterowalne komponenty

W celu testowania odpowiednich komponentów systemu stworzyliśmy moduł
pythonowydziałającypostronieserwera,któryimitujedziałanieurządzeńwróżnychporach
roku-abydostosowaćtemperatur-orazdnia-abydostosowaćnasłonecznienie,potrzebnew
celu wyliczenia efektywności paneli fotowoltaicznych.

## 8. Konfigurowalność

System jest w pełni konfigurowalny oraz skalowalny,wymaga to tylko i wyłącznie
zaimplementowania i wdrożenia kolejnych implementacji urządzeń. Sama konfiguracja
wartościdziałaniaurządzeń dladanychodcinkówczasowychmożna zostaćustawionana
konfigurację domyślną - sparsowane z napisanego apilub ustawićsztywno na wartość
domyślną.Żadnaztychopcjiniewykluczastworzeniamodułudomanualnegoustawienia
tych parametrów przez użytkownika.

## 9. Niezawodność systemu

System jest niezawodny w tym sensie, że automatycznie dobiera możliwie najlepszy
tryb pracy biorąc pod uwagę przewidywania pogodowe dot.przyszłości. Jednocześnie jeśli
system niekoniecznie dokona prawidłowej estymaty np.poprzezzłą prognozępogody to
ciągle odpowiedni tryb pracy dostarczy odpowiednie zapotrzebowanie energetyczne. Z
punktuwidzeniaużytkownikanicsięniezmieni-domsamwinteligentnysposóbbędziesię
starałdobraćtrybpracysystemuabydostosowaćodpowiedniątemperaturępowietrzaiwody,
minimalizując przy tym koszty energii elektrycznej.


