SET NAMES 'utf8mb4';
SET CHARACTER SET utf8mb4;

USE mydatabase;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS uzytkownik, koszyk, zawartosc_koszyka, produkt, ryba, lowisko, lowisko_ryba, produkt_ryba, stanowisko, zamowienie, zamowione_produkty;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE uzytkownik (
    id INT AUTO_INCREMENT PRIMARY KEY,
    imie VARCHAR(50),
    nazwisko VARCHAR(50),
    email VARCHAR(100) UNIQUE NOT NULL,
    haslo VARCHAR(255) NOT NULL,
    typ ENUM('USER', 'ADMIN') DEFAULT 'USER'
);

CREATE TABLE produkt (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nazwa VARCHAR(255) NOT NULL,
    opis TEXT,
    cena DECIMAL(10, 2) NOT NULL,
    stan_magazynowy INT DEFAULT 0,
    kategoria VARCHAR(50),
    produkt_url VARCHAR(255)
);

CREATE TABLE ryba (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nazwa VARCHAR(50) NOT NULL,
    ryba_url VARCHAR(255)
);

CREATE TABLE lowisko (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nazwa VARCHAR(100) NOT NULL,
    opis TEXT,
    lowisko_url VARCHAR(255)
);

CREATE TABLE stanowisko (
    id INT AUTO_INCREMENT PRIMARY KEY,
    lowisko_id INT NOT NULL,
    numer_stanowiska VARCHAR(30) NOT NULL,
    czy_dostepne BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (lowisko_id) REFERENCES lowisko(id) ON DELETE CASCADE
);

CREATE TABLE koszyk (
    id INT AUTO_INCREMENT PRIMARY KEY,
    uzytkownik_id INT UNIQUE NOT NULL,
    FOREIGN KEY (uzytkownik_id) REFERENCES uzytkownik(id) ON DELETE CASCADE
);

CREATE TABLE zawartosc_koszyka (
    id INT AUTO_INCREMENT PRIMARY KEY,
    koszyk_id INT NOT NULL,
    produkt_id INT NOT NULL,
    ilosc INT NOT NULL DEFAULT 1,
    FOREIGN KEY (koszyk_id) REFERENCES koszyk(id) ON DELETE CASCADE,
    FOREIGN KEY (produkt_id) REFERENCES produkt(id) ON DELETE CASCADE
);

CREATE TABLE zamowienie (
    id INT AUTO_INCREMENT PRIMARY KEY,
    uzytkownik_id INT NOT NULL,
    stanowisko_id INT DEFAULT NULL,
    data_zamowienia TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'NOWE',
    suma_zamowienia DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (uzytkownik_id) REFERENCES uzytkownik(id),
    FOREIGN KEY (stanowisko_id) REFERENCES stanowisko(id)
);

CREATE TABLE zamowione_produkty (
    id INT AUTO_INCREMENT PRIMARY KEY,
    zamowienie_id INT NOT NULL,
    produkt_id INT NOT NULL,
    ilosc INT NOT NULL,
    cena_zakupu DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (zamowienie_id) REFERENCES zamowienie(id) ON DELETE CASCADE,
    FOREIGN KEY (produkt_id) REFERENCES produkt(id)
);

CREATE TABLE lowisko_ryba (
    lowisko_id INT NOT NULL,
    ryba_id INT NOT NULL,
    PRIMARY KEY (lowisko_id, ryba_id),
    FOREIGN KEY (lowisko_id) REFERENCES lowisko(id) ON DELETE CASCADE,
    FOREIGN KEY (ryba_id) REFERENCES ryba(id) ON DELETE CASCADE
);

CREATE TABLE produkt_ryba (
    produkt_id INT NOT NULL,
    ryba_id INT NOT NULL,
    PRIMARY KEY (produkt_id, ryba_id),
    FOREIGN KEY (produkt_id) REFERENCES produkt(id) ON DELETE CASCADE,
    FOREIGN KEY (ryba_id) REFERENCES ryba(id) ON DELETE CASCADE
);

-- Zmiana kodowania całej bazy danych
ALTER DATABASE mydatabase CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Zmiana kodowania konkretnych tabel (wykonaj dla każdej tabeli, np. produkt, uzytkownik)
ALTER TABLE produkt CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE uzytkownik CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE zamowienie CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE zamowione_produkty MODIFY cena_zakupu DECIMAL(10,2) NULL;
