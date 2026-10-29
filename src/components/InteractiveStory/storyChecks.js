// Vérifications d'un récit interactif : simples avertissements, jamais bloquants.

const hasText = (html = "") =>
  /<img\b/i.test(html) ||
  html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim() !== "";

// Passages atteignables depuis le départ (les choix d'une fin ne sont pas proposés au lecteur)
export const getReachableNodeIds = (story) => {
  const nodes = story?.nodes || [];
  const reachable = new Set();
  const queue = story?.startNodeId ? [story.startNodeId] : [];

  while (queue.length > 0) {
    const nodeId = queue.shift();
    if (reachable.has(nodeId)) continue;

    const node = nodes.find((item) => item.id === nodeId);
    if (!node) continue;

    reachable.add(nodeId);
    if (node.isEnding) continue;

    (node.choices || []).forEach((choice) => {
      if (choice.nextNodeId) queue.push(choice.nextNodeId);
    });
  }

  return reachable;
};

/**
 * Retourne la liste des points à vérifier.
 * Chaque point : { nodeId (ou null si global), message }.
 */
export const getStoryIssues = (story) => {
  const nodes = story?.nodes || [];
  const issues = [];

  if (nodes.length === 0) {
    return [{ nodeId: null, message: "Le récit ne contient aucun passage." }];
  }

  if (!nodes.some((node) => node.isEnding)) {
    issues.push({
      nodeId: null,
      message: "Aucun passage n'est marqué « Fin du récit »."
    });
  }

  const reachable = getReachableNodeIds(story);

  nodes.forEach((node) => {
    const title = node.title?.trim() || "Passage sans titre";

    if (!reachable.has(node.id)) {
      issues.push({
        nodeId: node.id,
        message: `« ${title} » ne peut être atteint depuis le départ.`
      });
    }

    if (!hasText(node.text)) {
      issues.push({ nodeId: node.id, message: `« ${title} » n'a pas de texte.` });
    }

    if (node.isEnding) return;

    (node.choices || []).forEach((choice, index) => {
      const choiceName = `choix ${index + 1} de « ${title} »`;

      if (!choice.label?.trim()) {
        issues.push({
          nodeId: node.id,
          message: `Le ${choiceName} n'a pas de texte et sera masqué.`
        });
      }

      if (!choice.nextNodeId) {
        issues.push({
          nodeId: node.id,
          message: `Le ${choiceName} n'a pas de destination et sera masqué.`
        });
      } else if (!nodes.some((item) => item.id === choice.nextNodeId)) {
        issues.push({
          nodeId: node.id,
          message: `La destination du ${choiceName} n'existe plus.`
        });
      }
    });
  });

  return issues;
};
