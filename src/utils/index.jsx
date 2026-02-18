// Construit une URL Cloudinary avec des transformations (w_..., f_auto, q_...)
export const buildCloudinaryVariant = (url, width, quality = "auto") => {
    if (!url || typeof url !== "string") return "";

    const marker = "/upload/";
    const index = url.indexOf(marker);
    if (index === -1) return url;

    const prefix = url.slice(0, index + marker.length);
    const suffix = url.slice(index + marker.length);

    const transformations = `w_${width},f_auto,q_${quality}`;
    if (suffix && !suffix.startsWith("v")) {
        return url;
    }
    return `${prefix}${transformations}/${suffix}`;
};

// function to return DD/MM/YYYY date
export const reverseDate = (str) => {
    let newDate = str.replaceAll('-', '/').substring(0, 10);
    return newDate.split('/').reverse().join('/');
}

// function to shuffle an array
export const shuffleArray = (array) => {
    let newArray = array.sort(() => Math.random() - 0.5);
    return newArray;
}

// function to slice an array with n entry
export const sliceArray = (array, n) => {
    let newArray = array.slice(0, n);
    return newArray;
}

// function to remove an object from the array knowing its id
export const removeObject = (array, id) => {
    let newArray = array.filter((item) => item.id !== id);
    return newArray;
}

// function to return an array with similar theme
export const themedArray = (array, theme) => {
    let newArray = array.filter((item) => item.attributes.theme.data.attributes.name === theme);
    return newArray;
}

// function to sort and reverse an array by date
export const sortedByCreationArray = (array) => {
    let newArray = array.sort((a, b) => a.publishedAt - b.publishedAt).reverse();
    return newArray;
}

// function to sort an array by name
export const sortedByNameArray = (array) => {
    let newArray = array.sort(function (a, b) {
        if (a.slug < b.slug) { return -1; }
        if (a.slug > b.slug) { return 1; }
        return 0;
    })
    return newArray;
}

// function to get related posts from a post
export const createRelatedPosts = (posts, currentId, currentThemes, limit = 5) => {
    let related = posts.filter(post => {
        if (post._id === currentId) return false;
        const themeIds = post.themes.map(t => t._id);
        return themeIds.some(id => currentThemes.includes(id));
    });

    // Complément aléatoire si moins que le minimum
    if (related.length < limit) {
        const others = posts.filter(p => p._id !== currentId && !related.includes(p));
        related = [...related, ...shuffleArray(others).slice(0, limit - related.length)];
    }

    return shuffleArray(related).slice(0, limit);
};

export function buildCommentTree(comments) {
    const map = {};
    const roots = [];

    comments?.forEach(comment => {
        map[comment._id] = { ...comment, replies: [] };
    });

    comments?.forEach(comment => {
        if (comment.replyTo && map[comment.replyTo]) {
            map[comment.replyTo].replies.push(map[comment._id]);
        } else {
            roots.push(map[comment._id]);
        }
    });

    return roots;
}