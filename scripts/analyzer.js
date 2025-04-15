function analyzeText() {
    const text = document.getElementById("textInput").value;

    const letters = (text.match(/[a-zA-Z]/g) || []).length;
    const words = (text.match(/\b\w+\b/g) || []).length;
    const spaces = (text.match(/ /g) || []).length;
    const newlines = (text.match(/\n/g) || []).length;
    const specialSymbols = (text.match(/[^a-zA-Z0-9\s]/g) || []).length;

    const tokens = text.toLowerCase().match(/\b\w+\b/g) || [];

    const pronouns = ["i", "you", "he", "she", "it", "we", "they", "me", "him", "her", "us", "them"];
    const prepositions = ["in", "on", "at", "by", "with", "about", "against", "between", "into", "through", "during", "before", "after", "above", "below", "to", "from", "up", "down", "over", "under"];
    const articles = ["a", "an"];

    const countOccurrences = (list) =>
        list.reduce((acc, word) => {
            if (!acc[word]) acc[word] = 0;
            acc[word]++;
            return acc;
        }, {});

    const pronounCounts = countOccurrences(tokens.filter(token => pronouns.includes(token)));
    const prepositionCounts = countOccurrences(tokens.filter(token => prepositions.includes(token)));
    const articleCounts = countOccurrences(tokens.filter(token => articles.includes(token)));

    const resultHTML = `
        <h3>Basic Counts</h3>
        <p><strong>Letters:</strong> ${letters}</p>
        <p><strong>Words:</strong> ${words}</p>
        <p><strong>Spaces:</strong> ${spaces}</p>
        <p><strong>Newlines:</strong> ${newlines}</p>
        <p><strong>Special Symbols:</strong> ${specialSymbols}</p>

        <h3>Pronouns</h3>
        <pre>${JSON.stringify(pronounCounts, null, 2)}</pre>

        <h3>Prepositions</h3>
        <pre>${JSON.stringify(prepositionCounts, null, 2)}</pre>

        <h3>Indefinite Articles</h3>
        <pre>${JSON.stringify(articleCounts, null, 2)}</pre>
    `;

    document.getElementById("analysisResults").innerHTML = resultHTML;
}
