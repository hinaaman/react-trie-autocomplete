class Node<T> {
    isLeaf: boolean
    connections: Map<string, Node<T>>
    data?: T

    constructor() {
        this.connections = new Map()
        this.isLeaf = false
    }
}

class Trie<T> {
    private root: Node<T>
    constructor() {
        this.root = new Node()
    }

    insert(text: string, data?: T) {
        let node = this.root
        for (let i = 0; i < text.length; i++) {
            if (!node.connections.get(text[i])) {
                node.connections.set(text[i], new Node())
            }
            node = node.connections.get(text[i]) as Node<T>
        }
        node.isLeaf = true
        node.data = data
    }

    searchPrefix(prefix: string): Node<T> | null {
        let node = this.root
        for (let i = 0; i < prefix.length; i++) {
            if (node.connections.get(prefix[i])) {
                node = node.connections.get(prefix[i]) as Node<T>
            } else {
                return null
            }
        }
        return node
    }

    search(term: string): Node<T> | null {
        const node = this.searchPrefix(term)
        return node && node.isLeaf ? node : null
    }

    traverse(node: Node<T>, results: Node<T>[]) {
        if (node.isLeaf) {
            results.push(node)
        }
        node.connections.forEach((connection) =>
            this.traverse(connection, results)
        )
    }
    
    startsWith(term: string): Node<T>[] {
        const node = this.searchPrefix(term)
        const list: Node<T>[] = []
        if (node) {
            this.traverse(node, list)
        }
        return list
    }
}

export default Trie
