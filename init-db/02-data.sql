USE mydatabase;

SET FOREIGN_KEY_CHECKS = 0;

INSERT INTO uzytkownik (id, imie, nazwisko, email, haslo, typ) VALUES
(1, 'Andrzej', 'Wędka', 'admin@wedkarz.pl', 'admin123', 'ADMIN'),
(2, 'Marek', 'Spławik', 'marek@gmail.com', 'user123', 'USER'),
(3, 'Krzysztof', 'Haczyk', 'krzys@o2.pl', 'haslo123', 'USER');

INSERT INTO ryba (id, nazwa, ryba_url) VALUES
(1, 'Karp', 'icons/carp.svg'),
(2, 'Szczupak', 'icons/pike.svg'),
(3, 'Amur', 'icons/grass_carp.svg'),
(4, 'Okoń', 'icons/perch.svg'),
(5, 'Sum', 'icons/catfish.svg'),
(6, 'Pstrąg', 'icons/trout.svg');

INSERT INTO lowisko (id, nazwa, opis, lowisko_url) VALUES
(1, 'Jezioro Zegrzyńskie', 'Duży zbiornik z bogatą fauną, idealny na weekend.', 'images/zegrze.jpg'),
(2, 'Stawy w Zgierzu', 'Prywatne łowisko komercyjne, cisza i spokój.', 'images/stawy.jpg'),
(3, 'Rzeka Brda', 'Dzika rzeka dla wymagających wędkarzy.', 'images/brda.jpg');

INSERT INTO lowisko_ryba (lowisko_id, ryba_id) VALUES
(1, 1), (1, 2), (1, 4), -- Zegrze: Karp, Szczupak, Okoń
(2, 1), (2, 3),         -- Stawy: Karp, Amur
(3, 5), (3, 6);         -- Brda: Sum, Pstrąg

INSERT INTO stanowisko (lowisko_id, numer_stanowiska, czy_dostepne) VALUES
(1, 'Z-01', true), (1, 'Z-02', false), (1, 'Z-03', true),
(2, 'S-1', true), (2, 'S-2', true),
(3, 'BRD-X', true);

INSERT INTO produkt (id, nazwa, opis, cena, stan_magazynowy, kategoria, produkt_url) VALUES
(1, 'Wędka Karpiowa 3.6m', 'Solidna wędka do połowu dużych okazów.', 249.99, 12, 'Wędki', 'products/rod_1.jpg'),
(2, 'Kołowrotek Spinningowy', 'Precyzyjny mechanizm, 10 łożysk.', 189.00, 5, 'Kołowrotki', 'products/reel_1.jpg'),
(3, 'Zanęta Truskawkowa 5kg', 'Najlepsza na letnie upały.', 45.50, 50, 'Zanęty', 'products/bait_1.jpg'),
(4, 'Błystka Obrotowa Srebrna', 'Klasyczna przynęta na szczupaka.', 12.00, 100, 'Przynęty', 'products/lure_1.jpg'),
(5, 'Zestaw Haczyków (10 szt.)', 'Bardzo ostre, stal hartowana.', 9.99, 0, 'Akcesoria', 'products/hooks.jpg'); -- Stan 0 do testów "braku towaru"

INSERT INTO produkt_ryba (produkt_id, ryba_id) VALUES
(1, 1), (1, 3), -- Wędka na Karpia i Amura
(3, 1),         -- Zanęta na Karpia
(4, 2), (4, 4); -- Błystka na Szczupaka i Okonia

INSERT INTO koszyk (uzytkownik_id) VALUES (2), (3);

INSERT INTO zawartosc_koszyka (koszyk_id, produkt_id, ilosc) VALUES
(1, 1, 1), -- 1x wędka
(1, 3, 2); -- 2x zanęta

INSERT INTO zamowienie (id, uzytkownik_id, stanowisko_id, status, suma_zamowienia) VALUES
(1, 3, 4, 'ZREALIZOWANE', 105.49); -- Kupił coś i zarezerwował stanowisko S-1 (id 4)

INSERT INTO zamowione_produkty (zamowienie_id, produkt_id, ilosc, cena_zakupu) VALUES
(1, 2, 1, 95.50), -- Kołowrotek (cena mogła być inna niż obecnie)
(1, 5, 1, 9.99);  -- Haczyki

SET FOREIGN_KEY_CHECKS = 1;
