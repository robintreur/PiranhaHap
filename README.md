# Piranha Hap

## Demo:
- [klik hier voor Demo](http://piranhahap.robintreur.nl)

## Installeren:
- Plaats alle bestanden uit docs op uw ftp server

Installatiehandleiding Asteroid shooter

Wanneer u op het menuscherm van de game komt wordt er onderaan in 2 korte zinnen uitgelegd wat u moet doen. Om het spel te starten klik op 1 van de 2 modus (survival mode of normal mode).

## Toelichting Principes:

Classes:

Ik heb classes gebruikt om de verschillende soorten onderdelen voor de game te maken, de classes die ik heb zijn onder andere: Main, Menu, Game, Characters, Dashboard, Piranha, etc.

Instances:
De speler moet visjes proberen te eten en om te zorgen dat deze vissen op het scherm verschijnen, zorg ik door new Fish en new FishGroup dat er visjes op het scherm verschijnen. 

Enscapulation:
Met enscapulation geef je aan of sommige objecten in je class private of public zijn. Als een object private is kan hij niet worden aangepast of bereikbaar zijn buiten de class. Als een object public is kan hij wel worden aangepast buiten de class Ik heb alleen de objecten die hij buiten zijn class nodig heeft public (in sommige gevallen protected) gemaakt.

Composition:
De class menu heeft game, in de game maak ik de class fishGroup aan. In de class FishGroup maak ik de class Fish aan.

Inheritence:
Ik heb een class Character aangemaakt. De classen Eels, FishGroup & Blowfish maken hier gebruik van.

UML:
![alt text](http://piranhahap.robintreur.nl/images/uml.png)
