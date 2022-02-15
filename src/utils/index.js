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

// function to sort and reverse an array by id
export const sortedByIdArray = (array) => {
    let newArray = array.sort((a, b) => a.id - b.id).reverse();
    return newArray;
}

// function to sort an array by name
export const sortedByNameArray = (array) => {
    let newArray = array.sort(function(a, b) {
        if(a.attributes.slug < b.attributes.slug) { return -1; }
        if(a.attributes.slug > b.attributes.slug) { return 1; }
        return 0;
    })
    return newArray;
}

// function to get related posts from a post
export const createRelatedPosts = (array, id) => {
    let newArray = [];
    newArray = removeObject(array, id);
    newArray = shuffleArray(newArray);
    newArray = sliceArray(newArray, 5);
    return newArray;
}