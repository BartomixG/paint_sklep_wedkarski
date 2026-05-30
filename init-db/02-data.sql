SET FOREIGN_KEY_CHECKS = 0;

truncate table uzytkownik;
INSERT INTO uzytkownik (id, imie, nazwisko, email, haslo, typ) VALUES
(1, 'Andrzej', 'Wędka', 'admin@wedkarz.pl', 'admin123', 'ADMIN'),
(2, 'Marek', 'Spławik', 'marek@gmail.com', 'user123', 'USER'),
(3, 'Krzysztof', 'Haczyk', 'krzys@o2.pl', 'haslo123', 'USER'),
(4, 'Jan', 'Kowalski', 'jan.kowalski@gmail.com', 'user123', 'USER'),
(5, 'Piotr', 'Nowak', 'p.nowak@poczta.pl', 'piotr2024', 'USER'),
(6, 'Marek', 'Rybacki', 'marek.ryba@o2.pl', 'wedkarz1', 'USER');

truncate table ryba;
INSERT INTO ryba (id, nazwa, ryba_url) VALUES
(1, 'Karp', 'images/fish/karp.png'),
(2, 'Szczupak', 'images/fish/szczupak.png'),
(3, 'Amur', 'images/fish/amur.png'),
(4, 'Okoń', 'images/fish/okon.png'),
(5, 'Sum', 'images/fish/sum.png'),
(6, 'Pstrąg', 'images/fish/pstrag.png'),
(7, 'Jesiotr', 'images/fish/jesiotr.png'),
(8, 'Bieługa', 'images/fish/bieluga.png'),
(9, 'Śledź', 'images/fish/sledz.png'),
(10, 'Węgorz', 'images/fish/wegorz.png'),
(11, 'Leszcz', 'images/fish/leszcz.png'),
(12, 'Karaś', 'images/fish/karas.png'),
(13, 'Świnka', 'images/fish/swinka.png'),
(14, 'Kiełb', 'images/fish/kielb.png'),
(15, 'Lin', 'images/fish/lin.png'),
(16, 'Dorsz', 'images/fish/dorsz.png'),
(17, 'Sandacz', 'images/fish/sandacz.png');

truncate table lowisko;
INSERT INTO lowisko (id, nazwa, opis, lowisko_url) VALUES
(1, 'Zalew Zegrzyński', 'Zbiornik retencyjny pod Warszawą, słynący z rekordowych sandaczy i leszczy.', 'images/fishery/zegrzynski.jpg'),
(2, 'Rzeka Pilica', 'Nizinna rzeka o zmiennym nurcie, idealna na klenie i jazie.', 'images/fishery/pilica.jpg'),
(3, 'Zatoka Gdańska', 'Słonowodne łowisko morskie. Raj dla łowców dorszy i śledzi.', 'images/fishery/gdanska.jpg'),
(4, 'Dunajec', 'Górska rzeka z krystaliczną wodą, kraina pstrąga i lipienia.', 'images/fishery/dunajec.jpg'),
(5, 'Jezioro Solińskie', 'Bieszczadzkie morze. Głębokie łowisko dla wymagających łowców sumów i sandaczy.', 'images/fishery/solina.jpg'),
(6, 'Śniardwy', 'Największe polskie jezioro. Ogromna przestrzeń i wielkie szczupaki.', 'images/fishery/sniardwy.jpg'),
(7, 'Jezioro Goczałowickie', 'Zbiornik zaporowy na Wiśle, tzw. Śląskie Morze.', 'images/fishery/goczalowice.jpg'),
(8, 'Zalew Szczeciński', 'Rozległy akwen na granicy z Niemcami, świetny na sandacza.', 'images/fishery/szczecinski.jpg'),
(9, 'Jezioro Kisajno', 'Część kompleksu Mamr, słynie z licznych wysp i czystej wody.', 'images/fishery/kisajno.jpg'),
(10, 'Jezioro Nyskie', 'Bardzo popularne łowisko sandaczowe na południu Polski.', 'images/fishery/nyskie.jpg'),
(11, 'Zalew Wrocławski (Mietków)', 'Największy zbiornik na Dolnym Śląsku, słynący z potężnych sandaczy.', 'images/fishery/mietkow.jpg'),
(12, 'Jezioro Gardno', 'Przymorskie jezioro w Słowińskim Parku Narodowym. Płytkie, ale pełne szczupaków.', 'images/fishery/gardno.jpg'),
(13, 'Jezioro Miedwie', 'Piąte co do wielkości jezioro w Polsce, dom rzadkiej sielawy i wielkich okoni.', 'images/fishery/miedwie.jpg'),
(14, 'Jezioro Mamry', 'Drugie co do wielkości jezioro w Polsce, o krystalicznie czystej wodzie.', 'images/fishery/mamry.jpg'),
(15, 'Rzeka Wisła (Warszawa)', 'Miejski odcinek królowej polskich rzek. Świetne miejsce na nocne sumy.', 'images/fishery/wisla_wawa.jpg'),
(16, 'Rzeka Odra (Wrocław)', 'Malownicze odnogi i kanały Odry, idealne na feeder i spinning.', 'images/fishery/odra_wro.jpg'),
(17, 'Zalew Wiślany', 'Ogromny akwen mieszający wody słodkie i słone. Królestwo sandacza.', 'images/fishery/zalew_wislany.jpg'),
(18, 'Jezioro Wigry', 'Głębokie, suwalskie jezioro z unikalnym mikroklimatem i sieją.', 'images/fishery/wigry.jpg'),
(19, 'Zatoka Pucka', 'Płytka część Bałtyku, idealna na belonę i okonia morskiego.', 'images/fishery/pucka.jpg'),
(20, 'Rzeka Bug', 'Jedna z ostatnich dzikich rzek Europy. Piękne krajobrazy i silne brany.', 'images/fishery/bug.jpg');

