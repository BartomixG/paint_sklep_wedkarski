# Projekt internetowego sklepu wędkarskiego

Projekt realizowany w ramach przedmiotu **Programowanie Aplikacji Internetowych** na Politechnice Warszawskiej.

Aplikacja jest systemem full-stack dla sklepu wędkarskiego połączonego z rezerwacją stanowisk na łowiskach. System umożliwia przeglądanie produktów, dodawanie ich do koszyka, rezerwację stanowisk, składanie zamówień oraz korzystanie z panelu administratora.

## Wykorzystane technologie

### Frontend

- **React** – biblioteka użyta do budowy interfejsu użytkownika jako aplikacji typu SPA.
- **React Router** – obsługa nawigacji pomiędzy widokami bez przeładowywania całej strony.
- **Tailwind CSS** – stylowanie responsywnego interfejsu użytkownika.

### Backend

- **Spring Boot** – główny framework backendowy aplikacji.
- **Spring Web / REST API** – komunikacja pomiędzy frontendem i backendem przez endpointy HTTP.
- **Spring Data JPA / Hibernate** – obsługa mapowania obiektowo-relacyjnego oraz komunikacji z bazą danych.
- **Spring Security** – konfiguracja dostępu do zasobów aplikacji.
### Baza danych

- **MySQL 8.4** – relacyjna baza danych przechowująca informacje o użytkownikach, produktach, koszykach, zamówieniach, łowiskach, rybach i stanowiskach.

### Wdrożenie i infrastruktura

- **Docker** – konteneryzacja aplikacji.
- **Docker Compose v2** – uruchamianie całego środowiska jednym poleceniem.
- **Nginx** – serwowanie zbudowanego frontendu React oraz przekazywanie zapytań `/api/` do backendu.

## Wymagania softwarowe

Do uruchomienia projektu wymagane są:

- **Docker Engine** lub **Docker Desktop**,
- **Docker Compose v2**, dostępny jako polecenie `docker compose`,
- **Git**, jeżeli projekt ma zostać pobrany z repozytorium,
- wolne porty:
  - `80` – dla aplikacji webowej serwowanej przez Nginx,
  - `3307` – dla lokalnego dostępu do bazy MySQL z poziomu hosta.

Nie trzeba lokalnie instalować dodatkowych bibliotek, ponieważ aplikacja uruchamiana jest w kontenerach Docker.

## Instrukcja instalacji i uruchomienia

### 1. Instalacja Dockera

Na systemie Linux należy zainstalować Docker Engine zgodnie z instrukcją dla używanej dystrybucji. Jeżeli system tego wymaga, użytkownik powinien zostać dodany do grupy `docker`.

Na Windowsie lub macOS należy zainstalować i uruchomić Docker Desktop.

### 2. Sprawdzenie instalacji

Po instalacji należy sprawdzić dostępność Dockera i Docker Compose:

```bash
docker --version
docker compose version
```

### 3. Pobranie projektu

Projekt należy pobrać z repozytorium lub skopiować jego katalog na maszynę docelową:

```bash
git clone <adres-repozytorium>
cd <nazwa-katalogu-projektu>
```

Jeżeli projekt został dostarczony lokalnie, wystarczy przejść do katalogu głównego projektu.

### 4. Sprawdzenie struktury katalogu

W katalogu głównym projektu powinny znajdować się między innymi pliki:

- `compose.yaml`,
- `Dockerfile.backend`,
- `Dockerfile.web`.

### 5. Uruchomienie aplikacji

Aplikację należy zbudować i uruchomić poleceniem:

```bash
docker compose up -d --build
```

### 6. Oczekiwanie na start usług

Po uruchomieniu należy poczekać, aż:

- kontener `mysql` przejdzie healthcheck,
- backend uruchomi się na porcie `8080` wewnątrz sieci Docker Compose,
- kontener `web` zacznie nasłuchiwać na porcie `80`.

### 7. Otwarcie aplikacji

Po poprawnym uruchomieniu aplikacja jest dostępna w przeglądarce pod adresem:

```text
http://localhost/
```

Baza danych MySQL jest dostępna z poziomu hosta pod adresem:

```text
localhost:3307
```

Wewnątrz sieci Docker Compose backend łączy się z bazą przez adres:

```text
mysql:3306
```

## Inicjalizacja i reset bazy danych

Podczas pierwszego uruchomienia kontener MySQL wykonuje skrypty inicjalizacyjne z katalogu `init-db`. Dane bazy są przechowywane w wolumenie Dockera, dlatego kolejne uruchomienia zachowują aktualny stan bazy.

Aby odtworzyć bazę od zera, należy zatrzymać kontenery i usunąć wolumeny:

```bash
docker compose down -v
docker compose up -d --build 
```

## Zatrzymanie aplikacji

Aby zatrzymać aplikację, należy wywołać komenedę:

```bash
docker compose down
```
## Prezntacja - link do aplikacji
https://bartomiejs-macbook-pro.tailc381e2.ts.net/koszyk

