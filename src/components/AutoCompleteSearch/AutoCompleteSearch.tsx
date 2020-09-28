import React, { useState, useEffect } from 'react'
import { SearchData } from 'lib/AutoComplete'

import './AutoCompleteSearch.css'

type Props = {
    recommendationEngine: {
        recommendations: (term: string, top?: number) => SearchData[]
    }
}

const AutoCompleteSearch = ({
    recommendationEngine,
}: Props): React.ReactElement => {
    const [searchTerm, setSearchTerm] = useState('')
    const onSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }

    const [recommendations, setRecommendations] = useState<SearchData[]>([])
    useEffect(
        function () {
            setRecommendations(
                recommendationEngine.recommendations(searchTerm, 5)
            )
        },
        [recommendationEngine, searchTerm]
    )

    return (
        <div className="AutoCompleteSearch">
            <label className="AutoCompleteSearch-label" htmlFor="common-birds">Common Garden Birds in Greater Vancouver:</label>
            <input
                className="AutoCompleteSearch-input"
                list="common-birds-list"
                id="common-birds"
                name="common-birds"
                value={searchTerm}
                onChange={onSearchTermChange}
            />
            <datalist id="common-birds-list">
                {recommendations.map((recommondation) => (
                    <option
                        key={recommondation.text}
                        value={recommondation.text}
                    />
                ))}
            </datalist>
        </div>
    )
}

export default AutoCompleteSearch