truncate table lowisko_ryba;
INSERT INTO lowisko_ryba (lowisko_id, ryba_id) VALUES
(1, 1), (1, 3), (1, 11), (1, 17),       -- Zegrze: Karp, Leszcz, Sandacz, Amur
(2, 2), (2, 10), (2, 14),               -- Pilica: Szczupak, Węgorz, Kiełb
(3, 9), (3, 16),                        -- Zatoka: Śledź, Dorsz
(4, 6), (4, 13),                        -- Dunajec: Pstrąg, Świnka
(5, 5), (5, 17), (5, 10), (5, 8),       -- Solina: Sum, Sandacz, Węgorz, Bieługa
(6, 2), (6, 4), (6, 10),                -- Śniardwy: Szczupak, Okoń, Węgorz
(7, 17), (7, 11), (7, 3),               -- Goczałowice: Sandacz, Leszcz, Amur
(8, 17), (8, 10),                       -- Szczeciński: Sandacz, Węgorz
(9, 2), (9, 15),                        -- Kisajno: Szczupak, Lin
(10, 17), (10, 4),                      -- Nyskie: Sandacz, Okoń
(11, 17), (11, 11), (11, 8),            -- Mietków: Sandacz, Leszcz, Bieługa
(12, 2), (12, 12),                      -- Gardno: Szczupak, Karaś
(13, 11), (13, 4),                      -- Miedwie: Leszcz, Okoń
(14, 2), (14, 15), (14, 10),            -- Mamry: Szczupak, Lin, Węgorz
(15, 5), (15, 11), (15, 17), (15, 7),   -- Wisła: Sum, Leszcz, Sandacz, Jesiotr
(16, 17), (16, 1), (16, 5),             -- Odra: Sandacz, Karp, Sum
(17, 17), (17, 9), (17, 7),             -- Z. Wiślany: Sandacz, Śledź, Jesiotr
(18, 10), (18, 6),                      -- Wigry: Węgorz, Pstrąg
(19, 9), (19, 4),                       -- Z. Pucka: Śledź, Okoń
(20, 5), (20, 11), (20, 13), (20, 14);  -- Bug: Sum, Leszcz, Świnka, Kiełb

