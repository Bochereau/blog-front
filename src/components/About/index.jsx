import React from "react";
import PropTypes from 'prop-types';
import classNames from "classnames";
import { useSelector } from "react-redux";

import './style.scss';

import Profil from '../../assets/image/bibi.jpg';

const About = () => {
    const light = useSelector((state) => state.lightTheme);

    // Données du membre
    const memberData = {
        name: "Boboch",
        avatar: Profil,
        journey: "Mon premier contact avec les jeux vidéo ne date pas d'hier, puisqu'il faut remonter au milieu des années 90. Un jour, chez des amis de mes parents, je me retrouve face à face avec une <strong>Megadrive</strong>. A l'intérieur du port cartouche : le jeu <strong>Sonic</strong>. Je passe alors l'après-midi à y jouer. Bien évidemment, je tanne mes parents pour avoir la même chose à la maison parce que \"c'est vraiment trop cool\". Nous sommes alors en <strong>1995</strong>, j'ai 7 ans, et ils finissent par me dénicher une Megadrive en occasion avec quelques jeux dont : Sonic 2, Streets of Rage 2 ou encore Aladdin. Les premiers souvenirs sont là : apprendre les patterns de Metal Sonic, finir Streets of Rage 2 en coop avec mon père. Mais tout cela ne reste qu'un passe temps parmis d'autres... Enfin, <strong>tout va changer en 2000</strong>, je suis desormais collégien et la <strong>Playstation</strong> est sur le marché depuis un moment, c'est un phénomène. A Noël, je reçois la version miniature de la mythique console : la PSOne. Elle sera accompagnée de Gran Turismo 2. Je suis aux anges !!! Et pourtant je n'arriverais jamais à m'investir dans ce jeu... Un jour, alors que je jette un oeil aux jeux disponible dans un supermarché, l'un d'eux attire mon attention. La jaquette est sobre, épurée. Un fond blanc avec seulement un logo et un titre. A l'arrière on y voit des images dignent d'un film d'animation. On y lit : <strong>\"Le voyage de votre vie\"</strong>. Ce jeu c'est <strong>Final Fantasy VIII</strong>. Me voilà absorbé par cet univers, ces personnages et le destin qui les attends. Je finis le jeu quelques temps plus tard avec un ami et c'est la plus grande claque de ma vie. Pour le moment... A la fin de cette même année, j'achête celui qui deviendra mon jeu préféré toutes consoles confondus. Celui qui me marquera à vie et qui laissera une trace indélébile dans mon coeur de joueur, <strong>l'intemporel Final Fantasy IX</strong>. C'est là, à cet instant, que les <strong>Final Fantasy</strong> et plus globalement les jeux vidéo vont occupé une part importante de ma vie. Curieux d'en savoir plus sur cette série de jeux qui ne cesse de se réinventer, je dévore chaque épisode disponible sur la PSOne : Origins (1 et 2), Anthology (4 et 5), 6, 7 et même Tactics pour lequel je récupérerais une console pucée. Je commence aussi à m'intéresser aux autres jeux du même genre (Wild Arms, Grandia, Saga Frontier 2). Je deviens addict aux <strong>J-RPG</strong>. Voilà comment je suis tombé amoureux des jeux vidéos, de leurs univers, de leurs histoires, de leurs thématiques, du voyage qu'ils nous font vivre.",
        top10Games: [
            "Final Fantasy IX",
            "Portal 2", 
            "Valkyrie Profile",
            "Kingdom Hearts",
            "Journey",
            "The Last Guardian",
            "The Witness",
            "Death Stranding",
            "Final Fantasy Tactics",
            "Nier",
        ],
        favoriteSeries: [
            "Final Fantasy",
            "Kingdom Hearts",
            "Metal Gear Solid",
            "Portal",
            "Nier",
            "Metroid",
            "Baten Kaitos",
            "Valkyrie Profile"
        ]
    };

    return (
        <div className="about">
            <p className="about-description">
                Bonjour et bienvenue sur le site <em className="important">Limit Break</em>.<br /><br /> Ici, on parle principalement de <em className="important">jeux vidéo</em> et plus particulièrement d'un genre qui me tient à coeur : les <em className="important">J-RPG</em>.<br /><br />
            </p>
            
            <div className="member-card">
                <div className="member-content">
                    <div className="member-presentation">
                        <div className="member-header">
                            <div className="member-avatar">
                                <img src={memberData.avatar} alt={`Avatar de ${memberData.name}`} />
                            </div>
                            <h2 className="member-name">{memberData.name}</h2>
                        </div>
                        <div className="member-info">
                            <div className="member-journey">
                                <p dangerouslySetInnerHTML={{ __html: memberData.journey }}></p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="member-details">
                        <div className="games-section">
                            <h3>Ses jeux préférés</h3>
                            <ul className="games-list">
                                {memberData.top10Games.map((game, index) => (
                                    <li key={index} className="game-item">
                                        {game}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About;