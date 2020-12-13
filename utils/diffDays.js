module.exports = (from, to) => {
    const fromDate = new Date(from);
    const toDate = new Date(to);
    const diffTime = Math.abs(toDate - fromDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