truncate table stanowisko;
INSERT INTO stanowisko (lowisko_id, numer_stanowiska, czy_dostepne) VALUES
(1, 'Z-ZEG-01', true), (1, 'Z-ZEG-SEROCK', true), (1, 'Z-ZEG-NIEPORET', false),
(2, 'R-PIL-NOWEMIASTO', true), (2, 'R-PIL-SULEJOW', true), (2, 'R-PIL-WARKA', false),
(3, 'M-GDA-SOPOT', true), (3, 'M-GDA-HEL', true), (3, 'M-GDA-GDYNIA', false),
(4, 'R-DUN-NOWYTARG', true), (4, 'R-DUN-SROMOWCE', true), (4, 'R-DUN-KROSCIENKO', true),
(5, 'J-SOL-POLANCZYK', true), (5, 'J-SOL-JAWORNIK', false), (5, 'J-SOL-ZAPORA', true),
(6, 'J-SNI-MIKOLAJKI', true), (6, 'J-SNI-OKARTOWO', true), (6, 'J-SNI-LUKNAJNO', false),
(7, 'J-GOC-ZAPORA', true), (7, 'J-GOC-WISLAMAŁA', true), (7, 'J-GOC-STRUMIEN', true),
(8, 'Z-SZC-TRZEBIEZ', true), (8, 'Z-SZC-NOWEWARPNO', false), (8, 'Z-SZC-WOLIN', true),
(9, 'J-KIS-GIZYCKO', true), (9, 'J-KIS-PIEKNAGORA', true), (9, 'J-KIS-WYSPA', false),
(10, 'J-NYS-PLAZA', true), (10, 'J-NYS-GLEBINOW', true), (10, 'J-NYS-ZAPORA', false),
(11, 'Z-WRO-BORZYGNIEW', true), (11, 'Z-WRO-MANIOW', true), (11, 'Z-WRO-DMANIOW', false),
(12, 'J-GAR-ROWY', true), (12, 'J-GAR-RETYKA', true), (12, 'J-GAR-SMOLDZINO', true),
(13, 'J-MIE-WIERZCHLAD', true), (13, 'J-MIE-MORZYCZYN', false), (13, 'J-MIE-ZELEWO', true),
(14, 'J-MAM-WEGORZEWO', true), (14, 'J-MAM-KIRSAJTY', true), (14, 'J-MAM-KAL', false),
(15, 'R-WIS-WAWA-CENT', true), (15, 'R-WIS-TYNIEC', true), (15, 'R-WIS-PLOCK', false),
(16, 'R-ODR-WRO-KANAŁ', true), (16, 'R-ODR-SZCZ-WAŁY', true), (16, 'R-ODR-SLUBICE', false),
(17, 'Z-WIS-FROMBORK', true), (17, 'Z-WIS-KRYNICA', true), (17, 'Z-WIS-TOLKMICKO', false),
(18, 'J-WIG-KLASZTOR', true), (18, 'J-WIG-STARYFOLWARK', true), (18, 'J-WIG-BRYZGIEW', false),
(19, 'M-PUC-PUCK', true), (19, 'M-PUC-REWA', true), (19, 'M-PUC-CHALUPY', false),
(20, 'R-BUG-DROHICZYN', true), (20, 'R-BUG-MEREWICZ', true), (20, 'R-BUG-KRYLOW', false);

