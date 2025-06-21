import React, { useState } from 'react'
import {Input} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
 
const Search = () => {
    const [keyword, setkeyword] = useState('')
    const navigate = useNavigate()
    const Handlesearch = (e) => {
        if(keyword.trim() && e.which == 13){
            // navigate('/search/')
            // navigate(`?cg=${keyword}`)
            navigate(`/search/${keyword.toLowerCase().replace(/\b\w/g, s=> s.toUpperCase())}`)
        }else{
        }
    }
    return (
        <div className = 'Searcharea'>
        <Input size="lg" value = {keyword} onChange = {e=> setkeyword(e.target.value)} onKeyPress = {Handlesearch} bgColor  = 'white' placeholder="Tap For Search" />
        </div>
    )
}
 
export default Search