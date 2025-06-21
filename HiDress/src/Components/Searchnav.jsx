import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import React, { useState } from 'react';
import { MdSearch } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Searchnav = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === 'Enter' && keyword.trim()) {
      navigate(`/search/${keyword.trim().toLowerCase().replace(/\b\w/g, s=> s.toUpperCase())}`)
      // navigate(`/search/${keyword.trim()}`);
    }
  };

  return (
    <InputGroup>
      <Input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={handleSearch}
        bgColor="white"
        placeholder="Search here ..."
      />
      <InputRightElement children={<MdSearch />} />
    </InputGroup>
  );
};

export default Searchnav;

