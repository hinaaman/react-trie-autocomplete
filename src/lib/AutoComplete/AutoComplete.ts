import Trie from './Trie'

export type SearchData = {
    text: string
    weight: number
}

class AutoComplete {
    private trie: Trie<SearchData>
    private recommendationsCache: Map<string, SearchData[]>

    constructor(data: SearchData[]) {
        this.trie = new Trie()
        this.recommendationsCache = new Map()
        for (var i = 0; i < data.length; i++) {
            this.trie.insert(data[i].text, data[i])
        }
    }

    recommendations(prefix: string, top?: number): SearchData[] {
        const cacheKey = `${prefix}${top}`
        if (this.recommendationsCache.get(cacheKey)) {
            return this.recommendationsCache.get(cacheKey) as SearchData[]
        }

        const results = this.trie.startsWith(prefix).map(({ data }) => ({
            text: data?.text,
            weight: data?.weight,
        })) as SearchData[]

        const sortedResults = results.sort((a, b) => {
            if (a.weight === b.weight) {
                return a.text < b.text ? -1 : 1
            }
            return b.weight - a.weight
        })

        const topResults = top ? sortedResults.slice(0, top) : sortedResults
        this.recommendationsCache.set(cacheKey, topResults)

        return topResults
    }
}

export default AutoComplete
