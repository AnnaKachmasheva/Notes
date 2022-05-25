# Popis projektu "Notes"

## Сíl projektu

Zjednodušení vedení osobních poznámek.

## Popis funkčnosti

Web se skládá ze 3 stránek. Pokud je zadána naplatná adresa, zobrazí se ErrorPage.
1) Hlavní stranka

    Na této stránce má uživatel následující možnosti:
     + přehrávání videa o webu,
     + zobrazení hlavních informací o webu,
     + přesun na další stránky:
       - stránka kalendáře,
       - stránka se statistikami.

2) Stránka kalendáře

    Na této stránce má uživatel následující možnosti:
    + přidání nové poznámky,
       - Povinná pole:
         + Datum 
         + Název poznámky, který musí mít alespoň 2 znaky
         + Popis poznámky, který musí mít maximálně 1000 znaků
       - Nepovinná pole:
         + Geolokace uživatele
         + Obrazek
   
    - zobrazení seznamu poznámek a každé poznámky zvlášť,
    - úprava poznámky,
    - smazání poznámky a všech poznámek najednou,
    - zobrazení poznámek v měsíčním kalendáři,
    - posouvání kalendáře po měsíci,
    - kreslení na plátně Canvas pomocí myši,
    - přehrávání a zastavování hudby na pozadí,
    + přesun na další stránky:
        - hlavní stranka,
        - stránka se statistikami.

3) Stránka se statistikami

   Na této stránce má uživatel následující možnosti:
   + zobrazení statistik aktuálního roku:
     - počet dnešních poznámek,
     - počet poznámek pro aktuální týden,
     - počet poznámek pro aktuální měsic,
     - počet poznámek pro aktuální rok,
   + zobrazení sloupcového grafu,
   + přesun na další stránky:
       - hlavní stranka,
       - stránka kalendáře.


## Použité technologie

- HTML5
- CSS3
- React

## Použité JS API

- File API
- Geolocation
- Drag & Drop
- LocalStorage

## Základní pokyny pro start

Musíte nainstalovat všechny požadované moduly node_modules pomocí následujících příkazů v terminálu.
```
cd path/src
-npm install
-npm start
```