truncate table produkt;
INSERT INTO produkt (id, nazwa, opis, cena, stan_magazynowy, kategoria, produkt_url) VALUES
-- WĘDKI
(1, 'Shimano Tribal TX-2 12ft', 'Profesjonalna wędka karpiowa o niesamowitej mocy i progresywnej akcji. Idealna na dalekie rzuty.', 429.00, 10, 'Wędki', 'images/products/rods/shimano_tribal_tx2.jpg'),
(2, 'Daiwa Ninja X Spinning', 'Wszechstronny spinning z cienkim i lekkim blankiem z włókna węglowego. Bardzo czuła szczytówka.', 215.50, 15, 'Wędki', 'images/products/rods/daiwa_ninja_x.jpg'),
(3, 'Mikado Ultraviolet Heavy Feeder', 'Legendarny model na polskie rzeki. Sztywna i szybka wędka do ciężkiego feederowania.', 349.00, 8, 'Wędki', 'images/products/rods/mikado_uv_feeder.jpg'),
(4, 'Westin W3 Streetstick', 'Ultralekka wędka do miejskiego spinningu. Doskonała do łowienia okoni na małe gumy.', 389.00, 5, 'Wędki', 'images/products/rods/westin_w3_streetstick.jpg'),
(5, 'Savage Gear SG4 Fast Game', 'Wędka zaprojektowana do łowienia średnimi i ciężkimi przynętami na drapieżniki. Bardzo szybka akcja.', 459.00, 12, 'Wędki', 'images/products/rods/sg4_fast_game.jpg'),
(6, 'MadCat White Deluxe 275', 'Potężna wędka sumowa do łowienia stacjonarnego. Wytrzyma najsilniejsze odjazdy gigantów.', 599.00, 4, 'Wędki', 'images/products/rods/madcat_white_deluxe.jpg'),
(7, 'Jaxon Arcadia Telescopic', 'Klasyczna wędka teleskopowa. Bardzo poręczna w transporcie, idealna dla początkujących.', 89.00, 30, 'Wędki', 'images/products/rods/jaxon_arcadia.jpg'),
(8, 'Shimano Vengeance Sea Bass', 'Specjalistyczna wędka do spinningu morskiego. Odporna na korozję wywołaną słoną wodą.', 279.00, 6, 'Wędki', 'images/products/rods/shimano_vengeance_seabass.jpg'),
(9, 'Daiwa Black Widow Carp', 'Budżetowa, ale bardzo solidna wędka do połowu dużych ryb spokojnego żeru.', 189.00, 20, 'Wędki', 'images/products/rods/daiwa_black_widow.jpg'),
(10, 'Dragon Viper HD Pike', 'Wędka spinningowa o dużej mocy, dedykowana specjalnie do walki ze szczupakami.', 245.00, 10, 'Wędki', 'images/products/rods/dragon_viper_pike.jpg'),
(11, 'Okuma Cortez 20-30lbs', 'Ciężka wędka morska do pilkerowania. Niezastąpiona podczas wypraw kutrem na Bałtyk.', 320.00, 5, 'Wędki', 'images/products/rods/okuma_cortez.jpg'),
(12, 'Delphin Magma M3 Feeder', 'Elegancka wędka feederowa. Posiada świetne właściwości rzutowe i czułe wymienne szczytówki.', 310.00, 7, 'Wędki', 'images/products/rods/delphin_magma.jpg'),
(13, 'Penn Overseas II Offshore', 'Mocna wędka typu travel (4-sekcyjna). Idealna na zagraniczne wyprawy morskie.', 650.00, 3, 'Wędki', 'images/products/rods/penn_overseas.jpg'),
(14, 'Abu Garcia Venturi Spin', 'Solidna wędka wykonana z grafitu 24T. Klasyczny design i duża wytrzymałość.', 199.00, 14, 'Wędki', 'images/products/rods/abu_venturi.jpg'),
(15, 'Fox Horizon X3', 'Wysokiej klasy wędka karpiowa. Wykorzystuje maty węglowe o wysokim module sprężystości.', 550.00, 6, 'Wędki', 'images/products/rods/fox_horizon_x3.jpg'),
(16, 'Konger World Champion Turbo', 'Precyzyjna wędka spławikowa (Match). Zaprojektowana do szybkich połowów na zawodach.', 375.00, 4, 'Wędki', 'images/products/rods/konger_wc_turbo.jpg'),
(17, 'St. Croix Legend Tournament', 'Amerykańska legenda. Jedna z najlepszych wędek spinningowych na świecie. Niesamowita czułość.', 1650.00, 2, 'Wędki', 'images/products/rods/st_croix_legend.jpg'),
(18, 'Robinson Ashigari Perch', 'Delikatna wędka z wklejoną pełną szczytówką, która pokazuje najmniejsze dotknięcie ryby.', 120.00, 18, 'Wędki', 'images/products/rods/robinson_ashigari.jpg'),
(19, 'Trabucco Precision Carp PG', 'Bardzo mocny feeder przeznaczony na tzw. "commerciale" pod duże karpie i amury.', 280.00, 9, 'Wędki', 'images/products/rods/trabucco_precision.jpg'),
(20, 'Dam Madcat Black Spin', 'Specjalistyczna, krótsza wędka spinningowa do aktywnego łowienia sumów z łodzi.', 330.00, 5, 'Wędki', 'images/products/rods/madcat_black_spin.jpg'),

