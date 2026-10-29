import React, { useEffect, useMemo, useRef, useState } from "react";
import parse from "html-react-parser";
import "./style.scss";

const normalizeStory = (value) => {
  if (!value || !Array.isArray(value.nodes)) return { startNodeId: "", nodes: [] };
  const nodes = value.nodes.map((node) => ({
    ...node,
    images: Array.isArray(node.images)
      ? node.images.map((image) => typeof image === "string" ? { url: image, caption: "" } : image)
      : [],
    choices: Array.isArray(node.choices) ? node.choices : []
  }));
  const startNodeId = nodes.some((node) => node.id === value.startNodeId) ? value.startNodeId : nodes[0]?.id;
  return { startNodeId, nodes };
};

/**
 * Moteur commun à la prévisualisation et à la page publique.
 * `key` doit changer si l'on souhaite réinitialiser explicitement le parcours.
 */
export default function InteractiveStoryPlayer({ story }) {
  const normalized = useMemo(() => normalizeStory(story), [story]);
  const [history, setHistory] = useState(() => normalized.startNodeId ? [normalized.startNodeId] : []);
  const currentId = history[history.length - 1] || normalized.startNodeId;
  const currentNode = normalized.nodes.find((node) => node.id === currentId);
  const playerRef = useRef(null);
  const titleRef = useRef(null);
  const isFirstRender = useRef(true);

  // À chaque changement de passage, on remonte au début du récit et on y place le focus
  // (sinon, après un choix en bas d'un long texte, le lecteur arrive au milieu du passage suivant)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const top = playerRef.current?.getBoundingClientRect().top;
    // 90 px : hauteur du menu collant (cf. scroll-margin-top)
    if (top !== undefined && top < 90) {
      playerRef.current.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    }
    titleRef.current?.focus({ preventScroll: true });
  }, [currentId]);

  if (!currentNode) {
    return <div className="interactive-player interactive-player--empty">Cette séquence interactive n'a pas encore de passage de départ.</div>;
  }

  // Une vraie fin ignore les choix éventuels ; un passage sans choix valide est une impasse
  const isEnding = Boolean(currentNode.isEnding);
  const validChoices = isEnding ? [] : currentNode.choices.filter((choice) => choice.label?.trim() && normalized.nodes.some((node) => node.id === choice.nextNodeId));

  const choose = (nextNodeId) => {
    if (!normalized.nodes.some((node) => node.id === nextNodeId)) return;
    setHistory((previous) => [...previous, nextNodeId]);
  };

  const goBack = () => setHistory((previous) => previous.length > 1 ? previous.slice(0, -1) : previous);
  const restart = () => setHistory(normalized.startNodeId ? [normalized.startNodeId] : []);

  return (
    <section className="interactive-player" aria-label="Récit interactif" ref={playerRef}>
      <header className="interactive-player__header">Récit interactif</header>

      <article className="interactive-player__passage" key={currentNode.id}>
        {currentNode.title && <h4 ref={titleRef} tabIndex={-1}>{currentNode.title}</h4>}
        <div className="interactive-player__text">{currentNode.text ? parse(currentNode.text) : <p><em>Ce passage ne contient pas encore de texte.</em></p>}</div>

        {currentNode.images.filter((image) => image?.url).map((image, index) => (
          <figure className="interactive-player__figure" key={`${currentNode.id}-image-${index}`}>
            <img src={image.url} alt={image.caption || currentNode.title || ""} loading="lazy" />
            {image.caption && <figcaption>{image.caption}</figcaption>}
          </figure>
        ))}

        {isEnding ? (
          <div className="interactive-player__ending interactive-player__ending--final" role="status">
            <span className="interactive-player__ending-eyebrow">Le récit s'achève</span>
            <span className="interactive-player__ending-title">Fin</span>
            <p>Vous avez atteint le dénouement de l'histoire.</p>
            <div className="interactive-player__ending-actions">
              <button type="button" onClick={restart}>↺ Revivre l'aventure</button>
            </div>
          </div>
        ) : validChoices.length > 0 ? (
          <div className="interactive-player__choices">
            <h5>Que faites-vous ?</h5>
            {validChoices.map((choice) => (
              <button type="button" key={choice.id} onClick={() => choose(choice.nextNodeId)}>
                <span>{choice.label}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="interactive-player__ending interactive-player__ending--dead-end" role="status">
            <span className="interactive-player__ending-title">Impasse</span>
            <p>Ce chemin s'arrête ici, mais l'histoire continue ailleurs.</p>
            <div className="interactive-player__ending-actions">
              {history.length > 1 && (
                <button type="button" onClick={goBack}>← Revenir au choix précédent</button>
              )}
              <button type="button" onClick={restart}>↺ Recommencer</button>
            </div>
          </div>
        )}
      </article>

      {validChoices.length > 0 && (
        <footer className="interactive-player__controls">
          <button type="button" onClick={goBack} disabled={history.length <= 1}>← Passage précédent</button>
          <button type="button" onClick={restart}>↺ Recommencer</button>
        </footer>
      )}
    </section>
  );
}
