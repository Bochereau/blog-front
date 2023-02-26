import React from "react";
import PropTypes from 'prop-types';
import classNames from "classnames";

import './style.scss';

import Profil from '../../assets/image/bibi.jpg';

const About = ({ light }) => {
    return (
        <>
            <div className="about">
                <h2 className={classNames ("about-title", {"bk-s--light" : light === true, "bk-s--dark" : light === false})}>
                    A propos du site
                </h2>
                <div className="about-content">
                    <p className="about-content-description">
                        Bonjour et bienvenue sur le site <em className="important">Limit Break</em>.<br/><br/> Ici, on parle principalement de <em className="important">jeux vidéo</em> et plus particulièrement d'un genre qui me tient à coeur : les <em className="important">J-RPG</em>.<br/><br/>
                    </p>
                    <p>Une petite présentation s'impose :</p> 
                    <div className={ classNames("about-content-profil") }>
                        <img className="about-content-profil-img" src={Profil} alt="Bibi de Final Fantasy IX" />
                        <div className="about-content-profil-description">
                            <p>Moi c'est <em className="important">Boboch</em>.</p>
                            <p>Mon premier contact avec les jeux vidéo ne date pas d'hier, puisqu'il faut remonter au milieu des années 90.</p>
                            <p>Un jour, chez des amis de mes parents, je me retrouve face à face avec une <em className="important">Megadrive</em>. A l'intérieur du port cartouche : le jeu <em className="important">Sonic</em>. Je passe alors l'après-midi à y jouer. Bien évidemment, je tanne mes parents pour avoir la même chose à la maison parce que "c'est vraiment trop cool". Nous sommes alors en <em className="important">1995</em>, j'ai 7 ans, et ils finissent par me dénicher une Megadrive en occasion avec quelques jeux dont :  Sonic 2, Streets of Rage 2 ou encore Aladdin.</p>
                            <p>Les <em className="important">premiers souvenirs</em> sont là :</p>
                            <ul>
                                <li>Apprendre les patterns de Metal Sonic.</li>
                                <li>Finir Streets of Rage 2 en coop avec mon père.</li>
                            </ul>
                            <p>Mais tout cela ne reste qu'un passe temps parmis d'autres...</p>
                            <p>Enfin, <em className="important">tout va changer en 2000</em>, je suis desormais collégien et la <em className="important">Playstation</em> est sur le marché depuis un moment, <em className="important">c'est un phénomène</em>. A Noël, je reçois la version miniature de la mythique console : la PSOne. Elle sera accompagnée de Gran Turismo 2. <br/>Je suis aux anges !!! Et pourtant je n'arriverais jamais à m'investir dans ce jeu... </p>
                            <p>Oui oui nous y venons à celui qui à changé la donne.</p>
                            <p>Un jour, alors que je jette un oeil aux jeux disponible dans un supermarché, l'un d'eux attire mon attention. La jaquette est sobre, épurée. Un fond blanc avec seulement un logo et un titre. A l'arrière on y voit des images dignent d'un film d'animation. On y lit : <em className="important">"Le voyage de votre vie"</em>.</p>
                            <p>Ce jeu c'est <em className="important">Final Fantasy VIII</em>.</p> 
                            <p>Me voilà absorbé par cet <em className="important">univers</em>, ces <em className="important">personnages</em> et le <em className="important">destin</em> qui les attends. Je finis le jeu quelques temps plus tard avec un ami et c'est la plus grande claque de ma vie. Pour le moment...</p>
                            <p>A la fin de cette même année, j'achête celui qui deviendra mon jeu préféré toutes consoles confondus. Celui qui me marquera à vie et qui laissera une trace indélébile dans mon coeur de joueur, <em className="important">l'intemporel Final Fantasy IX.</em></p>
                            <p>C'est là, à cet instant, que les <em className="important">Final Fantasy</em> et plus globalement les jeux vidéo vont occupé une part importante de ma vie. 
                            Curieux d'en savoir plus sur cette série de jeux qui ne cesse de se réinventer, <em className="important">je dévore chaque épisode</em> disponible sur la PSOne : Origins (1 et 2), Anthology (4 et 5), 6, 7 et même Tactics pour lequel je récupérerais une console pucée. Je commence aussi à m'intéresser aux autres jeux du même genre (Wild Arms, Grandia, Saga Frontier 2). Je deviens addict aux <em className="important">J-RPG</em>.</p>
                            <p>Voilà comment je suis tombé amoureux des jeux vidéos, de leurs univers, de leurs histoires, de leurs thématiques, du voyage qu'ils nous font vivre.</p>
                            <p>Une petite liste pêle-mêle des jeux ou série qui m'ont marqués en tant que joueur : <em className="important">Final Fantasy</em> (série) / <em className="important">Kingdom Hearts</em> (série) / <em className="important">Metal Gear Solid</em> (série) / <em className="important">Portal</em> (série) / <em className="important">Nier</em> (série) / <em className="important">Baten Kaitos</em> (série) / <em className="important">Metroid</em> (série) / <em className="important">Ico</em> / <em className="important">Shadow of the Colossus</em> / <em className="important">The Last Guardian</em> / <em className="important">Valkyrie Profile</em> / <em className="important">Grandia</em> / <em className="important">Chrono Trigger</em> / <em className="important">The Witness</em> / <em className="important">Journey</em> / <em className="important">Inside</em>.</p>
                        </div>
                    </div>
                    {/* <p className="about-content-rules">
                        Revenons maintenant à ce blog. Pourquoi ? Comment ? <br/>
                        Il va sans dire que le site est la création d'un passionné pour les passionnés. <br/> C'est un espace de convivialité dans lequel la bonne humeur et le respect sont les maîtres mots.
                    </p> */}
                </div>
            </div>
        </>
    )
}

About.propTypes = {
    light: PropTypes.bool.isRequired,
}

export default About;