-- PRZYNĘTY I WOBBLERY
(21, 'Savage Gear Cannibal Shad 10cm', 'Najpopularniejsza guma na szczupaka i sandacza. Niesamowita praca ogona.', 4.50, 500, 'Przynęty', 'images/products/baits/sg_cannibal.jpg'),
(22, 'Rapala Shad Rap Deep Tail Dancer', 'Głęboko schodzący wobbler, idealny do trollingu na duże drapieżniki.', 48.00, 15, 'Przynęty', 'images/products/baits/rapala_shad_rap.jpg'),
(23, 'Keitech Easy Shiner 3"', 'Japońska precyzja. Miękka guma nasączona atraktorem o zapachu kałamarnicy.', 29.99, 100, 'Przynęty', 'images/products/baits/keitech_easy_shiner.jpg'),
(24, 'Nash Scopex Squid Boilies 1kg', 'Kulki proteinowe na legendarnej recepturze Scopex Squid. Magnes na karpie.', 55.00, 40, 'Przynęty', 'images/products/baits/nash_boilies.jpg'),
(25, 'Salmo Hornet 4cm', 'Klasyczny wobbler o agresywnej pracy. Zabójczy na klenie, jazie i okonie.', 26.50, 30, 'Przynęty', 'images/products/baits/salmo_hornet.jpg'),
(26, 'Berkley PowerBait Trout Bait', 'Specjalistyczna pasta z brokatem na pstrągi tęczowe. Intensywny zapach.', 22.00, 60, 'Przynęty', 'images/products/baits/berkley_trout.jpg'),

-- BŁYSTKI OBROTOWE / SPINNERY
(27, 'Mepps Aglia Silver #3', 'Najbardziej klasyczna obrotówka świata. Uniwersalna na każdą rybę.', 14.20, 100, 'Przynęty', 'images/products/baits/mepps_aglia.jpg'),
(28, 'Mepps Black Fury #2', 'Błystka z czarną paletką w żółte kropki. Genialna na pstrągi i okonie w słoneczne dni.', 15.50, 80, 'Przynęty', 'images/products/baits/mepps_black_fury.jpg'),
(29, 'Blue Fox Super Vibrax #4', 'Ciężka obrotówka z korpusem zapobiegającym skręcaniu linki. Świetna na szczupaki.', 19.00, 45, 'Przynęty', 'images/products/baits/blue_fox_vibrax.jpg'),
(30, 'SpinMad Mag 6g', 'Mały, ale wariat. Jig spinner, król polowania na okonie.', 18.50, 120, 'Przynęty', 'images/products/baits/spinmad_mag.jpg'),

-- ŻYŁKI I PLECIONKI
(31, 'Shimano Kairiki 8 Mantis Green', '8-splotowa plecionka, niezwykle gładka i cicha na przelotkach. 150m.', 79.00, 25, 'Linki', 'images/products/lines/shimano_kairiki.jpg'),
(32, 'Daiwa J-Braid X8 0.16mm', 'Japońska plecionka o okrągłym przekroju i wysokiej wytrzymałości na węźle.', 65.00, 35, 'Linki', 'images/products/lines/daiwa_jbraid.jpg'),
(33, 'Mikado Territory Crystal 0.30mm', 'Przezroczysta żyłka karpiowa o niskiej rozciągliwości i dużej odporności na ścieranie.', 32.00, 50, 'Linki', 'images/products/lines/mikado_territory.jpg'),

-- HACZYKI I SPŁAWIKI
(34, 'Gamakatsu LS-3310N #4', 'Bardzo ostre haczyki z oczkiem, kute, idealne na leszcze i liny.', 12.50, 200, 'Akcesoria', 'images/products/accessories/gamakatsu_hooks.jpg'),
(35, 'Owner Carp Tsuyoshi #2', 'Potężne haki karpiowe z powłoką teflonową. Nie do wygięcia.', 18.00, 150, 'Akcesoria', 'images/products/accessories/owner_hooks.jpg'),
(36, 'Drennan Visi Wag 2', 'Precyzyjny spławik typu waggler do metody odległościowej.', 16.00, 40, 'Akcesoria', 'images/products/accessories/drennan_float.jpg'),
(37, 'Expert Float Classic 3g', 'Tradycyjny spławik z balsy do łowienia batem lub bolonką.', 8.50, 100, 'Akcesoria', 'images/products/accessories/expert_float.jpg'),

