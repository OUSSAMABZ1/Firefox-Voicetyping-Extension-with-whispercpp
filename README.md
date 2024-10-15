# Développement d'une Extension Firefox pour la Reconnaissance Vocale à l'aide de la librairie Whispercpp

L'interface utilisateur propose une expérience intuitive permettant aux utilisateurs de sélectionner la langue de leur choix (Anglais/Français) via le menu déroulant et de démarrer l'enregistrement vocal en 
appuyant sur le bouton correspondant. Une fois l’utilisateur termine l’enregistrement - en cliquant sur le bouton pour une deuxième fois-, l'audio et la langue choisie sont envoyés vers un serveur Flask local 
via une requête HTTP de type POST. Ce dernier utilise la bibliothèque whispercpp.py pour transcrire le contenu vocal en texte.

Le texte transcrit est ensuite retourné vers le côté utilisateur où un bloc de décision vérifie si l’onglet actuel est un document OnlyOffice. Si c’est le cas, le texte est inséré dans le document; sinon, il 
est copié dans le presse-papiers du système. La section marquée en bleu a été abandonnée en raison de sa complexité. Nous avons tenté de modifier la structure HTML du document, mais cela affectait l'ensemble 
de la page. Il s'est avéré nécessaire d'utiliser l'API OnlyOffice pour atteindre le résultat souhaité. 

L'interface utilisateur contient également une barre de progression qui affiche l'un des quatres textes (Click to start recording, Recording.., Transcribing.., Text Copied) en fonction de l'état
d'avancement du processus de transcription.

![image](https://github.com/user-attachments/assets/2b8f12ed-b914-4bc1-abd4-5d3ec7fe2196)

