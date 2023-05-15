import React, { useState, useRef } from 'react';
import { Button, InputGroup, FormControl,Grid } from 'react-bootstrap';
import { Col, Row, Table } from 'react-bootstrap';
import Helpers from '../helpers';
import Cookies from 'js-cookie';
import NFTTypeWithTip from './NFTTypeWithTip';
import { IoCloseOutline } from 'react-icons/io5';

export default function Search(probs, { children, ...rest }) { 

    const htmlElRef = useRef(null);
    const divEleRef = useRef(null);
    const useFocus = () => {
        const setFocus = () => { htmlElRef.current && htmlElRef.current.focus() }
        return [htmlElRef, setFocus]
    }

    // const [inputRef, setInputFocus] = useFocus();

    function clearSearch() {
        // setSearchResult(undefined);
         setInputFocus();
        // clearText();
    }

    function handleKeyUp(event) {
        if (event.keyCode === 27) {
            clearSearch();
            setHasText(false);
        } else if (Helpers.hasText(event.target.value)) {
        } else {
            clearSearch();
            setHasText(false);
        }
    }


    function handleOnChange(event) {
        if (event.keyCode === 27) {
            clearSearch();
            setHasText(false);
        } else if (Helpers.hasText(event.target.value)) {
            let searchText = event.target.value;
            loadAutoComplete(encodeURIComponent(searchText));
            setHasText(true);
        } else {
            clearSearch();
            setHasText(false);
        }
    }

    return (
        
         <Grid item alignSelf={"flex-end"}>
            <InputGroup size={probs.size} className="border-group mb3">
                        <img src='/images/magnifying-glass-light.svg'/>
                        <FormControl size={probs.size} placeholder="Search Address, NFT , CAT , Coin, Block" style={{border:"none"}} className="search"
                            id="searchText"  />
                       <Button size={probs.size} variant="outline-light" className={!true ? "hidden" : "border-none "} >
                            <IoCloseOutline />
                        </Button> 
            </InputGroup>
         </Grid>                   
         
        
    )
}