-- AKCESORIA
(38, 'Deeper Chirp+ 2 Sonar', 'Inteligentna echosonda zarzucana wędką. Pokazuje ryby i strukturę dna na telefonie.', 1599.00, 3, 'Akcesoria', 'images/products/accessories/deeper_chirp2.jpg'),
(39, 'Mikado Enclave Chair', 'Bardzo wygodne krzesło karpiowe z regulowanymi nogami na każdy teren.', 349.00, 10, 'Akcesoria', 'images/products/accessories/mikado_chair.jpg'),
(40, 'Savage Gear Pro Folding Net', 'Duży, składany podbierak z gumowaną siatką, bezpieczny dla ryb.', 189.00, 12, 'Akcesoria', 'images/products/accessories/sg_net.jpg'),
(41, 'Matrix Ethos Carryall', 'Pojemna torba wędkarska na akcesoria i pudełka z przynętami.', 215.00, 8, 'Akcesoria', 'images/products/accessories/matrix_bag.jpg'),
(42, 'Waga Mikado Digital 50kg', 'Precyzyjna waga elektroniczna z funkcją tarowania. Niezbędna przy rekordach.', 45.00, 20, 'Akcesoria', 'images/products/accessories/mikado_scale.jpg'),
(43, 'Latarka czołowa Petzl Actik', 'Mocna czołówka (450 lm) z czerwonym światłem. Idealna na nocne zasiadki.', 199.00, 15, 'Akcesoria', 'images/products/accessories/petzl_actik.jpg'),

-- BĘBNY
(44, 'Shimano Stradic FM 2500', 'Ikona spinningu. Niezwykle płynna praca, wodoodporny korpus i precyzyjny hamulec na drapieżniki.', 789.00, 5, 'Kołowrotki', 'images/products/reels/shimano_stradic.jpg'),
(45, 'Daiwa Fuego LT 3000-C', 'Lekki i wytrzymały (Light & Tough). Technologia MagSealed chroni wnętrze przed brudem i wodą.', 415.00, 12, 'Kołowrotki', 'images/products/reels/daiwa_fuego.jpg'),
(46, 'Shimano Ultegra XTE 14000', 'Potężna maszyna karpiowa do ekstremalnie dalekich rzutów. Wolna oscylacja zapewnia idealny nawój.', 699.00, 8, 'Kołowrotki', 'images/products/reels/shimano_ultegra.jpg'),
(47, 'Penn Slammer IV 4500', 'W pełni uszczelniony mocarz. Stworzony do walki z sumami, dorszami i rybami morskimi.', 850.00, 4, 'Kołowrotki', 'images/products/reels/penn_slammer.jpg'),
(48, 'Daiwa Ninja LT 2500', 'Najlepszy stosunek jakości do ceny. Idealny do spławika, lekkiego gruntu i spinningu.', 220.00, 20, 'Kołowrotki', 'images/products/reels/daiwa_ninja.jpg'),
(49, 'Abu Garcia Revo Beast 41 HS', 'Niskoprofilowy multiplikator dla łowców okazów. Zaprojektowany do rzucania najcięższymi przynętami.', 1150.00, 3, 'Kołowrotki', 'images/products/reels/revo_beast.jpg'),
(50, 'Okuma 8K Carp', 'Nowoczesny design i ogromna pojemność szpuli. Wytrzymałe bebechy na największe jeziorowe potwory.', 380.00, 10, 'Kołowrotki', 'images/products/reels/okuma_8k.jpg');

