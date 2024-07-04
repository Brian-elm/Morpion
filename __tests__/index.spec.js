const { estValide, setSymbol, rechercherVainqueur, matchNul, Afficheur } = require('../public/script.js');

describe('Fonctions du Jeu de Morpion', () => {
    let boutons;
    let joueurs;
    let tour;

    beforeEach(() => {
        document.body.innerHTML = `
            <div id="Jeu">
                <button></button><button></button><button></button>
                <button></button><button></button><button></button>
                <button></button><button></button><button></button>
            </div>
            <div id="StatutJeu"></div>
        `;
        boutons = document.querySelectorAll("#Jeu button");
        joueurs = ['X', 'O'];
        tour = 0;
    });

    test('estValide retourne vrai si le bouton est vide', () => {
        expect(estValide(boutons[0])).toBe(true);
    });

    test('estValide retourne faux si le bouton n\'est pas vide', () => {
        boutons[0].innerHTML = 'X';
        expect(estValide(boutons[0])).toBe(false);
    });

    test('setSymbol définit le symbole correct', () => {
        setSymbol(boutons[0], 'X');
        expect(boutons[0].innerHTML).toBe('X');
    });

    test('rechercherVainqueur retourne vrai pour une ligne gagnante', () => {
        boutons[0].innerHTML = 'X';
        boutons[1].innerHTML = 'X';
        boutons[2].innerHTML = 'X';
        expect(rechercherVainqueur(boutons, joueurs, tour)).toBe(true);
    });

    test('rechercherVainqueur retourne faux s\'il n\'y a pas de gagnant', () => {
        boutons[0].innerHTML = 'X';
        boutons[1].innerHTML = 'O';
        boutons[2].innerHTML = 'X';
        expect(rechercherVainqueur(boutons, joueurs, tour)).toBe(false);
    });

    test('matchNul retourne vrai si tous les boutons sont remplis et qu\'il n\'y a pas de gagnant', () => {
        boutons.forEach((button, index) => button.innerHTML = index % 2 === 0 ? 'X' : 'O');
        expect(matchNul(boutons)).toBe(true);
    });

    test('matchNul retourne faux s\'il y a des boutons vides', () => {
        boutons[0].innerHTML = 'X';
        expect(matchNul(boutons)).toBe(false);
    });
});

describe('Afficheur', () => {
    test('sendMessage ajoute un message à l\'élément', () => {
        document.body.innerHTML = '<div id="StatutJeu"></div>';
        const element = document.querySelector('#StatutJeu');
        const afficheur = new Afficheur(element);
        
        afficheur.sendMessage('Test message');
        expect(element.innerHTML).toContain('Test message');
    });
});
