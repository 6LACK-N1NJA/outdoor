const rankingRules = {
    desc: (rankedFieldName) => (a, b) => {
        if (Number(a[rankedFieldName]) > Number(b[rankedFieldName])) return -1;
        if (Number(a[rankedFieldName]) < Number(b[rankedFieldName])) return 1;
        return 0;
    },
    asc: (rankedFieldName) => (a, b) => {
        if (Number(a[rankedFieldName]) < Number(b[rankedFieldName])) return -1;
        if (Number(a[rankedFieldName]) > Number(b[rankedFieldName])) return 1;
        return 0;
    },
}

export default rankingRules;
