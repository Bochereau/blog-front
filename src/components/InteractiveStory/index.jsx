
import React, { useMemo, useState } from "react";
import "./style.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getReachableNodeIds, getStoryIssues } from "./storyChecks";

const createId = (prefix = "passage") =>
  `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

// Valeur spéciale de la liste « Destination » pour créer un passage à la volée
const NEW_NODE_OPTION = "__nouveau__";

const createNode = (title = "Nouveau passage") => ({
  id: createId(),
  title,
  text: "",
  choices: []
});

const createEmptyStory = () => {
  const startNode = {
    id: "depart",
    title: "Début de l'aventure",
    text: "",
    choices: []
  };

  return {
    startNodeId: startNode.id,
    nodes: [startNode]
  };
};

const normalizeStory = (value) => {
  if (!value || !Array.isArray(value.nodes) || value.nodes.length === 0) {
    return createEmptyStory();
  }

  const nodes = value.nodes.map((node) => ({
    ...node,
    choices: Array.isArray(node.choices) ? node.choices : []
  }));

  const startNodeId = nodes.some(
    (node) => node.id === value.startNodeId
  )
    ? value.startNodeId
    : nodes[0].id;

  return { ...value, startNodeId, nodes };
};

const InteractiveStory = ({ value, onChange }) => {
  const story = useMemo(() => normalizeStory(value), [value]);
  const [selectedNodeId, setSelectedNodeId] = useState(story.startNodeId);

  const nodes = story.nodes;
  const selectedNode =
    nodes.find((node) => node.id === selectedNodeId) ||
    nodes.find((node) => node.id === story.startNodeId) ||
    nodes[0];

  const updateStory = (updater) => {
    const nextStory = updater(story);
    onChange(nextStory);
  };

  const updateNode = (nodeId, changes) => {
    updateStory((current) => ({
      ...current,
      nodes: current.nodes.map((node) =>
        node.id === nodeId ? { ...node, ...changes } : node
      )
    }));
  };

  const addNode = () => {
      const newNode = createNode();
      const currentNodeId = selectedNode.id;

      const newChoice = {
          id: createId("choix"),
          label: "",
          nextNodeId: newNode.id
      };

      const nextStory = {
          ...story,
          nodes: [
              ...story.nodes.map(node =>
                  node.id === currentNodeId
                      ? {
                          ...node,
                          choices: [...node.choices, newChoice]
                      }
                      : node
              ),
              newNode
          ]
      };

      onChange(nextStory);
  };

  // Crée un passage et le relie directement au choix (titre repris du texte du choix)
  const addNodeForChoice = (choiceId) => {
    const choice = selectedNode.choices.find((item) => item.id === choiceId);
    const newNode = createNode(choice?.label?.trim() || undefined);

    updateStory((current) => ({
      ...current,
      nodes: [
        ...current.nodes.map((node) =>
          node.id === selectedNode.id
            ? {
                ...node,
                choices: node.choices.map((item) =>
                  item.id === choiceId
                    ? { ...item, nextNodeId: newNode.id }
                    : item
                )
              }
            : node
        ),
        newNode
      ]
    }));
  };

  const deleteNode = (nodeId) => {
    if (nodeId === story.startNodeId) {
      window.alert("Le passage de départ ne peut pas être supprimé.");
      return;
    }

    const confirmed = window.confirm(
      "Supprimer ce passage ? Les choix qui y conduisent devront être réaffectés."
    );

    if (!confirmed) return;

    updateStory((current) => ({
      ...current,
      nodes: current.nodes
        .filter((node) => node.id !== nodeId)
        .map((node) => ({
          ...node,
          choices: node.choices.map((choice) =>
            choice.nextNodeId === nodeId
              ? { ...choice, nextNodeId: "" }
              : choice
          )
        }))
    }));

    setSelectedNodeId(story.startNodeId);
  };

  const addChoice = () => {
    const choice = {
      id: createId("choix"),
      label: "",
      nextNodeId: ""
    };

    updateNode(selectedNode.id, {
      choices: [...selectedNode.choices, choice]
    });
  };

  const updateChoice = (choiceId, changes) => {
    updateNode(
      selectedNode.id,
      {
        choices: selectedNode.choices.map((choice) =>
          choice.id === choiceId
            ? { ...choice, ...changes }
            : choice
        )
      }
    );
  };

  const deleteChoice = (choiceId) => {
    updateNode(selectedNode.id, {
      choices: selectedNode.choices.filter(
        (choice) => choice.id !== choiceId
      )
    });
  };

  // Construit un chemin depuis le départ jusqu'au passage sélectionné.
  // Si plusieurs chemins sont possibles, le premier trouvé est affiché.
  const breadcrumb = useMemo(() => {
    const findPath = (nodeId, visited = new Set()) => {
      if (nodeId === story.startNodeId) {
        return [story.startNodeId];
      }

      if (visited.has(nodeId)) return null;

      const nextVisited = new Set(visited);
      nextVisited.add(nodeId);

      for (const node of story.nodes) {
        for (const choice of node.choices) {
          if (choice.nextNodeId !== nodeId) continue;

          const path = findPath(node.id, nextVisited);
          if (path) return [...path, nodeId];
        }
      }

      return null;
    };

    return findPath(selectedNode.id) || [selectedNode.id];
  }, [story, selectedNode.id]);

  const issues = useMemo(() => getStoryIssues(story), [story]);

  // Arbre des passages depuis le départ : chaque passage n'est développé qu'une fois,
  // les liens suivants (boucles, convergences) sont affichés comme des renvois.
  const tree = useMemo(() => {
    const expanded = new Set();

    const build = (nodeId, viaLabel) => {
      const node = story.nodes.find((item) => item.id === nodeId);
      if (!node) return null;

      if (expanded.has(nodeId)) {
        return { node, viaLabel, isReference: true, children: [] };
      }

      expanded.add(nodeId);
      const children = node.isEnding
        ? []
        : node.choices
            .filter((choice) => choice.nextNodeId)
            .map((choice) => build(choice.nextNodeId, choice.label))
            .filter(Boolean);

      return { node, viaLabel, isReference: false, children };
    };

    const root = build(story.startNodeId);
    const reachable = getReachableNodeIds(story);
    const orphans = story.nodes.filter((node) => !reachable.has(node.id));

    return { root, orphans };
  }, [story]);

  const renderNodeButton = (node, isReference = false) => (
    <button
      type="button"
      className={`interactive-editor__node ${
        node.id === selectedNode.id ? "is-active" : ""
      } ${isReference ? "is-reference" : ""}`}
      onClick={() => setSelectedNodeId(node.id)}
      title={isReference ? "Passage déjà présent plus haut dans l'arbre" : undefined}
    >
      <span className="interactive-editor__node-title">
        {isReference && <span aria-hidden="true">↪ </span>}
        {node.title || "Passage sans titre"}
      </span>
      {!isReference && node.id === story.startNodeId && (
        <span className="interactive-editor__start-label">Départ</span>
      )}
      {!isReference && node.isEnding && (
        <span className="interactive-editor__end-label">Fin du récit</span>
      )}
      {!isReference && !node.isEnding && node.choices.length === 0 && (
        <small>Impasse</small>
      )}
    </button>
  );

  const renderTreeItem = (item, key) => (
    <li key={key}>
      {item.viaLabel !== undefined && (
        <span className="interactive-editor__tree-via">
          {item.viaLabel?.trim() || "Choix sans texte"}
        </span>
      )}
      {renderNodeButton(item.node, item.isReference)}
      {item.children.length > 0 && (
        <ul>
          {item.children.map((child, index) =>
            renderTreeItem(child, `${child.node.id}-${index}`)
          )}
        </ul>
      )}
    </li>
  );

  const setStartNode = (nodeId) => {
    updateStory((current) => ({
      ...current,
      startNodeId: nodeId
    }));
  };

  // Configuration de ReactQuill
  const quillModules = useMemo(() => ({
      toolbar: {
          container: [
              ['bold', 'italic', 'underline'],
              [{ 'size': ['small', false, 'large', 'huge'] }],
              ['blockquote', 'code-block'],
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],
              ['link', 'image'],
              ['clean']
          ],
          handlers: {
              image: function() {
                  const url = prompt("Veuillez entrer l'URL de l'image (Cloudinary) :");
                  if (url) {
                      const width = prompt("Largeur (optionnel, ex: 300, 50%) :");
                      const height = prompt("Hauteur (optionnel, ex: 200, auto) :");
                      
                      const value = {
                          url,
                          width: width || null,
                          height: height || null
                      };
                      
                      const range = this.quill.getSelection();
                      this.quill.insertEmbed(range.index, 'image', value);
                  }
              }
          }
      }
  }), []);
    
  const quillFormats = [
      'bold', 'italic', 'underline',
      'size',
      'blockquote', 'code-block',
      'list', 'bullet',
      'link',
      'image'
  ];
  

  return (
    <div className="interactive-editor__quill">
      <div className="interactive-editor__heading">
        <div>
          <p className="interactive-editor__eyebrow">
            ÉDITION DU RÉCIT
          </p>
          <h4>Parcours interactif</h4>
          <p>
            Chaque passage peut proposer plusieurs choix et mener
            vers d'autres passages.
          </p>
        </div>

        <button
          type="button"
          className="interactive-editor__add"
          onClick={addNode}
        >
          + Nouveau passage
        </button>
      </div>

      <details
        className={`interactive-editor__checks ${
          issues.length > 0 ? "has-issues" : ""
        }`}
      >
        <summary>
          {issues.length > 0
            ? `⚠ ${issues.length} point${issues.length > 1 ? "s" : ""} à vérifier`
            : "✓ Aucun problème détecté"}
        </summary>
        {issues.length > 0 && (
          <ul>
            {issues.map((issue, index) => (
              <li key={index}>
                {issue.nodeId ? (
                  <button
                    type="button"
                    onClick={() => setSelectedNodeId(issue.nodeId)}
                  >
                    {issue.message}
                  </button>
                ) : (
                  issue.message
                )}
              </li>
            ))}
          </ul>
        )}
      </details>

      <div className="interactive-editor__layout">
        <aside className="interactive-editor__sidebar">
          <h5>Les passages ({nodes.length})</h5>

          {tree.root && (
            <ul className="interactive-editor__tree">
              {renderTreeItem(tree.root, tree.root.node.id)}
            </ul>
          )}

          {tree.orphans.length > 0 && (
            <>
              <h6 className="interactive-editor__tree-heading">
                Non reliés au départ
              </h6>
              <div className="interactive-editor__node-list">
                {tree.orphans.map((node) => (
                  <React.Fragment key={node.id}>
                    {renderNodeButton(node)}
                  </React.Fragment>
                ))}
              </div>
            </>
          )}
        </aside>

        <div className="interactive-editor__content">
          <nav
            className="interactive-editor__breadcrumb"
            aria-label="Fil d'Ariane du récit"
          >
            <span>Départ</span>

            {breadcrumb.map((nodeId, index) => {
              const node = nodes.find((item) => item.id === nodeId);

              return (
                <React.Fragment key={nodeId}>
                  {index > 0 && <span aria-hidden="true">›</span>}
                  <button
                    type="button"
                    className={
                      index === breadcrumb.length - 1
                        ? "is-current"
                        : ""
                    }
                    onClick={() => setSelectedNodeId(nodeId)}
                    title={node?.title || "Passage"}
                  >
                    {node?.title || "Passage supprimé"}
                  </button>
                </React.Fragment>
              );
            })}
          </nav>

          {!nodes.some((node) => node.id === story.startNodeId) && (
            <p className="interactive-editor__warning">
              Le passage de départ est introuvable.
            </p>
          )}

          <div className="interactive-editor__columns">
            <div className="interactive-editor__main">
              <div className="interactive-editor__field">
                <label htmlFor="interactive-node-title">
                  Titre du passage
                </label>
                <input
                  id="interactive-node-title"
                  value={selectedNode.title}
                  onChange={(event) =>
                    updateNode(selectedNode.id, {
                      title: event.target.value
                    })
                  }
                  placeholder="Ex. : Une rencontre inattendue"
                />
              </div>

              <div className="interactive-editor__field interactive-editor__text-field">
                <label>Texte du passage</label>

                <div className="interactive-editor__quill-editor">
                  <ReactQuill
                    theme="snow"
                    value={selectedNode.text || ""}
                    onChange={(value) =>
                      updateNode(selectedNode.id, {
                        text: value
                      })
                    }
                    modules={quillModules}
                    formats={quillFormats}
                    placeholder="Rédige ici ce que le lecteur découvre..."
                  />
                </div>

                <small>
                  Tu peux mettre en forme ton texte : titres, gras, italique,
                  listes et liens.
                </small>
              </div>
            </div>

            <div className="interactive-editor__choices">
              <label
                className={`interactive-editor__ending-toggle ${
                  selectedNode.isEnding ? "is-active" : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={Boolean(selectedNode.isEnding)}
                  onChange={(event) =>
                    updateNode(selectedNode.id, {
                      isEnding: event.target.checked
                    })
                  }
                />
                <span>
                  <strong>Fin du récit</strong>
                  <small>
                    Ce passage est un vrai dénouement, et non une impasse.
                  </small>
                </span>
              </label>

              {selectedNode.isEnding ? (
                <p className="interactive-editor__empty">
                  Le lecteur verra l'écran de fin du récit. Les choix
                  de ce passage ne lui seront pas proposés.
                </p>
              ) : (
                <>
                  <div className="interactive-editor__choices-heading">
                    <div>
                      <h5>Choix du lecteur</h5>
                      <p>Chaque choix mène à un autre passage.</p>
                    </div>

                    <button
                      type="button"
                      className="interactive-editor__secondary"
                      onClick={addChoice}
                    >
                      + Ajouter un choix
                    </button>
                  </div>

                  {selectedNode.choices.length === 0 && (
                    <p className="interactive-editor__empty">
                      Aucun choix : le lecteur arrivera à une impasse et
                      pourra revenir en arrière. Coche « Fin du récit » s'il
                      s'agit du vrai dénouement.
                    </p>
                  )}

                  {selectedNode.choices.map((choice, index) => (
                    <div className="interactive-editor__choice" key={choice.id}>
                      <div className="interactive-editor__choice-top">
                        <strong>Choix {index + 1}</strong>
                        <button
                          type="button"
                          className="interactive-editor__delete"
                          onClick={() => deleteChoice(choice.id)}
                        >
                          Supprimer
                        </button>
                      </div>

                      <div className="interactive-editor__field">
                        <label htmlFor={`choice-label-${choice.id}`}>
                          Texte affiché au lecteur
                        </label>
                        <input
                          id={`choice-label-${choice.id}`}
                          value={choice.label}
                          onChange={(event) =>
                            updateChoice(choice.id, {
                              label: event.target.value
                            })
                          }
                          placeholder="Ex. : Entrer dans la ruelle"
                        />
                      </div>

                      <div className="interactive-editor__field">
                        <label htmlFor={`choice-target-${choice.id}`}>
                          Destination
                        </label>
                        <select
                          id={`choice-target-${choice.id}`}
                          value={choice.nextNodeId}
                          onChange={(event) =>
                            event.target.value === NEW_NODE_OPTION
                              ? addNodeForChoice(choice.id)
                              : updateChoice(choice.id, {
                                  nextNodeId: event.target.value
                                })
                          }
                        >
                          <option value="">Choisir un passage...</option>
                          <option value={NEW_NODE_OPTION}>
                            + Nouveau passage
                          </option>
                          {nodes
                            .filter((node) => node.id !== selectedNode.id)
                            .map((node) => (
                              <option key={node.id} value={node.id}>
                                {node.title || "Passage sans titre"}
                              </option>
                            ))}
                        </select>
                      </div>

                      {choice.nextNodeId &&
                        !nodes.some((node) => node.id === choice.nextNodeId) && (
                          <p className="interactive-editor__warning">
                            La destination sélectionnée n'existe plus.
                          </p>
                        )}

                      {choice.nextNodeId === selectedNode.id && (
                        <p className="interactive-editor__warning">
                          Un passage ne peut pas se désigner lui-même dans cet éditeur.
                        </p>
                      )}
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>

          <div className="interactive-editor__actions">
            {selectedNode.id !== story.startNodeId && (
              <button
                type="button"
                className="interactive-editor__secondary"
                onClick={() => setStartNode(selectedNode.id)}
              >
                Définir comme départ
              </button>
            )}

            {selectedNode.id !== story.startNodeId && (
              <button
                type="button"
                className="interactive-editor__delete"
                onClick={() => deleteNode(selectedNode.id)}
              >
                Supprimer ce passage
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveStory;