truncate table produkt_ryba;
INSERT INTO produkt_ryba (produkt_id, ryba_id) VALUES
-- WĘDKI
(1, 1), (1, 3),      -- Shimano Tribal: Karp, Amur
(2, 2), (2, 4),      -- Daiwa Ninja: Szczupak, Okoń
(3, 11), (3, 1),     -- Mikado UV: Leszcz, Karp
(4, 4), (4, 6),      -- Westin: Okoń, Pstrąg
(5, 2), (5, 17),     -- Savage Gear: Szczupak, Sandacz
(6, 5), (6, 8),      -- MadCat: Sum, Bieługa
(7, 12), (7, 15),    -- Jaxon: Karaś, Lin
(8, 9), (8, 17),     -- Shimano Sea Bass: Śledź, Sandacz
(9, 1), (9, 7),      -- Daiwa Black Widow: Karp, Jesiotr
(10, 2),             -- Dragon: Szczupak
(11, 16),            -- Okuma: Dorsz
(12, 11), (12, 10),  -- Delphin: Leszcz, Węgorz
(13, 16), (13, 7),   -- Penn: Dorsz, Jesiotr
(14, 4), (14, 2),    -- Abu Garcia: Okoń, Szczupak
(15, 1), (15, 3),    -- Fox Horizon: Karp, Amur
(16, 11), (16, 15),  -- Konger: Leszcz, Lin
(17, 17), (17, 2),   -- St. Croix: Sandacz, Szczupak
(18, 4), (18, 14),   -- Robinson: Okoń, Kiełb
(19, 1), (19, 3),    -- Trabucco: Karp, Amur
(20, 5),             -- Dam Madcat: Sum

-- PRZYNĘTY I WOBBLERY
(21, 2), (21, 17),   -- Cannibal: Szczupak, Sandacz
(22, 2), (22, 5),    -- Rapala: Szczupak, Sum
(23, 17), (23, 4),   -- Keitech: Sandacz, Okoń
(24, 1), (24, 3),    -- Nash Boilies: Karp, Amur
(25, 4), (25, 6),    -- Salmo Hornet: Okoń, Pstrąg
(26, 6),             -- Pasta Berkley: Pstrąg

-- BŁYSTKI OBROTOWE / SPINNERY
(27, 2), (27, 11),   -- Mepps Aglia: Szczupak, Leszcz
(28, 4), (28, 6),    -- Black Fury: Okoń, Pstrąg
(29, 2),             -- Blue Fox: Szczupak
(30, 4),             -- SpinMad: Okoń

-- HACZYKI I SPŁAWIKI
(34, 11), (34, 15),  -- Haki Gamakatsu: Leszcz, Lin
(35, 1), (35, 7),    -- Haki Owner: Karp, Jesiotr
(36, 11), (36, 12),  -- Spławik Drennan: Leszcz, Karaś
(37, 12), (37, 15),  -- Spławik Expert: Karaś, Lin

-- AKCESORIA
(38, 2), (38, 17), (38, 5), -- Deeper: Szczupak, Sandacz, Sum

-- BĘBNY
(44, 17), (44, 4),   -- Stradic: Sandacz, Okoń
(45, 2), (45, 17),   -- Fuego: Szczupak, Sandacz
(46, 1), (46, 3),    -- Ultegra: Karp, Amur
(47, 5), (47, 16),   -- Slammer: Sum, Dorsz
(48, 11), (48, 4),   -- Ninja: Leszcz, Okoń
(49, 2),             -- Revo Beast: Szczupak
(50, 1), (50, 7);    -- Okuma 8K: Karp, Jesiotr

truncate table koszyk;
INSERT INTO koszyk (id, uzytkownik_id) VALUES
(1, 2),
(2, 3),
(3, 4);

truncate table zawartosc_koszyka;
INSERT INTO zawartosc_koszyka (koszyk_id, produkt_id, ilosc) VALUES
(1, 1, 1),
(1, 35, 2),

(2, 2, 1),
(2, 32, 1),

(3, 40, 1);

truncate table zamowienie;
INSERT INTO zamowienie (id, uzytkownik_id, stanowisko_id, status, suma_zamowienia, data_zamowienia) VALUES
(1, 2, 1, 'ZREALIZOWANE', 451.20, '2024-05-15 10:30:00'),
(2, 3, 13, 'NOWE', 1599.00, '2024-05-20 14:15:00'),
(3, 4, NULL, 'W REALIZACJI', 103.20, '2024-05-21 09:00:00');

truncate table zamowione_produkty;
INSERT INTO zamowione_produkty (zamowienie_id, produkt_id, ilosc, cena_zakupu) VALUES
(1, 1, 1, 429.00),
(1, 27, 1, 14.20),
(1, 34, 1, 8.00),

(2, 38, 1, 1599.00),

(3, 7, 1, 89.00),
(3, 27, 1, 14.20);

SET FOREIGN_KEY_CHECKS = 1;
